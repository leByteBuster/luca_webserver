const router = require('express').Router();
const status = require('http-status');
const moment = require('moment');
const config = require('config');
const { Op } = require('sequelize');

const database = require('../../../database');
const mailjet = require('../../../utils/mailjet');
const {
  validateSchema,
  validateParametersSchema,
} = require('../../../middlewares/validateSchema');
const { limitRequestsPerHour } = require('../../../middlewares/rateLimit');
const { requireOperator } = require('../../../middlewares/requireUser');

const {
  updateMailSchema,
  activationSchema,
  emailParametersSchema,
} = require('./email.schemas');

// update email
router.patch(
  '/',
  requireOperator,
  validateSchema(updateMailSchema),
  async (request, response) => {
    const operator = request.user;

    const email = request.body.email.toLowerCase();

    const existingUser = await database.Operator.findOne({
      where: { username: email },
    });

    if (existingUser) {
      return response.sendStatus(status.CONFLICT);
    }

    const activationMail = await database.EmailActivation.create({
      operatorId: operator.uuid,
      email,
      type: 'EmailChange',
    });

    mailjet.updateEmail(email, `${operator.fullName}`, request.body.lang, {
      firstName: operator.firstName,
      activationLink: `https://${config.get('hostname')}/activateEmail/${
        activationMail.uuid
      }`,
    });

    return response.sendStatus(status.NO_CONTENT);
  }
);

// check if email change is in progress
router.get('/isChangeActive', requireOperator, async (request, response) => {
  const operator = request.user;

  const activationMail = await database.EmailActivation.findOne({
    where: {
      operatorId: operator.uuid,
      closed: false,
      createdAt: {
        [Op.gt]: moment().subtract(config.get('emails.expiry'), 'hours'),
      },
      type: 'EmailChange',
    },
  });

  if (!activationMail) {
    return response.sendStatus(status.NOT_FOUND);
  }

  return response.sendStatus(status.OK);
});

// check if email is in system
router.get(
  '/:email',
  limitRequestsPerHour(5, { skipSuccessfulRequests: true }),
  validateParametersSchema(emailParametersSchema),
  async (request, response) => {
    const user = await database.Operator.findOne({
      where: {
        email: request.params.email.toLowerCase(),
      },
    });

    if (!user) {
      return response.sendStatus(status.NOT_FOUND);
    }

    return response.sendStatus(status.OK);
  }
);

// confirm email change
router.post(
  '/confirm',
  limitRequestsPerHour(15, { skipSuccessfulRequests: true }),
  validateSchema(activationSchema),
  async (request, response) => {
    const { activationId } = request.body;

    const activationMail = await database.EmailActivation.findOne({
      where: {
        uuid: activationId,
        type: 'EmailChange',
      },
    });

    if (!activationMail) {
      return response.sendStatus(status.NOT_FOUND);
    }

    if (activationMail.closed) {
      return response.sendStatus(status.CONFLICT);
    }

    if (
      activationMail.createdAt <
      moment().subtract(config.get('emails.expiry'), 'hours')
    ) {
      return response.sendStatus(status.GONE);
    }

    const operator = await database.Operator.findByPk(
      activationMail.operatorId
    );

    if (!operator) {
      return response.sendStatus(status.NOT_FOUND);
    }

    await database.transaction(async transaction => {
      return Promise.all([
        activationMail.update(
          {
            closed: true,
          },
          { transaction }
        ),
        operator.update(
          {
            email: activationMail.email,
            username: activationMail.email,
          },
          { transaction }
        ),
      ]);
    });

    return response.sendStatus(status.NO_CONTENT);
  }
);

module.exports = router;
