import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import Shelf from './Shelf'
import Search from './Search'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        books: [],
        searchedBooks: [],
        shelves: ["wantToRead", "currentlyReading", "read"]
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(this.setState(state => ({
            books: state.books.concat(state.searchedBooks).map(item => {
                if (item.id === book.id) {
                    item.shelf = shelf
                    return item
                } else {
                    return item
                }

            })
        })))
    }

    handleSearch = (query) => {
        BooksAPI.search(query, 20).then(searchResult => {
            const noShelf = searchResult.filter(book => !book.shelf).map(item => {
                if (this.state.books.find(b => b.id === item.id)) {
                    this.state.books.filter(b => b.id === item.id).map(book => {
                        item.shelf = book.shelf
                    })
                    return item
                } else {
                    item.shelf = "none"
                    return item
                }
            })
            this.setState({searchedBooks: noShelf})
        })
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books})
        })
    }

    updateSearchScreen = (status) => {
        this.setState({showSearchPage: status})
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (<Shelf shelves={this.state.shelves} books={this.state.books} updateShelf={this.updateShelf}/>)}/>
                <Route path="/search" render={() => (<Search updateShelf={this.updateShelf} searchBooks={this.handleSearch} searchedBooks={this.state.searchedBooks}/>)}/>
            </div>
        )
    }
}

export default BooksApp
