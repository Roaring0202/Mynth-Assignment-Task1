# Task 1 - Microservices Communication with RabbitMQ (Dockerized)

This project demonstrates the communication between two microservices using RabbitMQ for message queueing. Microservice A sends a message, and Microservice B receives it asynchronously. Both microservices are Dockerized for easy deployment and testing.

## Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/en) (v20.10 or later)
- [RabbitMQ](https://www.rabbitmq.com/) running locally or on a server
- [Docker](https://www.docker.com/) (v20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/) (v1.27 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Roaring0202/Mynth-Assignment-Task1.git
   cd Mynth-Assignment-Task1
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Microservices

The project includes two microservices:

- **MicroserviceA**: Sends messages to the RabbitMQ queue.
- **MicroserviceB**: Receives messages from the RabbitMQ queue.

Before running the services, make sure RabbitMQ is running on `localhost:5672` (or the appropriate host and port).

1. **Start MicroserviceB**: This service listens for messages from RabbitMQ.

   ```bash
   cd microserviceB
   node microserviceB.js
   ```

2. **Start MicroserviceA**: This service sends messages to RabbitMQ.

   ```bash
   cd microserviceA
   node microserviceA.js
   ```

Both microservices will log their activities to the console.

### Running the Tests

The project includes unit tests using Mocha to ensure the communication works as expected.

1. **Start Microservices**: Make sure both microservices are running before testing.

2. **Run the tests**:

   ```bash
   npm test
   ```

Mocha will run the tests defined in the `test.js` file, verifying that messages are sent and received asynchronously between the microservices.

## Project Structure

```plaintext
microservices-communication/
│
├── microserviceA/
│   ├── microserviceA.js         # Microservice A implementation
│   └── messagePublisher.js      # Message publisher (sending to RabbitMQ)
│
├── microserviceB/
│   ├── microserviceB.js         # Microservice B implementation
│   └── messageReceiver.js       # Message receiver (listening from RabbitMQ)
│
├── test/
│   └── test.js                  # Mocha tests for asynchronous message communication
│
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

## Docker Compose Configuration

The `docker-compose.yml` file defines the following services:

- **rabbitmq**: A RabbitMQ container with the management plugin enabled.

   Ports:
   - `15672`: RabbitMQ Management Plugin UI
   - `5672`: RabbitMQ Protocol

- **microserviceA**: Microservice A container.
  - Built from the `microserviceA` directory.
  - Exposes port `3000` for local development.
  - Depends on the RabbitMQ service.

- **microserviceB**: Microservice B container.
  - Built from the `microserviceB` directory.
  - Depends on the RabbitMQ service.

```yaml
version: '3'
services:
  rabbitmq:
    image: "rabbitmq:management"
    ports:
      - "15672:15672"  # RabbitMQ Management Plugin UI
      - "5672:5672"    # RabbitMQ Protocol
  microserviceA:
    build: ./microserviceA
    ports:
      - "3000:3000"
    depends_on:
      - rabbitmq
  microserviceB:
    build: ./microserviceB
    depends_on:
      - rabbitmq
```

## Dockerfiles for Microservices

Each microservice has a Dockerfile to containerize it. Here's a sample Dockerfile for **Microservice A**:

```dockerfile
# MicroserviceA Dockerfile
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "microserviceA.js"]
```

Make sure to adjust the port and configuration for each microservice in their respective Dockerfiles.

## Environment Variables

You can configure the RabbitMQ connection and other environment settings by modifying the following environment variables:

- `RABBITMQ_HOST` - The host address for RabbitMQ (default: `localhost`)
- `RABBITMQ_PORT` - The port for RabbitMQ (default: `5672`)
- `QUEUE_NAME` - The name of the RabbitMQ queue (default: `messageQueue`)

To set these variables, create a `.env` file:

```plaintext
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
QUEUE_NAME=messageQueue
```

Or use the `docker-compose.yml` file to configure environment variables for each service.

## Troubleshooting

- **EADDRINUSE error**: If you get a `EADDRINUSE` error, it means the port is already in use. Try stopping the process occupying the port or change the port in your microservice code.

- **Connection issues with RabbitMQ**: Ensure RabbitMQ is running on the correct host and port. You can verify RabbitMQ's status by visiting `http://localhost:15672` if using the default management plugin.

- **Docker networking**: The microservices communicate with RabbitMQ via Docker’s default network. Ensure there are no issues with container networking by checking the logs with `docker-compose logs`.

## Contributing

1. Fork the repository.
2. Clone your forked repository.
3. Create a new branch for your feature or fix.
4. Commit your changes.
5. Push to your forked repository.
6. Submit a pull request.