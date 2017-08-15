import React, {Component} from 'react';
import Book from './Book'
import escapeRegExp from 'escape-string-regexp';
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

class Shelf extends Component {


     beautifyShelf = (shelf) => {
      switch (shelf) {

        case "wantToRead": return "Want to Read";
        break;
        case "currentlyReading": return "Currently Reading";
        break;
        case "read": return "Read";
        break;

      }
    }



    render() {
        const {shelves} = this.props

        console.log("The props are: ", this.props)
        return (

            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        {shelves.map(shelf => (
                            <div key={shelf} className="bookshelf">
                                <h2 className="bookshelf-title">{this.beautifyShelf(shelf)}</h2>
                                <div className="bookshelf-books">
                                    <Book updateBook={this.props.updateShelf} books= {this.props.books.filter(book => book.shelf === shelf)}/>
                                </div>
                            </div>
                        ))}
                        <div className="open-search">
                            <Link to="/search">Add a book
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default Shelf;
