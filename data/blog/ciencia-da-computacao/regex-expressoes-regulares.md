---
title: 'Regex (Expressões regulares) - Exemplos em PHP'
date: '2023-10-10'
tags: ['regex', 'expressoes-regulares', 'php']
draft: false
summary: 'Neste artigo você aprenderá de maneira simples o que é regex e como utilizar com a linguagem PHP.'
image: '/static/images/php.jpg'
---

Fala, galera! Neste artigo iremos aprender o que são expressões regulares (regex) e como utilizá-las com a linguagem de programação PHP.

## O que é?

Regex é uma abreviação para Regular Expressions (Expressões Regulares), notação utilizada para fazer verificações em textos com 3 principais aplicações:

1 - Buscas: Buscar padrões que definem qual o formato esperado do texto que estamos procurando.
Exemplo: Buscar todos os termos do texto que têm o formato de data dd/mm/yyyy sem saber exatamente qual data estamos procurando;

2 - Validações: Verififcar se determinada sequência de caracteres atende ao padrão fornecido;

3 - Substituições: Extrair uma parte de um padrão para aplicar em um destino.

## Como funciona

Uma expressão regular é definida a partir de uma sequência de caracteres, onde cada caractere tem um significado. A seguir, temos os principais caracteres utilizados.

### Colchetes

Tudo que digitarmos entre colchetes será localizado em todas as partes do texto. 

Exemplo: 

```[0]``` Localiza ocorrências do caractere 0 no texto.

```[02]``` Localiza ocorrências do caractere 0 ou caractere 2 no texto.

### Traço

Determina um intervalo entre valores.

Exemplo:

```[0-9]``` Localiza ocorrências de números entre 0 e 9.

Para buscar por mais um caractere, basta adicionar um colchete na sua string de busca.

Exemplo:

 ```[0][0]``` Localiza duas ocorrências seguidas do número 0 no texto.

### Chaves

É utilizado como quantificador multiplicando a instrução anterior.

Exemplo:

```[0]{2}``` Localiza duas ocorrências seguidas do número 0 no texto.

Exemplo:

```[0-9]{6}``` Localiza os 6 primeiros digitos no texto.

### Cifrão

É utilizado para aplicar as intruções no final do texto.

Exemplo:

```[0-9]{6}$``` Localiza os 6 últimos digitos no texto.

### Circunflexo

É utilizado para aplicar as intruções no início do texto.


Exemplo:

``` ^[0-9]{6} ``` Localiza os 6 primeiros digitos no texto.

### Mais

É utilizado como quantificador para definir um número qualquer de ocorrências da instrução anterior.

Exemplo:

``` ^[0-9]+[-][a-z]$ ``` Localiza texto com os primeiros caracteres como dígitos e o último como uma letra do alfabeto, separados pelo caractere traço.

Se quiser que a busca defina uma letra específica no final, basta trocar o conteúdo entre colchetes da última instrução pela letra que deseja.


## Prática

A seguir, exemplos práticos de expressões regulares para validar dados.

### Exemplo CPF

Como validar o formato da string como um cpf.

```[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}```

### Exemplo data

Substituição de data no formato ano-mês-dia para dia-mês-ano

"2010-12-20"

* Localizar datas: ```[0-9]{4}[-][0-9]{2}[-][0-9]{2}```;
* Colocar tudo que deve ser adicionado na substituição, separando em grupos por parenteses: ```([0-9]{4})[-]([0-9]{2})[-]([0-9]{2})```;
* Colocar o formato desejado, identificando os grupos pelo indice: ```$3/$2/$1```.

### Exemplo DDD

```^(\([0-9]{2}\)|[0-9]{2})$```

No exemplo acima, o caractere circunflexo '^' define o início da expressão e o caractere cifrão '$' o final. Utilizamos o caractere pipe '|' para operação de 'ou', pois  validaremos DDDs
com e sem parênteses. A esquerda temos o padrão de DDD com parenteeses e a direita sem parênteses. Perceba que, no primeiro padrão, precedemos os caracteres de parênteses com uma contra
barra '\' . Isso quer dizer que esses parênteses fazem parte do padrão e devem ser utilizados literalmente e não interpretados como operador para definir grupos. Em seguida, temos
nossa primeira instrução de DDD '[0-9]', representando que é aceito um digito de 0 a 9 e em seguida '{2}'  operador para informar quantas vezes devemos aplicar essa instrução (no nosso
caso, duas vezes). Após o operador de pipe '|'repetimos a instrução sem os parênteses para tratarmos o DDD sem parênteses.

Ferramenta para testar regex: https://regex101.com/

### Resumo

- ^ Início da expressão;
- $ Final da expressão;
- [] Conjunto de caracteres;
- {} Ocorrências - ?{0,1} *{0,} +{1,};
- \- Intervalo valor [a-z];
- , Intervalo ocorrências {1,6};
- ? Ocorrências (aceitar uma ou nenhuma);
- \+ Ocorrências (aceitar uma ou mais);
- \* Ocorrências (aceitar zero ou mais);
- i Desabilitar sensetive case;
- \ Escape de caracteres especiais.

## Regex no PHP

#### Validando string alfanumérica

```php
$string = "abc";
$padrao = "/^[a-z0-9]*$/i"; //Expressão é colocada entre barras

if (preg_match($padrao, $string)) {
	echo "Válido";
	echo "<hr>";
	echo $string;
} else {
	echo "Inválido"
	echo "<hr>";
}
```

#### Validando endereço de e-mail

```php
$string = "abc";
$padrao = "/^[a-z0-9\-\_]+@[a-z0-9\-\_]+[.com|.com.br]*$/i"; //Expressão é colocada entre barras

if (preg_match($padrao, $string)) {
	echo "Válido";
	echo "<hr>";
	echo $string;
} else {
	echo "Inválido"
	echo "<hr>";
}
```

#### Removendo caracteres diferentes de números

```php

$string = "123.456.789-10"
$padrao = "/^[0-9]*$/";

$cpf = preg_replace($padrao, "", $string);

```
