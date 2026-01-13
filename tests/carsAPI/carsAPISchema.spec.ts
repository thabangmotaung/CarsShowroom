import { test, expect } from '@playwright/test';
import { SchemaValidator } from '../utils/schemaValidator';
import { carSchema, carsListSchema, singleCarSchema, errorSchema } from '../schemas/carSchemas';

const BASE_URL = 'https://practice.expandtesting.com/api/cars';

test.describe('Cars API Schema Tests', () => {
  test('should validate cars list response against schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    const validation = SchemaValidator.validate(data, carsListSchema);

    expect(validation.isValid).toBeTruthy();
    if (!validation.isValid) {
      console.log('Schema validation errors:', validation.errors);
    }
  });

  test('should validate individual car objects against schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    const cars = await response.json();

    expect(Array.isArray(cars.cars)).toBeTruthy();
    expect(cars.cars.length).toBeGreaterThan(0);

    // Validate each car object
    for (const car of cars.cars) {
      const validation = SchemaValidator.validate(car, carSchema);
      expect(validation.isValid).toBeTruthy();
      
      if (!validation.isValid) {
        console.log(`Car ${car.id} validation errors:`, validation.errors);
      }
    }
  });

  test('should validate specific car response against schema', async ({ request }) => {
    // First get list to get a valid car ID
    const listResponse = await request.get(`${BASE_URL}`);
    const listData = await listResponse.json();

    if (listData.data && listData.data.length > 0) {
      const carId = listData.data[0].id;
      const response = await request.get(`${BASE_URL}/${carId}`);
      expect(response.status()).toBe(200);

      const data = await response.json();
      const validation = SchemaValidator.validate(data, singleCarSchema);

      expect(validation.isValid).toBeTruthy();
      if (!validation.isValid) {
        console.log('Schema validation errors:', validation.errors);
      }
    }
  });

  test('should validate car properties have correct data types', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const car = data.data[0];

      // Validate each property type
      expect(typeof car.id).toBe('string');
      expect(typeof car.brand).toBe('string');
      expect(typeof car.model).toBe('string');
      expect(typeof car.price).toBe('number');

      // Validate price is a valid number
      expect(Number.isFinite(car.price)).toBeTruthy();
      expect(car.price).toBeGreaterThanOrEqual(0);
    }
  });

  test('should validate all required fields are present in cars list', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    const data = await response.json();

    const requiredFields = ['id', 'brand', 'model', 'price'];

    if (data.data && data.data.length > 0) {
      for (const car of data.data) {
        for (const field of requiredFields) {
          expect(car).toHaveProperty(field);
          expect(car[field]).not.toBeNull();
          expect(car[field]).not.toBeUndefined();
        }
      }
    }
  });

  test('should validate response structure consistency', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    const data = await response.json();

    // Validate top-level structure
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBeTruthy();

    // All cars should have same structure
    const firstCar = data.data[0];
    const firstCarKeys = Object.keys(firstCar).sort();

    for (const car of data.data) {
      const carKeys = Object.keys(car).sort();
      expect(carKeys).toEqual(firstCarKeys);
    }
  });

  test('should validate error response structure on invalid request', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/invalid-car-id-12345`);

    // Should return 4xx or 5xx status
    expect(response.status()).toBeGreaterThanOrEqual(400);

    const data = await response.json();

    // If error response has a structure, validate it
    if (data.error || data.message) {
      const validation = SchemaValidator.validate(data, errorSchema);
      expect(validation.isValid).toBeTruthy();
    }
  });

  test('should validate no null or undefined values in required fields', async ({ request }) => {
    const response = await request.get(`${BASE_URL}`);
    const data = await response.json();

    const requiredFields = ['id', 'brand', 'model', 'price'];

    for (const car of data.data) {
      for (const field of requiredFields) {
        expect(car[field]).toBeDefined();
        expect(car[field]).not.toBeNull();

        // Ensure string fields are not empty
        if (typeof car[field] === 'string') {
          expect(car[field].trim().length).toBeGreaterThan(0);
        }
      }
    }
  });
});
