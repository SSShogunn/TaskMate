import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, LogOut, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { format } from 'date-fns';
import Task from '../components/Task';
import AddTaskDialog from '@/components/AddTaskDialog';
import DeleteDialog from "@/components/DeleteDialog";
import EditTaskDialog from "@/components/EditTaskDialog";
import { createTask, fetchTasks, updateTask, deleteTask } from '@/services/taskService';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/config/firebase';
import toast from 'react-hot-toast';
import SkeletonTask from '../components/SkeletonTask';
import Skeleton from 'react-loading-skeleton';

const Home = () => {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            if (!currentUser?.uid) {
                setTasks([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const tasksData = await fetchTasks();
                await new Promise(resolve => setTimeout(resolve, 3000));
                const sortedData = tasksData.sort((a, b) => new Date(a.date) - new Date(b.date))
                setTasks(sortedData);
            } catch (error) {
                console.error("Error loading tasks:", error);
                if (error.code === 'auth/unauthorized') {
                    setTasks([]);
                }
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, [currentUser]);


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleToggle = async (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            try {
                setTasks(tasks.map(t =>
                    t.id === taskId ? { ...t, completed: !t.completed } : t
                ));

                await updateTask(taskId, { completed: !task.completed });
                toast.success(task.completed ? 'Task marked as incomplete' : 'Task marked as complete');

                if (selectedTask?.id === taskId) {
                    setSelectedTask(prev => ({ ...prev, completed: !prev.completed }));
                }
            } catch (error) {
                toast.error("Failed to update task status");
                setTasks(tasks.map(t =>
                    t.id === taskId ? { ...t, completed: task.completed } : t
                ));
            }
        }
    };

    const handleAddTask = async (taskData) => {
        try {
            const createdTask = await createTask({ ...taskData });
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            toast.success('Task added successfully!');
        } catch (error) {
            console.error("Error adding task:", error);
            //alert("Failed to add the task. Please try again.");
            toast.error('Failed to add the task. Please try again.');
        }
    };



    const handleEditTask = async (editedTask) => {
        try {
            await updateTask(editedTask.id, editedTask);
            setTasks(tasks.map(task =>
                task.id === editedTask.id ? editedTask : task
            ));
            setSelectedTask(editedTask);
            setIsEditTaskOpen(false);
            toast.success('Task updated successfully!');
        } catch (error) {
            console.error("Error editing task:", error);
            toast.error('Failed to edit the task. Please try again.');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
            if (selectedTask && selectedTask.id === taskId) {
                setSelectedTask(null);
            }
            toast.success('Task deleted successfully!');
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error('Failed to delete the task. Please try again.');
        }
    };

    function filterByCompletion(status) {
        if (status === 'all') return tasks;
        if (status === 'completed') return tasks.filter(task => task.completed);
        if (status === 'active') return tasks.filter(task => !task.completed);
    }


    const filteredTasks = filterByCompletion(filterStatus).filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            <div className="w-full md:w-1/2 p-4 md:p-8 overflow-y-auto h-1/2 md:h-screen">
                <div className="mb-6 flex justify-between items-center ">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">TaskMate</h1>
                    <Button onClick={() => {
                        auth.signOut();
                        toast.success('Logged out successfully');
                    }} className="text-sm md:text-base bg-gray-100 hover:bg-gray-200 text-black shadow-md hover:shadow-lg">
                        <LogOut className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                        Log Out
                    </Button>
                </div>
                <div className='py-2 mb-2'>
                    <Button onClick={() => setIsAddTaskOpen(true)} className="text-sm w-full shadow-sm hover:shadow-xl bg-blue-500 hover:bg-blue-700">
                        <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                        Add Task
                    </Button>
                </div>
                {loading ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton width="80%" height={24} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton count={3} />
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Skeleton width={60} height={32} />
                            <Skeleton width={60} height={32} />
                        </CardFooter>
                    </Card>
                ) : selectedTask ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="break-words whitespace-pre-wrap flex justify-between">
                                <h1 className='w-3/4'>
                                    {selectedTask.title}
                                </h1>
                                <Button
                                    className={`w-1/4 w-100 ${selectedTask.completed ? 'bg-green-500' : 'bg-yellow-500'}`}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        handleToggle(selectedTask.id)
                                        console.log(selectedTask)
                                    }}
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {selectedTask.completed ? 'Completed' : 'Pending'}
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <p className="text-gray-600 break-words whitespace-pre-wrap">
                                    {selectedTask.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Due: {format(new Date(selectedTask.date), 'MMMM d, yyyy')}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setTaskToEdit(selectedTask);
                                    setIsEditTaskOpen(true);
                                }}
                            >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                    setTaskToDelete(selectedTask);
                                    setIsDeleteConfirmOpen(true);
                                }}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[80%] text-gray-600">
                        <p className="text-lg font-medium mb-2">No Task Selected</p>
                        <p className="text-sm mb-4">Select a task from the list or add a new one to get started!</p>
                        <Plus className="h-8 w-8 hover:cursor-pointer" onClick={() => { setIsAddTaskOpen(true) }} />
                    </div>

                )}
            </div>

            <div className="xl:border-l-2 md:border-l-2  w-full md:w-1/2 bg-gray-50 p-4 md:p-8 overflow-y-auto h-3/4 md:h-screen sm:border-t-2 sm:border-gray-500">
                <div className="mb-6">
                    <Input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full"
                        icon={<Search className="h-5 w-5 text-gray-400" />}
                    />
                </div>
                <div className="flex gap-4 mb-2 py-2">
                    <Button
                        className={`px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition-colors w-1/3`}
                        onClick={() => setFilterStatus('all')}
                    >
                        All
                    </Button>
                    <Button
                        className={`px-4 py-2 rounded-lg  text-white bg-green-500 hover:bg-green-600 transition-colors w-1/3`}
                        onClick={() => setFilterStatus('completed')}
                    >
                        Completed
                    </Button>
                    <Button
                        className={`px-4 py-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition-colors w-1/3`}
                        onClick={() => setFilterStatus('active')}
                    >
                        Active
                    </Button>
                </div>

                <div>
                    {loading ? (
                        [...Array(5)].map((_, index) => (
                            <SkeletonTask key={index} />
                        ))
                    ) : (
                        filteredTasks.map(task => (
                            <Task
                                key={task.id}
                                {...task}
                                onToggle={handleToggle}
                                onSelect={() => setSelectedTask(task)}
                                onEdit={() => {
                                    setTaskToEdit(task);
                                    setIsEditTaskOpen(true);
                                }}
                                onDelete={() => {
                                    setTaskToDelete(task);
                                    setIsDeleteConfirmOpen(true);
                                }}
                            />
                        ))
                    )}
                </div>
            </div>

            <AddTaskDialog
                isOpen={isAddTaskOpen}
                onClose={() => setIsAddTaskOpen(false)}
                onAddTask={handleAddTask}
            />

            {taskToEdit && (
                <EditTaskDialog
                    isOpen={isEditTaskOpen}
                    onClose={() => {
                        setIsEditTaskOpen(false);
                        setTaskToEdit(null);
                    }}
                    task={taskToEdit}
                    onEditTask={handleEditTask}
                />
            )}

            <DeleteDialog
                isOpen={isDeleteConfirmOpen}
                onClose={() => {
                    setIsDeleteConfirmOpen(false);
                    setTaskToDelete(null);
                }}
                onConfirmDelete={() => {
                    if (taskToDelete) {
                        handleDeleteTask(taskToDelete.id);
                        setIsDeleteConfirmOpen(false);
                        setTaskToDelete(null);
                    }
                }}
            />
        </div>
    );
};

export default Home;
