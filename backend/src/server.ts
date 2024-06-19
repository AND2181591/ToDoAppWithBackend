import express from 'express';
import cors from 'cors';
import { allItems } from './data';

const app = express();
app.use(cors({
    credentials: true, 
    origin:['http://localhost:4200']
}));

app.get('/api/todo', (req, res) => {
    res.send(allItems);
});

const port = 5000;
app.listen(port, () => {
    console.log('Website serviced on http://localhost:' + port);
});