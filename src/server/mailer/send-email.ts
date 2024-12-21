import { env } from '@/env';
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  service: 'gmail',
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  email,
  sendTo,
  subject,
  react,
}: {
  email: string;
  sendTo: string;
  subject: string;
  react: React.ReactElement;
}) {
  try {
    await transporter.verify();
    const emailHtml = await render(react);
    const info = await transporter.sendMail({
      from: email,
      to: sendTo,
      subject: subject,
      html: emailHtml,
    });
    return info;
  } catch (error) {
    console.error('Something Went Wrong', error);
    return;
  }
}
