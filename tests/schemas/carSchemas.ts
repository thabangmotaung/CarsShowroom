/**
 * JSON Schemas for Cars API responses
 * Used for contract testing to ensure API responses match expected structure
 */

export const carSchema = {
  type: 'object',
  required: ['id', 'brand', 'model', 'price'],
  properties: {
    id: {
      type: 'string',
      description: 'Unique car identifier',
    },
    brand: {
      type: 'string',
      description: 'Car brand/manufacturer',
    },
    model: {
      type: 'string',
      description: 'Car model name',
    },
    price: {
      type: 'number',
      description: 'Car price',
      minimum: 0,
    },
  },
  additionalProperties: true,
};

export const carsListSchema = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'array',
      items: carSchema,
      minItems: 1,
      description: 'Array of cars',
    },
  },
  additionalProperties: true,
};

export const singleCarSchema = {
  type: 'object',
  required: ['data'],
  properties: {
    data: carSchema,
  },
  additionalProperties: true,
};

export const errorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'Error message',
    },
    message: {
      type: 'string',
      description: 'Error description',
    },
  },
};
