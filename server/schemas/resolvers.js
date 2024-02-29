const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // me: async (parent, { _id }) => {
        //     const params = _id ? { _id } : {}
        //     return User.find(params);
        // }
        me: async (parent, args, context) => {
            console.log("Running ME")
            console.log(context.user._id);
            if (context.user) {
                return User.findOne({ _id: context.user._id }) //.populate('savedBooks')
                // const user = User.findOne({ _id: context.user._id }).populate('savedBooks')
                // console.log(user)
                // return user
            }
            throw AuthenticationError;
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
        saveBook: async (parent,  saveBookContent, context ) => {
            console.log(saveBookContent)
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                // { username: "test" },
                { $addToSet: { savedBooks: saveBookContent.book }},
                { new: true }
            )

            if (!user) {
                throw AuthenticationError;
            }

            return user;
        },
        removeBook: async (parent, {bookIdRm}, context ) => {
            console.log("book to remove", bookIdRm);
            console.log("user ID", context.user._id)
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                // { username: "test" },
                { $pull: { savedBooks: { bookId: bookIdRm}}},
                { new: true }
            )

            if (!user) {
                throw AuthenticationError;
            }

            return user;
        }
    }
}

module.exports = resolvers;
