#RabbitMq
Single-Recipient message
1 to 1 microservice

<br>

EXPOSE vs -p

- If you specify neither EXPOSE nor -p, the service in the container will only be accessible from inside the container itself.

- If you EXPOSE a port, the service in the container is not accessible from outside Docker, but from inside other Docker containers. So this is good for inter-container communication.

- If you EXPOSE and -p a port, the service in the container is accessible from anywhere, even outside Docker.

- If you do -p, but do not EXPOSE, Docker does an implicit EXPOSE. This is because if a port is open to the public, it is automatically also open to other Docker containers. Hence -p includes EXPOSE. This is effectively same as 3).


# Management version rabbitmq gives dashboard

5672 - used by amqlib to send and recieve messages
15672 - dashboard - user,pass = guest(default) - used for debugging

History and video-streaming microservice depends on rabbitmq.rabbitmq is heavy microservice and takes time. so, rabbitmq needs to wait. we use wait-port for that (needs to check depends on)
Also, all microservices needs to handle disconnection and connecting again with rabbitmq


rabbitmq needs wait-port. Mongodb automatically handles reconnections

