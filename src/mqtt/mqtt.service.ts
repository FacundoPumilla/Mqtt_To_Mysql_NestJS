import { Injectable } from '@nestjs/common';
import { MqttResponseDto } from 'src/mqtt/dto/mqtt-response.dto';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  mqtt_options = {
    host: `mqtt://` + process.env.MQTT_URL,
    clientId: process.env.MQTT_ID,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    port: parseInt(process.env.MQTT_PORT),
  };

  /**
   * Enviar respuesta en formato Json a Control identificandolo por direccion  mac
   * @param mac_number La direccion mac
   * @param response respuesta en formato Json
   */
  mqttSendResponseJsonToControlMac(
    mac_number: string,
    response: MqttResponseDto,
  ) {
    console.log(`Se envio 1 msj aL TOPICO: ` + mac_number);
    console.log(response);
    const publishToMqtt = mqtt.connect(this.mqtt_options);
    publishToMqtt.publish(mac_number, JSON.stringify(response));
    return publishToMqtt.getLastMessageId();
  }
}
