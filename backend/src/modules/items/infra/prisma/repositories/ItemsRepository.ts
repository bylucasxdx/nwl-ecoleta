import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import Item from '../entities/Item';

@injectable()
export default class ItemsRepository implements IItemsRepository {
    constructor(
        @inject('PrismaClient')
        private ormRepository: PrismaClient,
    ) {}

    public async findAll(): Promise<Item[]> {
        const items = await this.ormRepository.item.findMany();

        return items.map(item => ({
            id: item.id,
            image: `http://localhost:3111/uploads/${item.image}`,
            title: item.title,
        }));
    }
}
