import axios from 'axios';

export interface ApiFieldErrors {
  [field: string]: string;
}

export function parseApiFieldErrors(error: unknown): ApiFieldErrors {
  if (!axios.isAxiosError(error)) return {};
  const data = error.response?.data;
  if (!data) return {};

  const err = data.error;
  if (!err) return {};

  const errors: ApiFieldErrors = {};

  if (err.details && Array.isArray(err.details)) {
    for (const d of err.details) {
      if (d.field && d.message) errors[d.field] = d.message;
    }
    return errors;
  }

  if (typeof err.message === 'string') {
    try {
      const parsed = JSON.parse(err.message);
      if (parsed.errors && Array.isArray(parsed.errors)) {
        for (const e of parsed.errors) {
          if (e.field && e.message) errors[e.field] = e.message;
        }
      } else if (parsed.message) {
        errors._general = parsed.message;
      }
    } catch {
      errors._general = err.message;
    }
  }

  return errors;
}
