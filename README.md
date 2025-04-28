# AI Content Feedback Tool

A web application that provides (almost) AI-powered feedback on content submissions. Built with Laravel, React, and TypeScript, this tool demonstrates Sentry integration for error monitoring, tracing, and session replays.

## Features

- Content analysis for different types of content (blog posts, emails, product descriptions, social media)
- Multiple analysis options:
    - Tone analysis
    - Grammar check
    - SEO recommendations
    - Readability assessment
- Real-time feedback with visual indicators
- Sentry integration for:
    - Error monitoring
    - Performance tracing
    - Session replay
    - User interaction tracking

## Tech Stack

- **Backend**: Laravel (PHP)
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Error Monitoring**: Sentry
- **Build Tool**: Vite

## Prerequisites

- PHP 8.1 or higher
- Node.js 16 or higher
- Composer
- npm or yarn
- Sentry account

## Setup Instructions

1. **Clone the repository**

    ```bash
    git clone [repository-url]
    cd [project-directory]
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install JavaScript dependencies**

    ```bash
    npm install
    ```

4. **Set up environment variables**

    ```bash
    cp .env.example .env
    ```

    Then edit `.env` and add your Sentry DSN:

    ```
    SENTRY_LARAVEL_DSN=your-sentry-dsn-here
    ```

5. **Generate application key**

    ```bash
    php artisan key:generate
    ```

6. **Run database migrations**

    ```bash
    php artisan migrate
    ```

7. **Start the development server**

    ```bash
    # Terminal 1 - Laravel server
    php artisan serve

    # Terminal 2 - Vite development server
    npm run dev
    ```

8. **Visit the application**
   Open your browser and navigate to `http://localhost:8000`

## Sentry Integration

The application is configured with Sentry for:

- Error tracking
- Performance monitoring
- Session replay
- User interaction tracing

To test Sentry integration:

1. Submit content through the form
2. Use the "Error Testing" section to trigger different types of errors
3. Check your Sentry dashboard to see the captured errors and performance data

## Development

- **Frontend**: The React components are in `resources/js/pages/`
- **Backend**: Controllers are in `app/Http/Controllers/`
- **Services**: Business logic is in `app/Services/`

## Testing

```bash
# Run PHP tests
php artisan test

# Run frontend tests
npm run test
```
