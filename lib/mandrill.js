const nodemailer = require('nodemailer')
const mandrillTransport = require('nodemailer-mandrill-transport')
const logger = require('./logger.js')

class Mandrill{
    constructor({apiKey}){
        if (!apiKey){
            throw new Error('Mandrill API key not provided');
        }

        this.apiKey = apiKey
    }

    /**
     * Send an email
     * 
     * @param {String} from 
     * @param {String} to 
     * @param {String} subject 
     * @param {String} content 
     * @returns {Promise}
     */

    send(from, to, subject, content){
        const data = {
            from: from,
            to: to,
            subject: subject,
            html: content
        }

        return new Promise((resolve, reject) => {
            const mandrillClient = nodemailer.createTransport(mandrillTransport({
                auth: {
                  apiKey : this.apiKey
                }
            }))

            mandrillClient.sendMail(data, (err, body) =>{
                if(err){
                    logger.error('Error while sending Mandrill email : ' + err.message)
                    console.log('Error while sending Mandrill email : ' + err.message)
                    reject(err)
                }
                else{
                    logger.error("Successfully sent Mandrill email")
                    resolve(body)
                }
            })
            

        })
    }
}

module.exports = Mandrill