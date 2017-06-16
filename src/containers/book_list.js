import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {

    renderList() {
        return this.props.books.map((book)=> {
            return (
                <li
                    onClick={() => this.props.selectBook(book)}
                    key={book.title}
                    className="list-group-item">{book.title}
                </li>
            )
        });
    }


    render() {
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    //whatever is returned will show up as props inside booklist
    return {
        books: state.books
    };
}

//anything returned from this funtion will end up as props on booklist container
function mapDispatchToProps(dispatch) {
    //whenever select book is called the result should be passed to all the reducers.
    return bindActionCreators( { selectBook: selectBook }, dispatch)
}

//promote booklist from a component to a container - needs to know about selectBook and makes it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);