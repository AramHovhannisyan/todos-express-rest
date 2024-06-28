import JoiBase from 'joi';
import JoiDate from '@joi/date';
import { TaskStatus } from '../models/Task';

const Joi = JoiBase.extend(JoiDate);

const createTaskRequestBody = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  status: Joi.string().valid(...Object.values(TaskStatus)),
});

const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateTaskCreationRequestBody = validator(createTaskRequestBody);
