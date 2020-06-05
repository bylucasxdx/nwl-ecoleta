import Point from '../infra/prisma/entities/Point';
import ICreatePointDTO from '../dtos/ICreatePointDTO';
import IFiltersPointDTO from '../dtos/IFiltersPointDTO';

export default interface IPointsRepository {
    findById(id: number): Promise<Point | null>;
    findAll(): Promise<Point[]>;
    findAllByFilters(filters: IFiltersPointDTO): Promise<Point[]>;
    create(point: ICreatePointDTO): Promise<Point>;
}
