---
title: 'Clean code: O mínimo que você precisa saber'
date: '2021-10-6'
tags: ['clean code', 'código limpo', 'engenharia de software']
draft: false
summary: 'Neste artigo você aprenderá como melhorar a qualidade do seu código utilizando clean code.'
image: '/static/images/clean-code-porta.jpg'
---

Você sabe que o principal gargalo no desenvolvimento de software é justamente a manutenção? Ou seja, um código mal escrito desde a sua primeira versão pode funcionar, mas vai gerar muitos prejuízos.

O que é caro em um projeto de software não são os momentos iniciais e as primeiras features, mas sim a manutenção e evolução, momento em que trabalhamos com muito código já existente.

Gastamos em média dez vezes mais tempo lendo código do que programando. Sendo assim é importante que se enscreva pensando em quem vai ler, afinal estamos nos comunicando com outros desenvolvedores por meio do código. Se a comunicação é ruim desperdiçamos tempo e muitas vezes até inviabilizamos o projeto. Uma boa forma de percebermos isso é analisando o gráfico a seguir.

![Produtividade x Tempo](/static/images/clean-code-produtividadeXtempo.png)

## O que é

Agora que você sabe da importância de escrever um bom código para que seja mais fácil evoluir e dar manutenção, parte mais cara do processo, está na hora de saber o que é clean code e como isso pode te ajudar a codificar melhor.

De acordo com Robert Cecil Martin, conhecido na comunidade como Uncle Bob e autor do livro Clean Code: A Handbook of Agile Software Craftsmanship, código limpo é um código claro e fácil de ser mantido, diz o que faz e pode ser lido como uma história, possibilitando uma maior legibilidade e manutenabilidade.

![CLEAN CODE](/static/images/clean-code-uncle-bob.png)

## Principais pontos

A seguir você irá ter acesso a um resumo dos principais pontos sobre clean code. Este artigo é uma introdução ao código limpo, sendo assim iremos focar nos pontos mais básicos, presentes nos primeiros capítulos do livro.

#### Regra do escoteiro

Sempre deixe o código mais limpo do que estava antes. Se deixamos sempre o código que trabalhamos melhor do que encontramos, o código não se degrada. Não precisa necessariamente serem sempre grandes mudanças, a refatoração do nome de uma variável ou função já causa grande impacto.

#### Nomes são muito importantes

O nome precisa passar de cara a sua ideia central. Não se preocupe se o nome ficar extenso o importante é que ele diga claramente o que está representando.

##### Variáveis

* ##### Utilize nomes de variáveis que revelem sua intenção

Os nomes das variáveis devem representar o que armazenam, por exemplo, faz mais sentido colocar os dados de um usuário em uma variável chamada user do que em uma chamada x.

Exemplo:

```javascript
// ruim 👎
let x = {}; // objeto contendo dados do usuário
// bom 😃
let user = {}; // objeto contendo dados do usuário
```

* ##### Utilize nomes pronunciáveis e passíveis de busca

Além de revelar a intenção, precisamos ser capazes de pronunciar, melhor ainda se podermos pesquisar por eles no código com facilidade. A principal ideia é que estamos escrevendo códigos legíveis para humanos. Utilizar siglas, diminutivos ou abreviações, só vão te fazer pensar mais, você perderá tempo deduzindo a intenção da variável.

Exemplo:

```javascript
// ruim 👎
let cy = new Date().getFullYear();
// bom 😃
let currentYear = new Date().getFullYear();
```

* ##### Não adicione palavras desnecessárias

É bem comum adicionar alguma palavra para dar contexto a variável. Um exemplo seria um objeto que retorne as permissões de um usuário. No exemplo a seguir, se removermos a palavra roles, o código será perfeitamente compreendido.

Exemplo:

```javascript
// ruim 👎
let roles = {
  rolesUser: [{}],
  rolesGuest: [{}],
  roleManager: [{}],
}
// bom 😃
let roles = {
  user: [{}],
  guest: [{}],
  manager: [{}],
}
```

* ##### Não use o tipo da variável no nome

Uma abordagem antiga era adicionarmos um prefixo no nome das variáveis. Hoje, isto já não é mais uma boa prática. Atribuir um prefixo só aumentará a complexidade do seu código, algo que não contribui no projeto.

Exemplo:

```javascript
// ruim 👎
let sName = '';
let aProducts = [];
let dPrice = 12.1;
// bom 😃
let name = '';
let products = [];
let price = 12.1;
```

* ##### Não utilize números ou strings mágicas

Quando você estiver escrevendo código, nunca atribua uma string ou número direto no código fonte (hardcode) a uma variável. Declare uma constante e atribua o valor a esta constante.

Exemplo:

```javascript
// ruim 👎
setTimeout (checkAuthentication, 1000); 
user.role = "guest";
// bom 😃
const TIME_AWAIT = 1000; 
const GUEST_ROLE = "guest";
setTimeout (checkAuthentication, TIME_AWAIT); 
user.rolE = GUEST_ROLE;
```

