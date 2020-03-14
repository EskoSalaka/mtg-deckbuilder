const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

console.log('Listening to port ', PORT)
app.listen(PORT)
