import { container } from 'tsyringe';
import { Response, Request } from 'express';

import ItemsRepository from '../../prisma/repositories/ItemsRepository';

export default class ItemsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const itemsRepository = container.resolve(ItemsRepository);

        const items = await itemsRepository.findAll();

        return response.json(items);
    }
}
