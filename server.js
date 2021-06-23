const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + '/build/favicon.png'));
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}!`);
});