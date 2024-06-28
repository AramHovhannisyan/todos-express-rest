import { Request, Response, NextFunction } from 'express';
import { validateCreateUserBody } from '../validators/validateCreateUserBody';

/**
 * Validate req.body
 * Save body in res.locals
 */
const validateCreateUserData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateCreateUserBody(req.body);
  if (error) {
    console.info(error.details);

    return res
      .status(400)
      .json({
        status: 'Fail',
        message: 'Bad request'
      });
  }

  const { username, email, password } = req.body;

  res.locals.username = username;
  res.locals.email = email;
  res.locals.password = password;

  return next();
};

export default validateCreateUserData;
