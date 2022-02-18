const express = require("express");
const mysql= require("mysql2");
//const postgres = require ("postgres");

const app = express();
let port = 2020;

// middleware
app.use(express.json());


 const db = mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"",
     database:"sample3",
     port:"3306",
    });


 db.connect((err) => {
  if (err) {
     console.log(err, "error");
 } else {
    console.log("database connected");
   }
   });

app.post("/add", (req, res) => { 
   let name = req.body.name;
  let age = req.body.age;
  let gender = req.body.gender;
   let number = req.body.number;

  let qry ='INSERT INTO elist (name,age,gender,number) VALUES ("'+name +'","'+age+'","'+gender+'","'+number+'")';

   db.query(qry, (err, result) => {     
     if (err) {
       console.log(err);
     }
    console.log(result);
     if (result.affectedRows == 1) {
       res.send({ status: true, msg: "sucess", data: result });
     }
      else {
       res.semd({ status: false, msg: "failed" });
     }
   });
 });

 app.get("/:id", (req, res) => {
   let id = req.params.id;
   let qry = 'SELECT * FROM `elist` WHERE emp_id="' + id + '"';

   db.query(qry, (err, result) => {
     if (err) {
       console.log(err);
     }
     if (result.length > 0) {
       res.send({ status: true, msg: "sucess", data: result });
     } else {
       res.send({ status: false, msg: "failed" });
     }
   });
 });

 app.put("/:id", (req, res) => {
   let id = req.params.id;
   let qry = "UPDATE elist SET age= '30' WHERE emp_id='" + id + "'";
   console.log(qry);

   db.query(qry, (err, result) => {
     if (err) {
       console.log(err);
     }
     if (result.affectedRows == 1) {
       res.send({ status: true, msg: "sucess", data: result });
     } else {
      res.send({ status: false, msg: "failed" });
    }
   });
 });

 app.delete("/:id", (req, res) => {
   let id = req.params.id;
   let qry = "DELETE FROM `elist` WHERE emp_id='" + id + "'";
   console.log(qry);

   db.query(qry, (err, result) => {
     if(err){
       console.log(err);
     }
     if(result.affectedRows == 1) {
       res.send({ status: true, msg: "sucess", data: result });
     } else {
       res.send({ status: false, msg: "failed" });
     }
   });
   });

app.listen(port, () => {
  console.log("run it");
});


app.get("/test", (req, res) => {
  res.json({ message: "hello from api" });
});
