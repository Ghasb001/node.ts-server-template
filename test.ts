import dotenv from 'dotenv';
dotenv.config();

describe('Initial test to confirm that Jest is working', () => {
  test('should be 2', () => {
    expect(1 + 1).toBe(2);
  });
});
