# Using rabbitmq for decoupling

- In previous stage, we used synchronous http request which resulted in tight coupling of microservices
- Now, instead of that, we use rabbitmq which gives loose coupling
- RabbitMQ is a messaging broker - an intermediary for messaging. It gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.
- Basic terminology of rabbitmq
  - Queue: Buffer that stores messages. 
  - Message: Information that is sent from the producer to a consumer through RabbitMQ. 
  - Connection: A TCP connection between your application and the RabbitMQ broker. 
  - Channel: A virtual connection inside a connection.
- Here, we have two main microservices, video-streaming and history.
- video-streaming microservices sends a message(which is videopath) into the queue. Then the history microservice consumes this message from the queue. Then it will insert a document into mongodb database
- In video-streaming service, we create a connection to rabbitmq > create a channel > use publish() method to send message to queue
- In history microservice, we will asset a queue > use consume() method to get message from queue > create a record in mongodb database

### Additional info
- Ports
  - 5672 - used by amqlib to send and recieve messages
  - 15672 - dashboard - user,pass = guest(default) - used for debugging
- History and video-streaming microservice depends on rabbitmq.rabbitmq is heavy microservice and takes time. so, rabbitmq needs to wait. we use wait-port for that (needs to check depends on)
- Also, all microservices needs to handle disconnection and connecting again with rabbitmq
- rabbitmq needs wait-port. Mongodb automatically handles reconnections

---
Docker info
- **EXPOSE**  vs  **-p**
- If you specify neither EXPOSE nor -p, the service in the container will only be accessible from inside the container itself.
- If you EXPOSE a port, the service in the container is not accessible from outside Docker, but from inside other Docker containers. So this is good for inter-container communication.
- If you EXPOSE and -p a port, the service in the container is accessible from anywhere, even outside Docker.
- If you do -p, but do not EXPOSE, Docker does an implicit EXPOSE. This is because if a port is open to the public, it is automatically also open to other Docker containers. Hence -p includes EXPOSE. This is effectively same as 3).
