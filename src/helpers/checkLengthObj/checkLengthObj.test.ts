import { checkLength } from "./checkLengthObj";

describe('checkLength', () => {
  test('returns true for objects with non-empty strings', () => {
    const object = {
      prop1: 'value1',
      prop2: 'value2',
    };
    expect(checkLength(object)).toBe(true);
  });

  test('returns false for objects with at least one empty string', () => {
    const object = {
      prop1: 'value1',
      prop2: '',
    };
    expect(checkLength(object)).toBe(false);
  });

  test('returns true for nested objects with non-empty strings', () => {
    const object = {
      prop1: { nestedProp1: 'nestedValue1' },
      prop2: { nestedProp2: 'nestedValue2', nestedProp3: 'nestedValue3' },
    };
    expect(checkLength(object)).toBe(true);
  });

  test('returns true for nested objects with at least one empty string', () => {
    const object = {
      prop1: { nestedProp1: 'nestedValue1' },
      prop2: { nestedProp2: 'nestedValue2', nestedProp3: '' },
    };
    expect(checkLength(object)).toBe(true);
  });

  test('returns true for objects without string properties', () => {
    const object = {
      prop1: 100,
      prop2: true,
      prop3: { nestedProp1: 200 },
    };
    expect(checkLength(object)).toBe(true);
  });

  test('returns true for empty objects', () => {
    const object = {};
    expect(checkLength(object)).toBe(true);
  });

  test('returns true for objects with null properties', () => {
    const object = {
      prop1: null,
      prop2: { nestedProp1: null },
    };
    expect(checkLength(object)).toBe(true);
  });
});