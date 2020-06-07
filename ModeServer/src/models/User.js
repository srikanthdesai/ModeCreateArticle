// const { Schema, model } = require('mongoose');

// const userSchema = new Schema({
//     email: String,
//     password: String
// }, {
//     timestamps: true
// });

// module.exports = model('User', userSchema, 'users');

class Article {
    title;
    body;
    author;
}

class User {
    username;
    email;
    address;
    password;
    token;
    isAuthenticated;
    articles;
}

class UserLoggedInArticles {
    users = [];
}

module.exports = {Article, User, UserLoggedInArticles};