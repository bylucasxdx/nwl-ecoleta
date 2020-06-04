import { Request, Response } from 'express';

export default class PointsController {
    public async create(request: Request, response: Response): Promise<any> {
        return response.json({});
    }
}
