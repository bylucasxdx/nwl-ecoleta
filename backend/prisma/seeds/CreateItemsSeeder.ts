import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async (): Promise<void> => {
    const items = [
        { id: 1, title: 'Pilhas e baterias', image: 'baterias.svg' },
        { id: 2, title: 'Papeís e papelão', image: 'papeis-papelao.svg' },
        { id: 3, title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
        { id: 4, title: 'Resíduos Organicos', image: 'organicos.svg' },
        { id: 5, title: 'Óleo de Cozinha', image: 'oleo.svg' },
        { id: 6, title: 'Lâmpadas', image: 'lampadas.svg' },
    ];

    await Promise.all(
        items.map(async item => {
            await prisma.item.upsert({
                create: { title: item.title, image: item.image },
                update: { title: item.title, image: item.image },
                where: {
                    id: item.id,
                },
            });
        }),
    );
};

seed()
    .catch(err => {
        throw err;
    })
    .finally(() => {
        prisma.disconnect();
    });
