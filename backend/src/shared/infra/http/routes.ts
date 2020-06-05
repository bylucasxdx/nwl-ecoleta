import express from 'express';

import pointsRoutes from '@modules/points/infra/http/routes/points.routes';
import itemsRoutes from '@modules/items/infra/http/routes/items.routes';

const routes = express.Router();

routes.use('/points', pointsRoutes);
routes.use('/items', itemsRoutes);

export default routes;
