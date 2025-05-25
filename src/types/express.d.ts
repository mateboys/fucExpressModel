import { Response } from 'express';

declare module 'express' {
  export interface Response {
    success(data?: any, message?: string): Response;
    error(code?: number, message?: string, data?: any): Response;
  }
} 