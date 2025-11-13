import { Resend } from "resend";
import { logger } from "./logger.util.js";

const{RESEND_API_KEY} = process.env
const resend = new Resend(RESEND_API_KEY)

export async function sendVerificationEmail(to, verificationCode) {
    const {data, error} = await resend.emails.send({
        from : 'Acme <onboarding@resend.dev>',
        to : 'agusrod9@gmail.com',
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
                            <img src="https://user-collected-cars-images-bucket.s3.us-east-2.amazonaws.com/public/wc.png" alt="We Collect Logo" class="logo">
                            <h2>Welcome to We Collect!</h2>
                            <p>We're thrilled to have you on board. Let's get your account set up!</p>
                            <p>Use the verification code below to confirm your email and start your collecting journey:</p>
                            <p class="code">${verificationCode}</p>
                            <p>If you didn't sign up for We Collect, just ignore this email.</p>
                            <p class="footer">Happy collecting! 🚗✨<br>The We Collect Team</p>
                        </div>
                    </body>
                </html>`,      
    })
    if (error) {
        return logger.error(error);
    }

}

export async function sendNewPasswordEmail(to, newPassword){
    const {data, error} = await resend.emails.send({
        from : 'Acme <onboarding@resend.dev>',
        to : 'agusrod9@gmail.com',
        subject : 'My Car Collection - Your single-use new password',
        html : `
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>We Collect - New Password</title>
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
                            .password-box {
                                font-size: 22px;
                                font-weight: bold;
                                color: #007bff;
                                background: #e9ecef;
                                padding: 10px;
                                border-radius: 5px;
                                display: inline-block;
                                margin: 10px 0;
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
                            <img src="https://user-collected-cars-images-bucket.s3.us-east-2.amazonaws.com/public/wc.png" alt="We Collect Logo" class="logo">
                            <h2>Password Reset Request</h2>
                            <p>We've received a request to reset your password. Use the temporary password below to log in:</p>
                            <p class="password-box">${newPassword}</p>
                            <p><strong>Important:</strong> Please change your password immediately after logging in.</p>
                            <p>If you didn't request a password reset, please ignore this email or contact support.</p>
                            <p class="footer">Stay safe! 🚗<br>The We Collect Team</p>
                        </div>
                    </body>
                </html>`
    })
    if (error) {
        return logger.error(error);
    }

}