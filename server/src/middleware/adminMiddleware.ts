import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './jwtMiddleware';

export const adminMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: 'Admin access required' });
    return;
  }
  next();
}; 