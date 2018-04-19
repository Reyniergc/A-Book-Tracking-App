import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  
	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		})
	}

	render() {
		return (
			<div className="app">
				<ListBooks books={this.state.books} />
			</div>
		);
	}
}

export default BooksApp