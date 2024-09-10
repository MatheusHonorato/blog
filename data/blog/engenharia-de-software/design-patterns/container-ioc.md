---
title: 'Container IoC: Design Patterns - o que é? Por que usar? Resumo com exemplos em PHP!'
date: '2023-11-26'
tags: ['container-ioc', 'design-patterns','php', 'padroes-de-projeto']
draft: false
summary: 'Neste artigo você aprenderá o que é o design pattern container ioc e como utiliza-lo para escrever códigos melhores.'
image: '/static/images/container-ioc.jpg'
---

Fala, galera! Neste artigo iremos aprender um pouco mais sobre o padrão Container IoC e como implementa-lo na linguagem de programação PHP.

## Pré requisitos

- PHP básico;
- [Programação Orientada a Objetos](https://devcontratado.com/blog/engenharia-de-software/orientacao-a-objetos);
- [Injeção de dependencia](https://devcontratado.com/blog/engenharia-de-software/design-patterns/injecao-de-dependencia).

## Definição

Basicamente, Service Container (ou IoC Container) é uma ferramenta, para gerenciar de maneira centralizada dependências de classes e fazer uso do padrão de projeto injeção de dependencia. Com um Container IoC temos uma maneira de injetar automaticamente dependencias em uma classe ou componente.

## Classe Container

Para configurarmos um container IoC é necessário uma classe para gerencia-lo. A classe precisa conter um método para mapear (fazer um bind) de classes que iremos utilizar com suas respectivas dependências. Além disso também precisa de um método para resolver as instancias dos objetos que mapeamos no bind. A seguir temos um exemplo básico de implementação em PHP 8.

```php
<?php

declare(strict_types=1);

namespace App\Util;

class Container
{
    private array $bindings = [];

    public function set(mixed $key, mixed $value): void
    {
        $this->bindings[$key] = $value;
    }

    public function get(mixed $key): mixed
    {
        if (!isset($this->bindings[$key]) || !is_callable(value: $this->bindings[$key])) {
            return $this->bindings[$key];
        }

        return call_user_func($this->bindings[$key]);
    }
}

```

## Instanciando um container e mapeando dependencias

Após instanciarmos o container ioc fazemos o bind das classes com suas dependências e armazenamos no array $bindings. No exemplo a seguir instanciamos e utilizamos a classe que definimos no topico anterior.

```php

$container = new Container();

$container->set(
    key: Logger::class,
    value: new Logger(new File())
);

$container->set(
    key: UserRepository::class,
    value: new UserRepository($container->get(key: Logger::class))
);

```

## Utilizando o container

Para utilizar o container devemos instanciar nossas classes a partir dele. Perceba que para instanciarmos a classe ```Logger``` passamos somente seu nome e o nosso container já injeta todas as dependências que foram resolvidas no processo de bind, retornando a instância de ```Logger``` pronta.

```php

$logger = $container->get(key: Logger::class);

```

## Soluções em php para container IoC

No artigo utilizamos um exemplo simples para compreender o conceito de container IoC, mas se estiver desenvolvendo uma aplicação para colocar em produção recomendamos fortemente a utilização de um pacote consolidado para implementar seu container.

Algumas opções conhecidas para PHP:

- [PHP-DI (Dependency Injection Container)](https://php-di.org);
- [Symfony DependencyInjection Component](https://symfony.com/doc/current/components/dependency_injection.html)

## Trabalhando com PHP-DI

PHP DI é uma das soluções mais conhecidas para containers DI no PHP. A seguir temos um exemplo simples mostrado na própria documentação de como utilizar o pacote. Perceba que a utilização basica do pacote é muito similar a do nosso exemplo.

### Configurando PHP DI

```php
<?php

$container->set('db', new Database($options));

$container->set('logger', function () {
    $logger = new Monolog\Logger();
    $logger->pushHandler(new StreamHandler('app.log'));
    return $logger;
});

$db = $container->get('db');
$logger = $container->get('logger');
```

### Utilizando PHP DI

```php
<?php

$container = new Container();

$home = $container->get(DB::class);
```

Se gostou do conteúdo comente e compartilhe com o máximo de pessoas. Contribua com a comunidade.
