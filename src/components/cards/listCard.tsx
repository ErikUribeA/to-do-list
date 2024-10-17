'use client'
import { ITask } from "@/types/ITask";
import React, { useEffect, useState } from "react";
import { MdEditNote, MdDeleteOutline } from "react-icons/md";
import { CircleCheckBig } from 'lucide-react';
import Modal from "../modal/editModal";

export default function ListCard() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [modal, setModal] = useState(false);
    const [currentTask, setCurrentTask] = useState<ITask | null>(null);

    const openModal = (task: ITask) => {
        setCurrentTask(task);
        setModal(true);
    };
    const closeModal = () => {
        setCurrentTask(null);
        setModal(false);
    };

    async function fetchingData() {
        try {
            const response = await fetch("/api/to-do");
            if (!response.ok) {
                console.log("Error fetching data");
                return;
            }
            const data = await response.json();
            setTasks(data);
            console.log(data);
        } catch {
            console.log("Error fetching data");
        }
    }

    async function toggleTaskCompletion(task: ITask) {
        try {
            const response = await fetch(`/api/to-do`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: task.id, completed: !task.completed }),
            });

            if (!response.ok) {
                throw new Error("Error updating task");
            }

            const updatedTask = await response.json();
            setTasks(prevTasks => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleEdit = async (updatedData: { name: string; description: string; date: string }) => {
        if (!currentTask) return;

        try {
            const response = await fetch(`/api/to-do`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: currentTask.id,
                    name: updatedData.name,
                    description: updatedData.description,
                    date: updatedData.date
                }),
            });

            if (!response.ok) {
                throw new Error("Error updating task");
            }

            const updatedTask = await response.json();
            setTasks(prevTasks => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/to-do?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la tarea');
            }

            const result = await response.json();
            console.log(result.message);
            
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        fetchingData();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 p-3">
            {tasks.map((task) => (
                <div key={task.id} className={`border-2 rounded-xl p-3 gap-3 flex flex-col lg:flex-row w-full ${task.completed ? 'border-green-500' : 'border-red-500'}`}>
                    <div className="flex flex-col my-auto gap-2">
                        <h2><span className="font-bold">Name:</span> {task.name}</h2>
                        <p><span className="font-bold">Description:</span> {task.description}</p>
                        <p><span className="font-bold">Date:</span> {task.date}</p>
                        {task.completed ? (
                            <p className="text-green-500">Task completed!</p>
                        ) : (
                            <p className="text-red-500">Task not completed yet.</p>
                        )}
                    </div>
                    <div className={`flex flex-row lg:flex-col gap-3 mt-auto mx-auto lg:mt-0 items-center justify-center`}>
                        <button onClick={() => openModal(task)}>
                            <MdEditNote className="text-2xl" />
                        </button>
                        <button onClick={() => handleDelete(task.id)}>
                            <MdDeleteOutline className="text-2xl" />
                        </button>
                        {!task.completed && (
                            <button onClick={() => toggleTaskCompletion(task)}>
                                <CircleCheckBig />
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {currentTask && (
                <Modal isOpen={modal} onClose={closeModal} title="Edit Task" initialData={{
                    name: currentTask.name,
                    description: currentTask.description,
                    date: currentTask.date,
                }} onSave={handleEdit} />
            )}
        </div>
    );
}
