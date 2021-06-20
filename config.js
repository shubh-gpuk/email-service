require('dotenv').config()

const config = {
    services: {
        sendgrid: {
            apiKey: process.env.SENDGRID_API_KEY,
        },
        mailgun: {
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN,
        },
        mandrill:{
            mandrill: process.env.MANDRILL_API_KEY
        },
        ses:{
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION,
        },
    },
    numOfRetries:3,
    servicePriority: ['sendgrid', 'mailgun', 'ses', 'mandrill'],
}

module.exports = config