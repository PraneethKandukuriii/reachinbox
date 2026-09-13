import nodemailer from "nodemailer";

interface SendEmailInput {
    from : string,
    to : string,
    subject : string,
    body : string
    smtpUser : string,
    smtpPassword : string,

}

export async function sendEmail(input: SendEmailInput) {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: input.smtpUser,
            pass: input.smtpPassword,
        },
    });

    const info = await transporter.sendMail({
        from: input.from,
        to: input.to,
        subject: input.subject,
        text: input.body,
    });

    return info;
}
