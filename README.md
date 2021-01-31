 # Test Node

Esta é uma aplicação [Node](https://nodejs.org/en/) simples para avaliar o conhecimento do candidato para uma vaga de desenvolvedor backend para [Trademaster Servicos e Participações S.A.](https://www.trademaster.com.br/) 

## Iniciar a aplicação
O docker-compose irá criar um container para o Postgres e um para a aplicação Node. 
```bash
$ docker-compose up
```

## API
A API funciona conforme descrito abaixo. A validação dos dados é feita através do modelo criado no Postgres, usando sequelize.

1. __GET__ _/api/login?user={user}&pwd={senha}_

_Response:_
```json
{
  "token": "JWT"
}
  
```

2. __POST__ _/api/user_
_Request:_
```json
{
  "user": "jsilva",
  "name": "João da Silva",
  "status": "ativo",
  "password": "123456"
}
  
```
_Response:_
```json
{
  "id": "1",
  "user": "jsilva",
  "name": "João da Silva",
  "status": "ativo",
  "password": "123456"
}
```

3. __PATCH__ _/api/user/{user_id}_
_Request:_
```json
{
  "name": "João Alves da Silva",
  "password": "123"
}
  
```
_Response:_
```json
{
  "id": "1",
  "user": "jsilva",
  "name": "João Alves da Silva",
  "status": "ativo",
  "password": "123"
}
```
