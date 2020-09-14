const express = require('express');

const app = express();

app.use(express.static('./dist/artwork'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/artwork/'}),
);

app.listen(process.env.PORT || 8989);