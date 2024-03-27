import { createTransport }  from 'nodemailer'

console.log('Loading function');

export const handler = async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    
    let transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        auth: {
            type: process.env.SMTP_AUTH_TYPE,
            user: process.env.SMTP_AUTH_USER,
            clientId: process.env.OAUTHCLIENT_ID,
            clientSecret: process.env.OAUTHCLIENT_SECRET,
            refreshToken: process.env.OAUTHCLIENT_REFRESH_TOKEN,
        },
    }) 

    for (const { messageId, body } of event.Records) {
        console.log('SQS message %s: %j', messageId, body);
        await transporter.sendMail({
            from: process.env.SMTP_AUTH_USER,
            to: process.env.SMTP_USER_TO,
            subject: `New SQS Message! id: ${messageId}`,
            text: body,
            auth: {
                user: process.env.SMTP_AUTH_USER,
            },
        })
    }

    return `Successfully processed ${event.Records.length} messages.`;
};