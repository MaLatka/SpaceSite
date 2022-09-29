require("dotenv").config();
const express = require("express");
const https = require("https");
const ejs = require("ejs");
const { Http2ServerRequest } = require("http2");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/public", express.static("public"));

const PORT = 3000;
const apiKey = process.env.NASA_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

app.get("/", (_req, res) => {
  res.render("home");
});

app.get("/apod", (_req, res) => {
  https
    .get(url, (response) => {
      console.log(`Response STATUS CODE: ${response.statusCode}`);
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        console.log(data);
        const apodData = JSON.parse(data);
        const apodTitle = apodData.title;
        const apodImage = apodData.url;
        const apodDesc = apodData.explanation;
        const apodDate = apodData.date;

        res.render("page", {
          imgUrl: apodImage,
          imgTitle: apodTitle,
          imgDate: apodDate,
          imgDesc: apodDesc,
        });
      });
    })

    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
});

app.post("/apod", (_req, res) => {
  res.redirect("/apod");
});

app.listen(process.env.PORT || PORT, (_req, _res) => {
  console.log(`It's alive on http://localhost:${PORT}`);
});
