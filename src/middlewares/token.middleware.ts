import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface JwtPayloadData extends JwtPayload {
  data: {
    id: number;
    password: string;
  }
}

const jwtSecret = process.env.JWT_SECRET || 'segredo';
const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validToken = (token: string): boolean => {
  try {
    const userId = (jwt.verify(token, jwtSecret) as JwtPayloadData).data.id;
    return Boolean(userId);
  } catch (err) {
    return false;
  }
};

function getUserIdByToken(token: string) {
  return (jwt.verify(token, jwtSecret) as JwtPayloadData).data.id;
}

function authValidation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const isValidToken = validToken(token);

  if (!isValidToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
}

export {
  jwtSecret,
  jwtConfig,
  authValidation,
  getUserIdByToken,
};
