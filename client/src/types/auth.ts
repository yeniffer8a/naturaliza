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

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  city: string;
  postCode: string;
  password: string;
  confirmPassword: string;
}

export interface ApiError {
  message: string;
}
