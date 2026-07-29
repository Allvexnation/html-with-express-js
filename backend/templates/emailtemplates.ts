export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  address?: string;
}

export interface AuthEmailData {
  username: string;
  email: string;
}

export function generateEmailTemplate(data: EmailData): string {
  const { name, email, subject, message, phone, address } = data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #000; background-color: #fff;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #eaeaea;">
              <tr>
                <td style="padding: 30px; border-bottom: 1px solid #eaeaea;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="padding-right: 16px; vertical-align: top;">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfcDxDKno6z6qkjGsawWz7P6XhThDxRynN8iBp640h4_dWhMIPA7GjNRE9&s=10" alt="Jhon Ladines Logo" width="48" height="48" style="display: block; border-radius: 4px;">
                            </td>
                            <td style="vertical-align: top;">
                              <div style="font-size: 16px; font-weight: 600; color: #000; margin-bottom: 2px;">Jhon Ladines</div>
                              <div style="font-size: 14px; font-weight: 500; color: #666;">Personal Website</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #000;">New Contact Form Submission</h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 12px; font-weight: 500; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">From</div>
                        <div style="font-size: 15px; color: #000; padding: 16px; background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 6px;">${name} &lt;${email}&gt;</div>
                      </td>
                    </tr>
                    ${
                      phone
                        ? `
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 12px; font-weight: 500; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</div>
                        <div style="font-size: 15px; color: #000; padding: 16px; background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 6px;">${phone}</div>
                      </td>
                    </tr>
                    `
                        : ''
                    }
                    ${
                      address
                        ? `
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 12px; font-weight: 500; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Address</div>
                        <div style="font-size: 15px; color: #000; padding: 16px; background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 6px;">${address}</div>
                      </td>
                    </tr>
                    `
                        : ''
                    }
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 12px; font-weight: 500; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</div>
                        <div style="font-size: 15px; color: #000; padding: 16px; background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 6px;">${subject}</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="font-size: 12px; font-weight: 500; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Message</div>
                        <div style="font-size: 15px; color: #000; padding: 16px; background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 6px; white-space: pre-wrap; line-height: 1.7;">${message}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 30px; border-top: 1px solid #eaeaea; text-align: center; color: #666; font-size: 13px;">
                  <p style="margin: 0;">This email was sent from <a href="#" style="color: #000; text-decoration: none;">Jhon Ladines Portfolio</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `.trim();
}

export function generateSignupEmailTemplate(data: AuthEmailData): string {
  const { username, email } = data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Jhon Ladines Portfolio</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #000; background-color: #fff;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #eaeaea;">
              <tr>
                <td style="padding: 30px; border-bottom: 1px solid #eaeaea;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="padding-right: 16px; vertical-align: top;">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfcDxDKno6z6qkjGsawWz7P6XhThDxRynN8iBp640h4_dWhMIPA7GjNRE9&s=10" alt="Jhon Ladines Logo" width="48" height="48" style="display: block; border-radius: 4px;">
                            </td>
                            <td style="vertical-align: top;">
                              <div style="font-size: 16px; font-weight: 600; color: #000; margin-bottom: 2px;">Jhon Ladines</div>
                              <div style="font-size: 14px; font-weight: 500; color: #666;">Personal Website</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #000;">Welcome to the Family!</h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 15px; color: #000; line-height: 1.7;">Hi <strong>${username}</strong>,</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 15px; color: #000; line-height: 1.7;">Thank you for signing up for Jhon Ladines Portfolio! We're excited to have you on board.</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 15px; color: #000; line-height: 1.7;">Your account has been successfully created with the email: <strong>${email}</strong></div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 15px; color: #000; line-height: 1.7;">You can now log in and access all the features of our platform.</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 30px; border-top: 1px solid #eaeaea; text-align: center; color: #666; font-size: 13px;">
                  <p style="margin: 0;">This email was sent from <a href="#" style="color: #000; text-decoration: none;">Jhon Ladines Portfolio</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `.trim();
}

export function generateLoginEmailTemplate(data: AuthEmailData): string {
  const { username, email } = data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login Notification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #000; background-color: #fff;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #eaeaea;">
              <tr>
                <td style="padding: 30px; border-bottom: 1px solid #eaeaea;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="padding-right: 16px; vertical-align: top;">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfcDxDKno6z6qkjGsawWz7P6XhThDxRynN8iBp640h4_dWhMIPA7GjNRE9&s=10" alt="Jhon Ladines Logo" width="48" height="48" style="display: block; border-radius: 4px;">
                            </td>
                            <td style="vertical-align: top;">
                              <div style="font-size: 16px; font-weight: 600; color: #000; margin-bottom: 2px;">Jhon Ladines</div>
                              <div style="font-size: 14px; font-weight: 500; color: #666;">Personal Website</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #000;">Login Notification</h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 15px; color: #000; line-height: 1.7;">Hi <strong>${username}</strong>,</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 15px; color: #000; line-height: 1.7;">We detected a new login to your account on Jhon Ladines Portfolio.</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 15px; color: #000; line-height: 1.7;">Account email: <strong>${email}</strong></div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 24px;">
                        <div style="font-size: 15px; color: #000; line-height: 1.7;">If this was you, no action is needed. If you didn't log in, please secure your account immediately.</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 30px; border-top: 1px solid #eaeaea; text-align: center; color: #666; font-size: 13px;">
                  <p style="margin: 0;">This email was sent from <a href="#" style="color: #000; text-decoration: none;">Jhon Ladines Portfolio</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `.trim();
}

