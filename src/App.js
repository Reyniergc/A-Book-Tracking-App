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
			books: [],
			value1: 'currentlyReading',
			value2: 'wantToRead',
			value3: 'read'
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		});
	}

	handleChange(event, bookFromSelect) {
		for (const book of this.state.books) {
			if (book.id === bookFromSelect.id) {
				book.shelf = event.target.value;
				break;
			}
		}

		this.setState({
			books: this.state.books
		});
		
		BooksAPI.update(bookFromSelect, event.target.value);
	}

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<ListBooks
						books={this.state.books}
						handleChange={this.handleChange}
						value1={this.state.value1}
						value2={this.state.value2}
						value3={this.state.value3}					
					/>
				)}/>
				<Route path='/search' render={() => (
					<SearchBooks />
				)}/>
			</div>
		);
	}
}

export default BooksApp