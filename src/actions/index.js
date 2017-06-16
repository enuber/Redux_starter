export function selectBook(book) {
    //select book is an action creater needs to return an action, an object with a type property
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
}