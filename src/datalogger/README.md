### Consultas MySQL

#### Ultima hora marcada (18hs x ejemplo)
SELECT round(AVG(temperatura),2) AS te, COUNT(id) AS co FROM datalogger_data
WHERE date(datalogger_data.created_at)=date(now())
AND hour(datalogger_data.created_at)=hour(now())

#### Ultima hora de temperatura
SELECT round(AVG(temperatura),2) AS te, COUNT(id) AS co FROM datalogger_data
WHERE created_at >= DATE_SUB(NOW(),INTERVAL 1 HOUR)