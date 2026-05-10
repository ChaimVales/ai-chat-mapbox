import { Router } from 'express';
import { generateChatResponse, generateChatResponseStream } from '../services/geminiService.js';
import { chatLimiter } from '../middleware/rateLimit.js';
import { validateChatRequest } from '../middleware/validate.js';

const router = Router();

router.post('/chat', chatLimiter, validateChatRequest, async (req, res) => {
    try {
        const { messages, model, temperature } = req.body;
        const reply = await generateChatResponse(messages, { model, temperature });
        res.json({ reply, ts: Date.now() });
    } catch (err: any) {
        console.error('[chat] error:', err);
        res.status(500).json({ error: err?.message || 'Internal error' });
    }
});

router.post('/chat/stream', chatLimiter, validateChatRequest, async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        const { messages, model, temperature } = req.body;
        for await (const chunk of generateChatResponseStream(messages, { model, temperature })) {
            res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        }
        res.write('data: [DONE]\n\n');
        res.end();
    } catch (err: any) {
        console.error('[chat/stream] error:', err);
        res.write(`data: ${JSON.stringify({ error: err?.message || 'Internal error' })}\n\n`);
        res.end();
    }
});

export default router;
