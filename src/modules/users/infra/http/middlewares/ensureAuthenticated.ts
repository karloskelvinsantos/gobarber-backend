import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "@config/auth";
import AppError from "@shared/erros/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing!");
  }

  const [, token] = authHeader.split(" ");

  const { jwt } = authConfig;

  try {
    const tokenDecoded = verify(token, jwt.secret);

    const { sub } = tokenDecoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token!");
  }
}
