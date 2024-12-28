export const logError = (error: unknown): void => {
  if (process.env.NODE_ENV !== 'development') return;
  console.error(error);
};
