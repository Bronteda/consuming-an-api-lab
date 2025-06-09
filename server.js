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

app.get("/weather/show", (req, res) => {});

app.post("/weather", async (req, res) => {
  const zipCode = req.body.zipCode;
  const API_KEY = process.env.API_KEY;
  console.log("Zip code:", zipCode);
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // res.redirect("/weather/show");
      res.send("all good");
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
