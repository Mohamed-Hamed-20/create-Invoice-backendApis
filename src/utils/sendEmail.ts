import nodemailer from "nodemailer";

export const sendEmail = async ({
  to,
  subject,
  html,
  bcc,
  attachments,
}: {
  to: string;
  subject: string;
  html: string;
  bcc?: string | string[];
  attachments?: any[];
}) => {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  const info = await transporter.sendMail({
    from: `"Banha University👻" <${process.env.email}>`,
    to,
    bcc,
    subject,
    text: "This PDF is for you to confirm that your product purchase was successful.",
    html,
    attachments,
  });
  console.log(info);

  return info.accepted.length < 1 ? false : true;
};
