require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const app = express();
// const PORT = 8000 || process.env.PORT;

// app.gey('', (req, res) => {
//   res.send('Hello World');
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));