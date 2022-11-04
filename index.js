const express = require("express");
const { json, urlencoded } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const Flight=require ("./flight.json");
const fs= require ("fs")
const app = express();

app.use(json());
app.use(express.urlencoded())

app.use("/", routes);


// Get all flight

app.get("/Flight", (req,res) => {
  res.json({Flight})
})


// Update flight

app.patch("/Flight", (req,res) => {
  res.json({Flight})
})



// Add or Book flight
app.post("/Flight", (req,res) => {
  console.log(req.body);

  Flight.push(req.body);
  console.log({Flight})

 
  let stringedData =JSON.stringify(Flight, null, 2);

  fs.writeFile('flight.json', stringedData, function (err)  {
     if(err) {
      return res.status(500).json({message: err})
     }

  })
  return res.status(200).json({message: "new flight added"})
})

// Get single Flight
app.get('/Flight/:id', (req,res) => {

  let id = req.params.id;

  let foundFlight = Flight.find(flights => {
    return String(flights.id) === id
  })
  if (foundFlight) {
    return res.status(200).json({flight: foundFlight});
  } else {
  return res.status(404).json({message: "flight not found"})
  }
 
})


// Delete flight
app.delete("/Flight", (req,res) => {
  res.json({Flight})
})



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
