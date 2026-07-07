import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors('http://localhost:5174'))



app.post('/tarefas', async (req, res) => {

    await prisma.task.create({
        data: {
            name: req.body.name,
            task: req.body.task,
            deadline: req.body.deadline
        }
    })

    res.status(201).json(req.body)

})

app.get('/tarefas', async (req, res) => {

    let tasks = []

    if (req.query && (req.query.name || req.query.task || req.query.deadline)) {
        tasks = await prisma.task.findMany({
            where: {
                name: req.query.name,
                task: req.query.task,
                deadline: req.query.deadline
            }
        })
    } else {
        tasks = await prisma.task.findMany()
    }

    res.status(200).json(tasks)
})

app.put('/tarefas/:id', async (req, res) => {

    await prisma.task.update({

        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            task: req.body.task,
            deadline: req.body.deadline
        }
    })

    res.status(201).json(req.body)

})

app.delete('/tarefas/:id', async (req, res) => {

    await prisma.task.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'tarefa deletada' })
})

app.listen(3000)

