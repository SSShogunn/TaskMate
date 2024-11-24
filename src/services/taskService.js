import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import toast from 'react-hot-toast'

export const createTask = async (taskData) => {
    const auth = getAuth().currentUser;
    if (!auth) {
        toast.error("You must be logged in");
        throw new Error("User not authenticated");
    }
    
    try {
        const userTasksRef = collection(db, `users/${auth.uid}/customCollection`);
        const docRef = await addDoc(userTasksRef, taskData);
        return {
            id: docRef.id,
            ...taskData
        };
    } catch (error) {
        toast.error("Failed to create task");
        throw error;
    }
};

export const fetchTasks = async () => {
    const auth = getAuth().currentUser;
    if (!auth) {
        toast.error("You must be logged in");
        return [];
    }
    const userTasksRef = collection(db, `users/${auth.uid}/customCollection`);
    try {
        const snapshot = await getDocs(userTasksRef);
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        toast.error("Failed to fetch tasks");
        throw error;
    }
};

export const updateTask = async (taskId, updatedData) => {
    const auth = getAuth().currentUser;
    if (!auth) {
        toast.error("You must be logged in");
        throw new Error("User not authenticated");
    }
    
    try {
        const taskRef = doc(db, `users/${auth.uid}/customCollection/${taskId}`);
        await updateDoc(taskRef, updatedData);
        return { id: taskId, ...updatedData };
    } catch (error) {
        toast.error("Failed to update task");
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    const auth = getAuth().currentUser;
    if (!auth) {
        toast.error("You must be logged in");
        throw new Error("User not authenticated");
    }
    
    try {
        const taskRef = doc(db, `users/${auth.uid}/customCollection/${taskId}`);
        await deleteDoc(taskRef);
    } catch (error) {
        toast.error("Failed to delete task");
        throw error;
    }
};
