import dotenv from 'dotenv';
dotenv.config();

export async function sendEmail(toEmail: string, toName: string, subject: string, htmlContent: string) {
  const senderEmail = process.env.SENDER_EMAIL || 'contact@jhonladines.top';
  const senderName = process.env.SENDER_NAME || 'Jhon Ladines';
  const brevoApiKey = process.env.BREVO_API_KEY || '';

  const emailPayload = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [
      {
        email: toEmail,
        name: toName,
      },
    ],
    subject: subject,
    htmlContent: htmlContent,
  };

  const brevoApiUrl = process.env.BREVO_API_URL;
  if (!brevoApiUrl) {
    throw new Error('BREVO_API_URL environment variable is not set');
  }
  const brevoResponse = await fetch(brevoApiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': brevoApiKey,
    },
    body: JSON.stringify(emailPayload),
  });

  if (!brevoResponse.ok) {
    const errorData = await brevoResponse.json();
    console.error('Brevo API error:', errorData);
    throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`);
  }

  const data = await brevoResponse.json() as { messageId: string };
  console.log('Email sent successfully:', data.messageId);
  return data;
}
