import express, { type Request, type Response } from 'express'; 
import dotenv from 'dotenv'; 
import { connectDB } from './config/db.js';

dotenv.config();

const app = express(); 
app.use(express.json());

connectDB();

app.get('/', (_req: Request, res: Response) => res.send('Fuel Track Botis running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));