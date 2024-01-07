# Servidor Vernemq MQTT
[Pagina principal de VERNEmq](https://vernemq.com/)  
VerneMQ is open source software, extendable, and enterprise support is available.

## Base de datos
[Explicacion oficial](https://docs.vernemq.com/configuring-vernemq/db-auth)  
Una tabla de nombre `vmq_auth_acl` con 6 columnas de nombre `mountpoint, client_id, username, password, publish_acl, subscribe_acl` siendo las 3 primeras PRIMARY KEY.  
El metodo para hashear las contraseñas es el md5.
```
CREATE TABLE vmq_auth_acl
 (
   mountpoint character varying(10) NOT NULL,
   client_id character varying(128) NOT NULL,
   username character varying(128) NOT NULL,
   password character varying(128),
   publish_acl json,
   subscribe_acl json,
   CONSTRAINT vmq_auth_acl_primary_key PRIMARY KEY (mountpoint, client_id, username)
 );
```

## Configuracion del contenedor:
El archivo .env contiene distintas variables que deben ser reemplazadas segun la necesidad.  
El servidor una vez levantado quedara escuchando peticiones en el puerto 1883 (por defecto)  
En la direccion `http://{IP}:8888/status` se pódra ver con una periosidad de 5 segundos el estado del servidor y los clientes conectados.  
Se encuentra configurado para usar con autorizacion mediante usuario y contraseña frente a una base de datos MYSQL.

## Futuras modificaciones
- Logging de errores
- Logging de accesos