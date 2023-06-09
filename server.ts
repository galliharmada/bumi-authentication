require('dotenv').config();
import express from 'express';	

const app = express();
app.use(express.json())

/** import config db */
import { connect } from './config'
connect()

/** import routing api */
import authRoutes from './src/routes/auth';
app.use('/api/auth', authRoutes);

/** start server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

export default app

