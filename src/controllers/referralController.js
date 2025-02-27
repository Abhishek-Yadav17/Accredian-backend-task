const prisma = require('@prisma/client');
const nodemailer = require('nodemailer');

const prismaClient = new prisma.PrismaClient();

const saveReferral = async (req, res) => {
  console.log('Referral data received:', req.body);
  const { referrerName, refereeName, refereeEmail } = req.body;

  try {
    const referral = await prismaClient.referral.create({
      data: {
        referrerName,
        refereeName,
        refereeEmail,
      },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: refereeEmail,
      subject: 'Referral Invitation',
      text: `${referrerName} has referred you to a course!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Referral email sent: ' + info.response);
    });

    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ error: 'Error saving referral' });
  }
};

module.exports = { saveReferral };
