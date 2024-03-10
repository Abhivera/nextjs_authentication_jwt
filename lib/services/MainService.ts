import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'asha.klocko68@ethereal.email',
        pass: 'zQ7p3B2dWWmXWcMgcC'
    }
});

export const SendEmail= async (name:string,email:string,token:string)=>{
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `Hey,${name},
    <a href="http://localhost:3000/update-password?token=${token}"> click here </a>`, // html body
      });
}
