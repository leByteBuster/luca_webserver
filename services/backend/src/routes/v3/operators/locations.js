const router = require('express').Router();
const status = require('http-status');
const { Op } = require('sequelize');
const moment = require('moment');

const { createSchema, updateSchema } = require('./locations.schemas');

const database = require('../../../database');
const { validateSchema } = require('../../../middlewares/validateSchema');
const { requireOperator } = require('../../../middlewares/requireUser');

// get own locations
router.get('/', requireOperator, async (request, response) => {
  const locations = await database.Location.findAll({
    where: {
      operator: request.user.uuid,
    },
  });
  response.send(locations);
});

// eslint-disable-next-line sonarjs/no-duplicate-string
router.get('/:locationId', requireOperator, async (request, response) => {
  const location = await database.Location.findOne({
    where: {
      uuid: request.params.locationId,
      operator: request.user.uuid,
    },
  });

  if (!location) {
    return response.sendStatus(status.NOT_FOUND);
  }

  return response.send(location);
});

// create location
router.post(
  '/',
  requireOperator,
  validateSchema(createSchema),
  async (request, response) => {
    const group = await database.LocationGroup.findOne({
      where: { uuid: request.body.groupId, operatorId: request.user.uuid },
    });
    if (!group) {
      return response.sendStatus(status.NOT_FOUND);
    }

    const baseLocation = await database.Location.findOne({
      where: { groupId: request.body.groupId },
    });

    let location;

    await database.transaction(async transaction => {
      location = await database.Location.create(
        {
          operator: request.user.uuid,
          publicKey: baseLocation.publicKey,
          groupId: request.body.groupId,
          name: request.body.locationName,
          firstName: request.body.firstName || request.user.firstName,
          lastName: request.body.lastName || request.user.lastName,
          phone: request.body.phone,
          streetName: request.body.streetName,
          streetNr: request.body.streetNr,
          zipCode: request.body.zipCode,
          city: request.body.city,
          state: request.body.state,
          lat: request.body.lat,
          lng: request.body.lng,
          radius: request.body.radius || 0,
          shouldProvideGeoLocation: request.body.radius > 0,
          tableCount: request.body.tableCount,
        },
        { transaction }
      );

      if (request.body.additionalData) {
        await Promise.all(
          request.body.additionalData.map(data =>
            database.AdditionalDataSchema.create(
              {
                locationId: location.uuid,
                key: data.key,
                label: data.label,
                isRequired: data.isRequired,
              },
              { transaction }
            )
          )
        );
      }
    });

    response.status(status.CREATED);
    return response.send(location);
  }
);

// update location
router.patch(
  '/:locationId',
  requireOperator,
  validateSchema(updateSchema),
  async (request, response) => {
    const location = await database.Location.findOne({
      where: {
        operator: request.user.uuid,
        uuid: request.params.locationId,
      },
    });

    if (!location) {
      return response.sendStatus(status.NOT_FOUND);
    }

    await location.update({
      name: location.name ? request.body.locationName : null,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phone: request.body.phone,
      tableCount: request.body.tableCount,
      radius: request.body.radius || 0,
      shouldProvideGeoLocation: request.body.radius > 0,
    });

    return response.send(location);
  }
);

// delete location
router.delete('/:locationId', requireOperator, async (request, response) => {
  const location = await database.Location.findOne({
    where: {
      operator: request.user.uuid,
      uuid: request.params.locationId,
    },
  });

  if (!location) {
    return response.sendStatus(status.NOT_FOUND);
  }

  await location.destroy();
  return response.sendStatus(status.NO_CONTENT);
});

// checkout all guest in a location
router.post(
  '/:locationId/check-out',
  requireOperator,
  async (request, response) => {
    const location = await database.Location.findOne({
      where: {
        operator: request.user.uuid,
        uuid: request.params.locationId,
      },
    });

    if (!location) {
      return response.sendStatus(status.NOT_FOUND);
    }

    const oldTraces = await database.Trace.findAll({
      where: {
        locationId: location.uuid,
        time: {
          [Op.contains]: moment(),
        },
      },
    });

    const now = moment();

    await database.transaction(async transaction => {
      const updateQueries = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const checkIn of oldTraces) {
        updateQueries.push(
          checkIn.update(
            {
              time: [checkIn.time[0].value, now],
            },
            { transaction }
          )
        );
      }
      await Promise.all(updateQueries);
    });

    return response.sendStatus(status.NO_CONTENT);
  }
);

module.exports = router;
