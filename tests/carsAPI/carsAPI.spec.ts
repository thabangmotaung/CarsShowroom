import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practice.expandtesting.com/api/cars';

test.describe('Cars API Tests', () => {
  test('should get all cars', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('cars');
    expect(Array.isArray(data.cars)).toBeTruthy();
  });

  test('should verify cars response structure', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    const data = await response.json();
    
    if (data.data.length > 0) {
      const car = data.data[0];
      expect(car).toHaveProperty('id');
      expect(car).toHaveProperty('brand');
      expect(car).toHaveProperty('model');
      expect(car).toHaveProperty('price');
    }
  });

  test('should get specific car by id', async ({ request }) => {
    const listResponse = await request.get(`${BASE_URL}`);
    const cars = await listResponse.json();
    
    if (cars.length > 0) {
      const carId = cars[0].id;
      const response = await request.get(`${BASE_URL}/${carId}`);
      expect(response.status()).toBe(200);
      const car = await response.json();
      expect(car).toHaveProperty('cars');
    }
  });

  test('should verify response headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('should handle invalid car id', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/invalid-id`);
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('should verify cars list is not empty', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    const data = await response.json();
    expect(data.data.length).toBeGreaterThan(0);
  });

  test('should verify car properties have correct types', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    const cars = await response.json();
    
    if (cars.length > 0) {
      const car = cars[0];
      expect(typeof car.id).toBe('string');
      expect(typeof car.brand).toBe('string');
      expect(typeof car.model).toBe('string');
      expect(typeof car.price).toBe('number');
    }
  });
});