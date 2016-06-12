var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

exports.mail = function (request,response) {
    // api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
    var options = {
        auth: {
            api_key: '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'
        }
    }
    if (!request.body || !request.body.name || !request.body.email || !request.body.subject || !request.body.message) {
        return response.status(400).json({success:false, error:true, message:"All fields are required!"});
    }
    var mailer = nodemailer.createTransport(sgTransport(options));
    var email = {
        to: ['vikash@programminggeek.in'],
        bcc: ['vermavikash014@gmail.com'],
        from: request.body.name + "<" + request.body.email + ">",
        subject: request.body.subject,
        text: request.body.message
    };
    mailer.sendMail(email, function (err, res) {
        if (err) {
            console.log(err);
            return response.json({ success: false, error: true, message: "Couldn't send email!" })
        }
        response.json({ success: true, error: false, message: "Your message has been successfully sent!" })
    });
}