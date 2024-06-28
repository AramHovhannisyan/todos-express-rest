import { Request, Response, NextFunction } from 'express';
import { validateLoginUserBody } from '../validators/validateLoginUserBody';

/**
 * Validate req.body
 * Save body in res.locals
 */
const validateLoginUserData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateLoginUserBody(req.body);
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

  const usernameOrEmail = (username) ? username : email;

  // In case user provided only Email or Username with password
  res.locals.usernameOrEmail = usernameOrEmail;
  res.locals.password = password;

  return next();
};

export default validateLoginUserData;
