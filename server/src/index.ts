import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat.js';
import helmet from 'helmet';


const app = express();
const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',');
app.use(helmet());

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
    res.json({ ok: true, ts: Date.now() });
});

app.use('/api', chatRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});