const typeDefs = `

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: String
        user: User
    }

    input saveBookContent {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String 
        link: String
    }

    type Query {
        me(_id: ID): [User]
    }

    type Mutation {
        login(email: String, password: String): Auth
        addNewUser(username: String, email: String, password: String): Auth
        saveBook(book: saveBookContent): User
        removeBook(bookId: String): User
    }

`

module.exports = typeDefs;