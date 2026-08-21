export interface ErrorWithMessage {
  message: string;
}

// TS 5.x types `catch` variables as `unknown` by default (they used to be `any`).
// This guard/helper pair lets call sites narrow an unknown caught value safely
// instead of assuming it always has a `.message` property.
export const isErrorWithMessage = (
  error: unknown,
): error is ErrorWithMessage =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof (error as Record<string, unknown>).message === 'string';

export const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) {
    return maybeError;
  }

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // e.g. circular references
    return new Error(String(maybeError));
  }
};

export const getErrorMessage = (error: unknown): string =>
  toErrorWithMessage(error).message;
