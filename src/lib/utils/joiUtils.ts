import { CustomHelpers, ErrorReport } from 'joi';

// Custom ISBN validation function
const isbnValidator = (value: string, helpers: CustomHelpers): string | ErrorReport => {
  const isbn10Regex = /^(?:\d[\ |-]?){9}[\d|X]$/;
  const isbn13Regex = /^(?:\d[\ |-]?){13}$/;

  // Removing hyphens and spaces
  const cleanedValue = value.replace(/[\ |-]/g, '');

  // ISBN-10 validation
  if (isbn10Regex.test(cleanedValue)) {
    const digits = cleanedValue.split('').map((char) => (char === 'X' ? 10 : parseInt(char, 10)));
    const checksum = digits.reduce((sum, digit, index) => sum + digit * (10 - index), 0);
    if (checksum % 11 === 0) {
      return value;
    } else {
      return helpers.error('isbn.invalidISBN10', { value });
    }
  }

  // ISBN-13 validation
  if (isbn13Regex.test(cleanedValue)) {
    const digits = cleanedValue.split('').map(Number);
    const checksum = digits.reduce((sum, digit, index) => sum + digit * (index % 2 === 0 ? 1 : 3), 0);
    if (checksum % 10 === 0) {
      return value;
    } else {
      return helpers.error('isbn.invalidISBN13', { value });
    }
  }

  // If it doesn't match either format
  return helpers.error('isbn.invalidFormat', { value });
};


export { isbnValidator };
