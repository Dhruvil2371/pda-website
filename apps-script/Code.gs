// Paste this into Apps Script (script.google.com) attached to a Google Sheet.
// Deploy as:
//   - Deploy → New deployment → Type: "Web app"
//   - Execute as: "Me (purvangdoshica@gmail.com)"
//   - Who has access: "Anyone"
// Copy the resulting URL into your site's NEXT_PUBLIC_SHEETS_URL env var.
// If you edit this script later, re-deploy via "Manage deployments → Edit → New version".

const SHEET_NAME   = 'Enquiries';
const NOTIFY_EMAIL = 'purvangdoshica@gmail.com';

function doPost(e) {
  try {
    // Form submits with Content-Type: text/plain (needed to avoid a CORS preflight),
    // so the whole body is a JSON string.
    const data = JSON.parse(e.postData.contents || '{}');

    // Silently ignore bot submissions that filled the honeypot field.
    if (data.website) {
      return _json({ ok: true });
    }

    // Basic server-side validation.
    const name    = String(data.name    || '').trim().slice(0, 120);
    const phone   = String(data.phone   || '').trim().slice(0, 40);
    const email   = String(data.email   || '').trim().slice(0, 200);
    const service = String(data.service || '').trim().slice(0, 120);
    const message = String(data.message || '').trim().slice(0, 4000);

    if (!name || name.length < 2)                               return _json({ ok: false, error: 'Name required' }, 400);
    if (!/^[+\d][\d\s\-().]{6,20}$/.test(phone))                return _json({ ok: false, error: 'Invalid phone' }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))              return _json({ ok: false, error: 'Invalid email' }, 400);

    // Append to the sheet.
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Service', 'Message', 'User Agent']);
      sheet.setFrozenRows(1);
      sheet.getRange('A1:G1').setFontWeight('bold');
    }
    sheet.appendRow([
      new Date(),
      name,
      phone,
      email,
      service,
      message,
      String(data.user_agent || ''),
    ]);

    // Email you a notification too — Apps Script sends through your own Google account,
    // no SMTP App Password required.
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New enquiry — ' + name + (service ? ' · ' + service : ''),
        replyTo: email,
        body:
          'A new enquiry was submitted on the Purvang Doshi & Associates website.\n\n' +
          'Name:    ' + name + '\n' +
          'Phone:   ' + phone + '\n' +
          'Email:   ' + email + '\n' +
          'Service: ' + (service || '—') + '\n\n' +
          'Message:\n' + (message || '(no message)') + '\n',
      });
    } catch (mailErr) {
      // If MailApp quota is exceeded (100 recipients/day for a free Google account),
      // the sheet still has the record — just log it.
      Logger.log('Mail failed: ' + mailErr);
    }

    return _json({ ok: true });
  } catch (err) {
    Logger.log(err);
    return _json({ ok: false, error: String(err) }, 500);
  }
}

function doGet() {
  // Lets you ping the URL in a browser to confirm it's deployed.
  return ContentService.createTextOutput('Enquiry endpoint is live.');
}

function _json(obj, _status) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
