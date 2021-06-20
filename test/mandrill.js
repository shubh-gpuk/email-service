const Mandrill = require('../lib/mandrill')
const assert = require('assert')
const config = require('./config.js')
require('dotenv').config()

describe('Tests for Mandrill', function(){

    describe('wrong keys and send', function() {
        it('should error for incorrect apiKey', function(done) {
            const resolvingPromise = new Promise((resolve,reject)=>{

                let mailer = new Mandrill({
                    apiKey: config.wrongApiKey
                })

                mailer.send(config.from, config.to, 'Some subject', 'Some content')
                    .then((body)=>resolve(body))
                    .catch((e)=>reject(e))
            })

            resolvingPromise
                .then((result)=>{})
                .catch((e)=>{assert.strictEqual(e.message, 'Invalid API key')})
                .then(done,done)
        })

        it('should successfully send the mail', function(done) {
            const resolvingPromise = new Promise((resolve,reject)=>{

                let mailer = new Mandrill({
                    apiKey: process.env.MANDRILL_API_KEY
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