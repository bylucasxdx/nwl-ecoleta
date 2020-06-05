import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import PointsRepository from '@modules/points/infra/prisma/repositories/PointsRepository';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ItemsRepository from '@modules/items/infra/prisma/repositories/ItemsRepository';

container.registerInstance('PrismaClient', new PrismaClient());

container.registerSingleton<IPointsRepository>(
    'PointsRepository',
    PointsRepository,
);

container.registerSingleton<IItemsRepository>(
    'ItemsRepository',
    ItemsRepository,
);
