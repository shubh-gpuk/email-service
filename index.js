// require('dotenv').config()
const logger = require('./lib/logger')
const Sendgrid = require('./lib/sendgrid')
const Mailgun = require('./lib/mailgun')
const Ses = require('./lib/amzn-ses')
const Mandrill = require('./lib/mandrill')
const config = require('./config.js')

let serviceClasses = {
    Sendgrid,
    Mailgun,
    Ses,
    Mandrill
}

function capitalizeFirstLetter(str){
    str = str.toLowerCase()
    return str[0].toUpperCase() + str.slice(1)
}

class MailService{
    constructor(config){

        this.config = config
        // validateConfig(config)
    }


    /**
     * Send an email using the given service
     * 
     * @param {String} serviceName
     * @param {String} data
     * @returns {Promise}
     * 
     */

    sendWithService(serviceName, data){
        
        return new Promise((resolve, reject) => {

            //Service not supported
            if(!(this.config.servicePriority.includes(serviceName))){
                logger.error(`${serviceName} is not supported`)
                reject('Service not supported')
            }

            const serviceArgs = this.config.services[serviceName]
            const serviceClass = capitalizeFirstLetter(serviceName)
            let service
            try{
                service = new serviceClasses[serviceClass](serviceArgs)
            }
            catch(err){
                logger.error(err)
                console.log(err)
                reject(err)
            }
            
            service.send(data.from, data.to, data.subject, data.content)
            .then((result) => {
                // console.log('Email sent successfully')
                resolve(result)
            })
            .catch((err) => {
                // console.error('Email could NOT be sent')
                reject(err)
            })
        })
    }

    /**
     * Send an email
     * 
     * @param {String} to 
     * @param {String} from 
     * @param {String} subject 
     * @param {String} email 
     * @returns {Promise}
     */

    sendEmail(from, to, subject, content){

        const data = {
            from: from,
            to: to,
            subject: subject,
            content: content
        }

        return new Promise((resolve, reject) => {

            let serviceIndex = 0       //Index of service in servicePriority array
    
            //In case of failure of a service, try sending email using next service (in round-robin fashion)
            //If unable to send email within numOfRetries attempts then throw error
            const handleFailure = async (err) => {
                for(let retryIdx = 0; retryIdx < this.config.numOfRetries; ++retryIdx){
                    for(let serviceIdx = 0; serviceIdx < this.config.servicePriority.length; ++serviceIdx){
                        logger.info(`Retry index : ${retryIdx} -- with service index ${serviceIdx}`)
                        await this.sendWithService(this.config.servicePriority[serviceIdx], data)
                        .then((result) => {
                            resolve(result)
                        })
                        .catch((err) => {
                            //console.log(err)
                        })
                    }
                }
                logger.info('Unable to deliver email')
                reject('Unable to deliver email')
            }

            this.sendWithService(this.config.servicePriority[serviceIndex], data)
            .then((result) => {
                // console.log('Email sent successfully')
                resolve(result)
            })
            .catch(handleFailure)
        })

    }

}

module.exports = MailService




