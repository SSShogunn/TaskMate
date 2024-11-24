'use client'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../config/firebase"
import toast from 'react-hot-toast'


const SignUpPage = () => {
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('');
    const [match, setMatch] = useState(true);
    const [error, setError] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        if (password1 != password2) {
            setMatch(false);
        } else {
            setMatch(true);
        }
    }, [password1, password2]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!match) {
            toast.error('Passwords do not match');
            return;
        }
        
        createUserWithEmailAndPassword(auth, email, password1)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success('Account created successfully!');
                navigate('/login');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('Email already in use');
                } else if (error.code === 'auth/weak-password') {
                    toast.error('Password should be at least 6 characters');
                } else {
                    toast.error('Failed to create account');
                }
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Welcome to TaskMate</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to create your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                className={`border-2 ${match ? "border-green-500" : "border-red-500"}`}
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input
                                className={`border-2 ${match ? "border-green-500" : "border-red-500"}`}
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">Sign Up</Button>
                        <p className="text-sm text-center text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default SignUpPage

