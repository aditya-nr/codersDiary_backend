import express from 'express';
import router from './routes/router.js';
import ErrorHandler from './middlewares/ErrorHandler.js';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true, limit: '5mb' }))
app.use('/api', router)
app.use(ErrorHandler)
export default app