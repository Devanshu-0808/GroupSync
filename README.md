# GroupSync
![Landing Page](https://github.com/user-attachments/assets/899154ed-3a18-475a-99d1-bf51bea7ef72)
![Image](https://github.com/user-attachments/assets/de516713-13f5-4ddf-89bf-c1e27f86d05e)
![Image](https://github.com/user-attachments/assets/e5b5f382-4f4b-40a4-b9f2-cd9df3e8ffa3)

## Features

- User authentication (login and sign-up)
- Play music from in a Group
- Songs will be played according to the highest to lowest votes song in queue
- Responsive design
- Toast notifications

## Technologies Used

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Toastify

### Backend

- Spring Boot
- Spring Data JPA
- MySQL
- Jsoup
- WebSockets

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Java 21
- Maven

### Installation

#### Frontend

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/music-player.git
   cd music-player
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your API URL:

   ```sh
   VITE_API_URL=https://your-api-url.com
   ```

#### Backend

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Create a `.env` file in the backend directory and add your database and frontend URL configurations:

   ```sh
   DATASOURCE_URL=""
   DATASOURCE_USER=""
   DATASOURCE_PASSWORD=""
   FRONTEND_URL=""
   ```

3. Install dependencies and build the project:

   ```sh
   mvn clean install
   ```

### Running the Application

#### Frontend

1. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:5173`.

#### Backend

1. Start the Spring Boot application:

   ```sh
   mvn spring-boot:run
   ```

### Building for Production

#### Frontend

1. Build the application:

   ```sh
   npm run build
   # or
   yarn build
   ```

2. Preview the production build:

   ```sh
   npm run preview
   # or
   yarn preview
   ```

#### Backend

1. Build the Spring Boot application:

   ```sh
   mvn clean package
   ```

2. The built JAR file will be located in the `target` directory.

### Deployment

Deploy the application to your preferred hosting service.

For Frontend - Vercel

For Backend - Railway
