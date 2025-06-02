import Joi, { type ObjectSchema } from 'joi';

import { type DatabaseConfig, type WireguardConfig } from './interfaces';

export const ENV_VALIDATION: ObjectSchema<DatabaseConfig & WireguardConfig> =
  Joi.object({
    MONGO_USERNAME: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().required(),
    MONGO_HOST: Joi.string().required(),
    MONGO_PORT: Joi.string().required(),

    WIREGUARD_PRIVATE_KEY: Joi.string().required(),
    WIREGUARD_PUBLIC_KEY: Joi.string().required(),
    WIREGUARD_CONFIG_PATH: Joi.string().required(),
    WIREGUARD_SERVER: Joi.string().required(),
  });
