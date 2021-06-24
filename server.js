const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(BASE_DIR, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(BASE_DIR, 'build/index.html'));
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}!`);
});