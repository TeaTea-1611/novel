import type React from "react";
import nodemailer from "nodemailer";
import { env } from "../env";
import { render } from "@react-email/components";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.SEND_MAIL_USER,
    pass: env.SEND_MAIL_PASS,
  },
});

export interface Emails {
  react: React.JSX.Element;
  subject: string;
  to: string[];
  from: string;
}

export type EmailHtml = {
  html: string;
  subject: string;
  to: string;
  from: string;
};

export const sendEmail = async ({ from, to, subject, react }: Emails) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    html: await render(react),
  });
};

export const sendEmailHtml = async ({ from, to, subject, html }: EmailHtml) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};
