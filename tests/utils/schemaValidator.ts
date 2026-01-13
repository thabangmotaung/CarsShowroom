export class SchemaValidator {
  static validate(data: any, schema: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Basic schema validation logic
    if (!schema || typeof schema !== 'object') {
      return { isValid: true, errors: [] };
    }

    // Check required properties
    if (schema.required && Array.isArray(schema.required)) {
      for (const field of schema.required) {
        if (!(field in data)) {
          errors.push(`Missing required field: ${field}`);
        }
      }
    }

    // Check property types if defined in schema
    if (schema.properties && typeof schema.properties === 'object') {
      for (const [key, prop] of Object.entries(schema.properties)) {
        if (key in data && prop && typeof prop === 'object') {
          const propSchema = prop as any;
          const value = data[key];
          
          if (propSchema.type && typeof value !== propSchema.type) {
            errors.push(`Property '${key}' should be ${propSchema.type}, got ${typeof value}`);
          }
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}