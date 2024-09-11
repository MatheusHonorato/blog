---
title: 'Monostate: Design Patterns - o que é? Por que usar? Resumo com exemplos em PHP!'
date: '2024-09-11'
tags: ['monostate', 'design-patterns', 'php']
draft: false
summary: 'Neste artigo você aprenderá o que é o design pattern Monostate e como utiliza-lo.'
image: '/static/images/monostate.jpg'
---

Fala, galera! Neste artigo iremos aprender um pouco mais sobre o padrão Monostate e como implementa-lo na linguagem de programação PHP.

### Pré requisitos

- PHP básico;
- [Programação Orientada a Objetos](https://devcontratado.com/blog/engenharia-de-software/orientacao-a-objetos);
- [Design Patterns](https://devcontratado.com/blog/engenharia-de-software/design-patterns/design-patterns-o-que-e);
- [Singleton](https://devcontratado.com/blog/php/singleton)


### Definição

Monostate pode ser entendido como uma variação do design pattern [criacional](https://refactoring.guru/pt-br/design-patterns/creational-patterns) [Singleton](https://devcontratado.com/blog/php/singleton). O padrão Monosate também tem o objetivo de garantir um único estado compartilhado globalmente, mas diferente do [Singleton](https://devcontratado.com/blog/php/singleton) convencional não restringe a criação de novas instâncias da classe.
Sua estrutura basica se define da seguinte maneira:

- Popriedade estática privada para armazenar estado compartilhado;
- Construtor publico para possibilitar novas instâncias;
- Método estático para obter instância de estado compartilhado (retorna valor da variável estática compartilhado entre todas as instâncias da classe).

### Exemplo

A seguir temos um exemplo de implementação do padrão Monostate em uma classe de conexão com banco de dados.

```php

// Classe

<?php

declare(strict_types=1);

namespace App\DB;

class DBConnection
{
    // Propriedade estática privada para armazenar instância do Monostate
    private static \PDO $instance;

    private static string $host = "db";

    private static string $user = "user";

    private static string $password = "password";

    private static string $db = "app";

    // Construtor publico, diferente do Singleton convencional permite mais de uma instância
    public function __construct()
    {
        self::$instance = new \PDO("mysql:host=".self::$host.";dbname=".self::$db, self::$user, self::$password);
    }

    // Método estático para obter objeto armazenado em propriedade estatica
    public static function getInstance(): \PDO
    {
        return self::$instance;
    }
}

// Exemplo de chamada para uso

DBConnection::getInstance();

```

### Vantagens

- Garante consistência já que todo o sistema tem acesso ao mesmo recurso com exatamente o mesmo estado;
- Facilita a gestão de um recurso compartilhado;
- Não restringe a criação de novos objetos.

### Desvantagens

- Acaba aumentando o acoplamento do código já que varias partes do sistema compartilham o mesmo estado;
- Sobrescrita de estado. Uma nova instância pode sobrescrever o estado compartilhado enquanto outra parte do sistema a consome.
