---
title: 'MVC: Arquitetura - o que é? Por que usar? Resumo com exemplos!'
date: '2024-09-11'
tags: ['mvc', 'arquitetura', 'php']
draft: false
summary: 'Neste artigo você aprenderá o que é o design pattern MVC e como utiliza-lo para melhor organizar sua aplicação.'
image: '/static/images/arch.jpg'
---

### Introdução

Fala, galera! Neste artigo vamos aprender o que é MVC e por que utiliza-lo. MVC é um padrão de arquitetura utilizado para organizar uma aplicação em camadas. O padrão MVC define três camadas básicas para a aplicação: Model, View e Controller. No padrão MVC cada uma destas camadas possui uma responsabiidade bem definida. A seguir temos um diagrama com sua representação.

![MVC](/static/images/MVC.png)


### Camadas

- Model

    ```php
    declare(strict_types=1);

    namespace App\Models;

    class UserModel
    {
        public function __construct(
            public readonly string $name,
            public readonly string $email,
            public readonly ?int $id = null
        ) {
            if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
                throw new \Exception('Invalid E-mail');
            }
        }

        public function toArray(): array
        {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email
            ];
        }
    }
    ```

    Camada responsável por representar regras de negócio e entidades do sistema.

- View

    ```php
    <!DOCTYPE html>
    <html>
    <head>
        <title>Home</title>
    </head>
    <body>
        <h1>Welcome, <?php echo htmlspecialchars($user->name); ?>!</h1>
        <p>Email: <?php echo htmlspecialchars($user->email); ?></p>
    </body>
    </html>
    ```

    Camada responsável pela apresentação da aplicação. Em aplicações web costuma ser composta por ferramentas de template para gerar HTML, CSS, Javascript e montar paginas que serão retornadas ao usuário da aplicação pelo controller.

- Controller

    ```php
    <?php

    declare(strict_types=1);

    namespace App\Controllers;

    class UserController
    {
        public function index(): view
        {
            // Criando objeto usuário de exemplo
            $user = new UserModel('Matheus', 'matheus@example.com', 1);

            // Chamando camada de View
            return view('users', ['user' => $user]);
        }
    }

    ```

    Camada intermediária da arquitetura MVC é responsável por receber requisições, chamar Models ou outras classes auxiliares, se comunicar com a camada de View para definir apresentação dos dados e retorna-la ao usuário como resposta.

### Fluxo e comunicação entre camdas/objetos

O fluxo dentro da arquitetura MVC se inicia pela camada de Controller que recebe a requisição do usuário, se comunica com as camadas de Model e View e então retorna uma resposta ao usuário.

### Por que utilizar o MVC

É importante utilizar um padrão para organização das nossas aplicações onde cada módulo ou camada tem uma responsabilidade muito bem definida, a arquitetura MVC possibilita isto e já é extremamente bem sucedida no mercado. Utilizar um padrão já bem estabelecido além de ajudar a organizar a sua aplicação também facilita a entrada de novos desenvolvedores no projeto, pois possibilita um entendimento mais rapido do funcionamento da aplicação.

### Demonstração

Para que tenha uma maior fixação do conceito recomendamos a leitura do artigo [CRUD PHP POO (Orientado a objetos) com MySQL e PDO (PHP 8 Vanilla)](https://devcontratado.com/blog/php/crud-php-orientado-a-objetos-mysql), onde aplicamos o conceito MVC em um CRUD orientado a objetos.
