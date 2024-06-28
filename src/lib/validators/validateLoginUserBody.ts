import Joi from "joi";
import { LoginUserRequestType } from "../types/LoginUserRequestType";

// Login endpoint schema requires email or username
const LoginUserRequestSchema = Joi.alternatives().try(
  Joi.object().keys({
    username: Joi.string().allow(''),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
  Joi.object().keys({
    username: Joi.string().min(4).required(),
    email: Joi.string().allow(''),
    password: Joi.string().min(4).required(),
  })
);

const loginEndpointValidator = (schema: any) => (payload: LoginUserRequestType) => schema.validate(payload, {
  abortEarly: false,
  allowUnknown: true,
});

const validateLoginUserBody = loginEndpointValidator(LoginUserRequestSchema);

export { validateLoginUserBody };