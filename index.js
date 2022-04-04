const express = require('express');
const app = express();

app.use(express.json())


app.use('/router',require('./router/routes'))
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{console.log(`Server started on port ${PORT}`)})