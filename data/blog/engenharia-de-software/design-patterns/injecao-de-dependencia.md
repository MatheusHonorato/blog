---
title: 'Injeção de dependencia: Design Patterns - o que é? porque usar? Resumo com exemplos em PHP!'
date: '2023-11-26'
tags: ['dependency-injection', 'design-patterns','php', 'padroes-de-projeto', 'injecao-de-dependencia']
draft: true
summary: 'Neste artigo você aprenderá o que é o design pattern injeção de dependencia e como utiliza-lo para escrever códigos melhores.'
image: '/static/images/injecao-de-dependencia.jpg'
---

Fala, galera! Neste artigo iremos aprender um pouco mais sobre o padrão injeção de dependência e como implementa-lo na linguagem de programação PHP.

## Pré requisitos

- PHP básico;
- Programação Orientada a Objetos;

## Definição

Injeção de dependência (DI, Dependency Injection) é um design pattern utilizado separar a criação e gerenciamento do estado interno de um objeto de suas dependências. Quando estamos utilizando injeção de dependência não instanciamos com a palavra chave ```new``` nossos objetos dentro da classe que estamos trabalhando, mas sim injetamos como parâmetros os objetos que precisamos, seja no método construtor ou em algum outro método.

### Exemplos em PHP

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

class ExemploDois implements
{
    protected DependenciaA $dependenciaA;
    protected DependenciaB $dependenciaB;

    // Injetando dependência por método comum
    public function preencherDependencias(DependenciaA $dependenciaA, DependenciaB $dependenciaB)
    {
        $this->dependenciaA = $dependenciaA;
        $this->dependenciaB = $dependenciaB;
    }
}
```

Além de proporcionar um maior desacoplamento o conhecimento sobre injeção de dependências é essencial para a implementação de testes de unidade, por que quando estamos testando uma unidade de software precisamos isolar o que é lógica especifica da nossa classe do que é lógica de outras classes que ela depende para assim garantir mais assertividade nos nossos testes.

Para complementar o conhecimento sobre injeção de dependências leia o artigo sobre [container IoC](https://devcontratado.com/blog/engenharia-de-software/design-patterns/container-ioc) e aprenda como automatizar o gerenciamento e injeção das suas dependências.

Se gostou do conteúdo comente e compartilhe com o máximo de pessoas. Contribua com a comunidade.
