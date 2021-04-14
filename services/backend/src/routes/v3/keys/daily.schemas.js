const config = require('config');
const { z } = require('../../../middlewares/validateSchema');

const keyIdParametersSchema = z.object({
  keyId: z.string(),
});

const rotateSchema = z.object({
  publicKey: z.string().length(88),
  signature: z.string().max(120),
  createdAt: z.number().int().positive(),
  keyId: z
    .number()
    .int()
    .min(0)
    .max(config.get('keys.daily.max') - 1),
  encryptedDailyPrivateKeys: z.array(
    z.object({
      healthDepartmentId: z.string().uuid(),
      data: z.string().length(44),
      iv: z.string().length(24),
      mac: z.string().length(44),
      publicKey: z.string().length(88),
      signature: z.string().max(120),
    })
  ),
});

const rekeySchema = z.object({
  keyId: z
    .number()
    .int()
    .min(0)
    .max(config.get('keys.daily.max') - 1),
  createdAt: z.number().int().positive(),
  encryptedDailyPrivateKeys: z.array(
    z.object({
      healthDepartmentId: z.string().uuid(),
      data: z.string().length(44),
      iv: z.string().length(24),
      mac: z.string().length(44),
      publicKey: z.string().length(88),
      signature: z.string().max(120),
    })
  ),
});

module.exports = {
  keyIdParametersSchema,
  rotateSchema,
  rekeySchema,
};
