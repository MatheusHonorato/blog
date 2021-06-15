---
title: Ambiente de desenvolvimento com PHP e MySQL no Windows
date: '2021-05-17'
tags: ['php', 'mysql']
draft: false
summary: 'Nesse artigo você aprenderá como configurar um ambiente de desenvolvimento com PHP e MySQL no Windows'
image: '/static/images/php-mysql.jpg'
---

Fala, pessoal! Nesse artigo iremos ensinar você a configurar um ambiente de desenvolvimento PHP no Windows de maneira correta e simples contendo a linguagem PHP, o banco de dados MySQL e o gerenciador de banco de dados Workbench. Como servidor utilizaremos o próprio servidor do PHP disponível desde a versão 5.4.

Você deve estar se perguntando o porquê de não estarmos abordando uma solução como Xampp ou Wamp. Para esclarecer essa dúvida estarei indicando o artigo do Vinicius Dias do blog Dias de Dev [Por que não usar XAMPP](https://dias.dev/2021-04-10-por-que-nao-usar-xampp)

# PHP

## Download

Para configurarmos o PHP no Windows precisamos efetuar o download do instalador e para isso iremos acessar página de downloads do site oficial da linguagem em [php.net](https://www.php.net/downloads.php) e clicar no link 'Windows downloads'.

![PHP Windows Download](/static/images/php-windows-download.jpg)

Ao carregar a página de download baixe a versão 'Thread Safe' em zip de acordo com a arquitetura do seu computador x86 ou x64 (Você pode verificar essa informação buscando por 'Sobre' na pesquisa do windows).

![PHP Windows Download Thread Safe](/static/images/php-windows-download-thread-safe.jpg)

## Instalação

Após efetuar o download do arquivo zip descompacte no diretório 'C:' e renomeie a pasta para 'php', se ainda não possui o Microsoft Visual C++ efetue o download da versão mais recente no site da Microsoft e execute a instalação.

Para que nosso PHP funcione corretamente precisamos ativar suas configurações padrão. Mas e como fazemos isso?
Simples! Basta renomearmos o arquivo 'php.ini-development' para 'php.ini' dentro do nosso diretório 'php'. Assim que executarmos o PHP esse arquivo será iniciado carregando nossas configurações.

## Variáveis de ambiente

Ok agora temos nossa instalação disponível em nossa máquina, mas existe um problema só podemos executa-la no diretório 'C:/php' onde está nossa instalação. Então agora iremos configurar suas variáveis de ambiente para que possamos roda-lo a partir de diretórios diferentes.

Para configurarmos nossa variável de ambiente busque 'Variáveis de ambiente' na pesquisa do Windows, selecione 'Editar as variáveis de ambiente do sistema' e clique em 'Variáveis de Ambiente'.

![PHP Windows Download](/static/images/variaveis-de-ambiente.jpg)

Na seção 'Variáveis de Ambiente' selecione 'Path' e clique em 'Editar', selecione a primeira linha vazia e adicione 'C:/php', clique em 'OK' e depois em 'OK' novamente em 'Propriedades do Sistema'. Pronto agora concluímos nossa configuração do PHP no Windows. Para testar basta reiniciar sua máquina, abrir o CMD e executar o PHP.

## Como rodar/testar o servidor

Como acabamos de configurar nossas variáveis de ambiente agora podemos rodar o PHP de qualquer diretório. Para testar o servidor do PHP você pode criar uma pasta com o nome 'teste' contendo um arquivo 'index.php' e adicionar o código abaixo.

```php
<?php

phpinfo();
```

Para executar o servidor abra o CMD, acesse a pasta criada e digite o comando abaixo:

```php
php -S localhost:8000
```

Para encerrar o servidor basta digitar 'Ctrl'+'C'.

# MySQL

## Download

Para configurarmos o MySQL no Windows precisamos efetuar o download do instalador e para isso iremos acessar a página de downloads do site oficial do MySQL em [dev.mysql.com](https://dev.mysql.com/downloads/installer/) e clicar no link 'Download' em
Windows (x86, 32-bit), MSI Installer.

![MySQL Windows Download](/static/images/mysql-windows-download.jpg)

## Instalação

Após efetuar o download execute o instalador e confirme a instalação clicando em sim nas duas próximas etapas. Na próxima tela selecione a opção 'Developer Default', em seguida clique em 'next' e depois em 'Execute'. Após todos os itens serem instalados clique em 'Next' nas duas próximas etapas, em seguida selecione 'Use strong..' e clique em 'next'. Agora cadastre uma nova senha para o usuário root do MySQL e confirme. Prossiga clicando em 'next' nas duas próximas etapas. Clique em 'execute' para aplicar todas as configurações. Confirme as próximas etapas e clique em 'Finish' para concluir a instalação.

![php.ini](/static/images/mysql-windows-instalacao.jpg)

## PHP e MySQL - Integração

Acesse o arquivo 'php.ini' dentro do diretório '/php'. Para habilitar a lib 'mysqli' descomente a linha 'extension=mysqli' removendo o ';' no inicio da linha. Se deseja utilizar PDO descomente a linha 'extension=pdo_mysql'. Para efetivar a alteração reinicie o servidor do php.

![php.ini](/static/images/php-ini.jpg)
