# COMP3133 Lab 03 - MongoDB and Mongoose (TypeScript)

## Project Name
lab3_restaurant_database

## Setup
1. Install dependencies:
   npm install
2. Copy environment file:
   copy .env.example .env
3. Update `MONGODB_URI` in `.env` for your MongoDB Atlas/local database.
4. Seed data:
   npm run seed
5. Run in development:
   npm run dev

## Production Run
1. Build TypeScript:
   npm run build
2. Start compiled app:
   npm start

## Base URL
http://localhost:3000

## APIs
1. Get all restaurant details:
   GET /restaurants

2. Get all restaurant details by cuisine:
   GET /restaurants/cuisine/Japanese
   GET /restaurants/cuisine/Bakery
   GET /restaurants/cuisine/Italian

3. Get selected columns sorted by `restaurant_id`:
   GET /restaurants?sortBy=ASC
   GET /restaurants?sortBy=DESC

4. Get Delicatessen restaurants where city is not Brooklyn:
   GET /restaurants/Delicatessen

## Notes
- `GET /restaurants?sortBy=...` returns: `id`, `cuisines`, `name`, `city`, `restaurant_id`.
- `GET /restaurants/Delicatessen` returns: `cuisine`, `name`, `city` (without `id`).
