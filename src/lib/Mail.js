import nodemailer from "nodemailer";

class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport();
    }

    send(message) {
        
    }
}

export default new Mail();