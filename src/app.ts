import express, {Application} from 'express';
import connection from './db/connection';
import postsRoutes from './routes/postsRoutes';
import usersRoutes from './routes/usersRoutes';


const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

const port : string | number = process.env.PORT || 5000;

app.listen(port, () => {
    `Server running on port ${port}`;
     connection();
});