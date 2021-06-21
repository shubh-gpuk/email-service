This package provides abstraction for various email service providers. 
Incase if an email service is unavailable, it failovers to another service in a round-robin fashion.

# Features
1. Support for multiple email service providers.

    1. Sendgrid
    2. Mailgun
    3. Mandrill
    4. Amazon SES

2. Automatically failovers to another service in case of a service unavailability.

3. UTF-8 supported.



# Usage
This package has been published to npmjs : [next-email-service](https://www.npmjs.com/package/next-email-service)

In order to use it in other services, follow these steps -

### 1. Install the package using

`npm i next-email-service`


### 2. Set environment variables
Need to set the following environment variables :
```
#Sendgrid
SENDGRID_API_KEY = API_KEY

#Mailgun
MAILGUN_API_KEY = API_KEY
MAILGUN_DOMAIN = DOMAIN

#Mandrill
MANDRILL_API_KEY = API_KEY

#Amazon SES
AWS_ACCESS_KEY_ID = ACCESS_KEY_ID
AWS_SECRET_KEY = SECRET_KEY
AWS_REGION = REGION
```

### 3. Create a JS object 'config' of the following type
```
//Install dotenv if required
//Then use dotenv to access environment variables
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
```

### 4. Create a MailService object, passing 'config' to constructor
```
const MailService = require('next-email-service)
let service = new MailService(config)
```
### 4. Use sendEmail method to send an email
```
const msg = {
    from: 'sender@email.com',
    to: 'receiver@email.com',
    subject: 'some subject',
    content: 'some content'   
}

service.sendEmail(msg.from, msg.to, msg.subject, msg.content)
.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.log(err)
})
```

# Test
For running the tests, first create **config.js** file in **test** folder. It should look like:
```
const config = {
    wrongApiKey : 'fasgnjgtweti4we45anwad',
    from: 'sender@email.com',
    to: 'receiver@email.com'
}
module.exports = config
```
Then run command 
```
npm test
```

# Some improvements needed
- Add more test cases
- Add more validations on data


# Todo
If given more time, would like to add these features as well.

- Attachments
- Multiple receivers
- Email templates



