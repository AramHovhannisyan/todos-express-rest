import { Request, Response, NextFunction } from 'express';
import { validateRequestIdQueryParams } from '../validators/validateRequestIdQueryParams';

const validateRequestParamId = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateRequestIdQueryParams(req.params);
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

  res.locals.id = +id;

  return next();
};

export default validateRequestParamId;
