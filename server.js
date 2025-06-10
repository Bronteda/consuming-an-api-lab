//dotenv
const dotenv = require("dotenv");
dotenv.config();

//Express
const express = require("express");
const app = express();

/*--middleware--*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*--routes--*/
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/weather/show", (req, res) => {
  const name = req.query.name;
  const temp =req.query.temp;
  const description =req.query.description;

  res.render("show.ejs",{name,temp,description});



});

app.post("/weather", async (req, res) => {
  const zipCode = req.body.zipCode;
  const API_KEY = process.env.API_KEY;
  console.log("Zip code:", zipCode);
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);

    if (response.ok) {
      res.redirect(`/weather/show?name=${data.name}&temp=${data.main.temp}&description=${data.weather[0].description}`);
      //console.log(data.weather[0].description);
    } else {
      console.log("response not okay");
    }
  } catch (e) {
    console.log("No information found", e);
  }
});

/*--listening--*/
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
