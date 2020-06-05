import { inject, injectable } from 'tsyringe';
import { PrismaClient, PointCreateInput } from '@prisma/client';

import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import ICreatePointDTO from '@modules/points/dtos/ICreatePointDTO';
import IFiltersPointDTO from '@modules/points/dtos/IFiltersPointDTO';
import Point from '../entities/Point';

@injectable()
export default class PointsRepository implements IPointsRepository {
    constructor(
        @inject('PrismaClient')
        private ormRepository: PrismaClient,
    ) {}

    public async findById(id: number): Promise<Point | null> {
        const point = await this.ormRepository.point.findOne({
            where: {
                id,
            },
            include: {
                items: true,
            },
        });

        return point;
    }

    public async findAll(): Promise<Point[]> {
        return this.ormRepository.point.findMany({
            include: {
                items: true,
            },
        });
    }

    public async findAllByFilters({
        city,
        uf,
        items,
    }: IFiltersPointDTO): Promise<Point[]> {
        const itemsIds = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        return this.ormRepository.point.findMany({
            where: {
                city,
                uf,
                items: {
                    some: {
                        id: {
                            in: itemsIds,
                        },
                    },
                },
            },
            include: {
                items: true,
            },
        });
    }

    public async create({ items, ...data }: ICreatePointDTO): Promise<Point> {
        const preparedData: PointCreateInput = data;

        if (items) {
            preparedData.items = {
                connect: items.map(item => ({ id: item })),
            };
        }

        const point = await this.ormRepository.point.create({
            data: preparedData,
            include: {
                items: true,
            },
        });

        return point;
    }
}
