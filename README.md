# Creatio Demo Automation Framework

Playwright + TypeScript automation framework created as a demonstration of UI/API test automation, Page Object Model, test data management, Docker execution, CI/CD and test reporting.

## Tech Stack

* **TypeScript**
* **Playwright**
* **Node.js**
* **REST API testing**
* **Page Object Model (POM)**
* **Playwright Fixtures**
* **Docker**
* **Jenkins**
* **JUnit XML reports**
* **Playwright HTML reports**
* **Git / GitHub**

## Project Structure

```text
creatio_demo_framework/
│
├── api/
│   └── clients/
│       └── UsersClient.ts
│
├── config/
│   └── environment.ts
│
├── data/
│   ├── products.ts
│   └── users.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── pages/
│   ├── BasePage.ts
│   ├── CartPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
│
├── tests/
│   ├── api/
│   │   └── users.spec.ts
│   │
│   └── ui/
│       ├── inventory.spec.ts
│       ├── login.spec.ts
│       └── checkout.spec.ts
│
├── config/
│
├── Dockerfile
├── Jenkinsfile
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

## Test Coverage

### UI

UI tests cover:

* Login
* Invalid login credentials
* Locked out user
* Inventory page
* Product selection
* Product price validation
* Shopping cart
* Checkout
* Required checkout fields
* Validation messages

### API

API tests cover:

* Creating users
* Valid user data
* Invalid email
* Invalid gender
* Missing required fields
* Invalid status
* Unexpected fields
* API response validation
* Response status codes
* Response error messages

## Page Object Model

UI interactions are encapsulated inside page objects.

Example:

```ts
export class InventoryPage extends BasePage {
    private readonly productsTitle: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        super(page);

        this.productsTitle = this.page.getByText('Products');
        this.shoppingCartLink = this.page.locator(
            '[data-test="shopping-cart-link"]'
        );
    }

    async addProductToCart(product: Product): Promise<void> {
        const addToCartButton = this.page.locator(
            `[data-test="${product.testId}"]`
        );

        await addToCartButton.click();
    }
}
```

This keeps test scenarios focused on business behavior rather than selectors and implementation details.

## Fixtures

Playwright fixtures are used to provide reusable page objects and API clients.

For example:

```ts
type Fixtures = {
    loginPage: LoginPage;
    usersClient: UsersClient;
};
```

The API client receives the authentication token through an environment variable instead of storing credentials in the repository.

## Test Data

Test data is separated from test implementation.

Examples include:

* valid users
* invalid users
* locked users
* products
* invalid API payloads

This allows the same test logic to be reused with different data.

## Environment Configuration

Environment-specific configuration is stored separately from test implementation.

```ts
export const environment = {
    uiBaseUrl: 'https://www.saucedemo.com',
    apiBaseUrl: 'https://gorest.co.in/public/v2/',
};
```

Sensitive values such as API tokens are provided through environment variables.

Example:

```powershell
$env:GOREST_TOKEN="YOUR_TOKEN"
```

## Running Tests Locally

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npm test
```

Run API tests:

```bash
npm run test:api
```

Run Chromium UI tests:

```bash
npm run test:chromium
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run Playwright debugger:

```bash
npm run test:debug
```

Open the Playwright HTML report:

```bash
npm run report
```

## Docker

The project can be executed inside a Docker container.

Build the image:

```bash
docker build -t creatio-demo-framework .
```

Run API tests:

```bash
docker run --rm \
    -e GOREST_TOKEN=YOUR_TOKEN \
    creatio-demo-framework \
    npm run test:api
```

The Docker image contains the test execution environment, making test execution independent from the local Node.js/Playwright setup.

## Jenkins CI/CD

The project includes a `Jenkinsfile` that demonstrates CI execution using Docker.

Pipeline flow:

```text
Checkout
   ↓
Build Docker Image
   ↓
API Tests
   ↓
UI Tests
   ↓
JUnit Results
   ↓
Playwright HTML Reports
   ↓
Artifacts
```

API and UI tests are executed as separate pipeline stages.

A failure in the API stage does not prevent the UI stage from running.

```text
API Tests
    │
    ├── PASS ──────┐
    └── FAIL ──────┤
                   ↓
               UI Tests
```

This allows the pipeline to provide the maximum amount of test feedback even when one test suite fails.

## Test Reporting

The pipeline generates two independent Playwright HTML reports:

```text
API Playwright Report
UI Playwright Report
```

JUnit XML results are also published to Jenkins:

```text
api-results/results.xml
ui-results/results.xml
```

Jenkins therefore provides both:

* Playwright detailed HTML reports
* Jenkins JUnit test statistics
* screenshots
* traces
* archived test artifacts

## Failure Investigation

The framework intentionally contains scenarios demonstrating application defects.

For example, Sauce Demo's `problem_user` has a known issue with removing a product from the inventory page.

The test verifies the expected behavior:

```text
Login as problem_user
       ↓
Open Inventory
       ↓
Add product to cart
       ↓
"Remove" button appears
       ↓
Click "Remove"
       ↓
Expected: product removed
Actual: product remains
       ↓
Test fails
       ↓
Screenshot + Playwright report
```

The failure is intentional and demonstrates how the framework captures evidence for failed UI tests.

Screenshots are configured to be captured only when a test fails:

```ts
use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
}
```

## CI Artifacts

Jenkins archives:

```text
API report
UI report
API JUnit results
UI JUnit results
screenshots
test traces
```

This makes it possible to investigate failures after the Docker container has finished.

## Security

Sensitive credentials are not stored in the repository.

The GoRest API token is provided through:

```text
GOREST_TOKEN
```

and Jenkins retrieves it from Jenkins Credentials.

The `.env` file is excluded from version control.

## What This Project Demonstrates

This project demonstrates experience with:

* UI automation using Playwright
* API automation
* TypeScript
* Page Object Model
* Playwright fixtures
* reusable API clients
* test data management
* positive and negative testing
* response validation
* error handling
* screenshots and traces
* Dockerized test execution
* Jenkins CI/CD
* JUnit reporting
* Playwright HTML reporting
* CI artifact management
* handling test failures without stopping subsequent test stages
* secure handling of environment variables and credentials

## Repository

GitHub:

https://github.com/helber-fa/creatio_demo_framework
