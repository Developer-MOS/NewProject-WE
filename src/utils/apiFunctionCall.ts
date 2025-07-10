import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { getEnv } from '../config/env';


interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: Record<string, unknown> | FormData;
    headers?: Record<string, string>;
}

interface ErrorResponse {
    message?: string;
}

export const apiCall = async <T>(
    url: string,
    options: ApiOptions = {}
): Promise<ApiResponse<T>> => {
    try {
        const { method = 'GET', body, headers = {} } = options;

        // Check if body is FormData
        const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

        const { apiKey } = getEnv();

        const response: AxiosResponse<T> = await axios({
            url,
            method,
            data: body,
            headers: {
                ...(isFormData
                    ? {} // Don't set Content-Type, browser will handle boundary
                    : { 'Content-Type': 'application/json' }),
                'Authorization': `${apiKey}`,
                ...headers
            }
        });

        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                error: axiosError.response?.data?.message || axiosError.message || 'Something went wrong',
                status: axiosError.response?.status || 500
            };
        }

        return {
            error: error instanceof Error ? error.message : 'Network error',
            status: 500
        };
    }
};