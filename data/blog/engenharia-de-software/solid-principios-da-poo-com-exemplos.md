---
title: 'SOLID: Princípios da programação orientada a objetos'
date: '2023-08-28'
tags: ['solid', 'clean code', 'código limpo', 'poo', 'orientação a objetos', 'php', 'engenharia de software']
draft: false
summary: 'Neste artigo você aprenderá como melhorar a qualidade do seu código utilizando SOLID (Princípios da POO).'
image: '/static/images/solid.jpg'
---

<div className="flex justify-center">
    <figure class="flex flex-col items-center">
        <img src="/static/images/solid.jpg" title="SOLID" alt="SOLID"/>
        <figcaption>Fonte: <a href="https://www.freecodecamp.org/news/content/images/2020/08/solid.png" target="_blank">https://www.freecodecamp.org</a></figcaption>
    </figure>
</div>

<p className="text-justify">Fala, Galera! Neste artigo vamos aprender sobre SOLID. Mas afinal o que é SOLID? SOLID é um acrônimo mnemônico criado por Michael Feathers. O acrônimo SOLID foi criado a partir dos princípios de design de software para POO mais relevantes identificados por Robert Cecil Martin (Uncle Bob). Os princípios SOLID te auxiliam a desenvolver código orientado a objetos mais legível, fácil de manter, extensível, reutilizável e sem repetição, ou seja, com os princípios SOLID desenvolvemos código limpo e com mais qualidade. A seguir temos a lista destes cinco princípios com exemplos na linguagem de programação PHP.</p>

1. Single responsibility principle (Princípio da responsabilidade única):

<div className="flex justify-center">
    <figure class="flex flex-col items-center">
        <img  src="/static/images/responsabilidade-unica.jpg" title="Responsabilidade única" alt="Responsabilidade única"/>
        <figcaption>Fonte: <a href="https://miro.medium.com/v2/resize:fit:500/1*PxIES4LBAMi8K4RudiP-tw.jpeg" target="_blank">https://miro.medium.com</a></figcaption>
    </figure>
</div>

O princípio da responsabilidade única diz que uma classe deve possuir apenas uma razão para mudar, garantindo assim que não acumule responsabilidades. Quanto mais uma classe acumula responsabilidades, mais difícil é utilizá-la e monitorar efeitos colaterais em outras partes do sistema quando a alteramos. De acordo com o SRP, uma classe deve ter apenas um objetivo quando se trata do fluxo em um software.

Quando temos uma classe que não atenda esse princípio, devemos dividi-la em partes menores até que essa condição seja satisfeita.

Exemplos:

Quebrando o princípio:

```php
<?php

declare(strict_types=1);

class Relatorio
{
    public function getTitulo(): string
    {
        return 'Título do Relatório';
    }

    public function getData(): string
    {
        return '2018-01-22';
    }

    public function getConteudo(): array
    {
        return [
            'titulo' => $this->getTitulo(),
            'data' => $this->getData(),
        ];
    }

    public function formatarJson(): string | false
    {
        return json_encode($this->getConteudo());
    }
}
```

No exemplo acima a classe **Relatorio** possui duas responsabilidades: trazer os dados do relatório e formatar os dados do relatório.

Refatorando:

```php
<?php

declare(strict_types=1);

class Relatorio
{
    public function getTitulo(): string
    {
        return 'Título do Relatório';
    }

    public function getData(): string
    {
        return '2018-01-22';
    }

    public function getConteudo(): array
    {
        return [
            'titulo' => $this->getTitulo(),
            'data' => $this->getData(),
        ];
    }
}

class FormatadorJsonRelatorio
{
    public function formatar(Relatorio $relatorio): string | false
    {
        return json_encode($relatorio->getConteudo());
    }
}
```

Criamos a classe **FormatadorJsonRelatorio** para assumir a responsabilidade de formatar os dados e mantivemos a classe **Relatorio** com a responsabilidade de retornar os dados do relatório. Isso garante que respeitemos o princípio da responsabilidade única pois cada classe possui apenas uma responsabilidade.

2. Open closed principle (Princípio aberto/fechado)

<div className="flex justify-center">
    <figure class="flex flex-col items-center">
        <img  src="/static/images/aberto-fechado.jpg" title="Aberto Fechado" alt="Aberto Fechado"/>
        <figcaption>Fonte: <a href="https://deviq.com/static/a86f9b76c26f80c3749264670efb2347/066f9/open-closed-principle-400x400.jpg" target="_blank">https://deviq.com</a></figcaption>
    </figure>
</div>

O princípio aberto/fechado diz que entidades de software (classes, módulos, funções) devem estar abertas para extensão e fechadas para modificação. O que isso quer dizer? Basicamente que para adicionar funcionalidades no sistema não deve ser necessário modificar classes já existentes, aumentando a complexidade do código e a probabilidade de novos erros. Sempre que for necessário criar um novo recurso, devemos criar uma nova classe que o implemente, ou seja, não podemos adicionar o novo recurso em uma classe já existente.

Exemplo: 

Quebrando o princípio:

