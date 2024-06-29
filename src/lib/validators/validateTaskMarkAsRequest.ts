import JoiBase from 'joi';
import JoiDate from '@joi/date';
import { TaskStatus } from '../types/TaskTypes';

const Joi = JoiBase.extend(JoiDate);

const taskMarkAsRequestBody = Joi.object().keys({
  status: Joi.string().valid(...Object.values(TaskStatus)),
});

const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateTaskMarkAsRequest = validator(taskMarkAsRequestBody);
