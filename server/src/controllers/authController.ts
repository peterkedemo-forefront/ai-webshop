import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const LoginSchema = z.object({
  password: z.string(),
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

export const login: RequestHandler = async (req, res) => {
  try {
    const { password } = LoginSchema.parse(req.body);

    if (!ADMIN_PASSWORD || !JWT_SECRET) {
      res.status(500).json({ message: 'Server misconfiguration' });
      return;
    }

    if (password !== ADMIN_PASSWORD) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: 'Invalid request', errors: err.errors });
      return;
    }
    res.status(400).json({ message: 'Invalid request' });
  }
}; 