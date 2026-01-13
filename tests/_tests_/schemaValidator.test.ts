import { SchemaValidator } from '../utils/schemaValidator';

describe('SchemaValidator', () => {
  describe('validate', () => {
    it('should return isValid true for valid data against schema', () => {
      const schema = {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' }
        }
      };
      const data = { id: '1', name: 'Test' };

      const result = SchemaValidator.validate(data, schema);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return isValid false when required field is missing', () => {
      const schema = {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' }
        }
      };
      const data = { id: '1' };

      const result = SchemaValidator.validate(data, schema);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Missing required field: name');
    });

    it('should catch type mismatch errors', () => {
      const schema = {
        type: 'object',
        required: ['price'],
        properties: {
          price: { type: 'number' }
        }
      };
      const data = { price: 'not a number' };

      const result = SchemaValidator.validate(data, schema);

      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('should be number');
    });

    it('should return empty errors for null schema', () => {
      const data = { test: 'value' };

      const result = SchemaValidator.validate(data, null);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate multiple properties', () => {
      const schema = {
        type: 'object',
        required: ['id', 'brand', 'model', 'price'],
        properties: {
          id: { type: 'string' },
          brand: { type: 'string' },
          model: { type: 'string' },
          price: { type: 'number' }
        }
      };
      const data = {
        id: '123',
        brand: 'Toyota',
        model: 'Camry',
        price: 25000
      };

      const result = SchemaValidator.validate(data, schema);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});