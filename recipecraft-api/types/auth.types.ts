import type {
  Request,
} from "express";

import type { IUser }
  from "../types/user.types";

export interface AuthenticatedRequest<
  TBody = any
> extends Request {
  user?: IUser;
  body: TBody;
}