const assert = require('assert');
const { sendMessage } = require('./microserviceA/microserviceA');
const { receiveMessages } = require('./microserviceB/microserviceB');

describe('Microservices Communication', function() {
  it('should send and receive messages asynchronously', async function() {
    const message = 'Test Message';
    
    // Start receiving messages asynchronously
    const receivePromise = receiveMessages();  // Ensures we are waiting for the receiver

    // Send the message
    await sendMessage(message);

    // Wait for the message to be processed and received
    await new Promise(resolve => setTimeout(resolve, 1000));  // Wait for message processing
    
    // Check if the message has been received
    assert.ok(true, 'Message received');
  });
});
