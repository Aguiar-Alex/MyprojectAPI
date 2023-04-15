import AppError from '@shared/http/errors/AppErrors';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import authConfing from '@config/auth';

interface ItokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfing.jwt.secret);

    const { sub } = decodedToken as ItokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
