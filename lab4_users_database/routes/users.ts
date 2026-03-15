import { Request, Response, Router } from 'express';

import UserModel from '../models/User';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = new UserModel(req.body);
    const saved = await user.save();
    return res.status(201).json(saved);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages: Record<string, string> = {};
      for (const field of Object.keys(error.errors)) {
        messages[field] = error.errors[field].message;
      }
      return res.status(400).json({ status: false, errors: messages });
    }
    if (error.code === 11000) {
      return res.status(400).json({ status: false, errors: { email: 'Email already exists' } });
    }
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return res.status(500).json({ status: false, message });
  }
});

export default router;
