const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/sendEmail', (req, res) => {
  const { firstName, lastName, email, areaCode, phoneNumber, company, subject, details } = req.body;
  const emailBody = `
    First Name: ${firstName}
    Last Name: ${lastName}
    Email: ${email}
    Phone Number: ${areaCode}-${phoneNumber}
    Company: ${company}
    Subject: ${subject}
    Details: ${details}
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sh.hafizhasnain@gmail.com',
      pass: 'kmskfcjdnewqidbl'
    }
  });

  const mailOptions = {
    from: 'sh.hafizhasnain@gmail.com',
    to: ['abdullahwarraich382@gmail.com' , 'testing22707@gmail.com'],
    subject: 'Contact Form Submission',
    text: emailBody
  };

// Define the captcha variable outside the scope of the functions
var captcha;

// Function to initialize the captcha
function initializeCaptcha() {
  captcha = sliderCaptcha({
    id: 'captcha',
    repeatIcon: 'fa fa-redo',
    onSuccess: function () {
      captcha.stop(); // Stop the captcha interaction
      alert('Captcha successfully completed!');
    }
  });
}

// Function to reset the form and captcha
function resetForm() {
  document.getElementById('emailForm').reset();
  captcha.destroy(); // Destroy the existing captcha instance
  initializeCaptcha(); // Create a new captcha instance
}

// Update the sendEmail function
function sendEmail() {
  // Rest of the code

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(200);

      resetForm(); // Reset the form and captcha
    }
  });
}

});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
