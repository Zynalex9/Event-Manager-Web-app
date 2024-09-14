import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import User from '../Models/userModel';

export async function sendMail({ email, emailType, userId }: any) {
  try {
    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      specialChars: false,
    });

    console.log(`Generated OTP: ${OTP}`); // Log OTP for debugging

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyEmailOTP: OTP,
          verifyEmailOTPTime: new Date(Date.now() + 3600000), // 1 hour from now
        },
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordOTP: OTP,
          forgetPasswordOTPTime: new Date(Date.now() + 3600000), // 1 hour from now
        },
      });
    } else {
      throw new Error('Invalid email type');
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'alzn952@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>This is your ${emailType === 'VERIFY' ? 'verification' : 'reset'} code:</p>
             <h2>${OTP}</h2>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log(`Mail Response: ${mailResponse.response}`); // Log mail response
    return mailResponse;
  } catch (error) {
    console.error('Error in sendMail:', error);
    throw new Error('Failed to send email or update user');
  }
}