```php
<?php

declare(strict_types=1);

class Logger
{
    public function escreverTxt($mensagem): void
    {
        // Lógica
    }

    public function escreverCsv($mensagem): void
    {
        // Lógica
    }
}
```

De acordo com a lógica da classe **Logger**, se for necessário escrever em um novo tipo de saída será preciso modificá-la adicionando uma nova função, quebrando assim o princípio aberto/fechado.

Refatorando:

```php
<?php

declare(strict_types=1);

class Logger
{
    public function __construct(private Escritor $escritor) {}

    public function escrever($mensagem): void
    {
        $this->escritor->escrever($mensagem);
    }
}

interface Escritor
{
    public function escrever($mensagem): void;
}

class Txt implements Escritor
{
    public function escrever($mensagem): void
    {
        // Lógica
    }
}

class Csv implements Escritor
{
    public function escrever($mensagem): void
    {
        // Lógica
    }
}
```

Como pode ser observado, criamos classes escritoras que implementam a mesma interface, assim quando precisarmos escrever em um novo tipo de saída basta criarmos uma classe que implementa a interface **Escritor**. Desta forma respeitamos o princípio aberto/fechado.

3. Liskov substitution principle (Princípio da substituição de Liskov)

<div className="flex justify-center">
    <figure class="flex flex-col items-center">
    <img width="80%" src="/static/images/liskov-substitution.jpg" title="Substituição de Liskov" alt="Substituição de Liskov"/>
        <figcaption>Fonte: <a href="https://thinkdifferent0.files.wordpress.com/2017/07/liskovsubtitutionprinciple_52bb5162.jpg?w=750&h=600&crop=1" target="_blank">https://thinkdifferent0.files.wordpress.com</a></figcaption>
    </figure>
</div>

O princípio da substituição de Liskov, introduzido por Barbara Liskov em ‘Data Abstraction’ (1987) diz que classes derivadas devem ser substituíveis por sua classe base ou classes irmãs. O que isso quer dizer? basicamente que uma instância da classe base deve poder ser substituída por uma instância de sua classe filha e o comportamento do programa deve se manter o mesmo.

Exemplo:

Quebrando o princípio:

```php
<?php

declare(strict_types=1);

class Retangulo
{
    protected $largura = 0;
    protected $altura = 0;

    public function setLargura(int $largura): void
    {
        $this->largura = $largura;
    }

    public function setAltura(int $altura): void
    {
        $this->altura = $altura;
    }

    public function getArea(): int
    {
        return $this->largura * $this->altura;
    }
}

class Quadrado extends Retangulo
{
    public function setLargura(int $largura): void
    {
        $this->largura = $this->altura = $largura;
    }

    public function setAltura(int $altura): void
    {
        $this->altura =  $this->largura = $altura;
    }
}

function imprimirArea(Retangulo $retangulo): void
{
    $retangulo->setLargura(4);
    $retangulo->setAltura(5);

    echo "A área é: ". (string) $retangulo->getArea();
}

$retangulos = [new Retangulo(), new Quadrado()];

foreach($retangulos as $retangulo) {
    imprimirArea($retangulo);
}

```

O princípio LSP é quebrado porque não conseguimos substituir a classe filha (**Quadrado**) pela classe base (**Retangulo**) e vice e versa sem quebrar o comportamento do programa ou retornar resultados incorretos. Se instanciarmos nossas classes base e filha e executarmos o método getArea para ambos os objetos, obtemos um  resultado errado para a instância da classe **Quadrado**. Pelo fato da classe **Quadrado** estender a classe **Retangulo** acabamos inicializando os valores da forma **Quadrado** de maneira errada, pois o **Quadrado** deve possuir as mesmas medidas para largura e altura, não existe a possibilidade de medidas diferentes como é aceito para a forma **Retangulo**, sendo assim mesmo que matematicamente seja entendido que todo quadrado é um retângulo, a forma quadrado não herda de fato todas as características da forma retângulo, assim é perceptível que o relacionamento da classe **Quadrado** em relação a classe **Retangulo** não é um relacionamento do tipo ‘É um’ como é necessário para aplicarmos o conceito de herança corretamente.

Refatorando:

```php
<?php

declare(strict_types=1);

interface Forma
{
    public function getArea(): int;
}

class Retangulo implements Forma
{
    public function __construct(
        private int $largura = 0,
        private int $altura = 0,
    ){}

    public function getArea(): int
    {
        return $this->largura * $this->altura;
    }
}

class Quadrado extends Forma
{
    public function __construct(
        private int $altura = 0,
    ){}

    public function getArea(): int
    {
        return $this->altura ** 2;
    }
}

function imprimirArea(Forma $forma): void
{
    echo "A área é: ". (string) $forma->getArea();
}

$formas = [new Retangulo(4, 5), new Quadrado(5)];

foreach($formas as $forma) {
    imprimirArea($forma);
}

```
Para resolver o problema foi criado uma interface mais genérica chamada **Forma**, responsável por alocar as características em comum de ambas as classes, **Retangulo** e **Quadrado**. Como alocamos o comportamento comum das duas classes em uma interface mais genérica conseguimos executar o método definido na interface **Forma** sem quebrar o comportamento do programa ou retornar valores errados. Conseguimos resolver o problema porque agora só executamos na iteração o que é comum para ambas as formas.


