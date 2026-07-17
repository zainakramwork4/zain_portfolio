import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { to_email, from_name, from_email, message } = await request.json();

    // Create transporter using Gmail
    // Note: You need to use an App Password if 2FA is enabled
    // Generate at: https://myaccount.google.com/apppasswords
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Email to send to you (admin)
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: to_email,
      subject: `New Contact Message from ${from_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333;">New Contact Message</h2>
            <hr style="border: none; border-top: 2px solid #FEFE5B;">
            
            <p><strong>Name:</strong> ${from_name}</p>
            <p><strong>Email:</strong> <a href="mailto:${from_email}">${from_email}</a></p>
            
            <h3 style="color: #FEFE5B; margin-top: 20px;">Message:</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #FEFE5B;">
              ${message.replace(/\n/g, "<br>")}
            </p>
            
            <hr style="border: none; border-top: 2px solid #FEFE5B; margin-top: 20px;">
            <p style="color: #666; font-size: 12px;">This email was sent from your portfolio website contact form.</p>
          </div>
        </div>
      `,
    };

    // Email to send to the visitor (confirmation)
    const visitorMailOptions = {
      from: process.env.GMAIL_USER,
      to: from_email,
      subject: `Message Received - Muhammad Zain Akram`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333;">Thank you for reaching out!</h2>
            <hr style="border: none; border-top: 2px solid #FEFE5B;">
            
            <p>Hi ${from_name},</p>
            <p>I've received your message and will get back to you as soon as possible.</p>
            
            <h3 style="color: #FEFE5B;">Your Message:</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #FEFE5B;">
              ${message.replace(/\n/g, "<br>")}
            </p>
            
            <hr style="border: none; border-top: 2px solid #FEFE5B; margin-top: 20px;">
            <p><strong>Quick Contact Methods:</strong></p>
            <ul>
              <li>WhatsApp: <strong>+923046164257</strong></li>
              <li>Email: <strong>zainakram.work4@gmail.com</strong></li>
              <li>LinkedIn: <a href="https://www.linkedin.com/in/muhammad-zain-akram-/">Muhammad Zain Akram</a></li>
              <li>GitHub: <a href="https://github.com/zainakramwork4">zainakramwork4</a></li>
            </ul>
            
            <p style="color: #666; font-size: 12px; margin-top: 20px;">Best regards,<br>Muhammad Zain Akram<br>Full-Stack Engineer</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(visitorMailOptions);

    return Response.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to send email",
      },
      { status: 500 }
    );
  }
}
