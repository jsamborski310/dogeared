const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controller');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const hbs = exphbs.create({ helpers, layoutsDir: 'views/layout' });

// const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const hbs = exphbs.create({ helpers });


const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 864000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
// app.use(fileUpload());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public'), { index : false }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
