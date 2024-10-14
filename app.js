const express = require('express')
const app = express()
const port = 3000


app.use('/', (req, res) => {
    res.send("hello ram")
})

app.listen(port, ()=> {
    console.log(`Port started in ${port}. okay`)
})