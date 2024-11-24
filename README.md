# TaskMate

TaskMate is a modern task management application built with React and Firebase.

## Tech Stack

- **Frontend Framework:** React.js
- **Styling:** Tailwind CSS
- **Backend/Database:** Firebase
  - Firestore (Database)
  - Firebase Authentication
- **Build Tool:** Vite
- **Language:** JavaScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/SSShogunn/TaskMate
   cd taskmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the root directory and add the following variables:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
   
   You can get these values from your Firebase project settings.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will start running at `http://localhost:5173`

## Features

- User Authentication (Sign up, Login, Logout)
- Create, Read, Update, and Delete tasks
- Real-time updates
- Responsive design
- Loading states and animations

