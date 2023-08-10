<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripcion

- Cliente capturador de paquetes MQTT
- El controlador por defecto captura todos los topicos `'#'`
- Para diferenciar los topicos debe agregarlos en controlador `sensor/sensor.controller.ts`
- `sensor/sensor_dto.ts` contiene el ejemplo de datoa recibidos
- `sensor/sensor_entity.ts` en la tabla que se genera con sus respectivas columnas
## Instalacion
- Basado en un servidor Linux/GNU Debian 11
- Actualizar los paquetes
```bash
sudo apt update
```
- Instalar Nodejs y NPM
```bash
sudo apt install nodejs npm
```
- Verificar la version de node
```bash
node -v
```
- Instalar nestjs/cli y pm2
```bash
sudo npm i -g @nestjs/cli
sudo npm install pm2@latest -g
```
- Clonar el proyecto en la ubicacion seleccionada
```bash
git clone https://github.com/FacundoPumilla/Mqtt_To_Mysql_NestJS
```
- Instalar el proyecto
```bash
cd Mqtt_To_Mysql_NestJS
npm install
```

## Archivo ENV
1. Renombrar el archivo `example.env a .env`
2. Completar los datos necesarios del archivo
- DB_TYPE= Tipo de base de datos a utilizar (ej mysql)
- DB_HOST= Direccion ip o dominio del servidor de base de datos
- DB_PORT= Puerto de conexion a la base de datos
- DB_USER= Nombre de usuario de acceso a la base de datos
- DB_PASS= Password de acceso a la base de datos
- DB_NAME= Nombre de la base de datos a utilizar para persistir datos

- MQTT_URL= direccion del broker MQTT (mqtt://IP)
- MQTT_USER= usuario para acceso si es necesario
- MQTT_PASS= password para acceso si es necesario
- MQTT_ID= Id que se le da al cliente en ejecucion
- MQTT_PORT= Puerto donde se ejecuta el microservicio mqtt (ej 1883)
- APP_PORT= Puerto donde se ejecuta el microservicio http

## Corriendo la aplicacion

- Construir
```bash
npm run build
```
- Correr la aplicacion
```bash
pm2 start dist/main.js --name <nombre_aplicacion>
```
- Para que la aplicacion inicie automaticamente
```bash
pm2 startup systemd
```
- Para monitorizar la aplicacion
```bash
pm2 monit
```

## SWAGGER OpenAPI
- Una vez la aplicacion este corriendo visualice los endpoint usando la direccion `http://{url}:{APP_PORT}/swagger`
- Para descargar la documentacion en formato json use la direccion `http://{url}:{APP_PORT}/swagger-json`