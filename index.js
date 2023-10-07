import express from "express"
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";


const __dirname =dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000
let myList = []
let workList = []

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  res.locals.activePage = req.path;
  console.log(res.locals)
  next();
});

app.get("/", (req, res) =>{
    res.render("index",{ myList })
})

app.post('/submit', (req, res) => {
    let newItem = req.body.task;
    
    if(newItem){
        myList.push(newItem);

    } else{
        console.log("No input" )
    }
    res.redirect("/") // Render the updated list in the EJS template
  });

  app.post('/clear', (req, res) => {
    myList = []; // Clear the array by assigning an empty array to it
    res.redirect('/'); // Redirect back to the main page after clearing the array
  });

  app.get("/work", (req, res) =>{
    res.render("work",{ workList })
})

app.post('/submitWork', (req, res) => {
    let newItem = req.body.task;
    
    if(newItem){
        workList.push(newItem);
    } else{
        console.log("No input" )
    }
    res.redirect("/work") // Render the updated list in the EJS template
  });

app.post('/clearWork', (req, res) => {
    workList = []; // Clear the array by assigning an empty array to it
    res.redirect('/work'); // Redirect back to the main page after clearing the array
  });

app.listen(port, ()=>{
    console.log(`Connected in port ${port}`)
})

app.post('/delete/:index', (req, res) => {
  const indexToDelete = req.params.index;
  myList.splice(indexToDelete, 1);
  res.redirect('/');
  console.log(indexToDelete)
});

app.post('/delete2/:index', (req, res) => {
  const indexToDelete = req.params.index;
  workList.splice(indexToDelete, 1);
  res.redirect('/work');
  console.log(indexToDelete)
});

