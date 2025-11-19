import { rateLimit } from 'express-rate-limit';

export const verifyLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Too many attempts, try again later.",
});