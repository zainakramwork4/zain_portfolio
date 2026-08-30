import nodemailer from "nodemailer";

const SMTP_USER = process.env.SMTP_USER || process.env.GMAIL_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || process.env.GMAIL_PASSWORD;
const ADMIN_EMAIL = process.env.CONTACT_TO_EMAIL || "zainakram.work4@gmail.com";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getTransporter = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || "true") === "true";

  if (!SMTP_USER || !SMTP_PASSWORD) {
    throw new Error("SMTP credentials are not configured.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });
};

export async function POST(request) {
  try {
    const body = await request.json();
    const fromName = String(body.from_name || "").trim();
    const fromEmail = String(body.from_email || "").trim();
    const message = String(body.message || "").trim();

    if (!fromName || !fromEmail || !message) {
      return Response.json(
        { success: false, message: "Name, email and message are required." },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(fromEmail)) {
      return Response.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (fromName.length > 100 || fromEmail.length > 254 || message.length > 5000) {
      return Response.json(
        { success: false, message: "Please keep your message within the allowed limits." },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    await transporter.verify();

    const safeName = escapeHtml(fromName);
    const safeEmail = escapeHtml(fromEmail);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: `Portfolio Contact <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: fromEmail,
      subject: `Portfolio contact: ${fromName}`,
      text: `New portfolio message\n\nName: ${fromName}\nEmail: ${fromEmail}\n\nMessage:\n${message}`,
      html: `
        <div style="margin:0;padding:32px;background:#f5f7fa;font-family:Arial,sans-serif;color:#172033">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
            <div style="padding:24px 28px;background:#111827;color:#ffffff">
              <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#cbd5e1">Portfolio Contact</div>
              <h1 style="margin:8px 0 0;font-size:24px">New message from ${safeName}</h1>
            </div>
            <div style="padding:28px">
              <p style="margin:0 0 8px;font-size:13px;color:#64748b">SENDER</p>
              <p style="margin:0;font-size:16px"><strong>${safeName}</strong> &lt;${safeEmail}&gt;</p>
              <p style="margin:24px 0 8px;font-size:13px;color:#64748b">MESSAGE</p>
              <div style="padding:18px;background:#f8fafc;border-left:3px solid #111827;border-radius:8px;line-height:1.7">${safeMessage}</div>
              <p style="margin:24px 0 0;font-size:12px;color:#94a3b8">Sent from the portfolio contact form.</p>
            </div>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `Muhammad Zain Akram <${SMTP_USER}>`,
      to: fromEmail,
      replyTo: ADMIN_EMAIL,
      subject: "Thanks for contacting Muhammad Zain Akram",
      text: `Hi ${fromName},\n\nThanks for reaching out. I have received your message and will get back to you soon.\n\nYour message:\n${message}\n\nBest regards,\nMuhammad Zain Akram`,
      html: `
        <div style="margin:0;padding:32px;background:#f5f7fa;font-family:Arial,sans-serif;color:#172033">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
            <div style="padding:28px;background:#111827;color:#ffffff">
              <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#cbd5e1">Thank you</div>
              <h1 style="margin:8px 0 0;font-size:24px">Your message was received</h1>
            </div>
            <div style="padding:28px;line-height:1.7">
              <p>Hi ${safeName},</p>
              <p>Thanks for getting in touch. I've received your message and will get back to you as soon as possible.</p>
              <p style="margin:24px 0 8px;font-size:13px;color:#64748b">YOUR MESSAGE</p>
              <div style="padding:18px;background:#f8fafc;border-left:3px solid #111827;border-radius:8px">${safeMessage}</div>
              <p style="margin-top:24px">Best regards,<br/><strong>Muhammad Zain Akram</strong><br/>Full-Stack Engineer</p>
            </div>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("SMTP email error:", error);
    return Response.json(
      { success: false, message: "Unable to send your message right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
