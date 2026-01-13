# Cars Showroom Test Automation

A comprehensive test automation project for the Cars Showroom application using Playwright, covering both API and UI testing.

## Project Overview

This project contains automated tests for a Cars Showroom application with the following capabilities:
- **API Testing**: End-to-end API validation tests
- **UI Testing**: User interface and user experience testing
- **Test Data Management**: Centralized test data handling
- **Reusable Fixtures**: Custom test fixtures for common setup/teardown operations
- **Page Object Model**: Structured page object pattern for UI tests

## Project Structure

```
CarsShowroom/
├── tests/
│   ├── carsAPI.spec.ts          # API test specifications
│   ├── carsAPISchema.spec.ts    # API schema validation tests
│   ├── carsUI.spec.ts           # UI test specifications
│   ├── data/
│   │   └── testData.ts          # Test data constants
│   ├── fixtures/
│   │   └── fixtures.ts          # Custom Playwright fixtures
│   ├── pages/
│   │   ├── BasePage.ts          # Base page class with common functionality
│   │   ├── CarsPage.ts          # Cars page object model
│   │   └── LoginPage.ts         # Login page object model
│   ├── schemas/
│   │   └── carSchemas.ts        # JSON schemas for API responses
│   └── utils/
│       ├── helpers.ts           # Utility helper functions
│       └── schemaValidator.ts   # Schema validation utility
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Project dependencies
├── playwright-report/            # Test execution reports (generated)
├── test-results/                 # Test results (generated)
└── README.md                      # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CarsShowroom
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/carsAPI.spec.ts
npx playwright test tests/carsUI.spec.ts
```

### Run tests in headed mode (with browser UI)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Viewing Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

The report will open in your default browser displaying detailed test results, screenshots, and traces.

## Project Components

### Test Data (`tests/data/testData.ts`)
Centralized location for all test data constants used across test suites.

### Fixtures (`tests/fixtures/fixtures.ts`)
Custom Playwright fixtures for:
- Common setup and teardown operations
- Shared test context and utilities
- Reusable test infrastructure

### Page Objects (`tests/pages/`)
Implements the Page Object Model pattern:
- **BasePage.ts**: Common methods and functionality shared across all pages
- **LoginPage.ts**: Login page interactions and validations
- **CarsPage.ts**: Cars listing/detail page interactions and validations

### Helpers (`tests/utils/helpers.ts`)
Utility functions for:
- Common assertions
- Data transformation
- API interaction helpers
- UI element interactions

### Schema Validation (`tests/schemas/` & `tests/utils/schemaValidator.ts`)
Contract testing for API responses:
- **carSchemas.ts**: Defines JSON schemas for car objects and responses
- **schemaValidator.ts**: Utility class for validating responses against schemas
- **carsAPISchema.spec.ts**: Comprehensive schema validation tests ensuring API responses match contracts

## Configuration

The `playwright.config.ts` file contains:
- Browser configurations (Chromium, Firefox, WebKit)
- Test timeout settings
- Reporter configurations
- Retry logic for flaky tests
- Screenshot and video capture settings

## Best Practices

- Use the Page Object Model pattern for UI tests
- Keep test data centralized in `testData.ts`
- Leverage fixtures for test setup/teardown
- Use helper functions to reduce code duplication
- Write descriptive test names
- Use meaningful assertions
- **Validate API responses against schemas** to catch breaking changes early
- **Run schema tests early** in your CI/CD pipeline for shift-left testing

## Troubleshooting

### Tests fail to run
- Ensure all dependencies are installed: `npm install`
- Verify Playwright browsers are installed: `npx playwright install`

### Browser compatibility issues
- Check `playwright.config.ts` for browser configuration
- Run specific browser tests to isolate issues

### Timeout errors
- Increase timeout in `playwright.config.ts` if needed
- Check that the application under test is running and accessible

## Contributing

When adding new tests:
1. Follow the existing project structure
2. Use the Page Object Model pattern
3. Add test data to `testData.ts`
4. Utilize existing fixtures and helpers
5. Ensure tests are independent and can run in any order

## License

[Add your license information here]

## Contact

[Add contact information if needed]
