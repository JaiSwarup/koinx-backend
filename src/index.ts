import app from './app';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(port, () => {
    console.log(`Server is listening on port http://${host}:${port}`);
});