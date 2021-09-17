import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [movieName, setMovieName] = useState("");
	const [review, setReview] = useState("");
	const [data, setData] = useState([]);
	const [newReview, setNewReview] = useState("");

	const submitReview = () => {
		axios.post("http://localhost:5000/api/insert", {
			movieName,
			movieReview: review,
		});

		setData([...data, { movieName, movieReview: review }]);
		setMovieName("");
		setReview("");
	};

	const deleteReview = (id) => {
		axios.delete(`http://localhost:5000/api/delete/`, { data: { id } });
	};

	// const deleteReview = (id) => {
	// 	axios.delete(`http://localhost:5000/api/delete/${id}`);
	// };

	const updateReview = (movie) => {
		axios.put(`http://localhost:5000/api/update`, {
			movieName: movie,
			movieReview: newReview,
		});
		setNewReview("");
	};

	useEffect(() => {
		axios.get("http://localhost:5000/api/get").then((res) => {
			setData(res.data.json);
			console.log(res.data.json);
		});
	}, []);

	return (
		<div className="App">
			<h1>SQL CRUD</h1>
			<div className="form">
				<label>Movie Name</label>
				<input
					type="text"
					name="movieName"
					onChange={(e) => setMovieName(e.target.value)}
				/>
				<label>Review</label>
				<input
					type="text"
					name="review"
					onChange={(e) => setReview(e.target.value)}
				/>
			</div>
			<button onClick={submitReview} disabled={!movieName && !review}>
				Submit
			</button>
			{data &&
				data.map((data) => {
					return (
						<div
							style={{
								border: "2px solid black",
								borderRadius: "20px",
								padding: "10px",
								width: "400px",
								margin: "30px auto",
							}}
							key={data.id}
						>
							<h1>{data.name}</h1>
							<h3>{data.review}</h3>
							<h4>{data.id}</h4>
							<div style={{ display: "flex", justifyContent: "space-around" }}>
								<button onClick={() => deleteReview(data.id)}>Delete</button>
								<input
									type="text"
									onChange={(e) => setNewReview(e.target.value)}
								/>
								<button onClick={() => updateReview(data.name)}>Update</button>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default App;
