const geoCode = require("./util/geoCode");
const forecast = require("./util/forecast");

const express = require("express");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.post("/temperature", async (req, res) => {
	try {
		const ville = req.body.query.trim();
		const coo = await geoCode(ville);
		const temp = await forecast(coo);
		res.render("temp", { ville, temp });
	} catch (err) {
		console.log(err.message);
		res.sendStatus(400).send(err.message);
	}
});

app.post("/suggestion", async (req, res) => {
	if (req.body.city != "") {
		const { data } = await axios(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.city}.json?access_token=${process.env.API_GEO_AUTOCOMPLETE}&limit=3`
		);
		// console.log(data.features.map(city => city.place_name));
		res.send({ result: data.features.map(city => city.place_name) });
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
