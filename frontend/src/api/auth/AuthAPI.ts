import { request } from 'graphql-request';
import { LOGIN, REGISTER } from './AuthMutation';
import { jwtDecode } from 'jwt-decode';


const token = localStorage.getItem('token');
export const fetchURL = (): string => {
    return import.meta.env.VITE_API || ""
}

const endpoint: string = fetchURL();

interface RegisterDto {
    name: string, 
    prename: string, 
    email: string, 
    password: string, 
}

interface JwtTokenPayload {
    email: string,
    exp: number,
    iat: number,
    isActive: boolean,
    role: string,
    sub: string
}

export const login = async (email: string, password: string) => {
    const variables = {
        authInput: {
            email: email,
            password: password
        }
    };

    try {
        const data: any = await request(
            endpoint,
            LOGIN,
            variables
        );
        return data.login.access_token;
    } catch (error:any) {
        console.error("Error logging in: ", error);
        const errorMessage = error.response?.errors?.[0]?.message || 'An unknown error occurred';
        throw new Error(errorMessage);
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const register = async (registerDto: RegisterDto) => {
    const variables = {
        regInput: {
            nume: registerDto.name,
            prenume: registerDto.prename,
            email: registerDto.email,
            password: registerDto.password,
        }
    };

    try {
        await request(
            endpoint,
            REGISTER,
            variables
        );
    } catch (error:any) {
        console.error("Error registering: ", error);
        const errorMessage = error.response?.errors?.[0]?.message || 'An unknown error occurred';
        throw new Error(errorMessage);
    }
}

export const getUserId = () => {
    if (!token) {
        throw new Error("No token found in local storage");
    }


    const decoded: JwtTokenPayload = jwtDecode(token);

    if (decoded.sub !== undefined) {
        return decoded.sub;
    } else {
        throw new Error("No id in the token");
    }

};