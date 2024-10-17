import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export interface Task {
    id: number;
    name: string;
    date: string;
    description: string;
    completed: boolean;
}

const DB_FILE = path.join(process.cwd(), 'tasks.json');

async function readTasks(): Promise<Task[]> {
    try {
        const data = await fs.readFile(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log("error", error)
        return [];
    }
}

async function writeTasks(tasks: Task[]): Promise<void> {
    await fs.writeFile(DB_FILE, JSON.stringify(tasks, null, 2));
}

export async function GET(req: Request) {
    const url = new URL(req.url)
    const status = url.searchParams.get("status")

    const taskList = await readTasks();
    let filterTask = taskList;

    if (!status) return NextResponse.json(filterTask)

    if (status == "completed") {
        filterTask = taskList.filter((task) => task.completed)
    } else {
        filterTask = taskList.filter((task) => !task.completed)
    }

    return NextResponse.json(filterTask)
}

export async function POST(req: Request) {
    const body = await req.json();
    if (!body) return NextResponse.json({
        message: "La tarea no es valida"
    }, { status: 400 })

    if (!body.date || !body.description || !body.name) {
        return NextResponse.json({
            message: "La tarea no es valida"
        }, { status: 400 })
    }

    const taskList = await readTasks();
    const newTask: Task = { id: Date.now(), completed: false, ...body }
    taskList.push(newTask)

    await writeTasks(taskList);

    return NextResponse.json(newTask, { status: 201 })
}

export async function PUT(req: Request) {
    const body = await req.json();
    if (!body || typeof body.id !== 'number') return NextResponse.json({
        message: "La tarea no es válida o el ID no es un número"
    }, { status: 400 })

    const taskList = await readTasks();
    const taskIndex = taskList.findIndex(task => task.id === body.id);
    if (taskIndex === -1) return NextResponse.json({
        message: "Tarea no encontrada"
    }, { status: 404 })

    const updatedTask: Task = {
        ...taskList[taskIndex],
        ...body,
        id: taskList[taskIndex].id
    };
    taskList[taskIndex] = updatedTask;

    await writeTasks(taskList);

    return NextResponse.json(updatedTask, { status: 200 })
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));
    if (isNaN(id)) return NextResponse.json({ message: "ID inválido" }, { status: 400 });

    const taskList = await readTasks();
    const initialLength = taskList.length;
    const newTaskList = taskList.filter(task => task.id !== id);

    if (newTaskList.length < initialLength) {
        await writeTasks(newTaskList);
        return NextResponse.json({ message: "Tarea eliminada" }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Tarea no encontrada" }, { status: 404 });
    }
}