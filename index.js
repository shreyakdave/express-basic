const express = require('express');
const _ = require('underscore')
const users = require('./users.json')

const app = express();
const router = express.Router();
app.use(express.json());


app.listen(8081, () => {
    console.log('listening on port 8081');
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    // Validate
    if (!name || name.length < 1 || !_.isString(name) || _.isNumber(name)) {
        return res.status(400).json({
            error: {
                message: "Invalid name"
            }
        })
    }
    if (!email || email.length < 6 || !_.isString(email) || _.isNumber(email)) {
        let isvalid = false;
        const indexat = email.lastIndexOf('@');
        if (indexat > -1) {
            const indexdot = email.lastIndexOf('.', indexat + 1);
            if (indexdot > -1 && email.length > indexdot) {
                isvalid = true
            }
        }
        if(!isvalid){
            return res.status(400).json({
                error: {
                    message: "Invalid email"
                }
            })
        }
    }
    if (!password || password.length < 6 || !_.isString(password)) {
        return res.status(400).json({
            error: {
                message: "Invalid password"
            }
        })
    }
    // Check if exists
    const isExist = _.find(users, (eachUser) => {
        return eachUser.email == email;
    })
    
    if (isExist) {
        return res.json({
            error: {
                message: "Email already registered"
            }
        })
    }
    
    // Push into file
    users.push({
        name,
        email,
        password
    });
    
    // Return response
    return res.status(201).json({
        name,
        email,
        status: 'Success'
    })
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    // Validate
    if (!email || email.length < 6 || !_.isString(email) || _.isNumber(email)) {
        let isvalid = false;
        const indexat = email.lastIndexOf('@');
        if (indexat > -1) {
            const indexdot = email.lastIndexOf('.', index + 1);
            if (indexdot > -1 && email.length > indexdot) {
                isvalid = true
            }
        }
        if(!isvalid){
            return res.status(400).json({
                error: {
                    message: "Invalid email"
                }
            })
        }
    }
    if (!password || password.length < 6 || !_.isString(password)) {
        return res.status(400).json({
            error: {
                message: "Invalid password"
            }
        })
    }

    // search and Check if exists
    const isExist = _.find(users, (eachUser) => {
        return eachUser.email == email
    })
    if (!isExist) {
        return res.json({
            error: {
                message: "Email is not registered"
            }
        })
    }
    if(password != isExist.password) {
        return res.json({
            error: {
                message: "Passwords do not match"
            }
        })
    }
    // smishra@deqode.com

    // Return reponse
    return res.json({
        message: "Success",
        email
    })
})

