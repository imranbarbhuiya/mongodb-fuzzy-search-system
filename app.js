import express, { urlencoded } from "express";
import { metaphone } from "metaphone";
import mongoose from "mongoose";
import bookModel from "./models/data.js";
const { connect } = mongoose;

//connect to db
connect("mongodb://localhost:27017/searching", (err) => {
  console.log("connected to the database successfully");
  if (err) console.log("error ", err);
});

//init app
var app = express();

//set view engine
app.set("view engine", "ejs");

///fetch the data from request
app.use(urlencoded({ extended: false }));

//default page load
app.get("/", (req, res) => {
  try {
    bookModel.find((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { data: data });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//search
app.get("/search", (req, res) => {
  try {
    bookModel.fuzzySearch(metaphone(req.query.search), (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.render("home", { data: data });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/", (req, res) => {
  try {
    var books = new bookModel({
      author: req.body.author,
      books: req.body.book,
      mp: metaphone(req.body.book),
    });
    books.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at port ${port}`));
