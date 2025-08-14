// Common backend utilities and configurations
export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface JWTPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

export const validateToken = (token: string): boolean => {
  return Boolean(token && token.length > 0);
};

export const createErrorResponse = (message: string, status: number = 400) => {
  return {
    error: message,
    status
  };
};

export const createSuccessResponse = (data: any, message: string = "Success") => {
  return {
    data,
    message,
    success: true
  };
};