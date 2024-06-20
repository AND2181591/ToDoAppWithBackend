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

app.get('/api/to-do-list/:filterOption', (req, res) => {
    const filterOptionParam = req.params.filterOption;

    switch(filterOptionParam) {
        case 'all': 
            res.send(allItems);
            break;
        case 'active': 
            const activeArr = allItems.filter(i => !i.done);
            res.send(activeArr);
            break;
        case 'done': 
            const doneArr = allItems.filter(i => i.done);
            res.send(doneArr);
            break;
        default: 
            res.send(allItems);
    }
});

app.post('/api/add-to-do-item', (req, res) => {
    const newItem: ToDoItem = req.body;
    allItems.push(newItem);
    res.send(newItem);
});

app.put('/api/update-to-do-item/:id', (req, res) => {
    const idParam = req.params.id;
    const indexSelected = allItems.findIndex(i => i.id === idParam);
    if (indexSelected) {
        allItems[indexSelected] = req.body;
    }

    res.send(allItems);
});

app.delete('/api/delete-to-do-item/:id', (req, res) => {
    const idParam = req.params.id;
    const indexSelected = allItems.findIndex(i => i.id === idParam);
    if (indexSelected) {
        allItems.splice(indexSelected, 1);
    }
    res.send(allItems);
});

const port = 5000;
app.listen(port, () => {
    console.log('Website serviced on http://localhost:' + port);
});