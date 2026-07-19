/**
 * Base email template with common styling
 */
export const baseTemplate = (content: string, title: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .email-container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #d4af37;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #1a1a2e;
    }
    .content {
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      background-color: #d4af37;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
      border-top: 1px solid #eee;
      padding-top: 20px;
      margin-top: 30px;
    }
    .highlight {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">Rawafid Al-Omran</div>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>Rawafid Al-Omran for Architecture & Construction</p>
      <p>This email was sent automatically. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

export default baseTemplate;