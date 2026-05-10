import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const chatRequestSchema = z.object({
    messages: z
        .array(
            z.object({
                role: z.enum(['user', 'assistant', 'system']),
                content: z.string().min(1).max(8000),
                // === FEATURE: image-upload ===
                imageBase64: z.string().optional(),
                // === END FEATURE: image-upload ===
            })
        )
        .min(1)
        .max(50),
    conversationId: z.string().optional(),
    // === FEATURE: model-selector ===
    model: z.string().optional(),
    // === END FEATURE: model-selector ===
    // === FEATURE: temperature-slider ===
    temperature: z.number().min(0).max(2).optional(),
    // === END FEATURE: temperature-slider ===
});

export function validateChatRequest(req: Request, res: Response, next: NextFunction) {
    const result = chatRequestSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: 'Invalid request', details: result.error.format() });
    }
    req.body = result.data;
    next();
}
