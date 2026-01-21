//Import the express
const express = require("express");

//Import the cors
const cors = require("cors");

//Import FS - File Sytem to read and write
const fs = require("fs");
const { console } = require("inspector");

//Create an Express Server
const app = express();
const PORT = 5000;

//MiddleWare
app.use(cors());
app.use(express.json());

//Read - Function
const readData = ()=>
{
    const data = fs.readFileSync("data.json");
    return JSON.parse(data);
}

//Write - Function
const writeData = (data)=>
{
    fs.writeFileSync("data.json", JSON.stringify(data,null,2))
}

//Get Method to send data from data.json
app.get("/viewstudent",(req,res)=>
{
    const data = readData();
    res.json(data.students)
})


//Post method to recieve new data request
app.post("/addstudent", (req,res)=>
    {
        const data = readData();
        const Index = data.students.length > 0 ? data.students[data.students.length - 1].index : 0; 
        const newData = {
            id : Date.now(),
            index : Index + 1,
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            gender: req.body.gender,
            cgpa : req.body.cgpa
        };
        
        data.students.push(newData);
        writeData(data);
        res.json({message:"Data Added"});
    })

    //PUT Method to Update the recieved data
    app.put("/viewstudent/:id", (req,res) =>
    {
        const data = readData();

        const Id = Number(req.params.id);

        data.students = data.students.map(
            s => s.id === Id ? {...s,...req.body} : s
        )

        writeData(data);
        res.json({message: "Data Updated"})
    })

    //DELETE Method to Delete the data
    app.delete("/viewstudent/:id",(req,res) =>
    {
        const data = readData();

        const Id = Number(req.params.id);

        data.students = data.students.filter(s => s.id !== Id);

        writeData(data);
        res.json({message : "Data Deleted"});
    })
    //start the Server
    app.listen(PORT, ()=>
    {
        console.log(`Server is running in http://localhost:${PORT}`);
    })