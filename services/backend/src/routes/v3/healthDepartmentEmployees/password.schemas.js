const {
  z,
  passwordMeetsCriteria,
} = require('../../../middlewares/validateSchema');

const changePasswordSchema = z.object({
  currentPassword: z.string().max(255),
  newPassword: z.string().refine(password => passwordMeetsCriteria(password)),
});

module.exports = {
  changePasswordSchema,
};
