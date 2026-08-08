export interface ApiError {
    message: string;
}

export interface ValidationError {
    field: string;
    message: string;
}