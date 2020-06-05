import Item from '../infra/prisma/entities/Item';

export default interface IItemsRepository {
    findAll(): Promise<Item[]>;
}
