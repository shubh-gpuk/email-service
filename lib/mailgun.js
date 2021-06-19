const MailgunClient = require('mailgun-js')
const logger = require('./logger.js')

class Mailgun{
    constructor({apiKey, domain}){
        if (!apiKey){
            throw new Error('Mailgun API key not provided');
        }
        if(!domain){
            throw new Error('Mailgun domain not provided')
        }
        this.apiKey = apiKey
        this.domain = domain
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
            let mailgunClient = new MailgunClient({apiKey: this.apiKey, domain: this.domain})

            mailgunClient.messages().send(data, (err, body) =>{
                if(err){
                    logger.error('Error while sending Mailgun email : ' + err.message)
                    //console.log('Error while sending Mailgun email : ' + err.message)
                    reject(err)
                }
                else{
                    logger.error("Successfully sent Mailgun email")
                    resolve(body)
                }
            })
            

        })
    }
}

module.exports = Mailgun