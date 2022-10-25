const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./utils/dbConnect.js");
const app = express();
const port = process.env.PORT || 5000;

const toolsRoutes = require("./routes/v1/tools.route");
const viewCount = require("./middleware/viewCount.js");
const errorHandler = require("./middleware/errorHandler.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// application level middleware
app.use(viewCount);

dbConnect();

app.use("/api/v1/tools", toolsRoutes);

app.get("/", (req, res) => {
  //res.send("Hello World");
  res.render("home.ejs", {
    id: 2,
    user: {
      name: "Test"
    }
  })
  res.sendFile(__dirname + "/public/test.html")
});

app.all("*", (req, res) => {
  res.send("No route found!");
  res.end();
})

// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// error handler 
// if express can not handle the error by itself
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  })
})