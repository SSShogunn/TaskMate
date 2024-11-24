import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import toast from 'react-hot-toast';

const EditTaskDialog = ({ isOpen, onClose, task, onEditTask }) => {
    const [editedTask, setEditedTask] = useState({
        title: task?.title || '',
        description: task?.description || '',
        date: task?.date || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editedTask.title || !editedTask.date) {
            toast.error("Title and Due Date are required!");
            return;
        }

        try {
            await onEditTask({ ...task, ...editedTask });
            toast.success('Task updated successfully!');
            onClose();
        } catch (error) {
            toast.error('Failed to update task. Please try again.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="edit-title">Title</Label>
                        <Input
                            id="edit-title"
                            value={editedTask.title}
                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <Input
                            id="edit-description"
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="edit-date">Due Date</Label>
                        <Input
                            id="edit-date"
                            type="date"
                            value={editedTask.date}
                            onChange={(e) => setEditedTask({ ...editedTask, date: e.target.value })}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Save Changes</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTaskDialog; 