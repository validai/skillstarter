# SkillStarter

SkillStarter is a comprehensive web application designed to allow users the ability to create a open profile on our website, and create portfolio items to showcase their work.

# Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributors](#contributors)
- [License](#license)

# Features

Profile Creation: Create a profile on our site.

Portfolio Item Creation: Create portfolio items on your profile to showcase your work.

Cloudinary Integration: Upload and manage user profiles with images.

Secure Authentication: JWT-based user authentication for a secure experience.

Responsive Design: Optimized for desktop, tablet, and mobile devices.

# Technologies Used

Frontend: React, Vite, CSS (Responsive design with media queries, Figma Dev)

Backend: Node.js, Express.js, PostgreSQL (via Sequelize ORM)

Additional Tools: Cloudinary (Image uploads), SendGrid (Email services), JWT (Authentication)

# Installation

Prerequisites

Node.js installed.

PostgreSQL installed and running.

Steps

1. Clone the repository:

git clone https://github.com/validai/SkillStarter.git

2. Navigate to the project directory:

cd SkillStarter

3. Install dependencies for both frontend and backend:

npm install
cd frontend && npm install

4. Set up the database:

Ensure PostgreSQL is running.

Create a database named SkillStarter-Users or update the .env file with your database settings.

5. Configure environment variables:

Copy .env.example to .env and fill in the required fields.

cp .env.example .env

6. Start the development server:

Backend:

npm run start

Frontend:

cd frontend && npm run dev

# Usage

Open your browser and navigate to the frontend server (e.g., http://localhost:5173).

Register a new account or log in.

Create individual portfolio items to showcase your work.

# Environment Variables

The application requires the following environment variables to run. Add these to your .env file:

1. Database configuration
DATABASE_USE_SSL=false
DATABASE_URL=postgres://<username>:<password>@localhost:5432/SkillStarter-Users
DB_USERNAME=<your_db_username>
DB_PASSWORD=<your_db_password>
DB_DATABASE=<your_db_name>
DB_HOST=127.0.0.1
DB_DIALECT=postgres

2. Cloudinary configuration
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_URL=<your_cloudinary_api_url>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

3. SendGrid configuration
SENDGRID_API_KEY=<your_sendgrid_api_key>

4. JWT configuration
JWT_SECRET=<your_secret_key>

# Deployment

SkillStarter is deployed on Render. You can access the live application at:
https://skillstarter-7ztu.onrender.com/

# Contributors

Maxwell Hurst, Eric Cordoba, Daniel Villavicencio, Jaidon Clinton

# License

This project is licensed under the MIT License.

We hope you find SkillStarter helpful in your career journey! If you have any questions or feedback, feel free to reach out or create an issue in our GitHub repository.
