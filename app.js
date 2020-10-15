var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var bodyParser = require('body-parser')



const managementRouter = require("./routes/v1/management.Route");
const hrRouter = require("./routes/v1/hr.Route");
const operationRouter = require("./routes/v1/operations.Route");
const financeRouter = require("./routes/v1/finance.Route");
const loginRouter = require("./routes/v1/login.Route");
const publicRouter = require("./routes/v1/public.Route");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




// view engine setup     
// service file
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("payslip", express.static('uploads/'));
app.use('/employee/static_file', express.static('upload/'));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/v1", cors(), loginRouter);
app.use("/api/v1/hr", cors(), hrRouter);
app.use("/api/v1/operation", cors(), operationRouter);
app.use('/api/v1/manager', cors(),  managementRouter);
app.use("/api/v1/finance", cors(), financeRouter );
app.use("/api", cors(), publicRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
