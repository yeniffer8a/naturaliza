export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ApiError {
  message: string;
}