4. Interface segregation principle (Princípio da segregação de interfaces)

<div className="flex justify-center">
    <figure class="flex flex-col items-center">
        <img src="/static/images/segregacao-interfaces.jpg" title="Segregação de interfaces" alt="Segregação de interfaces"/>
        <figcaption>Fonte: <a href="https://deviq.com/static/a407170392150a90b0ce412ad2878174/066f9/interface-segregation-400x400.jpg" target="_blank">https://deviq.com</a></figcaption>
    </figure>
</div>

O princípio da segregação de interfaces diz que uma classe não deve ser obrigada a implementar métodos que não utiliza. Resumindo: Interfaces específicas são melhores que interfaces inchadas.

Exemplo:

Quebrando o princípio:

```php
<?php

declare(strict_types=1);

interface Funcionario
{
    public function comer(): void;

    public function trabalhar(): void;
}

class FuncionarioHumano implements Funcionario
{
    public function comer(): void
    {
        // Lógica
    }

     public function trabalhar(): void
    {
        // Lógica
    }
}

class FuncionarioRobo implements Funcionario
{
    public function comer(): void
    {
        // Lógica
    }

     public function trabalhar(): void
    {
        // Lógica
    }
}
```

Estamos obrigando a classe **TrabalhadorRobo** a implementar um método que não utiliza, pois robôs não se alimentam, mas a nossa interface exige a implementação do método comer.

Refatorando:

```php
<?php

declare(strict_types=1);

interface Trabalhador
{
    public function trabalhar(): void;
}

interface Alimentavel
{
    public function comer(): void;
}

interface Funcionario extends Trabalhador, Alimentavel
{

}

class FuncionarioHumano implements Funcionario
{
    public function comer(): void
    {
        // Lógica
    }

     public function trabalhar(): void
    {
        // Lógica
    }
}

class FuncionarioRobo implements Trabalhador
{
     public function trabalhar(): void
    {
        // Lógica
    }
}
```

Agora quebramos a interface **Funcionario** em interfaces mais específicas para não forçar as classes a implementar métodos que não utilizam.

5. Dependency inversion principle (Princípio da inversão de dependência)

<div className="flex justify-center">
    <figure class="flex flex-col items-center">
        <img src="/static/images/inversao-dependencia.jpg" title="Inversão de dependência" alt="Inversão de dependência"/>
        <figcaption>Fonte: <a href="https://deviq.com/static/a407170392150a90b0ce412ad2878174/066f9/interface-segregation-400x400.jpg" target="_blank">https://deviq.com</a></figcaption>
    </figure>
</div>


O princípio da inversão de dependência diz que não devemos depender de implementações concretas, mas sim de abstrações. Resumindo: A tipagem dos nossos parâmetros devem ser classes abstratas ou interfaces, garantindo assim maior facilidade se quisermos trocar a implementação do objeto que passamos como parâmetro. Dessa forma utilizar instâncias de outras classes como parâmetro fica mais fácil, pois não dependemos de uma classe concreta, mas de uma abstração, então basta a nossa classe estender uma classe abstrata ou implementar uma interface. Esse princípio também contribui para o desenvolvimento de testes, pois facilita a criação de mocks/stubs, basta que o mock estenda a classe abstrata ou implemente a interface que utilizamos como tipagem no nosso parâmetro.

Exemplo:

Quebrando o princípio:

```php
<?php

declare(strict_types=1);

class RecuperacaSenha
{
    public function __construct(private MySQLConnection $conexaoDB) {}
}
```

Perceba no exemplo acima que a classe **RecuperacaoSenha** possui a injeção de dependência $conexaoDB definida a partir da classe **MySQLConnection**, dependendo assim de uma classe concreta ao invés de uma abstração, o contrário do que é recomendado no princípio da inversão de dependência. Com esta implementação ficamos amarrados a conexões do tipo **MySQLConnection**. Se necessitarmos utilizar outro banco de dados para a classe **RecuperacaoSenha** teríamos de alterar a própria classe **RecuperacaoSenha**.

Refatorando:

```php
<?php

declare(strict_types=1);

interface DBConnectionInterface
{
    public function connect();
}

class MySQLConnection implements DBConnectionInterface
{
    public function connect()
    {
        // Lógica
    }
}

class MongoConnection implements DBConnectionInterface
{
    public function connect()
    {
        // Lógica
    }
}

class RecuperacaSenha
{
    public function __construct(private MySQLConnection $conexaoDB) {}
}
```
Agora criamos a interface **DBConnectionInterface** e utilizamos para definir a variável $conexaoDB que está sendo injetada no método construtor. Dessa maneira, se precisarmos mudar o banco de dados que utilizamos para efetuar a recuperação de senha basta criarmos uma classe para esse banco que implemente **DBConnectionInterface**. A classe de alto nível **RecuperacaoSenha** não precisa ter conhecimento de qual banco está utilizando, precisa apenas respeitar a interface comum.

E aí.. curtiu? comenta aí

