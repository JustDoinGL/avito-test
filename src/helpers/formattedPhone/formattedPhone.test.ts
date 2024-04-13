import { formatPhoneNumber } from "./formattedPhone";

describe('formatPhoneNumber', () => {
  test('correctly formats a phone number with non-digit characters', () => {
    const input = '+1 (234) 567-89-90';
    const expectedOutput = '+1 (234) 567-89-90';
    expect(formatPhoneNumber(input)).toBe(expectedOutput);
  });

  test('returns null for a phone number with less than 10 digits', () => {
    const input = '123456789';
    expect(formatPhoneNumber(input)).toBeNull();
  });

  test('returns null for a phone number with more than 10 digits', () => {
    const input = '123456789012';
    expect(formatPhoneNumber(input)).toBeNull();
  });

  test('returns null for an empty string', () => {
    const input = '';
    expect(formatPhoneNumber(input)).toBeNull();
  });

  test('returns null for a string with no digits', () => {
    const input = 'abcdefghij';
    expect(formatPhoneNumber(input)).toBeNull();
  });
});