const mongoose = require('mongoose');
const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema
const studentSchema = new Schema({
    name: {type:String, required: true}, 
    studentID: {type:String, required: true}
});

// Create a Model object
const W24student = mongoose.model("W24student", studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const URI = req.body.myuri;
  console.log(URI);
  //connect to the database and log the connection
  mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((data)=> {
        console.log("Connected to MongoDB Server")
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB: " + err )
    })


  //add the data to the database
    const newStudent = new W24student({
        name: "Andrea Alejandra Olivares Rodriguez",
        studentID: "300361840"
    })

    newStudent.save()
            .then((savedStudent)=> res.send(`<h1>Document  Added</h1>`))
            .catch((err)=> res.status(400).json("Error: " + err))

  // send a response to the user
 //res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


