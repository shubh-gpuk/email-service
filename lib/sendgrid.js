const sgMail = require('@sendgrid/mail')
const logger = require('./logger.js')

class Sendgrid{
    constructor({apiKey}){
        if(!apiKey){
            throw new Error('API key not provided');
        }
        sgMail.setApiKey(apiKey)
    }

    /** 
     * Send an email
     * 
     * @param {String} from
     * @param {String} to
     * @param {String} subject
     * @param {String} content
     * @returns {Promise}
     * 
    */

    send(from, to, subject, content){
        const data = {
            from: from,
            to: to,
            subject: subject,
            text: content
        }

        return new Promise((resolve, reject) => {
            sgMail.send(data)
            .then(() => {
                logger.info('Email sent successfully using Sendgrid')
                resolve()
            })
            .catch((err) => {
                // console.log(err)
                logger.info('Email could not be sent using Sendgrid')
                logger.error(err)
                reject(err)
            })
        })
        
    }
        
}

module.exports = Sendgrid


// const msg = {
//   to: 'shubh.gpuk@gmail.com', // Change to your recipient
//   from: 'shubham.rrk99@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
  
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })