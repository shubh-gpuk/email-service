const Ses = require('../lib/amzn-ses')
const assert = require('assert')
const config = require('./config.js')
require('dotenv').config()

describe('Tests for Amazon SES', function(){

    describe('#send', function() {
        it('should successfully send the mail', function(done) {
            const resolvingPromise = new Promise((resolve,reject)=>{

                let mailer = new Ses({
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretKey: process.env.AWS_SECRET_KEY,
                    region: process.env.AWS_REGION
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