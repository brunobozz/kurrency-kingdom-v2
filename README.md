# Currency Kingdom

<p align="center">
  <img src="public/imgs/logoV_500.png" alt="Descrição da imagem" width="300">
</p>

Uma aplicação desenvolvida para ajudar os comerciantes de wifin a converter a moeda dos anões (Tibar) para Ouro Real aplicando uma cotação dinâmica e suas taxas transação.

Cotação inicial: 1 Ouro Real equivale a 2,5 Tibares

Este projeto foi desenvolvido com Angular 18.2.20 e para rodar ele basta seguir os passos:

## Subir o Angular

Na raiz do projeto rode o comando `ng serve` e acesse a aplicação em `http://localhost:4200/`.

## DB e Back-end Mock

A aplicação possui apenas um back-end mokado usando json-server no arquivo DB.json

Você precisa primeiro instalar `npm i json-server` caso não tenha.
Depois basta rodar o comando `json-server --watch db.json` na raiz do projeto.

O Back-end estará disponível em `http://localhost:3000/` que já está configurado nos environments do projeto.
