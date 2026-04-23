# azeti Working Student Code Challenge – Submission

This repository contains my solution for the azeti Working Student Code Challenge.

## Completed Tasks

### 1. Fixed the Failing Test
- Investigated the failing login scenario
- Corrected the incorrect assertion in the Playwright BDD step definition
- Both login scenarios now pass

### 2. Added New E2E Coverage (Products)
Implemented Playwright + playwright-bdd tests for:

- Add a new product successfully
- Cancel adding a product
- Validate GET /products API request
- Required field validation
- Verify product appears in the list

### 3. Added CI Pipeline (GitHub Actions)

Runs on:
- Push to main
- Pull requests to main

Jobs:
- Lint (`npm run lint`)
- E2E Tests (`npm run test:e2e`)

Includes:
- Node.js setup
- Playwright browser install
- Browser caching
- Artifact upload for Playwright reports

---





# Product Admin Dashboard

A comprehensive administration tool for managing users and products, built with a modern React stack.

## Features

- **React & Vite**: Modern frontend setup with TypeScript.
- **MUI (Material UI)**: Premium UI components and a responsive layout.
- **Orval & MSW**: Automated API client generation and network mocking.
- **Vitest**: Unit testing setup to ensure component reliability.
- **Playwright**: E2E testing setup for critical user flows.

## Project Structure

- `src/layout`: Contains the Layout component with a responsive sidebar.
- `src/pages`: Contains the core application pages: Login, Dashboard, Users, Products, and Settings.
- `src/api`: Contains the Orval-generated API client.
- `src/mocks`: Contains the MSW worker and mock handlers for offline development.
- `src/theme`: Contains the MUI theme configuration.
- `e2e`: Contains Playwright E2E tests.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run the development server**:
    ```bash
    npm run dev
    ```
3.  **Run unit tests**:
    ```bash
    npm test
    ```
4.  **Run E2E tests**:
    ```bash
    npm run test:e2e
    ```

## Development and Testing

### Data-Test Attributes
Our core UI components and forms utilize `data-testid` attributes to provide resilient selectors for Playwright tests.
Examples include:
- `add-user-button`, `user-name-input`, `user-email-input`, `save-user-button`
- `add-product-button`, `product-name-input`, `product-price-input`, `save-product-button`

### Adding New Features
To add new endpoints:
1. Update `openapi.yaml`.
2. Run `npm run orval` to regenerate the TypeScript client and models.
3. Update `src/mocks` if you need mock responses during development.
