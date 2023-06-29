const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const homeRoutes = require('./controllers/homeroutes');
const userRoutes = require('./controllers/api/userroutes');
const loginRoutes = require('./controllers/api/loginroutes');
const signupRoutes = require('./controllers/api/signuproutes');
const { helpers } = require('./utils/helpers')
const routes = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret cookie',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ helpers }));
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/api', routes);
// app.use('/api/users', userRoutes);

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });