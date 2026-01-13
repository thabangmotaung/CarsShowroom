/**
 * Logging utility for API requests and responses
 * Helps with debugging test failures
 */

export class Logger {
  static logRequest(method: string, url: string, data?: any): void {
    console.log(`\n📤 ${method} ${url}`);
    if (data) {
      console.log('   Payload:', JSON.stringify(data, null, 2));
    }
  }

  static logResponse(status: number, data: any, duration?: number): void {
    console.log(`📥 Status: ${status}`);
    console.log('   Response:', JSON.stringify(data, null, 2));
    if (duration) {
      console.log(`   Duration: ${duration}ms`);
    }
  }

  static logError(error: any): void {
    console.error(`❌ Error:`, error.message || JSON.stringify(error, null, 2));
  }

  static logTestStep(step: string): void {
    console.log(`\n▶️  ${step}`);
  }
}