* ##### Defina um vocabulário para o mesmo tipo de dado

Se você precisa recuperar informações de um produto, todos do time devem se referir a este dado de forma igual. Na prática, é bem comum ver declarações que retornam o mesmo tipo de dados com nomes diferentes. Por exemplo, getProductData, getProductInfo ou getProductDetails retornam os mesmos dados de um produto. Simplifique e use apenas getProduct().

Neste tipo de situação é importante que se adote uma convenção que faça sentido para seu time e contexto de negócio.

Exemplo:

```javascript
// ruim 👎
getProductData();
getProductInfo();
getProductDetails();
// todos retornam os dados do produto.
// bom 😃
getProduct();
```

##### Métodos ou Funções


* ##### Funções devem expressar uma ação

Métodos e funções devem ter nome de verbos, para assim, expressar quais são suas finalidades.

Uma boa prática é usar um verbo no tempo verbal infinitivo, ações como BuscaCliente, DadosProduto ou BuscaPedido, seria nomeado como getCustomer, getProduct e getInvoice.

Exemplo:

```javascript
// ruim 👎
buscaCliente();
dadosProduto();
buscaPedido();
// bom 😃
getCustomer();
getProduct();
getInvoice();
```

* ##### Para classes e objetos utilize substantivos

Uma boa prática para nomearmos nossas classes seria utilizando substantivos.

Exemplo: 

```javascript
// ruim 👎
let X = class {
  constructor(heigth, width) {
    this.heigth = heigth;
    this.width = width;
  }
};

// bom 😃
let Rectangle = class {
  constructor(heigth, width) {
    this.heigth = heigth;
    this.width = width;
  }
};
```

#### Funções

* ##### Funções devem executar apenas uma tarefa

"As funções devem fazer uma coisa. Devem fazê-la bem. Devem fazer apenas ela."

O problema seria o que é 'fazer uma coisa'? se suas tarefas estão todas um nível de abstração abaixo da sua função então ela faz somente uma coisa.

Exemplo: 

```javascript
// ruim 👎
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });

  ast.forEach((node) => {
    // parse...
  });
}

// bom 😃
function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      tokens.push( /* ... */ );
    });
  });

  return tokens;
}

function lexer(tokens) {
  const ast = [];
  tokens.forEach((token) => {
    ast.push( /* ... */ );
  });

  return ast;
}

function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const ast = lexer(tokens);
  ast.forEach((node) => {
    // parse...
  });
}
```

* ##### Funções devem ser pequenas

  De acordo com o autor funções longas e com muitos níveis de abstração dificultam a compreenção do código. Sendo assim Uncle Bob reforça por meio dos dois itens abaixo a importância de funções pequenas para facilitar a manutenção e compreenção. 

  * As funções precisam ser pequenas;
  * Elas têm de ser ainda menores.

```javascript
// ruim 👎
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}

// bom 😃
function emailActiveClients(clients) {
  clients
    .filter(isActiveClient)
    .forEach(email);
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

#### Comente apenas o necessário

Comentários mentem! Códigos são constantemente modificados enquanto os comentários são esquecidos.

Uma boa observação é não utilizar o comentário para explicar a lógica implementada. Se o código precisa de um comentário para explicar o que faz provavelmente não está bem escrito.

Deixe os comentários apenas para ocasiões realmente necessárias como, uma solução que foi implementada de determinada forma por limitação técnica ou algo do tipo.

```javascript
// ruim 👎

// This method writes to file
writeFile();

// bom 😃

// Don't run unless you have time
writeFile();
```

#### DRY (Don’t Repeat Yourself)

Não pode existir duas partes do programa que desempenhem a mesma função.

Evite código duplicado. Código duplicado quer dizer que existe mais de um lugar onde você deverá alterar algo se precisar mudar alguma lógica.

Exemplo: 

```javascript
// ruim 👎
function showDeveloperList(developers) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}

// bom 😃
function showEmployeeList(employees) {
  employees.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    const data = {
      expectedSalary,
      experience
    };

    switch(employee.type){
      case 'manager':
        data.portfolio = employee.getMBAProjects();
        break;
      case 'developer':
        data.githubLink = employee.getGithubLink();
        break;
    }

    render(data);
  });
}
```

#### KISS

Normalmente tendemos a complicar as coisas que poderiam ser muito mais simples.

Então, Keep It Stupid Simple (Mantenha isto estupidamente simples - KISS)!

# E aí.. curtiu? comenta aí

Procurei neste artigo pontuar os principais itens da obra para quem está começando, mas é muito importante que leia este e outros livros do Uncle Bob para se aprofundar em como codificar melhor. Se você gostou do conteúdo compartilhe com o máximo de pessoas que puder. Se tiver condições de adquirir o livro você pode comprar por este link.
