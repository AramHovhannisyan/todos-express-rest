import Joi from "joi";
import { RegisterUserRequestType } from '../types/RequestBodyTypes';

// Registration endpoint schema
const RegisterUserRequestSchema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const createUserBodyValidator = (schema: any) => (payload: RegisterUserRequestType) => schema.validate(payload, {
  abortEarly: false,
  allowUnknown: true,
});

const validateCreateUserBody = createUserBodyValidator(RegisterUserRequestSchema);

export { validateCreateUserBody };