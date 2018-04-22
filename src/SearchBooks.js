import React, { Component } from 'react';
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
	}

	handleChange = (event) => {
		const query = event.target.value.trim();

		if (query.length > 0) {
			BooksAPI.search(query).then((queryBooks) => {
				this.setState({ listBooks: queryBooks });
			});
		}
		else {
			this.setState({ listBooks: [] });
		}
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className='close-search' to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" onChange={(event) => this.handleChange(event)} />
					</div>
				</div>

				{this.state.listBooks !== undefined && this.state.listBooks.length > 0 && (
					<div className="search-books-results">
						<ol className="books-grid">
							{this.state.listBooks.map((book) => (
								<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 
												`url(${book.imageLinks.smallThumbnail})` }}>
											</div>
											<div className="book-shelf-changer">
												<select >
													<option value="none" disabled>Move to...</option>
													<option value="currentlyReading">Currently Reading</option>
													<option value="wantToRead">Want to Read</option>
													<option value="read">Read</option>
													<option value="none">None</option>
												</select>
												<input type="hidden" value={book.id} id="prueba" />
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
				)}
			</div>
		);
	}
}

/*SearchBooks.propTypes = {
	books: PropTypes.array.isRequired
};*/

export default SearchBooks

/*
<div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                }
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
		  
		  */