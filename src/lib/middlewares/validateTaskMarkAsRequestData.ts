import { Request, Response, NextFunction } from 'express';
import { validateTaskMarkAsRequest } from '../validators/validateTaskMarkAsRequest';

const validateTaskMarkAsRequestData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateTaskMarkAsRequest(req.params);
  if (error) {
    console.info(error.details);

    return res
      .status(400)
      .json({
        status: 'Fail',
        message: 'Bad request'
      });
  }

  const { status } = req.params;

  res.locals.status = status;

  return next();
};

export default validateTaskMarkAsRequestData;
