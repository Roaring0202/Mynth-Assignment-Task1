const amqp = require('amqplib');
const express = require('express');
const app = express();
const QUEUE_NAME = 'instructions';

app.use(express.json());

async function sendMessage(message, retries = 3) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log('Queue asserted successfully.');
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
    console.log(" MicroserviceA Sent: %s", message);
    setTimeout(() => {
      connection.close();
    }, 1000);
  } catch (error) {
    console.error('Error:', error);
    if (retries > 0) {
      console.log(`Retrying in 2 seconds...`);
      setTimeout(() => sendMessage(message, retries - 1), 2000);
    }
  }
}

// Export the function
module.exports = { sendMessage };

app.post('/send', (req, res) => {
  console.log('Received body:', req.body); // Log the full body to check the payload
  const message = req.body.message || 'Default instruction';
  sendMessage(message);
  res.status(200).send(`Message sent: ${message}`);
});

app.listen(3001, () => {
  console.log("MicroserviceA is running on http://localhost:3001");
});
