import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {Label} from "./ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {createTask} from "@/services/taskService"
import { getAuth } from "firebase/auth";
import toast from 'react-hot-toast'

const AddTaskDialog = ({ isOpen, onClose, onAddTask }) => {
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        date: '',
        completed: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTask.title || !newTask.date) {
            toast.error("Title and Due Date are required!");
            return;
        }

        try {
            await onAddTask(newTask);
            toast.success('Task added successfully!');
            setNewTask({ title: '', description: '', date: '', completed: false });
            onClose();
        } catch (error) {
            toast.error('Failed to add task. Please try again.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={newTask.description}
                            onChange={(e) =>
                                setNewTask({ ...newTask, description: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor="date">Due Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={newTask.date}
                            onChange={(e) =>
                                setNewTask({ ...newTask, date: e.target.value })
                            }
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Add Task
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};


export default AddTaskDialog