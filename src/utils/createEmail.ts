export function createEmail(to: string, subject: string, body: string): string {
    const str = [
      `To: ${to}`,
      'Content-Type: text/plain; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      body,
    ].join('\n');
    return Buffer.from(str).toString('base64');
  }
  