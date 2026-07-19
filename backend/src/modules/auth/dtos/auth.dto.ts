// Register DTO
export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Login DTO
export interface LoginDto {
  email: string;
  password: string;
}

// Forgot Password DTO
export interface ForgotPasswordDto {
  email: string;
}

// Reset Password DTO
export interface ResetPasswordDto {
  token: string;
  password: string;
  confirmPassword: string;
}

// Change Password DTO
export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Refresh Token DTO
export interface RefreshTokenDto {
  refreshToken: string;
}

// Verify Email DTO
export interface VerifyEmailDto {
  token: string;
}

// Auth Response DTO
export interface AuthResponseDto {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isEmailVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

// Token Response DTO
export interface TokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

// Message Response DTO
export interface MessageResponseDto {
  message: string;
}

// Current User Response DTO
export interface CurrentUserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}