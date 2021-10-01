const config = require('config');
const { z } = require('../../utils/validation');

const getSchema = z.object({
  completed: z.enum(['true', 'false']).optional(),
  deleted: z.enum(['true', 'false']).optional(),
});

const createSchema = z.object({
  locations: z
    .array(
      z.object({
        time: z.array(z.unixTimestamp()).length(2),
        locationId: z.uuid(),
      })
    )
    .nonempty()
    .max(config.get('luca.locationTransfers.maxLocations')),
  userTransferId: z.uuid().optional(),
  lang: z.supportedLanguage(),
});

const sendSchema = z.object({
  traces: z.array(
    z.object({
      traceId: z.traceId(),
      isHDEncrypted: z.boolean().optional(),
      data: z.base64({ rawLength: 32 }).or(
        z.object({
          data: z.base64({ max: 44 }),
          publicKey: z.ecPublicKey(),
          mac: z.mac(),
          iv: z.iv(),
        })
      ),
      publicKey: z.ecCompressedPublicKey(),
      keyId: z.dailyKeyId(),
      version: z.number().int().optional(),
      verification: z.base64({ rawLength: 8 }),
      additionalData: z
        .object({
          data: z.base64({ max: 1024 }),
          publicKey: z.ecPublicKey(),
          mac: z.mac(),
          iv: z.iv(),
        })
        .optional()
        .nullable(),
    })
  ),
});

const transferIdParametersSchema = z.object({
  transferId: z.uuid(),
});

module.exports = {
  createSchema,
  getSchema,
  sendSchema,
  transferIdParametersSchema,
};
