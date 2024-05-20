const express = require('express');
const { Astrologer, User, FlowDistribution } = require('./astrologers');
const app = express();
app.use(express.json());

let astrologers = [];
let users = [];
let flowDistribution;

app.post('/astrologers', (req, res) => {
    const { id, name, isTopAstrologer } = req.body;
    const astrologer = new Astrologer(id, name, isTopAstrologer);
    console.log(astrologer)
    astrologers.push(astrologer);
    flowDistribution = new FlowDistribution(astrologers);
    res.status(201).json({
        success: true,
        message: 'astrologer is joined',
        astrologer
    });
});

app.post('/users', (req, res) => {
    const { id, name } = req.body;
    const user = new User(id, name);
    users.push(user);
    const astrologer = flowDistribution.distributeUser(user);
    console.log(astrologer)
    res.status(201).json({
        success: true,
        message: 'astrologer is',
        astrologer
    });
});

app.post('/adjust-top-astrologers', (req, res) => {
    const { id, newFlowStatus } = req.body;

    flowDistribution.adjustFlowForTopAstrologers(id, newFlowStatus)

    res.status(201).json({
        success: true,
        message: 'adjust Flow is sucessfully'
    })
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});