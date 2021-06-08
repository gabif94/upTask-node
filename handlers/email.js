const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const {htmlToText} = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
	host: emailConfig.host,
	port: emailConfig.port, // true for 465, false for other ports
	auth: {
		user: emailConfig.user, // generated ethereal user
		pass: emailConfig.pass, // generated ethereal password
	},
});

const generateHtml = (file, options = {}) => {
	const html = pug.renderFile(
		`${__dirname}/../views/emails/${file}.pug`,
		options
	);
	return juice(html);
};

exports.send = async options => {
	const html = generateHtml(options.file, options);
	const text = htmlToText(html);
	let info = await transport.sendMail({
		from: 'UpTask <no-reply@uptask.com>', // sender address
		to: options.user.email, // list of receivers
		subject: options.subject, // Subject line
		text,
		html,
	});
	const sendEmail = util.promisify(transport.sendMail, transport);
	return sendEmail.call(transport, info);
};
