import { Request, Response, NextFunction } from "express";
import mongoSanitize from "express-mongo-sanitize";

export const sanitizeMongo = mongoSanitize({
  replaceWith: "_",
  onSanitize: ({ req, key }) => {
    console.warn(`Sanitized key: ${key} in ${req.method} ${req.path}`);
  },
});

export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sanitizeString = (str: string): string => {
    return str
      .replace(/[<>]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "");
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === "string") {
      return sanitizeString(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    if (obj !== null && typeof obj === "object") {
      const sanitized: any = {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };

  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};
