import React, { Component } from 'react';
import PropTypes from 'prop-types'

class RenderBooks extends Component {

	render() {
		const { books, handleChange, shelfTitle } = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{ shelfTitle }</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map((book) => (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 
											`url(${book.imageLinks.smallThumbnail})` }}>
										</div>
										<div className="book-shelf-changer">
											<select name={shelfTitle} value={book.shelf} onChange={(event) => handleChange(event, book)}>
												<option value="none" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{ book.title }</div>
									{book.authors.map((author) => (
										<div className="book-authors">{ author }</div>
									))}
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

RenderBooks.propTypes = {
	books: PropTypes.array.isRequired,
	handleChange: PropTypes.func.isRequired,
	shelfTitle: PropTypes.string.isRequired	
};

export default RenderBooks