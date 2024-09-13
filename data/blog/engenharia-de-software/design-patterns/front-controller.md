---
title: 'Front-Controller: Design Patterns - o que é? Por que usar? Resumo com exemplos!'
date: '2024-09-13'
tags: ['front-controller', 'design-patterns', 'php']
draft: false
summary: 'Neste artigo você aprenderá o que é o design pattern front-controller e como utiliza-lo para escrever códigos melhores.'
image: '/static/images/front-controller.jpg'
---

Fala, galera! Neste artigo iremos aprender um pouco mais sobre o padrão Front-Controller e como implementá-lo na linguagem de programação PHP.

## Pré requisitos

- PHP básico;
- [Programação Orientada a Objetos](https://devcontratado.com/blog/engenharia-de-software/orientacao-a-objetos).
- Composer

## Definição

Front-Controller é um design pattern utilizado para concentrar todas as requisições feitas a um sistema em um único ponto de entrada, onde a partir da li a requisição é delegada a outros componentes. É muito comum que o Front-Controller utilize um sistema de rotas para este encaminhamento. Em PHP é comum nomearmos o Front-Controller como index.php.

### Exemplo em PHP

A seguir temos um exemplo de Front-Controller em PHP. O arquivo começa com tudo que precisamos inicializar no sistema. Neste exemplo estamos fazendo um encaminhamento simples diretamente no index.php, então começamos importando TestControler e em seguida o autoload do composer. Em um sistema real neste ponto inicializariamos por exemplo o uso de sessões e constantes. Em seguida fazemos o encaminhamento para outros componentes, aqui resolvemos isto com a função match, mas em um sistema mais robusto provavelmente seria inicializado um sistema de rotas.

```php
<?php

use App\FrontController\Controllers\TestController;

require_once __DIR__ . '/../vendor/autoload.php';

$uri = $_SERVER['REQUEST_URI'];

match ($uri) {
    '/' => TestController::index(),
    '/test' => TestController::hello(),
    default => print('Not found'),
};
```

E aí ? gostou do conteúdo ? Se sim compartilhe com o máximo de pessoas que puder e contribua com a comunidade PHP.