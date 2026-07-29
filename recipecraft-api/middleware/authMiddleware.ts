import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

interface AuthenticatedRequest extends Request {
 user?: any; // Or a more specific User type if available
}

interface TokenPayload extends JwtPayload {
  id: string;
}

const protect = async (
  req: Request,
  res: Response, // Changed Request to AuthenticatedRequest
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access token is missing",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as TokenPayload;

    const user = await User.findById(decoded.id).select("-password -refreshToken");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    (req as AuthenticatedRequest).user = user; // Cast req to AuthenticatedRequest

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};

export default protect;