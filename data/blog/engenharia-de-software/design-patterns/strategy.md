---
title: 'Strategy: Design Patterns - o que é? Por que usar? Resumo com exemplos em PHP!'
date: '2023-11-15'
tags: ['strategy', 'design-patterns', 'padroes-de-projeto', 'php']
draft: false
summary: 'Neste artigo você aprenderá o que é o design pattern strategy e como utiliza-lo para escrever códigos melhores.'
image: '/static/images/strategy.jpg'
---

Fala, galera! Neste artigo iremos aprender um pouco mais sobre o padrão strategy e como implementa-lo na linguagem de programação PHP.

Strategy, (também conhecido como Policy) é um design pattern comportamental (padrões GOF) que permite extrair uma família de algoritmos que fazem algo específico de muitas maneiras diferentes em uma mesma classe, encapsulando cada um deles em classes separadas chamadas estratégias, tornando-as intercambiáveis. Strategy permite que o algoritmo varie independentemente dos clientes que o utilizam. Com o Strategy é possivel selecionar um algoritmo especifico em tempo de execução de acordo com sua regra de negócio.

## Estrutura

O design pattern Strategy é dividido em três estruturas básicas:

Strategy: Responsável por definir a interface que as diferentes estratégias irão implementar. Através desta interface, o Context pode chamar o algoritmo criado pela Concrete Strategy.

Concrete Strategy*: Implementação de uma estratégia específica (Sempre deve implementar a interface Strategy).

Context: Responsável por executar as classes Concrete Strategy em conjunto com os dados de input.

## Prática

Para ilustrar temos um exemplo de filtros para strings onde cada filtro aplica determinada alteração em nossa string como remover espaços, aplicar caixa alta entre outros. Primeiro temos uma versão sem o uso do strategy e depois uma refatoração utilizando o padrão.

### Exemplo sem utilização do Strategy

```php

<?php

declare(strict_types=1);

// Cliente
class FormData {

  private $data = “”;
  private $find = “ “;  
  private $replace = “”;

    public function __construct(string $input) {
        $this->data = $input;
    }

    public function processar(string $filtro): string {
        if ($filtro == “html”) {
            $this->data .= strip_tags($this->data);
        }


        if ($filtro == “espaco”) {
            $this->data .= str_replace($this->find, $this->replace, $this->data);
        }
        return $this->data;
    }
}

$form = new FormData($input);
echo $form->processar();

```

### Refatorando (Aplicando Strategy)

```php

<?php

declare(strict_types=1);
/// 

// Interface strategy
interface Filtro {
    public function filtrar(string $string): string;
}

// Classes que implementam diferentes versões de Filtro. (Concrete Strategy)
class HTMLFiltro implements Filtro {
    public function filtrar(string $string): string {
        return strip_tags($string);
    }
}

class RemoverEspacosFiltro implements Filtro {
    public function filtrar(string $string): string {
        $find = " ";
        $replace = "";

        return str_replace($find, $replace, $string);
    }
}

// Utilizando (Context)
class FormData {

    private $data;

    public function __construct($input) {
        $this->data = $input;
    }

    public function processar(Filtro $tipo): string {
        return $this->data.= $tipo->filtro($this->data);
    }
}

// Exemplo de uso (Context)
$form = new FormData($dadosInput);

// Remove HTML
$form->processar(new HTMLFiltro); //Saída com string sem HTML

// Remove espaços
$form->processar(new RemoverEspacosFiltro); //Saída com string sem espaços

// Melhorando ainda mais o uso
$filtros = [
	‘HTMLFiltro’,
	‘RemoverEspacosFiltro’
];

foreach ($variable as $value) {
   $form->processar(new $value);
}

```

Perceba que com a refatoração feita nossos filtros se tornam intercambiáveis, podemos trocar dinamicamente o filtro que utilizamos. Além disso, aplicamos o princípio [SOLID](https://devcontratado.com/blog/engenharia-de-software/solid-principios-da-poo-com-exemplos) aberto para extensão e fechado para modificação, pois sempre que precisarmos de um novo filtro basta criarmos uma nova classe sem alterar classes que implementam os filtros existentes ou adicionar uma nova condição em nosso context. Ao implementarmos o Padrão Strategy também aplicamos o princípio [SOLID](https://devcontratado.com/blog/engenharia-de-software/solid-principios-da-poo-com-exemplos) da responsabilidade única, pois agora cada classe content strategy fica responsável pela sua estratégia. O uso desse pattern também contribui com testes porque cada filtro é isolado em uma classe e ao adicionarmos um novo filtro não corremos o risco de quebrar os testes de um já existente.
