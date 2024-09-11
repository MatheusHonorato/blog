---
title: Sistema de rotas com PHP 8
date: '2024-08-23'
tags: ['php', 'rotas', 'poo']
draft: false
summary: 'Neste artigo você aprenderá como desenvolver um sistema de rotas com PHP.'
image: '/static/images/routes.jpg'
---

### Pré-requisitos:

- Noções básicas de desenvolvimento web (Cliente/Servidor);
- [Conhecimento em PHP orientado a objetos](https://devcontratado.com/blog/engenharia-de-software/orientacao-a-objetos);
- [Expressões regulares](https://devcontratado.com/blog/ciencia-da-computacao/regex-expressoes-regulares)
- Conhecimento em [Composer](https://getcomposer.org).

### Introdução

Fala, galera! Você já se perguntou como funciona um sistema de rotas? Se você já trabalha com PHP orientado a objetos, provavelmente, já usou uma biblioteca de rotas ou um framework que implementa essa funcionalidade. Neste artigo, vamos criar um sistema de rotas com PHP 8 orientado a objetos para entender melhor como uma ferramenta desse tipo funciona. Obs: O objetivo deste projeto é estudo! Se você precisa dessa funcionalidade para um projeto no trabalho, recomendamos a utilização de uma solução mais robusta como o [Slim framework](https://www.slimframework.com) ou, se precisar de um framework completo, [Laravel](https://laravel.com).

### Estrutura do Projeto

#### Arquivo `public/index.php`

Começamos pelo `index.php`, que segue o padrão de design *front-controller*. Nesse padrão, todas as requisições são interceptadas por um único ponto, que carrega e processa o necessário para enviar uma resposta ao usuário. Ao implementar esse padrão, o usuário não acessa outros arquivos diretamente como: /users.php, /tasks.php. O `index.php` fica no diretório `public`, o único diretório exposto no servidor. Ele é o ponto de entrada do sistema.

O `index.php` inicia carregando o autoload do Composer, importa as definições de rotas e executa o método estático `run` da classe `Router`, que faz a associação dos endpoints aos métodos dos controladores.

```php
<?php

require '../vendor/autoload.php';

$routes = require_once '../config/routes.php';

try {
    \App\Http\Router::run($routes);
} catch (\Exception $e) {
    echo $e->getMessage();
    http_response_code($e->getCode())
}

```

#### Arquivo `config/routes.php`

O `routes.php` define as rotas do sistema em um array de arrays. Cada sub-array contém:

1. URI da rota;
2. Controlador e método a serem chamados;
3. Método HTTP (GET, POST, etc.).

```php
<?php
use App\Controllers\TesteController;
use App\Enums\HttpMethodEnum;

return [
    // uri, [controlador, método], método http
    ['teste/{id}',  [TesteController::class, 'index'], HttpMethodEnum::GET],
    ['teste',  [TesteController::class, 'store'], HttpMethodEnum::POST],
];
```

#### Diretório `src`

Aqui estão todas as classes relacionadas ao desenvolvimento do sistema. A seguir, exploramos algumas subpastas e classes importantes:

#### Diretório `src/Enums`

Armazena as classes Enum do sistema.

#### Arquivo `Enums/HttpMethodEnum.php`

Classe Enum que representa os tipos de requisições HTTP reconhecidos, usados nas definições de rotas para indicar o método HTTP correto (GET, POST, etc.).

```php
<?php

declare(strict_types=1);

namespace App\Enums;

enum HttpMethodEnum: string
{
    case GET = 'GET';
    case POST = 'POST';
    case PUT = 'PUT';
    case PATCH = 'PATCH';
    case DELETE = 'DELETE';
    case OPTIONS = 'OPTIONS';
    case HEAD = 'HEAD';
    case TRACE = 'TRACE';
    case CONNECT = 'CONNECT';

    public static function fromValue(string $value): self
    {
        return match ($value) {
            'GET' => self::GET,
            'POST' => self::POST,
            'PUT' => self::PUT,
            'PATCH' => self::PATCH,
            'DELETE' => self::DELETE,
            'OPTIONS' => self::OPTIONS,
            'HEAD' => self::HEAD,
            'TRACE' => self::TRACE,
            'CONNECT' => self::CONNECT,
        };
    }
}
```

#### Diretório `src/Http`

Armazena as classes relacionadas às requisições e à lógica de roteamento.

#### Arquivo `src/Http/Request.php`

A classe `Request` abstrai os dados das requisições, como query parameters e corpo da requisição. Ela também permite obter o método HTTP atual sem acessar diretamente as variáveis globais do PHP.

Principais métodos:

1. **getUri()**: retorna à URI atual sem query parameters.
2. **getHttpMethod()**: retorna o método HTTP atual, utilizando a enum `HttpMethodEnum`.
3. **getQueryParams()**: retorna os parâmetros GET passados na URL.
4. **getBody()**: retorna o corpo da requisição, se houver.

```php
<?php

declare(strict_types=1);

namespace App\Http;

use App\Enums\HttpMethodEnum;
use App\Http\RequestInterface;

class Request implements RequestInterface
{
    public static function getUri(): string
    {
        return strtok($_SERVER['REQUEST_URI'], '?');
    }

    public static function getHttpMethod(): HttpMethodEnum
    {
        return HttpMethodEnum::fromValue($_SERVER['REQUEST_METHOD']);
    }

    public static function getQueryParams(): array
    {
        return $_GET;
    }

    public static function getBody(): string|false
    {
        return file_get_contents('php://input');
    }
}
```

#### Arquivo `src/Http/Router.php`

Essa é a classe central do sistema, responsável por fazer o roteamento das requisições. Ela faz o *match* das rotas definidas em `config/routes.php` com os métodos dos controladores e injeta as dependências necessárias.

Principais métodos:

1. **run()**: percorre as rotas e tenta encontrar uma correspondência com a URI atual. Se houver *match*, o controlador é instanciado e suas dependências são injetadas.
2. **isMatchingRequest()**: verifica se o método HTTP da requisição corresponde ao da rota. Se não houver correspondência, retorna `false` e a próxima rota é avaliada.
3. **instantiateController()**: verifica se o controlador existe e o instancia. Caso contrário, interrompe a lógica e passa para a próxima rota.
4. **resolveParameters()**: resolve os parâmetros da rota. Se falhar, a próxima rota é avaliada; se bem-sucedido, o método do controlador é executado com as dependências injetadas.

```php
<?php

declare(strict_types=1);

namespace App\Http;

use App\Enums\HttpMethodEnum;
use App\Helpers\Helper;
use ReflectionMethod;
use App\Http\Request;
use Exception;

class Router
{
    private const PATH = 0;
    private const ACTION = 1;
    private const HTTP_METHOD = 2;
    private const CONTROLLER_NAME = 0;
    private const NAME = 1;

    public static function run(array $routes): void
    {
        foreach ($routes as $route) {
            // 1º - Verifica equivalência de método http definido na rota com método utilizado na requisição atual.
            if(!self::isMatchingRequest($route[self::HTTP_METHOD])) {
                continue;
            }

            // 2º Obtém instância de controlador
            $controller = self::instantiateController($route[self::ACTION][self::CONTROLLER_NAME]);

            if(!$controller) {
                continue;
            }

            $methodName = $route[self::ACTION][self::NAME];

            // 3º - Verifica existência de método definido na rota em controlador
            if(!method_exists($controller, $methodName)) {
                continue;
            }

            // 4º - Resolve parâmetros de método do controlador
            $params = self::resolveParameters($route);

            // 5º - Se URI não faz match com rota atual, prossegue para próxima
            if($params === false) {
                continue;
            }

            // 6º - Executa método do controlador injetando dependências
            $controller->{$methodName}(...$params);

            return;
        }

        throw new Exception('Not found', 404);
    }

    private static function isMatchingRequest(HttpMethodEnum $routeMethod): bool
    {
        return Request::getHttpMethod() === $routeMethod;
    }

    private static function instantiateController(string $controller): ?object
    {
        if(!class_exists($controller)) {
            return null;
        }

        return new $controller(new Request());
    }

    private static function resolveParameters(array $route): array|bool
    {
        $methodName = $route[self::ACTION][self::NAME];
        $controllerName = $route[self::ACTION][self::CONTROLLER_NAME];

        // Utiliza recurso de reflexão para obter quantidade de parâmetros necessários para o método.
        $expectedParamsCount = (new ReflectionMethod($controllerName, $methodName))->getNumberOfParameters();

        $params = Helper::match(Request::getUri(), $route[self::PATH]);

        if($expectedParamsCount > 0 && !empty($params) && $params != false) {
            Helper::castingParams($params);
        }

        return $params;
    }
}

```

#### Diretório `src/Controllers`

Armazena os controladores, que recebem as requisições, chamam classes com as regras de negócio e retornam respostas ao usuário.

#### Diretório `src/Helpers`

Contém classes com métodos auxiliares para o sistema.

#### Arquivo `src/Helpers/Helper.php`

A classe `Helper` possui dois métodos principais:

1. **castingParams()**: verifica o valor de uma variável e faz o *casting* para o tipo mais adequado. Usado para garantir que os parâmetros recebidos sejam do tipo correto.
2. **match()**: faz o *match* de uma expressão regular com uma string específica.

```php
<?php

declare(strict_types=1);

namespace App\Helpers;

class Helper
{
    public static function castingParams(array &$params): void
    {
        foreach ($params as $key => $param) {
            if (is_numeric($param)) {
                if(!is_int($param)) {
                    $params[$key] = (float) $param;
                }
                $params[$key] = (int) $param;
            }
        }
    }

    public static function match(string $subject, string $path): array|bool
    {
        if($subject === '/' . $path) {
            return [];
        }

        // Expressão regular para validar o endereço levando em consideração o padrão que utilizamos para associar parametros na uri: {parametro}
        $pattern = "/" . preg_replace('/\{[^\}]+\}/', '([^/]+)', $path);

        // Validação de endereço de acordo com padrão definido logo acima.
        preg_match('#^' . $pattern . '$#', $subject, $matches);

        array_shift($matches);

        if(empty($matches)) {
            return false;
        }

        return $matches;
    }
}
```

### Conclusão

Neste artigo, vimos como implementar um sistema de rotas com PHP 8 orientado a objetos, um recurso essencial no desenvolvimento de aplicações web. Entender como implementar uma funcionalidade deste tipo nos ajuda a compreender melhor como as bibliotecas de rotas e frameworks funcionam por de trás dos panos.

Gostou do conteúdo? Compartilhe com sua rede! Tem alguma dúvida ou sugestão? Deixe seu comentário abaixo!