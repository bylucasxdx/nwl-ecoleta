import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
    '/uploads',
    express.static(path.resolve(__dirname, '..', '..', '..', 'uploads')),
);

app.listen(3111, () => {
    console.log('Server running on port 3111');
});
