import express from 'express';
import router from './routes/router.js';
import ErrorHandler from './middlewares/ErrorHandler.js';

const app = express();

app.use(express.static('public'));
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true, limit: '5mb' }))
app.use('/api', router)
app.use(ErrorHandler)
export default app