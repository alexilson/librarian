const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { _id }) => {
            const params = _id ? { _id } : {}
            return User.find(params);
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const validPw = await user.isCorrectPassword(password)

            if (!validPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user }
        },
        addNewUser: async (parent, { username, email, password }) => {
             const user = await User.create({ username, email, password });
             const token = signToken(user);
             return { token, user };
        },
        saveBook: async (parent, { saveBookContent }) => {
            return console.log(saveBookContent)
        }
    }
}

module.exports = resolvers;
