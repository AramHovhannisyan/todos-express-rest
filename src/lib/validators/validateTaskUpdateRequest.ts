import JoiBase from 'joi';
import JoiDate from '@joi/date';
import { TaskStatus } from '../models/Task';

const Joi = JoiBase.extend(JoiDate);

const taskRequestBody = Joi.object().keys({
  title: Joi.string(),
  content: Joi.string(),
  status: Joi.string().valid(...Object.values(TaskStatus)),
}).or('title', 'content', 'status').required().min(1);

const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateTaskUpdateRequest = validator(taskRequestBody);
