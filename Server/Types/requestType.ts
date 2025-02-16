import { Request } from 'express';
import { IUser } from './userType';


export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}


export interface ExtendedAuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        username?: string;
        role?: string;
        isOnline?: boolean;
    };
}


export interface JwtPayload {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
}


export interface AdminAuthRequest extends AuthRequest {
    user: {
        id: string;
        email: string;
        role: 'admin';
    };
}

export interface AuthenticatedRequest extends Request {
    user?: Partial<IUser>;
}