---
title: 'Orientação a objetos (POO): o que é ? (Exemplos em PHP)'
date: '2023-10-09'
tags: ['orientação a objetos', 'poo', 'engenharia de software', 'php']
draft: false
summary: 'Neste artigo você aprenderá de maneira simples o que é orientação a objetos e como utiliza-la de maneira correta utilizando PHP.'
image: '/static/images/poo-php.jpg'
---

Para que você se situe em relação ao conteúdo do artigo, colocamos algumas observações a seguir:

- Nível: Básico;
- Pré-requisitos: PHP básico e lógica de programação;
- Conteúdo: Orientação a objetos.

Fala, Galera! Neste artigo, vamos aprender o que é orientação a objetos e como utilizá-la para escrever nossos programas. Orientação a objetos é um paradigma de programação que surgiu como alternativa ao paradigma procedural. O principal motivador da sua criação foi aproximar as estruturas de um programa de conceitos do mundo real, por isso, o termo 'objeto' como algo genérico, que pode representar qualquer coisa.
O funcionamento da orientação a objetos consiste, basicamente, nos conceitos de classes e objetos e na interação entre esses objetos.

# Classes e objetos

Uma classe é uma definição, ou seja, um molde ou uma forma. Para exemplificar, pense no conceito de carro. Quando andamos pelas ruas, observamos diferentes carros. Carros com quatro portas, duas portas, vermelhos, pretos. Mesmo sendo diferentes, eles contêm características e comportamentos em comum, por isso, pertencem a mesma definição/classe. O carro que você utiliza, seja dirigindo ou como passageiro, atende a definição (Classe) do que é um carro. Possui valores (Atributos) como: velocidade, quantidade de gasolina e possui comportamentos (Métodos) como: acelerar, reduzir e mudar de marcha. Se você pensar no conceito de bicicleta, automaticamente percebe que a bicicleta não compartilha características de um carro, como, por exemplo, o atributo quantidade de gasolina. Sendo assim, percebemos que o conceito de bicicleta pode ser entendido como uma outra classe, com outros atributos e métodos.

Abaixo, você pode conferir o exemplo de uma classe (Carro) na linguagem PHP. Perceba que a classe a seguir registra a definição de carro e, a partir dela, instanciamos (Criamos) objetos do tipo Carro com valores próprios para seus respectivos atributos, definindo assim o que chamamos de estado interno.

```php
<?php

declare(strict_types=1);

class Carro
{
    public string $modelo;
    public string $cor;
    public bool $farol;
    public double $velocidade;

    public function acelerar(): void
    {
        $this->velocidade++;
    }

    public function freiar(): void
    {
        $this->velocidade--;
    }

    public function acenderFarol(): void
    {
        $this->farol = true;
    }
}

$carroDeJose = new Carro();
$carroDeJose->modelo = "modelo exemplo";
$carroDeJose->cor = "preto";
$carroDeJose->acenderFarol(true);

$carroDeMaria = new Carro();
$carroDeMaria->modelo = "modelo exemplo 2";
$carroDeMaria->cor = "vermelho";
$carroDeMaria->acelerar();
```

# Encapsulamento

Prosseguindo com o exemplo do carro, pense em quando você deseja acelerar o seu veículo. Você somente precisa saber como acionar o funcionamento do acelerador. Não é necessário conhecer a parte mecânica do carro somente para acionar o acelerador. Faz sentido, não é mesmo? Quando utilizamos um chuveiro elétrico, não é interessante e seguro que seu funcionamento interno fique exposto para quem somente deseja utilizá-lo. Quando criamos uma classe, estamos descrevendo moldes de objetos que instanciaremos, cada um com seus respectivos valores. Essas classes serão utilizadas pelo próprio desenvolvedor ou por outros no futuro. Não é seguro a possibilidade de alterar o estado interno do nosso objeto indiscriminadamente sem validações ou tratamentos, pois podemos criar efeitos colaterais imprevisíveis, principalmente, a medida que a base de código cresce e a complexidade de gestão aumenta. Quando controlamos o acesso ao estado interno do objeto, dizemos que estamos encapsulando o seu estado.

## Visibilidade

