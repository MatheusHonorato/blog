---
title: 'Injeção de dependência: Design Patterns - o que é? Por que usar? Resumo com exemplos em PHP!'
date: '2023-11-26'
tags: ['dependency-injection', 'design-patterns','php', 'padroes-de-projeto', 'injecao-de-dependencia']
draft: false
summary: 'Neste artigo você aprenderá o que é o design pattern injeção de dependência e como utiliza-lo para escrever códigos melhores.'
image: '/static/images/injecao-de-dependencia.jpg'
---

Fala, galera! Neste artigo iremos aprender um pouco mais sobre o padrão injeção de dependência e como implementa-lo na linguagem de programação PHP.

## Pré requisitos

- PHP básico;
- [Programação Orientada a Objetos](https://devcontratado.com/blog/engenharia-de-software/orientacao-a-objetos).

## Definição

Injeção de dependência (DI, Dependency Injection) é um design pattern utilizado para separar a criação de um objeto de suas dependências. Quando estamos utilizando injeção de dependência não instanciamos nossas dependências dentro da classe que estamos trabalhando, mas sim injetamos como parâmetros.

### Exemplos em PHP

A seguir temos um exemplo sem o uso de injeção de dependência. Logo depois temos três diferentes maneiras de aplicar este padrão: Constructor Injection, Method Injection e Property Injection.

#### Sem utilização de injeção de dependência

No exemplo abaixo que criamos uma instancia da classe ```DependenciaA``` dentro do construtor de ```Exemplo```. A técnica funciona, mas perceba o quanto nosso código fica acoplado.

```php
<?php

declare(strict_types=1);

class Exemplo implements
{
    protected DependenciaA $dependenciaA;

    public function __construct()
    {
        // Criação de dependência interna
        $this->dependenciaA = new DependenciaA;
    }
}

```

#### Injeção de dependência por construtor (Constructor Injection)

Neste exemplo passamos nossas dependências diretamente pelo método construtor. Esta abordagem é interessante por que só prosseguimos com o ciclo de vida do objeto se temos todas as dependências instanciadas corretamente.

```php
<?php

declare(strict_types=1);

class Exemplo implements
{
    protected DependenciaA $dependenciaA;
    protected DependenciaB $dependenciaB;

    // Injetando dependência pelo método construtor
    public function __construct(DependenciaA $dependenciaA, DependenciaB $dependenciaB)
    {
        $this->dependenciaA = $dependenciaA;
        $this->dependenciaB = $dependenciaB;
    }
}

```

#### Injeção de dependência por método (Method Injection)

Uma abordagem também frequente é a instanciação de dependências por um método comum (Diferente do construtor). Essa abordagem tende a ser melhor do que uma criação de dependência interna (sem injeção de dependência), mas ainda não costuma funcionar tão bem como a abordagem anterior por que podemos criar nosso objeto sem saber tudo que realmente é necessário para utiliza-lo.

```php

class ExemploDois implements
{
    protected DependenciaA $dependenciaA;
    protected DependenciaB $dependenciaB;

    // Injetando dependência por método comum
    public function preencherDependencias(DependenciaA $dependenciaA, DependenciaB $dependenciaB): void
    {
        $this->dependenciaA = $dependenciaA;
        $this->dependenciaB = $dependenciaB;
    }
}
```

#### Injeção de dependência por propriedade (Property Injection)

Neste exemplo temos métodos especificos para injetarmos as dependências de cada propriedade. É muito frequente chamarmos esses métodos de 'setters'.

```php

class ExemploDois implements
{
    protected DependenciaA $dependenciaA;
    protected DependenciaB $dependenciaB;

    // Injetando dependência por método setter
    public function setDependenciaA(DependenciaA $dependenciaA): void
    {
        $this->dependenciaA = $dependenciaA;
    }

    // Injetando dependência por método setter
    public function setDependenciaB(DependenciaB $dependenciaB): void
    {
        $this->dependenciaB = $dependenciaB;
    }
}
```

Além de proporcionar um maior desacoplamento o conhecimento sobre injeção de dependências é essencial para a implementação de testes de unidade, por que quando estamos testando uma unidade de software precisamos isolar o que é lógica especifica da nossa classe do que é lógica de outras classes que ela depende para assim garantir mais assertividade nos nossos testes.

Para complementar o conhecimento sobre injeção de dependências leia o artigo sobre [container IoC](https://devcontratado.com/blog/engenharia-de-software/design-patterns/container-ioc) e aprenda como automatizar o gerenciamento e injeção das suas dependências.

Para que nosso código se torne ainda mais desacoplado e de fácil reutilização, tornando mais flexivel a injeção de dependências, podemos aplicar o principio SOLID da inversão de dependência que diz que devemos depender de abstrações e não de classes concretas. Aplicando o principio da inversão de dependência não precisamos conhecer classes concretas como nos exemplos acima. Basta tipar nossos parametros utilizando interfaces ou classes abstratas. Leia nosso artigo sobre [SOLID](https://devcontratado.com/blog/engenharia-de-software/solid-principios-da-poo-com-exemplos) e entenda melhor sobre este princípio.

Se gostou do conteúdo comente e compartilhe com o máximo de pessoas. Contribua com a comunidade.
