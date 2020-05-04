export const ResetDateTime = (dateString: string): string => {
  const date = new Date(dateString).setUTCHours(0, 0, 0, 0);
  return new Date(date).toISOString();
};
