const express = require('express')
const path = require('path')
var Rollbar = require('rollbar')

var rollbar = new Rollbar({
  accessToken: 'daeabd0d9cdf44b4831d88469ce66d48',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
rollbar.log('hello world!')

const app = express()
require('dotenv').config();
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

app.use(express.json());

app.use(express.static("public"));

app.get('/styles', (req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.css'));
});

app.get('/js', (req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.js'))
    rollbar.info("HTML file served successfully")
})

app.post('/api/robots'), (rec, res) => {
    let {getAllBots} = req.body;
    getAllBots = getAllBots.trim();

    const index = getAllBots.findIndex((getAllBots) => getAllBots === getAllBots);

    if(index === -1 && getAllBots !== "") {
        getAllBots.push(getAllBots);
        rollbar.log('robot added successfully', {author: "Christine", type: "clicked on"});
        res.status(200).sendD(getAllBots);
    }else if(getAllBots === "") {
        rollbar.error('No robot chosen');
        res.status(400).send('must chose robots');
    }else {
        rollbar.error('robot already chosen');
        res.status(400).send('robot has already been chosen')
    }
}


app.get('/api/robots', (req, res) => {
    rollbar.info("Someone got the list of robots on page load")
    try {
        res.status(200).send(botsArr)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})