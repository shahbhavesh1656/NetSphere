// utils/email.js
import * as MailComposer from 'expo-mail-composer';

/**
 * Send an email using the device's default mail app:
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} body - Email body content
 */
export const sendEmail = async (to, subject, body) => {
  try {
    const result = await MailComposer.composeAsync({
      recipients: [to],
      subject,
      body,
    });
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
