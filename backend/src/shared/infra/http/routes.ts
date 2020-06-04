import express from 'express';
import { PrismaClient } from '@prisma/client';

const routes = express.Router();

routes.post('/points', async (req, res) => {
    const { name, email, whatsapp, latitude, longitude, city, uf } = req.body;
    const { items }: { items: number[] } = req.body;

    // const itemConnections = items.map(item => ({
    //     id: item,
    // }));

    const prisma = new PrismaClient();
    await prisma.points.create({
        data: {
            name,
            image:
                'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items: {
                connect: items.map(item => ({ id: item })),
            },
        },
    });

    return res.json({ message: 'ok' });
});

routes.get('/points', async (req, res) => {
    const prisma = new PrismaClient();
    const points = await prisma.points.findMany();

    return res.json(points);
});

routes.get('/', async (req, res) => {
    const prisma = new PrismaClient();
    const points = await prisma.points.findMany();

    return res.json({ message: 'ok', points });
});

export default routes;
