import { Queue, Worker } from 'bullmq';
import { analyzeEmailContent, generateResponse } from '../services/openaiService';
import { sendEmailGmail } from '../services/googleService';

const emailQueue = new Queue('emailQueue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

const worker = new Worker('emailQueue', async job => {
  const { emailContent, to, subject } = job.data;
  const category = await analyzeEmailContent(emailContent);
  const response = await generateResponse(category);
  await sendEmailGmail(to, 'Re: ' + subject, response);
});

export { emailQueue };
