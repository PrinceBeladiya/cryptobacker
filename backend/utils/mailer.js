const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '22it605@bvmengineering.ac.in',
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendSubAdminEmail = async (subAdminData) => {
  const { name, email, mobile, password, adminType } = subAdminData;

  // Define the personalized HTML content for the new sub-admin
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Sub Admin Created</title>
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
        }
        .email-body {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          text-align: center;
        }
        .email-body h2 {
          font-size: 24px;
          color: #333;
        }
        .email-body p {
          font-size: 16px;
          color: #666;
        }
        .email-body .details {
          margin-top: 20px;
          text-align: left;
        }
        .email-body .details p {
          margin: 5px 0;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="email-body">
        <h2>Hello ${name},</h2>
        <p>You have been successfully added as a Sub-Admin in our system.</p>
        <p>Here are your login details:</p>
        <div class="details">
          <p><b>Email:</b> ${email}</p>
          <p><b>Mobile:</b> ${mobile}</p>
          <p><b>Temporary Password:</b> ${password}</p>
          <p><b>Role:</b> ${adminType === 0 ? 'Super Admin' : adminType === 1 ? 'User Verifier' : adminType === 2 ? 'Campaign Verifier' : 'Withdraw Request Manager'} </p>
        </div>
        <p>Please change your password after logging in.</p>
        <p>Best regards,<br>Admin Team</p>
      </div>
    </body>
    </html>
  `;

  // Define the mail options
  const mailOptions = {
    from: '22it605@bvmengineering.ac.in',
    to: email, // Sub-admin's email
    subject: 'You have been added as a Sub-Admin',
    html: htmlContent,
  };

  // Send the email and return a promise
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error while sending email to " + email + ": ", error);
        reject(new Error(`Error sending email to ${email}.`));
      } else {
        resolve(info);
      }
    });
  });
};

const sendCampaignStatusEmail = async (campaignData) => {
  const { ownerName, ownerEmail, campaignTitle, status, reason } = campaignData;

  // Define the personalized HTML content for the campaign status update
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Campaign Status Update</title>
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
        }
        .email-body {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          text-align: center;
        }
        .email-body h2 {
          font-size: 24px;
          color: #333;
        }
        .email-body p {
          font-size: 16px;
          color: #666;
        }
        .email-body .details {
          margin-top: 20px;
          text-align: left;
        }
        .email-body .details p {
          margin: 5px 0;
          font-size: 14px;
        }
        .status-suspended {
          color: #ff9800;
        }
        .status-deleted {
          color: #f44336;
        }
      </style>
    </head>
    <body>
      <div class="email-body">
        <h2>Hello ${ownerName},</h2>
        <p>We regret to inform you that your campaign <strong>"${campaignTitle}"</strong> has been 
        <span class="${status === 'suspended' ? 'status-suspended' : 'status-deleted'}">
          ${status === 'suspended' ? 'suspended' : 'deleted'}
        </span>.</p>
        <div class="details">
          <p><b>Reason:</b> ${reason}</p>
        </div>
        <p>If you believe this action was taken in error or if you have any questions, please contact our support team.</p>
        <p>Thank you for your understanding.</p>
        <p>Best regards,<br>CryptoBacker Team</p>
      </div>
    </body>
    </html>
  `;

  // Define the mail options
  const mailOptions = {
    from: '22it605@bvmengineering.ac.in',
    to: ownerEmail,
    subject: `Your Campaign "${campaignTitle}" Has Been ${status.charAt(0).toUpperCase() + status.slice(1)}`,
    html: htmlContent,
  };

  // Send the email and return a promise
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error while sending email to ${ownerEmail}: `, error);
        reject(new Error(`Error sending email to ${ownerEmail}.`));
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = {
  sendSubAdminEmail,
  sendCampaignStatusEmail,
};
