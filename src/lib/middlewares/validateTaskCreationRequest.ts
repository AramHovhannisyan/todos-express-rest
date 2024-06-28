import { Request, Response, NextFunction } from 'express';
import { validateTaskCreationRequestBody } from '../validators/validateTaskCreationRequestBody';
import { TaskStatus } from '../models/Task';

const validateTaskCreationRequestData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateTaskCreationRequestBody(req.body);
  if (error) {
    console.info(error.details);

    return res
      .status(400)
      .json({
        status: 'Fail',
        message: 'Bad request'
      });
  }

  const { title, content, status } = req.body;

  res.locals.title = title;
  res.locals.content = content;
  res.locals.status = (status) ? status : TaskStatus.PENDING;

  return next();
};

export default validateTaskCreationRequestData;
