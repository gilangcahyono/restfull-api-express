import express from 'express';
import router from './src/router.js';

const app = express();
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
