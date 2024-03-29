const router = require('express').Router();
const status = require('http-status');
const passport = require('passport');

const { validateSchema } = require('../../middlewares/validateSchema');
const { restrictOrigin } = require('../../middlewares/restrictOrigin');
const {
  requireOperator,
  requireHealthDepartmentEmployee,
} = require('../../middlewares/requireUser');
const { limitRequestsPerMinute } = require('../../middlewares/rateLimit');

const { authSchema } = require('./auth.schemas');

router.post(
  '/login',
  limitRequestsPerMinute(5, { skipSuccessfulRequests: true }),
  restrictOrigin,
  validateSchema(authSchema),
  (request, response) =>
    passport.authenticate('local-operator', {}, (error, user) => {
      if (error) {
        if (error.errorType === 'UNACTIVATED') {
          return response.sendStatus(status.LOCKED);
        }

        return response.sendStatus(status.UNAUTHORIZED);
      }

      return request.logIn(user, loginError => {
        if (loginError) {
          return response.sendStatus(status.UNAUTHORIZED);
        }
        return response.sendStatus(status.OK);
      });
    })(request, response)
);

// Certificate check is done in Load Balancer
router.post(
  '/healthDepartmentEmployee/login',
  limitRequestsPerMinute(5, { skipSuccessfulRequests: true }),
  restrictOrigin,
  validateSchema(authSchema),
  passport.authenticate('local-healthDepartmentEmployee'),
  (request, response) => {
    response.sendStatus(status.OK);
  }
);

router.get(
  '/healthDepartmentEmployee/me',
  requireHealthDepartmentEmployee,
  (request, response) => {
    return response.send({
      employeeId: request.user.uuid,
      username: request.user.username,
      firstName: request.user.firstName,
      lastName: request.user.lastName,
      email: request.user.email,
      departmentId: request.user.departmentId,
      isAdmin: request.user.isAdmin,
    });
  }
);

router.post('/logout', restrictOrigin, (request, response) => {
  request.logout();
  request.session.destroy(error => {
    if (error) {
      throw error;
    }
    response.clearCookie('connect.sid');
    response.sendStatus(status.NO_CONTENT);
  });
});

router.get('/me', requireOperator, (request, response) => {
  return response.send({
    operatorId: request.user.uuid,
    username: request.user.username,
    firstName: request.user.firstName,
    lastName: request.user.lastName,
    publicKey: request.user.publicKey,
    supportCode: request.user.supportCode,
    email: request.user.email,
  });
});

module.exports = router;