Agora, como podemos gerenciar o que deve estar visível para quem utiliza a classe e encapsular seu comportamento interno? Podemos resolver esse problema utilizando um recurso essencial para a aplicação da orientação a objetos: Visibilidade. No exemplo da classe Carro, é possível perceber o uso de uma palavra chave 'public' no início da declaração das variáveis e definição dos métodos. O termo 'public' é utilizado para definir que a propriedade ou método é acessivel de fora da classe por quem a utiliza. Já quando declaramos propriedades ou métodos que não devem ser visíveis, definimos a visibilidade como privado ou protegido. No exemplo da classe, quebramos o princípio de encapsulamento, pois tornamos todas as propriedades e métodos acessíveis por qualquer um que utilize a classe, dificultando a gestão do estado do objeto. Para corrigir este problema, devemos alterar a visibilidade das nossas propriedades e métodos utilizando as palavras chave 'private' ou 'protected'.

No exemplo a seguir, temos a refatoração da classe Carro onde passamos a não expor completamente o estado interno do nosso objeto. Deixamos disponível para quem utiliza a classe somente os métodos que desejamos expor, trabalhando dessa maneira, não conseguimos inicializar os valores da nossa classe de maneira direta como no exemplo anterior '$carro1->modelo = "modelo exemplo"'. Assim,precisamos criar métodos para inicializarmos propriedades de acordo com a regra de negócio. No exemplo a seguir, adicionamos a função setModelo para preencher o valor da variável $modelo. Agora como preenchemos esse valor por meio de uma função, podemos tratar e validar os dados passados por quem utiliza a classe da maneira que desejamos. Para exemplificar, na função setModelo adicionamos uma condição que verifica a quantidade de caracteres da string passada por quem chama o método. Pense que poderiamos fazer qualquer tipo de validação, como, por exemplo, aceitar somente modelos de determinado fabricante. A partir da manipulação do objeto dessa maneira, temos mais controle sobre os estados que ele pode assumir.

```php
<?php

declare(strict_types=1);

class Carro
{
    private string $modelo;
    private string $cor;
    private bool $farol;
    private double $velocidade;

    public function getModelo(): string
    {
        return $this->modelo;
    }

    public function setModelo(string $modelo): string
    {
        if (strlen($modelo) > 50) {
            return "O campo modelo não suporta mais que 50 caracteres.";
        }

        return $this->modelo = $modelo;
    }

    public function getCor(): string
    {
        return $this->cor;
    }

    public function setCor(string $cor): string
    {
        if ($cor  == "transparente") {
            return "A cor transparente não está disponível.";
        }
    
        return $this->cor = $cor;
    }

    public function getFarol(): bool
    {
        return $this->farol;
    }

    public function acenderFarol(): void
    {
        $this->farol = !$this->farol;
    }

    public function getVelocidade(): double
    {
        return $this->velocidade;
    }

    public function acelerar(): void
    {
        $this->velocidade++;
    }

    public function freiar(): void
    {
        $this->velocidade--;
    }    
}

$carroDeJoao = new Carro();
$carroDeJoao->setModelo("modelo exemplo");
$carroDeJoao->setCor("preto");
$carroDeJoao->acenderFarol(true);
$carroDeJoao->acelerar();

$carroDeMaria = new Carro();
$carroDeMaria->setModelo("modelo exemplo 2");
$carroDeMaria->setCor("branco");
$carroDeMaria->acenderFarol(true);
$carroDeMaria->acelerar();
```

# Herança

Um dos pilares da orientação a objetos é o reaproveitamento de código, e a herança é a principal maneira de fazer isso. Quando utilizamos a herança, estamos dizendo que uma classe contém características de outra. Não sendo necessário declarar novamente os mesmos atributos e métodos.

Para um exemplo simples, pense no conceito de automóvel. Todo automóvel possui comportamentos como ligar, desligar, frear, acelerar e estados como ligado, desligado e velocidade, mas um carro possui a caracteristica 'abrirPorta' e uma moto não. Com a herança, podemos agrupar características em comum.

No exemplo a seguir, refatoramos a classe Carro, agrupando todas as características comuns a automóveis em uma classe a parte. Dessa maneira, adicionamos no código da classe Carro somente o que é característica específica de um carro e todo o resto implementamos estendendo a classe automóvel, sendo assim, podemos reaproveitar novamente o código da classe Automovel em uma classe como Moto.

