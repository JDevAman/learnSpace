import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes';
import passport from './config/passport';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Syngit API up');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Syngit auth service listening on port ${port}`);
});
