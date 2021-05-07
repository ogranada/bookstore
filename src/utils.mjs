import crypto from 'crypto';

export const encriptString = (str, seed='') => crypto.createHash('sha256').update(str+seed).digest('base64');
