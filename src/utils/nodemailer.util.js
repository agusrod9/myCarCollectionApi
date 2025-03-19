import {createTransport} from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const {GOOGLE_MAIL, GOOGLE_PASS} = process.env;
const __dirname = path.dirname(process.cwd());

const transport = createTransport({
    host : 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : { user: GOOGLE_MAIL, pass: GOOGLE_PASS}
});

const sendVerificationEmail = async(to, verificationCode)=>{
    try {
        await transport.verify();
        await transport.sendMail({
            from : GOOGLE_MAIL,
            to,
            subject : 'My Car Collection - Please verify your e-mail',
            html : `
                    <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>We Collect - Verify Your Email</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            background-color: #f4f4f4;
                            padding: 20px;
                        }
                        .email-container {
                            background: white;
                            padding: 20px;
                            border-radius: 10px;
                            max-width: 500px;
                            margin: auto;
                            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                        }
                        .logo {
                            max-width: 200px;
                        }
                        .code {
                            font-size: 20px;
                            font-weight: bold;
                            color: #007bff;
                        }
                        .footer {
                            margin-top: 20px;
                            font-size: 12px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <img src="cid:wecollectlogo" alt="We Collect Logo" class="logo">
                        <h2>Welcome to We Collect!</h2>
                        <p>We're thrilled to have you on board. Let's get your account set up!</p>
                        <p>Use the verification code below to confirm your email and start your collecting journey:</p>
                        <p class="code">${verificationCode}</p>
                        <p>If you didn't sign up for We Collect, just ignore this email.</p>
                        <p class="footer">Happy collecting! 🚗✨<br>The We Collect Team</p>
                    </div>
                </body>
    </html>
            `,
            attachments:[{
                filename : 'wecollect.png',
                path : path.resolve(__dirname, 'public/img/wc.png'),
                cid: 'wecollectlogo'
            }]
        })
    } catch (error) {
        throw error;
    }
}

export {sendVerificationEmail}