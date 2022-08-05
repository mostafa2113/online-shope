const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const SessionStore = require("connect-mongodb-session")(session)
const flash = require('connect-flash');

const Mongo_URL = "mongodb://localhost:27017/online-shop";


const homeRouter = require("./routes/home.routes");
const productRouter = require("./routes/product.routes");
const authRouter = require("./routes/auth.routes")

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash())

const store = new SessionStore({
    uri: Mongo_URL,
    collection: "sessions"
});
app.use(session({
    secret: "cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 60 * 60 * 100 },
    store: store
}))

app.set('view engine', 'ejs');
app.set("views", "views")

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/product", productRouter);



app.listen(3001, () => {
    console.log("run on http://localhost:3001");
})