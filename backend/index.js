const express =  require('express');
const setup = require('./middlewares/setup');
const User = require('./routes/user-route');
const Post = require('./routes/post-route');
require('dotenv').config();

const app = express();
setup(app);

app.use('/user', User);
app.use('/post', Post);
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port:${PORT}`));