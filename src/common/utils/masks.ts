export const numberMask = (value: string) => {
  // Remove any non-digit characters
  return value.replace(/\D/g, '');
}; 