'use client'
import { useState } from "react"
import Label from "../UI/label/label"
import Input from "../UI/input/input"
import { toast } from "react-toastify";


export default function NewTask() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newTask = { name, description, date }

        try {
            const response = await fetch('api/to-do', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) {
                console.log("Error fetching data")
            }

            const createdTask = await response.json();
            console.log("Task created:", createdTask)
            toast.success("The task was created successfully")

            setName("");
            setDescription("");
            setDate("");

        } catch (error) {
            console.log("Error", error)
        }
    }
    return (
        <div className="flex justify-center">
            <form onSubmit={handleSumbit} className="p-10 w-[100%] lg:w-[70%] flex flex-col">
                <Label text="Name" />
                <Input
                    type="text"
                    placeholder="Name of the task"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <Label text="Description" />
                <Input
                    type="text"
                    placeholder="Description of the task"
                    name="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <Label text="Date" />
                <Input
                    type="date"
                    placeholder="Date of today"
                    name="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <button type="submit" className="p-4 bg-[#00ffff]  rounded-xl mx-auto flex">
                    Create
                </button>
            </form>
        </div>
    )
}