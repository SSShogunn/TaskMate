import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Github } from 'lucide-react';
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css'

export default function App() {
  return (
    <AuthProvider>
      <div className="custom-background">
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </AuthProvider>
  )
}
