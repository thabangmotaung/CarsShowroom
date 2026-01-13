import { test, expect } from '@playwright/test';
import { SchemaValidator } from '../utils/schemaValidator';
import { carSchema, carsListSchema, singleCarSchema, errorSchema } from '../schemas/carSchemas';
import { Logger } from '../utils/logger';



const BASE_URL = process.env.API_BASE_URL || 'https://practice.expandtesting.com/api/cars';

test.describe('Cars API Schema Tests', () => {
  test('should validate cars list response against schema', async ({ request }) => {
    Logger.logTestStep('Validating cars list response against schema');
    Logger.logRequest('GET', BASE_URL);

    const response = await request.get(`${BASE_URL}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    Logger.logResponse(response.status(), data);

    const validation = SchemaValidator.validate(data, carsListSchema);

    expect(validation.isValid).toBeTruthy();
    if (!validation.isValid) {
      console.log('Schema validation errors:', validation.errors);
    }
  });

  test('should validate individual car objects against schema', async ({ request }) => {
    Logger.logTestStep('Validating individual car objects');
    Logger.logRequest('GET', BASE_URL);

    const response = await request.get(`${BASE_URL}`);
    const cars = await response.json();

    Logger.logResponse(response.status(), cars);

    expect(Array.isArray(cars.data)).toBeTruthy();
    expect(cars.data.length).toBeGreaterThan(0);

    for (const car of cars.data) {
      const validation = SchemaValidator.validate(car, carSchema);
      expect(validation.isValid).toBeTruthy();
      
      if (!validation.isValid) {
        console.log(`Car ${car.id} validation errors:`, validation.errors);
      }
    }
  });

  test('should validate specific car response against schema', async ({ request }) => {
    Logger.logTestStep('Getting list to extract car ID');
    Logger.logRequest('GET', BASE_URL);

    const listResponse = await request.get(`${BASE_URL}`);
    const listData = await listResponse.json();

    Logger.logResponse(listResponse.status(), listData);

    if (listData.data && listData.data.length > 0) {
      const carId = listData.data[0].id;
      Logger.logTestStep(`Validating specific car with ID: ${carId}`);
      Logger.logRequest('GET', `${BASE_URL}/${carId}`);

      const response = await request.get(`${BASE_URL}/${carId}`);
      expect(response.status()).toBe(200);

      const data = await response.json();
      Logger.logResponse(response.status(), data);

      const validation = SchemaValidator.validate(data, singleCarSchema);

      expect(validation.isValid).toBeTruthy();
      if (!validation.isValid) {
        console.log('Schema validation errors:', validation.errors);
      }
    }
  });

  test('should validate car properties have correct data types', async ({ request }) => {
    Logger.logTestStep('Validating car property types');
    Logger.logRequest('GET', BASE_URL);

    const response = await request.get(`${BASE_URL}`);
    const data = await response.json();

    Logger.logResponse(response.status(), data);

    if (data.data && data.data.length > 0) {
      const car = data.data[0];

      expect(typeof car.id).toBe('string');
      expect(typeof car.brand).toBe('string');
      expect(typeof car.model).toBe('string');
      expect(typeof car.price).toBe('number');

      expect(Number.isFinite(car.price)).toBeTruthy();
      expect(car.price).toBeGreaterThanOrEqual(0);
    }
  });

  test('should validate all required fields are present in cars list', async ({ request }) => {
    Logger.logTestStep('Validating all required fields');
    Logger.logRequest('GET', BASE_URL);

    const response = await request.get(`${BASE_URL}`);
    const  data = await response.json();

    Logger.logResponse(response.status(), data);

    const requiredFields = ['id', 'brand', 'model', 'price'];

    if (data.cars && data.cars.length > 0) {
      for (const car of data.cars) {
        for (const field of requiredFields) {
          expect(car).toHaveProperty(field);
          expect(car[field]).not.toBeNull();
          expect(car[field]).not.toBeUndefined();
        }
      }
    }
  });

  test('should validate response structure consistency', async ({ request }) => {
    Logger.logTestStep('Validating response structure consistency');
    Logger.logRequest('GET', BASE_URL);

    const response = await request.get(`${BASE_URL}`);
    const cars = await response.json();

    Logger.logResponse(response.status(), cars);

    expect(cars).toHaveProperty('cars');
    expect(Array.isArray(cars.cars)).toBeTruthy();

    if (cars.cars.length > 0) {
      const firstCar = cars.cars[0];
      const firstCarKeys = Object.keys(firstCar).sort();

      for (const car of cars.cars) {
        const carKeys = Object.keys(car).sort();
        expect(carKeys).toEqual(firstCarKeys);
      }
    }
  });

  test('should validate error response structure on invalid request', async ({ request }) => {
    Logger.logTestStep('Testing error handling');
    const invalidUrl = `${BASE_URL}/invalid-car-id-12345`;
    Logger.logRequest('GET', invalidUrl);

    const response = await request.get(invalidUrl);
    const data = await response.json();

    Logger.logResponse(response.status(), data);

    expect(response.status()).toBeGreaterThanOrEqual(400);

    if (data.error || data.message) {
      const validation = SchemaValidator.validate(data, errorSchema);
      expect(validation.isValid).toBeTruthy();
    }
  });

  test('should validate no null or undefined values in required fields', async ({ request }) => {
    Logger.logTestStep('Validating no null/undefined required fields');
    Logger.logRequest('GET', BASE_URL);

    const response = await request.get(`${BASE_URL}`);
    const data = await response.json();

    Logger.logResponse(response.status(), data);

    const requiredFields = ['id', 'brand', 'model', 'price'];

    for (const car of data.cars) {
      for (const field of requiredFields) {
        expect(car[field]).toBeDefined();
        expect(car[field]).not.toBeNull();

        if (typeof car[field] === 'string') {
          expect(car[field].trim().length).toBeGreaterThan(0);
        }
      }
    }
  });
});