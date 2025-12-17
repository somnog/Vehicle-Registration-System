# Vehicle Registration System

The Vehicle Registration System enables citizens to register their vehicles online and allows government officials to approve or reject registration requests. This system supports **SDG 9 (Industry, Innovation, and Infrastructure)** by digitizing vehicle registration processes and reducing bureaucratic delays.

## 🚀 Key Features

*   **User Registration & Login**: Secure account creation for citizens and admins.
*   **Vehicle Registration Submission**: Easy submission of vehicle details (plate number, make, model, owner info).
*   **Admin Approval Workflow**: Admins can review, approve, or reject pending registrations.
*   **Status Tracking**: Citizens can track the status of their registration requests in real-time.

## 🛠️ Technology Stack

This project follows a modern, scalable architecture:

*   **Frontend**: Next.js (React framework) with Ant Design for UI.
*   **Backend**: NestJS (Node.js framework) for a robust REST API.
*   **Database**: PostgreSQL with Prisma ORM.
*   **Containerization**: Docker & Docker Compose.

### High-Level Architecture
1.  **Next.js Frontend**: Handles user forms and dashboards.
2.  **NestJS REST API**: Manages requests, validation, and business logic.
3.  **Prisma ORM**: Interacts with the database.
4.  **PostgreSQL**: Stores persistent data.

**Data Flow Example**:
User submits form -> `POST /api/registrations` -> NestJS Service validates -> Prisma creates record -> Response returned with ID.

## 📂 Database Design

### Core Entities
*   **User**: Stores accounts (Citizens, Admins).
*   **VehicleRegistration**: Tracks registration requests and status.
*   **Vehicle**: Stores physical vehicle details.
*   **Owner**: Stores owner personal information.

### Relationships
*   `User` (1) ↔ (N) `VehicleRegistration`
*   `VehicleRegistration` (1) ↔ (1) `Vehicle`
*   `VehicleRegistration` (1) ↔ (1) `Owner`

## 🏁 Quick Start

### Prerequisites
*   Node.js & npm
*   Docker & Docker Compose

### Running the Application

1.  **Start the Database**:
    ```bash
    docker-compose up -d
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    # Ensure your .env file is configured with DATABASE_URL
    npx prisma migrate dev
    npm run start:dev
    ```

3.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

The frontend will typically run on `http://localhost:3000` and the backend on `http://localhost:3000` (or configured port).

## 📡 API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register new user | Public |
| `POST` | `/auth/login` | Login user | Public |
| `POST` | `/registrations` | Submit vehicle registration | Citizen |
| `GET` | `/registrations` | List registrations | Citizen/Admin |
| `GET` | `/registrations/:id` | Get registration details | Citizen/Admin |
| `PATCH` | `/registrations/:id/status` | Approve/reject registration | Admin |

## 🏗️ Implementation Roadmap

This project implementation is divided into three main phases:
1.  **Day 1**: Foundation, Database Setup, and Prisma Configuration.
2.  **Day 2**: Backend API Development (Auth, Registration, Validation).
3.  **Day 3**: Frontend Development, Integration, and Deployment.