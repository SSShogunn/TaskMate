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
   git clone https://github.com/yourusername/taskmate.git
   cd taskmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
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
   # or
   yarn dev
   ```

   The application will start running at `http://localhost:5173`

## Features

- User Authentication (Sign up, Login, Logout)
- Create, Read, Update, and Delete tasks
- Real-time updates
- Responsive design
- Loading states and animations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
