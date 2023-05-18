// import express from 'express';

// const app = express();
// const PORT = 8000;

// app.get('/', (req,res) => res.send('Express + +1 TypeScript Server'));
// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });
import app from './App'

const port = process.env.PORT || 8000

app.listen(port, (err?:any) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})