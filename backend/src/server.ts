import express from 'express';
import cors from 'cors';
import { allItems } from './data';
import { ToDoItem } from '../interfaces/to-do-item';

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true, 
    origin:['http://localhost:4200']
}));

app.get('/api/to-do-list', (req, res) => {
    res.send(allItems);
});

app.post('/api/add-to-do-item', (req, res) => {
    const newItem: ToDoItem = req.body;
    allItems.push(newItem);
    res.send(newItem);
});

const port = 5000;
app.listen(port, () => {
    console.log('Website serviced on http://localhost:' + port);
});