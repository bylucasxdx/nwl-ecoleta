import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePointService from '@modules/points/services/CreatePointService';
import PointsRepository from '../../prisma/repositories/PointsRepository';

export default class PointsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { uf, city, items } = request.query;

        const pointsRepository = container.resolve(PointsRepository);

        const points = await pointsRepository.findAllByFilters({
            uf: String(uf),
            city: String(city),
            items: String(items),
        });

        return response.json(points);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const pointsRepository = container.resolve(PointsRepository);
        const point = await pointsRepository.findById(parseInt(id, 0));

        if (!point) {
            return response.status(404).json('Point not found');
        }

        return response.json(point);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            image,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        } = request.body;

        const { items }: { items: number[] } = request.body;

        const data = {
            name,
            image,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        };

        const createPoint = container.resolve(CreatePointService);

        const point = await createPoint.execute(data);

        return response.json(point);
    }
}
