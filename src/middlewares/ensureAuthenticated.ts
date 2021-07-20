import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "67a0722234d07a1f8e243f01b83b27df"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findByEmail(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
