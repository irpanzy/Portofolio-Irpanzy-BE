import { Request, Response, NextFunction } from "express";

export const sanitizeMongo = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const sanitizeValue = (value: any): any => {
    if (value && typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.some((key) => key.startsWith("$"))) {
        console.warn(
          `⚠️  Blocked MongoDB operator in ${req.method} ${req.path}`
        );
        const sanitized: any = {};
        for (const key in value) {
          if (!key.startsWith("$")) {
            sanitized[key] = sanitizeValue(value[key]);
          }
        }
        return sanitized;
      }

      const sanitized: any = Array.isArray(value) ? [] : {};
      for (const key in value) {
        sanitized[key] = sanitizeValue(value[key]);
      }
      return sanitized;
    }
    return value;
  };

  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }

  if (req.query && typeof req.query === "object") {
    const sanitizedQuery = sanitizeValue({ ...req.query });
    Object.defineProperty(req, "query", {
      value: sanitizedQuery,
      writable: true,
      configurable: true,
    });
  }

  if (req.params && typeof req.params === "object") {
    req.params = sanitizeValue(req.params);
  }

  next();
};

export const sanitizeInput = (
  req: Request,
  _res: Response,
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

  next();
};
