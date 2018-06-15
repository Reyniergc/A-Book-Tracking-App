import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './utils/BooksAPI';

class SearchBooks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			listBooks: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.prueba = this.prueba.bind(this);
	}
	
	prueba = (event, bookSelect) => {
		const { updateListShelf } = this.props;

		for (const book of this.state.listBooks) {
			if (book.id === bookSelect.id) {
				book.shelf = event.target.value;
				break;
			}
		}

		this.setState({ listBooks: this.state.listBooks });
		
		updateListShelf(event, bookSelect);
	}
	
	handleChange = (event) => {
		const { books } = this.props;
		const query = event.target.value.trim();

		if (query.length > 0) {
			BooksAPI.search(query).then((queryBooks) => {
				if (queryBooks instanceof Array) {
					let booksFilter = queryBooks.filter(book => book.imageLinks && book.authors);
					
					for (const bookFilter of booksFilter) {
						bookFilter.shelf = "none";
					}
					
					if (booksFilter !== undefined) {
						for (const book of books) {
							for (let bookFilter of booksFilter) {
								if (book.id === bookFilter.id) {
									bookFilter.shelf = book.shelf;
									break;
								}
							}
						}
						this.setState({ listBooks: booksFilter });
					}
				}
				else {
					this.setState({ listBooks: [] });
				}
			});
		}
		else {
			this.setState({ listBooks: [] });
		}
	}
	
	/* If the book found on the search query is already on the shelf then the value of this book should
	   be the value of the category of the book on the shelf otherwise the value should be none. */
	isBookOnShelf(bookSearchResult) {
		const { books } = this.props;
		const result = books.filter(book => book.id === bookSearchResult.id);

		return (result.length > 0) ? result[0].shelf : "none";		
	}

	render() {
		//const { updateListShelf } = this.props

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className='close-search' to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" onChange={(event) => this.handleChange(event)} />
					</div>
				</div>

				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.listBooks.map((book) => (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 
											`url(${ book.imageLinks.smallThumbnail })` }}>
										</div>
										<div className="book-shelf-changer">
											<select value={book.shelf} onChange={(event) => this.prueba(event, book)}>
												<option disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{ book.title }</div>
									{book.authors.map((author, index) => (
										<div key={index} className="book-authors">{ author }</div>
									))}
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

SearchBooks.propTypes = {
	books: PropTypes.array.isRequired,
	updateListShelf: PropTypes.func.isRequired
};

export default SearchBooks