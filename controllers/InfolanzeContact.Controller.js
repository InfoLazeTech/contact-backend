import { InfolanzeContactModel } from "../models/InfolanzeContact.Model.js";
import nodemailer from "nodemailer";

export const createInfolanzeContact = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;

    const newContact = await InfolanzeContactModel.create({
      name,
      email,
      phone,
      description,
    });

    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("EMAIL_USER",process.env.EMAIL_USER);
    console.log("EMAIL_PASS",process.env.EMAIL_PASS);
    
    // -------------------------
    // 1) Send to ADMIN (HTML)
    // -------------------------
    const adminMail = {
      from: `"Admin" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Contact Request`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background: #333; color: white; padding: 20px; text-align: center;">
        <h2>📩 New Contact Request</h2>
      </div>
      <div style="padding: 20px; color: #333;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #4a90e2;">
          ${description}
        </p>
        <p style="margin-top: 20px; font-size: 12px; color: #777;">
          Received at: ${new Date().toLocaleString()}
        </p>
      </div>
      <div style="background: #f5f5f5; text-align: center; padding: 10px; font-size: 12px; color: #777;">
        📌 This is an automated message from your website contact form.
      </div>
    </div>
  `,
    };

    await transporter.sendMail(adminMail);

    // -------------------------
    // 2) Send THANK YOU to CUSTOMER (HTML template)
    // -------------------------
    const customerMail = {
      from: `"Infolanze Tech Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Thank you for contacting us`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #4a90e2; color: white; padding: 20px; text-align: center;">
          <h2>Thank You, ${name}!</h2>
        </div>
        <div style="padding: 20px; color: #333;">
          <p>We have received your message and our team will get back to you soon.</p>
          <p><strong>Here’s a copy of your submission:</strong></p>
          <ul>
            <li><strong>Message:</strong> ${description}</li>
          </ul>
          <p style="margin-top: 20px;">Best regards,</p>
          <p><strong>Infolanze Tech Team</strong></p>
        </div>
        <div style="background: #f5f5f5; text-align: center; padding: 10px; font-size: 12px; color: #777;">
          © ${new Date().getFullYear()} Infolanze Tech Pvt. Ltd. All rights reserved.
        </div>
      </div>
      `,
    };

    await transporter.sendMail(customerMail);

    // -------------------------
    // Response
    // -------------------------
    res.status(201).json({
      success: true,
      message: "Contact submitted successfully",
      newContact,
    });
  } catch (error) {
    console.log("Mail/controller error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
