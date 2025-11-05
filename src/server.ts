import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.get('/', (_req: Request, res: Response) => res.send('Fuel Track Botis running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
