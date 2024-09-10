---
title: 'Singleton: Design Patterns - o que é? Por que usar? Quando utilizar. Resumo com exemplos em PHP!'
date: '2024-09-10'
tags: ['singleton', 'design-patterns', 'php']
draft: false
summary: 'Neste artigo você aprenderá o que é o design pattern Singleton e como utiliza-lo.'
image: '/static/images/design-patterns.jpg'
---

Fala, galera! Neste artigo iremos aprender um pouco mais sobre o padrão Singleton e como implementa-lo na linguagem de programação PHP.

### Pré requisitos

- PHP básico;
- [Programação Orientada a Objetos](https://devcontratado.com/blog/engenharia-de-software/orientacao-a-objetos);
- [Design Patterns](https://devcontratado.com/blog/engenharia-de-software/design-patterns/design-patterns-o-que-e).

### Definição

Singleton é um design pattern criacional utilizado para garantir que uma classe tenha somente uma instância, enquanto possibilita um ponto de acesso global. Singleton é muito utilizado para gerenciar conexões a banco de dados, garantindo que não sejam abertas varias conexões indiscriminadamente.
Sua estrutura basica se define da seguinte maneira:

- Popriedade estática privada para armazenar a instância que gerencia;
- Método estático para obter instância (Gera uma nova instância da classe e armazena em propriedade estática. Todas as proximas chamadas retornam o objeto em cache)
- Construtor privado para evitar instanciamento externo (no caso do php o método mágico __clone é privado e __wakeup retorna uma excessão, ambos também para evitar instanciamento externo)

### Exemplo

A seguir temos um exemplo de implementação do padrão Singleton em uma classe de conexão com banco de dados.

```php

// Classe

<?php

declare(strict_types=1);

namespace App\DB;

class DBConnection
{
    // Propriedade estatica privada para armazenar instância do Singleton
    private static \PDO $instance;

    private static string $host = "db";

    private static string $user = "user";

    private static string $password = "password";

    private static string $db = "app";

    // Construtor privado para evitar instânciamento externo
    private function __construct()
    {
    }

    // Método mágico __clone privado para evitar instânciamento externo
    private function __clone()
    {
    }

    // Método mágico __wakeup retornando uma excessão para evitar desserialização/ instânciamento externo.
    public function __wakeup()
    {
        throw new \Exception("Cannot unserialize.");
    }

    // Método estático para obter instância do Singleton
    public static function getInstance(): \PDO
    {
        // Condição para gerar nova instância somente na primeira chamada
        if(!isset(self::$instance)) {
            return self::$instance = new \PDO("mysql:host=".self::$host.";dbname=".self::$db, self::$user, self::$password);
        }
        return self::$instance;
    }
}

// Exemplo de chamada para uso

DBConnection::getInstance();

```

### Vantagens

- Garante consistência já que todo o sistema tem acesso ao mesmo recurso com exatamente o mesmo estado;
- Facilita a gestão de um recurso compartilhado.

### Desvantagens

- Acaba aumentando o acoplamento do código já que varias partes do sistema dependenm da mesma instância;
- Quebra principio da responsabilidade única, por que resolve dois problemas de uma só vez (garantir que uma classe tenha somente uma instância, possibilitar um ponto de acesso global a esta instância).

/// singleton faz sentido no php ?