```php
<?php

declare(strict_types=1);

class Automovel
{
    private string $modelo;
    private string $cor;
    private bool $farol;
    private double $velocidade;

    public function getModelo(): string
    {
        return $this->modelo;
    }

    public function setModelo(string $modelo): string
    {
        if (strlen($modelo) > 50) {
            return "O campo modelo não suporta mais que 50 caracteres.";
        }

        return $this->modelo = $modelo;
    }

    public function getCor(): string
    {
        return $this->cor;
    }

    public function setCor(string $cor): string
    {
        if ($cor  == "transparente") {
            return "A cor transparente não está disponível.";
        }
    
        return $this->cor = $cor;
    }

    public function getFarol(): bool
    {
        return $this->farol;
    }

    public function acenderFarol(): void
    {
        $this->farol = !$this->farol;
    }

    public function getVelocidade(): double
    {
        return $this->velocidade;
    }

    public function acelerar(): void
    {
        $this->velocidade++;
    }

    public function freiar(): void
    {
        $this->velocidade--;
    }    
}

class Carro extends Automovel
{
    private bool $portas;

    public function travar(): void
    {
        $this->portas = true;
    } 

    public function destravar(): void
    {
        $this->portas = false;
    } 
}

class Moto extends Automovel
{
    private bool $descanso;

    public function puxarDescanso(): void
    {
        $this->descanso = true;
    }

    public function guardarDescanso(): void
    {
        $this->descanso = false;
    }
}
```

# Interface

Note que mesmo automóveis tendo comportamentos em comum, pode haver divergência em como alguns desses comportamentos são implementados. Carro e Moto possuem o comportamento frear, mas a maneira que isso é resolvido em cada um é diferente. Dessa forma, podemos exigir de uma classe a implementação de um determinado comportamento/método e deixar que ela o implemente da maneira mais adequada, utilizando o que chamamos de interface ou contrato. Quando definimos uma interface, estamos definindo métodos que devem ser expostos pelas classes que a implementam.

Perceba que varios métodos implementados em um automóvel devem ser implementados em uma bicicleta, mas com comportamentos distintos.

No exemplo a seguir, criamos a interface VeiculoInterface que exige a implementação dos métodos getVelocidade, acelerar e freiar. Em seguida, definimos que ela seja implementada pelas classes Automovel e Bicicleta.

```php
<?php

declare(strict_types=1);

interface VeiculoInterface
{
    public function getVelocidade(): double;

    public function acelerar(): void;

    public function freiar(): void;   
}

class Automovel implements VeiculoInterface
{
    private string $modelo;
    private string $cor;
    private bool $farol;
    private double $velocidade;

    public function getModelo(): string
    {
        return $this->modelo;
    }

    public function setModelo(string $modelo): string
    {
        if (strlen($modelo) > 50) {
            return "O campo modelo não suporta mais que 50 caracteres.";
        }

        return $this->modelo = $modelo;
    }

    public function getCor(): string
    {
        return $this->cor;
    }

    public function setCor(string $cor): string
    {
        if ($cor  == "transparente") {
            return "A cor transparente não está disponível.";
        }
    
        return $this->cor = $cor;
    }

    public function getFarol(): bool
    {
        return $this->farol;
    }

    public function acenderFarol(): void
    {
        $this->farol = !$this->farol;
    }

    public function getVelocidade(): double
    {
        return $this->velocidade;
    }

    public function acelerar(): void
    {
        $this->velocidade++;
    }

    public function freiar(): void
    {
        $this->velocidade--;
    }    
}

class Carro extends Automovel
{
    private bool $portas;

    public function travar(): void
    {
        $this->portas = true;
    } 

    public function destravar(): void
    {
        $this->portas = false;
    } 
}

class Bicicleta implements Veiculo
{
    private double $velocidade;

    public function getVelocidade(): double
    {
        return $this->velocidade;
    }

    public function acelerar(): void
    {
        $this->velocidade++;
    }

    public function freiar(): void
    {
        $this->velocidade--;
    }    
}
```

# Polimorfismo

Quando implementamos o mesmo método em diferentes classes com regras de negócio internas distintas, estamos implementando o que chamamos de polimorfismo. Um mesmo método, assumindo diferentes formas. Como no exemplo anterior, o polimorfismo pode ser feito por diferentes classes que implementam a mesma interface e tem o mesmo método definido, com regras de negócio internas diferentes. Além disso, também pode ser implementado através da sobrescrita de um método. A sobrescrita é feita quando declaramos um método em uma classe e em outra classe que a estende o definimos novamente com um novo comportamento. Podemos, em várias classes filhas, sobrepor o método da classe pai quando necessário.

# Mais

Para complementar o conhecimento adquirido sobre orientação a objetos, é importante aprender como escrever código com mais qualidade. Leia os artigos sobre clean code, solid e design patterns e aprofunde seus conhecimentos em orientação a objetos.