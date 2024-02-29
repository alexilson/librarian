import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        savedBooks {
          _id
        }
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addNewUser($username: String, $email: String, $password: String) {
    addNewUser(username: $username, email: $email, password: $password) {
      user {
        _id
        username
        email
        password
        savedBooks {
          _id
        }
      }
      token
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SaveBook($book: saveBookContent) {
    saveBook(book: $book) {
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookIdRm: String) {
    removeBook(bookIdRm: $bookIdRm) {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;