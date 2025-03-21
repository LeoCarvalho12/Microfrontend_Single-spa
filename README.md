🎓 Projeto de TCC — Migração de Monolito para Microfrontends com Rollup
Este projeto tem como objetivo demonstrar a evolução arquitetural de uma aplicação web, migrando de uma estrutura monolítica para uma arquitetura baseada em microfrontends, utilizando o Single-SPA como orquestrador e Rollup como empacotador principal e mecanismo de compartilhamento de dependências entre os microfrontends.

🏗️ Estrutura do Projeto
* Monolito: Aplicação React centralizada que inclui login, catálogo de produtos e processo de compra.
* Microfrontends: Cada domínio da aplicação foi dividido em projetos independentes (ex: Catálogo, Pedido, Usuário), mantendo a comunicação via Single-SPA.
* Orquestração: Feita com o Single-SPA.
* Empacotador: Uso exclusivo do Rollup para build e compartilhamento de dependências entre microfrontends.

🚀 Tecnologias Utilizadas
* React / Vue / Angular (dependendo do domínio)
* TypeScript
* Single-SPA
* Rollup
* Vite para desenvolvimento local do monolito
* Node.js + Express na API

📦 Instalação e Execução
Instale as dependências:
npm install

Rode a aplicação Single-SPA:
npm run single_spa

Rode a aplicação Monolitica:
npm run monolito

Inicie a API:
cd api
node server.js

Gere os builds dos microfrontends com Rollup:
npm run build

📚 Descrição da Migração
Durante o desenvolvimento, a aplicação foi inicialmente criada como um monolito com React, onde todos os domínios coexistiam no mesmo projeto. Para escalar e modularizar a aplicação, foi realizada a decomposição em microfrontends, utilizando Rollup para empacotar os domínios de forma independente e compartilhar bibliotecas comuns entre eles (como React, Auth e Estilos).

A migração teve como foco:

* Melhor escalabilidade e manutenibilidade da aplicação.
* Possibilidade de desenvolvimento paralelo por diferentes times.
* Implementação de domínios independentes com isolamento de responsabilidades.