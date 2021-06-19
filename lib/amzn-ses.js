const {SESClient, SendEmailCommand} = require('@aws-sdk/client-ses')
const logger = require('./logger.js')

class Ses{
    constructor({accessKeyId, secretKey, region}){
        if(!accessKeyId){
            throw new Error('SES access key not provided')
        }
        if (!secretKey){
            throw new Error('SES secret key not provided')
        }
        if(!region){
            throw new Error('SES region not provided')
        }
        
        this.accessKeyId = accessKeyId
        this.secretKey = secretKey
        this.region = region

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
            Destination: {
              CcAddresses: [],
              ToAddresses: [to],
            },
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: "",
                },
                Text: {
                  Charset: "UTF-8",
                  Data: content,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: subject,
              },
            },
            Source: from,
            ReplyToAddresses: [],
        }

        return new Promise((resolve, reject) => {
            
            let sesClient = new SESClient({accessKeyId: this.accessKeyId, secretAccessKey: this.secretKey, region: this.region})

            sesClient.send(new SendEmailCommand(data))
            .then((body) => {
                logger.info("SES email sent successfully")
                resolve(body)
            })
            .catch((err) => {
                logger.error(err)
                console.log(err)
                reject(err)
            })

        })
    }
}

module.exports = Ses