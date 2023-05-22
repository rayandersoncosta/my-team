export interface LoginFormState {
  isAuthenticated: boolean;
  loading: boolean;
  token: string;
  error?: LoadTimezonesErrorType | null;
}

export const enum LoadTimezonesErrorType {
  INVALID_TOKEN = 1,
}
