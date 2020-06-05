import { injectable, inject } from 'tsyringe';

import IPointsRepository from '../repositories/IPointsRepository';
import ICreatePointDTO from '../dtos/ICreatePointDTO';
import Point from '../infra/prisma/entities/Point';

@injectable()
export default class CreatePointService {
    constructor(
        @inject('PointsRepository')
        private pointsRepository: IPointsRepository,
    ) {}

    public async execute(data: ICreatePointDTO): Promise<Point> {
        const point = await this.pointsRepository.create(data);

        return point;
    }
}
