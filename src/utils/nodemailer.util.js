import {createTransport} from 'nodemailer';

const {GOOGLE_MAIL, GOOGLE_PASS} = process.env;

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
                    <body>
                        <h2>Welcome to My Car Collection!</h2>
                        <p>Thank you for signing up. Please verify your email address to complete your registration.</p>
                        <p>Your verification code is: <strong>${verificationCode}</strong></p>
                        <p>If you did not request this, please ignore this email.</p>
                        <br>
                        <p>Best regards,</p>
                        <p>The My Car Collection Team</p>
                    </body>
                </html>
            `
        })
    } catch (error) {
        throw error;
    }
}

export {sendVerificationEmail}