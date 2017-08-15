import React, {Component} from 'react';
import Book from './Book'
import Shelf from './Shelf'
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'

class Search extends Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query})
    }

    render() {

        const {query} = this.state

        console.log("The props are: ", this.props)
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/"/>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author" value={query} onChange= {(event) => {this.updateQuery(event.target.value)}} onSubmit= { query !== '' ? this.props.searchBooks(query) : null}/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <Book books={this.props.searchedBooks} updateBook={this.props.updateShelf}/>
                    </div>
                </div>
            </div>

        )
    }

}

export default Search;
