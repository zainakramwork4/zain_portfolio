# Email Setup Instructions for Contact Form

Your contact form is now configured to send emails! Follow these steps to enable email sending:

## Step 1: Get Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. You may need to verify your identity
3. Select "Mail" and "Windows Computer" (or your device type)
4. Google will generate a 16-character password (example: `abcd efgh ijkl mnop`)
5. Copy this password (remove any spaces)

## Step 2: Create `.env.local` file

Create a file named `.env.local` in the root of your project:

```bash
touch .env.local
```

## Step 3: Add Environment Variables

Add the following content to `.env.local`:

```
GMAIL_USER=zainakram.work4@gmail.com
GMAIL_PASSWORD=your-16-character-app-password
```

Replace `your-16-character-app-password` with the password you copied from Step 1.

**Example:**
```
GMAIL_USER=zainakram.work4@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop
```

## Step 4: Restart Your Development Server

After creating `.env.local`, restart your Next.js development server:

```bash
npm run dev
```

## Now Your Contact Form Will:

✅ Send emails to your Gmail inbox when users submit the form  
✅ Send a confirmation email to the visitor  
✅ Display contact info cards for Email, WhatsApp, LinkedIn, and GitHub  
✅ All images in About section now show Unsplash photos instead of GitHub stats

## Features:

- **Contact Form**: Users can send messages that arrive in your Gmail
- **Confirmation Email**: Visitors get an automatic reply
- **Social Cards**: Easy access buttons for LinkedIn, GitHub, WhatsApp
- **Beautiful About Section**: Professional Unsplash images instead of empty cards

## Troubleshooting:

**Issue: "Failed to send email" message**
- Make sure `.env.local` file exists in the root directory
- Check that GMAIL_PASSWORD is exactly 16 characters without spaces
- Ensure 2FA is enabled on your Google account

**Issue: "App password not working"**
- Go to https://myaccount.google.com/security and check if 2-Step Verification is ON
- Try generating a new app password

**Issue: Still not working?**
- Check browser console for error messages (F12)
- Verify the Gmail credentials are correct
- Try restarting the development server
