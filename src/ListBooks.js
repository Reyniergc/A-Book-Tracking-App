import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import RenderBooks from './RenderBooks'

class ListBooks extends Component {

	render() {
		const { books } = this.props
		let arrCurrentlyReading = [];
		let arrWantToRead = [];
		let arrRead = [];

		// Cicle to loop through each Book from the all Books object.
		for (const book of books) {
			if (book.shelf.toLowerCase() === "currentlyReading".toLowerCase()) {
				arrCurrentlyReading.push(book);
			}
			else if (book.shelf.toLowerCase() === "wantToRead".toLowerCase()) {
				arrWantToRead.push(book);
			}
			else {
				arrRead.push(book);
			}
		}

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<RenderBooks books={arrCurrentlyReading} shelfTitle={"Currently Reading"} />
						<RenderBooks books={arrWantToRead} shelfTitle={"Want To Read"} />
						<RenderBooks books={arrRead} shelfTitle={"Read"} />
					</div>
				</div>

				<div className="open-search">
					<a>Add a book</a>
				</div>
			</div>
		)
	}
}

ListBooks.propTypes = {
	books: PropTypes.array.isRequired
};

export default ListBooks


/*<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>*/