const router = require('express').Router();
const status = require('http-status');
const { Op } = require('sequelize');
const crypto = require('crypto');
const faker = require('faker');

const database = require('../../database');
const { validateSchema } = require('../../middlewares/validateSchema');
const {
  requireHealthDepartmentAdmin,
} = require('../../middlewares/requireUser');
const passwordRouter = require('./healthDepartmentEmployees/password');

const { createSchema } = require('./healthDepartmentEmployees.schemas');

// HD get all employees
router.get('/', requireHealthDepartmentAdmin, async (request, response) => {
  const healthDepartmentEmployees = await database.HealthDepartmentEmployee.findAll(
    {
      where: {
        departmentId: request.user.departmentId,
        uuid: {
          [Op.not]: request.user.uuid,
        },
      },
    }
  );

  return response.send(
    healthDepartmentEmployees.map(employee => ({
      uuid: employee.uuid,
      email: employee.email,
      phone: employee.phone,
      firstName: employee.firstName,
      lastName: employee.lastName,
    }))
  );
});

// delete employees
router.delete(
  '/:employeeId',
  requireHealthDepartmentAdmin,
  async (request, response) => {
    const employee = await database.HealthDepartmentEmployee.findOne({
      where: {
        uuid: request.params.employeeId,
        departmentId: request.user.departmentId,
      },
    });

    if (!employee) {
      return response.sendStatus(status.NOT_FOUND);
    }

    await employee.destroy({ force: true });
    return response.sendStatus(status.NO_CONTENT);
  }
);

// HD create new employee
router.post(
  '/',
  requireHealthDepartmentAdmin,
  validateSchema(createSchema),
  async (request, response) => {
    const healthDepartment = await database.HealthDepartment.findOne({
      where: {
        uuid: request.user.departmentId,
      },
    });

    if (!healthDepartment) {
      return response.sendStatus(status.NOT_FOUND);
    }

    const initialPassword = faker.internet.password(8);

    await database.HealthDepartmentEmployee.create({
      email: request.body.email.toLowerCase(),
      username: request.body.email.toLowerCase(),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phone: request.body.phone,
      isAdmin: false,
      departmentId: request.user.departmentId,
      password: initialPassword,
      salt: crypto.randomBytes(16).toString('base64'),
    });

    response.status(status.CREATED);
    return response.send({ password: initialPassword });
  }
);

router.use('/password', passwordRouter);

module.exports = router;
