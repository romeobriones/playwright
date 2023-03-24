FROM mcr.microsoft.com/playwright:v1.27.0-focal

USER root

COPY . ./e2e

WORKDIR /e2e

# Install dependencies
RUN npm install

# Install browsers
RUN npx playwright install
