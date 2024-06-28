import Joi from 'joi';

const requestIdQueryParams = Joi.object().keys({
  id: Joi.number()
});

const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateRequestIdQueryParams = validator(requestIdQueryParams);