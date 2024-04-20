import amqp from 'amqplib/callback_api'; 

const rabbitmqHost = 'amqp://localhost'; 
const queueName = 'csvFiles'; 

amqp.connect(rabbitmqHost, function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(queueName, {
      durable: false
    });

    console.log(' [*] Esperando por mensagens na fila %s. Para sair, pressione CTRL+C', queueName);
    channel.consume(queueName, function(msg) {
      if (msg !== null) {
        console.log(' [x] Recebido mensagem: %s', msg.content.toString());
        channel.ack(msg);
      }
    }, {
      noAck: false
    });
  });
});
