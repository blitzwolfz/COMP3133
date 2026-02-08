import { Request, Response, Router } from 'express';

import RestaurantModel from '../models/Restaurant';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const sortBy = req.query.sortBy as string | undefined;

    if (sortBy) {
      const direction = sortBy.toUpperCase() === 'DESC' ? -1 : 1;
      const data = await RestaurantModel.find(
        {},
        { _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 }
      )
        .sort({ restaurant_id: direction })
        .lean();

      return res.json(
        data.map((item) => ({
          id: item._id,
          cuisines: item.cuisine,
          name: item.name,
          city: item.city,
          restaurant_id: item.restaurant_id
        }))
      );
    }

    const data = await RestaurantModel.find({}).lean();
    return res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return res.status(500).json({ message });
  }
});

router.get('/cuisine/:cuisine', async (req: Request, res: Response) => {
  try {
    const data = await RestaurantModel.find({ cuisine: req.params.cuisine }).lean();
    return res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return res.status(500).json({ message });
  }
});

router.get('/Delicatessen', async (_req: Request, res: Response) => {
  try {
    const data = await RestaurantModel.find(
      { cuisine: 'Delicatessen', city: { $ne: 'Brooklyn' } },
      { _id: 0, cuisine: 1, name: 1, city: 1 }
    )
      .sort({ name: 1 })
      .lean();

    return res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return res.status(500).json({ message });
  }
});

export default router;
