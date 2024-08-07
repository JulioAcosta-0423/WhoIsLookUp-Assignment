# Who Is Look up Backend Laravel 11

This README provides step-by-step instructions to set up and run a Laravel 11 API backend project.

## Prerequisites

Ensure you have the following installed on your system:

- PHP 8.2 or higher
- Composer

## Setup Instructions

1. Navigate to your project directory:
cd who-is-back-end

2. Install PHP dependencies:
composer install

## Running the API

To start the Laravel development server:
php artisan serve
Copy
The API will be available at `http://localhost:8000` you requested 5000 but that's on frontend this is for backend.

## Additional Commands

- To run tests:
php artisan test
Copy
- To clear cache:
php artisan cache:clear
Copy
- To optimize the application:
php artisan optimize

## Troubleshooting

If you encounter any issues, try the following:

1. Clear all caches:
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

2. Regenerate composer autoload files:
composer dump-autoload
