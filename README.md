
# Exploring RabbitMQ exchange

- In rabbitmq exchange, we have 3 objects.
  - A **producer** is a user application that sends messages.
  - A **queue** is a buffer that stores messages.
  - A **consumer** is a user application that receives messages.
- Main purpose of exchange is that we can have many consumers. (1 to many)
- Here, video-streaming service is producer. It publishes messages to queue using exchange
- Now, we create recommendations service which is identical to history microservice.
- These two are consumers which consume messages from exchange
- These two services have their own database. So, when they consume the message, they insert document with message in their own database.

## Steps
video-streaming

- asserts exchange - fanout type, name=viewed
- returns channel from exchange
- publish message to channel

history and recommendations

- asserts exchange
- creates a queue
- bind it with exchange
- consume the payload
