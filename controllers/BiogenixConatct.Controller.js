import { BiogenixContactModel } from "../models/BiogenixContact.Model.js";
import nodemailer from "nodemailer";

export const createBiogenixContact = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    const newContact = await BiogenixContactModel.create({
      name,
      email,
      description,
    });

    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.BIOGENIX_EMAIL_USER,
        pass: process.env.BIOGENIX_EMAIL_PASS,
      },
    });

    // Shared colors for consistency
    const colors = {
      green: "#86b85e",
      greenHover: "#caefac",
      darkGreen: "#43a047",
      darkGreenText: "#064212",
      background: "#f8f8f8",
      blue: "#002e5b",
    };

    // -------------------------
    // Common HTML Template (function)
    // -------------------------
    const emailTemplate = (title, content, footerNote) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;
                  border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: ${colors.green}; color: white; padding: 20px; text-align: center;">
          <h2 style="margin:0;">${title}</h2>
        </div>
        
        <!-- Body -->
        <div style="padding: 20px; color: ${colors.darkGreenText}; background:${colors.background}">
          ${content}
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            ${footerNote}
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: ${colors.greenHover}; text-align: center; padding: 10px; 
                    font-size: 12px; color: ${colors.darkGreenText};">
          🌱 Copyright © ${new Date().getFullYear()} Biogenix Compostable Pvt. Ltd. All rights reserved.
        </div>
      </div>
    `;

    // -------------------------
    // 1) Admin Mail
    // -------------------------
    const adminMail = {
      from: `"Biogenix Admin" <${process.env.BIOGENIX_EMAIL_USER}>`,
      to: process.env.BIOGENIX_ADMIN_EMAIL,
      subject: `📩 New Contact Request from ${name}`,
      html: emailTemplate(
        "📩 New Contact Request - Biogenix",
        `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #fff; padding: 10px; border-left: 4px solid ${colors.darkGreen};">
          ${description}
        </p>
        `,
        `Received at: ${new Date().toLocaleString()}`
      ),
    };

    await transporter.sendMail(adminMail);

    // -------------------------
    // 2) Customer Mail
    // -------------------------
    const customerMail = {
      from: `"Biogenix Team" <${process.env.BIOGENIX_EMAIL_USER}>`,
      to: email,
      subject: "🌱 Thank You for Contacting Biogenix",
      html: emailTemplate(
        `Thank You, ${name}!`,
        `
        <p>We have received your message and our Biogenix team will get back to you soon.</p>
        <p><strong>Here’s a copy of your submission:</strong></p>
        <ul>
          <li><strong>Your Message:</strong> ${description}</li>
        </ul>
        <p style="margin-top: 20px;">Best regards,</p>
        <p><strong>Biogenix Compostable Granules Team</strong></p>
        `,
        "This is an automated confirmation from Biogenix."
      ),
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
