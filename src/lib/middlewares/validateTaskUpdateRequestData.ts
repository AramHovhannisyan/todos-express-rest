import { Request, Response, NextFunction } from 'express';
import { validateTaskUpdateRequest } from '../validators/validateTaskUpdateRequest';

const validateTaskUpdateRequestData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateTaskUpdateRequest(req.body);
  if (error) {
    console.info(error.details);

    return res
      .status(400)
      .json({
        status: 'Fail',
        message: 'Bad request'
      });
  }

  const { id } = req.params;
  const { title, content, status } = req.body;

  res.locals.id = +id;
  res.locals.title = title;
  res.locals.content = content;
  res.locals.status = status;

  return next();
};

export default validateTaskUpdateRequestData;
