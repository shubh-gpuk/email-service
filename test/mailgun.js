const Mailgun = require('../lib/mailgun')
const assert = require('assert')
const config = require('./config.js')
require('dotenv').config()

describe('Tests for Mailgun', function(){

    describe('#wrong keys and send', function() {
        it('should error for incorrect apiKey', function(done) {
            const resolvingPromise = new Promise((resolve,reject)=>{

                let mailer = new Mailgun({
                    apiKey: config.wrongApiKey,
                    domain: process.env.MAILGUN_DOMAIN
                })

                mailer.send(config.from, config.to, 'Some subject', 'Some content')
                    .then((body)=>resolve(body))
                    .catch((e)=>reject(e))
            })

            resolvingPromise
                .then((result)=>{})
                .catch((e)=>{assert.strictEqual(e.message, 'Forbidden')})
                .then(done,done)
        })

        it('should successfully send the mail', function(done) {
            const resolvingPromise = new Promise((resolve,reject)=>{

                let mailer = new Mailgun({
                    apiKey: process.env.MAILGUN_API_KEY,
                    domain: process.env.MAILGUN_DOMAIN
                })

                mailer.send(config.from, config.to, 'Some subject', 'Some content')
                    .then((body)=>resolve(body))
                    .catch((e)=>reject(e))
            })

            resolvingPromise
                .then((result)=>{assert.ok(result)})
                .then(done,done)
        })
    })
})