const amqp = require('amqplib');
const QUEUE_NAME = 'instructions';

async function receiveMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', QUEUE_NAME);

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        setTimeout(() => {
          console.log("Delayed Message Received: %s", msg.content.toString());
          channel.ack(msg); // Acknowledge after delay
        }, 2000); // Delay processing to ensure connection readiness
      }
    }, { noAck: false });

    console.log('MicroserviceB is ready to receive messages.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Export the function
module.exports = { receiveMessages };
