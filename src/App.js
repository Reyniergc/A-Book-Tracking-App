import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			books: []
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		});
	}

	handleChange(event, bookFromSelect) {		
		const value = event.target.value;
		
		BooksAPI.update(bookFromSelect, event.target.value).then(() => {
			for (const book of this.state.books) {
				if (book.id === bookFromSelect.id) {
					book.shelf = value;
					break;
				}
			}

			this.setState({
				books: this.state.books
			});
		})
	}
	
	/* This method verify if the book is on the library. If is not on the library then the book is add directly.
	   On the other hand, if the book is on the library we must update only the property shelf of the book.
	*/
	isBookOnShelf(bookFromSearchPage) {
		return this.state.books.filter(book => book.id === bookFromSearchPage.id);
	}
	
	updateListShelf = (event, bookFromSearchPage) => {
		const value = event.target.value;
		const bookSearch = bookFromSearchPage;

		BooksAPI.update(bookFromSearchPage, event.target.value).then(() => {
			let book = this.isBookOnShelf(bookSearch);
			
			if (book.length === 0) {
				// Add new property shelf to the new book added to the list of shelves.
				bookSearch["shelf"] = value;
				this.setState(state => ({
					books: state.books.push(bookSearch)
				}));
			}
			else {
				book[0].shelf = value;
				this.setState(state => ({
					books: state.books
				}));
			}
		})
	}

	/*updateListShelf = (event, bookFromSearchPage) => {
		let book = this.isBookOnShelf(bookFromSearchPage);

		if (book.length === 0) {
			// Add new property shelf to the new book added to the list of shelves.
			bookFromSearchPage["shelf"] = event.target.value;
			this.setState({
				books: this.state.books.push(bookFromSearchPage)
			});
		}
		else {
			book[0].shelf = event.target.value;
			this.setState({
				books: this.state.books
			});
		}

		BooksAPI.update(bookFromSearchPage, event.target.value);
	}*/

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<ListBooks
						books={this.state.books}
						handleChange={this.handleChange}					
					/>
				)}/>
				<Route path='/search' render={() => (
					<SearchBooks
						books={this.state.books}
						updateListShelf={this.updateListShelf}
					/>
				)}/>
			</div>
		);
	}
}

export default BooksApp