export const ExtractPhoneNumberEG = (phoneNumber: string): string => {
  return phoneNumber.length === 14 ? phoneNumber.replace('+20', '') : phoneNumber.replace('+2', '');
};
