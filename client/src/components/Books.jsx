import React, { useState } from "react";

function Books() {
	const [bookArray, setBookArray] = useState([]);
	const [bookTitle, setBookTitle] = useState("");

	const handleTitleChange = (event) => {
		setBookTitle(event.target.value);
	};

	const handleAddBook = () => {
		if (bookTitle === "") {
			alert("pls type something");
		} else {
			setBookArray([...bookArray, bookTitle]);
			setBookTitle("");
		}
	};

	console.log(bookArray);

	return (
		<div>
			<h2>Add Book Titles to Array</h2>
			<input
				type='text'
				value={bookTitle}
				onChange={handleTitleChange}
				placeholder='Enter book title'
			/>
			<button onClick={handleAddBook}>Add Book</button>
			<ul>
				{bookArray.map((title, index) => (
					<li key={index}>{title}</li>
				))}
			</ul>
		</div>
	);
}

export default Books;
