import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const DOMAIN = 'http://localhost:3000';

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${DOMAIN}/verify-email?token=${token}`;

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '🎉 Form Speedrun: Verify Your Email & Unlock Full Access! 🚀',
      html: `<div style="font-family: Nunito, sans-serif; text-align: center; background-color: #222831; padding: 20px; border-radius: 10px;">
<h1 style="color: #eeeeee;">🎉 Welcome to the Form Speedrun game! 🎉</h1>
<p style="color: #eeeeee;">You're just one step away from enjoying the full experience. Click the link below to verify your email and get started!</p>
<a href="${confirmLink}" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #eeeeee; background-color: #76abae; text-decoration: none; border-radius: 5px; margin-top: 20px;">✅ Verify My Email</a>
<p style="color: #777; margin-top: 30px;">If you didn’t request this, feel free to ignore this email.</p>
<p style="color: #aaa; font-size: 12px;">&copy; 2024 Form Speedrun | All Rights Reserved</p>
</div>`
    });
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error: 'Failed to send email' };
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${DOMAIN}/new-password?token=${token}`;

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '🔒 Form Speedrun: Reset your password.',
      html: `<div style="font-family: Nunito, sans-serif; text-align: center; background-color: #222831; padding: 20px; border-radius: 10px;">
<h1 style="color: #eeeeee;">🔒 Trouble Logging In? </h1>
<p style="color: #eeeeee;">No worries! You can reset your password and regain access to your account by clicking the button below:</p>
<a href="${resetLink}" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #eeeeee; background-color: #76abae; text-decoration: none; border-radius: 5px; margin-top: 20px;">Reset password</a>
<p style="color: #777; margin-top: 30px;">If you didn’t request this, feel free to ignore this email.</p>
<p style="color: #aaa; font-size: 12px;">&copy; 2024 Form Speedrun | All Rights Reserved</p>
</div>`
    });
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error: 'Failed to send email' };
  }
};
