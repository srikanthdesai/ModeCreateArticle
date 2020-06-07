const { Router } = require('express');
const router = Router();

const {Article, User, UserLoggedInArticles} = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('hello')
});

let users = [];
let articles = [];

router.post('/register', async (req, res) => {
    const { username, email, password, address } = req.body;
    const userExists = users.some((user) => user.username == username && user.email == email);

    if(userExists) {
        return res.status(400).send({message: "User with username and email already exists"});
    }

    const newUser = users.push({username, email, password, address});
    res.status(201).json({message: "new user created"});
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const userExists = users.some((user) => user.username == username && user.password == password);
    if(!userExists) {
        return res.status(401).send({message: "Invalid username or password"});
    }

    const token = jwt.sign({username: username}, 'topsecret');
    const user = users.find((user) => user.username == username && user.password == password);
    if(user) {
        user.token = token;
    }

    console.log('user=', user);

    return res.status(200).json({message: "success", accessToken: user.token});
});

router.post('/articles', (req, res) => {
    const { title, body, author} = req.body;
    articles.push({ title, body, author });
    return res.status(201).send({message: "new article created"});
});

router.get('/articles', (req, res) => {
    return res.status(200).json({
        data: articles
    });

});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authentication) {
			return res.status(401).send('Unauhtorized Request');
        }
        console.log('req.headers=', req.headers);
		let token = req.headers.authentication;
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'topsecret');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
        }
        
        req.userId = payload._id;
        console.log('userid=',payload);
        
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}
/*
async function verifyToken(req, res, next) {
	try {
	
		const payload = await jwt.verify(accessToken, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		//req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}*/

module.exports = router;
