
---

# Sistema de Controle de Estacionamento 🚗

## O que dá pra fazer 🎯

- Cadastrar reservas de vaga
- Listar quem tá ocupando qual vaga
- Ver quais vagas ainda estão livres
- Remover reservas quando alguém for embora

## Como tá organizado 🗂️

Tentei seguir o esquema MVC (Model-View-Controller):

- **Model**: Guarda os dados (tipo, a vaga e quem reservou)
- **View**: Mostra as informações bonitinhas na tela
- **Controller**: Faz a ligação entre o que o usuário faz e o que acontece no sistema

## Como usar 🚀

1. Baixa o projeto (ou clona o repositório, se preferir)
2. Abre o `index.html` direto no navegador
3. Quer reservar uma vaga? Clica em "Cadastrar Reserva" e preenche o que pedir
4. Quer saber o que tá livre? Clica em "Vagas Disponíveis"
5. Quer liberar uma vaga? Só clicar no botão "Remover" ali na lista

## O que eu usei 🛠️

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage pra salvar as coisas sem precisar de servidor
