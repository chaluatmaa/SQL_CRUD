const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const mysql = require("mysql");
const cors = require("cors");
const { json } = require("body-parser");

// `Add your creentials here host, user, password, database respectively.`

const db = mysql.createPool({
	host: "",
	user: "",
	password: "",
	database: "",
});
app.use(cors());
app.use(express.json());

app.get("/api/get", (req, res) => {
	const sqlSelectt =
		// "SELECT * FROM reviews WHERE id>1 AND name LIKE 'In%' ORDER BY name ASC limit 3";
		"SELECT * FROM reviews  ORDER BY name ASC ";
	db.query(sqlSelectt, (err, result) => {
		// console.log(result);
		res.send({ json: result });
	});
});

app.post("/api/insert", (req, res) => {
	const name = req.body.movieName;
	const review = req.body.movieReview;
	const sqlInsert = "INSERT INTO reviews (name,review) VALUES (?,?)";
	db.query(sqlInsert, [name, review], (err, result) => {
		console.log(result);
	});
});

// DELETE IN SQL USING URL PARAMS
// app.delete("/api/delete/:id", (req, res) => {
// 	const id = req.params.id;
// 	const sqlDelete = "DELETE FROM reviews WHERE id= ?";
// 	db.query(sqlDelete, id, (err, result) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 	});
// });

// DELETE IN SQL USING REQ.BODY (req.body)
app.delete("/api/delete/", (req, res) => {
	const id = req.body.id;
	console.log("DEL", id);
	const sqlDelete = "DELETE FROM reviews WHERE id= ?";
	db.query(sqlDelete, id, (err, result) => {
		if (err) {
			console.log(err);
		}
	});
});

app.put("/api/update/", (req, res) => {
	const name = req.body.movieName;
	const review = req.body.movieReview;
	console.log("BODY", req.body);
	const sqlUpdate = "UPDATE reviews SET review = ? WHERE name = ?";
	db.query(sqlUpdate, [review, name], (err, result) => {
		// if (err) {
		// 	console.log(err);
		// }
	});
});

app.listen(PORT, () => {
	console.log("Listening on PORT", PORT);
});
