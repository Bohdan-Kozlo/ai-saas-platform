export type ActionResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  error?: string;
  data?: Record<string, unknown>;
};
