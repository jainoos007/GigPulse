export const Messages = {
  AUTH: {
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "User authenticated successfully",
    LOGOUT_SUCCESS: "User logged out successfully",
    REFRESH_SUCCESS: "Access token refreshed successfully",
    INVALID_CREDENTIALS: "Invalid email or password",
    EMAIL_EXISTS: "User with this email already exists",
    UNAUTHORIZED: "Authentication required. Please log in.",
    FORBIDDEN: "Access denied. Insufficient privileges.",
    TOKEN_EXPIRED: "Token has expired",
    TOKEN_INVALID: "Invalid token provided",
    USER_NOT_FOUND: "User account not found",
  },
  COMMON: {
    SERVER_ERROR: "Internal server error occurred",
    NOT_FOUND: "Requested resource not found",
    VALIDATION_ERROR: "Validation failed",
  },
} as const;
