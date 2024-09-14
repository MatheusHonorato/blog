---
title: Diferenças entre require, require_once, include e include_once no PHP
date: '2024-08-14'
tags: ['php', 'require', 'include']
draft: false
summary: 'Neste artigo você aprenderá as diferenças entre require, require_once, include e include_once no PHP'
image: '/static/images/php-mysql.jpg'
---

Fala, galera! Se você trabalha com PHP com certeza já precisou anexar um script em outro e provavelmente surgiu a dúvida de qual função do PHP utilizar. Neste artigo vamos falar sobre as funções disponíveis no PHP para esta finalidade e suas principais diferenças.

### O que são (opções): `require`, `require_once`, `include` e `include_once`

Essas quatro funções são usadas para incluir e reutilizar código em seus scripts PHP. Aqui está um resumo de cada uma:

- **`require`**: Inclui e avalia o arquivo especificado. Se o arquivo não for encontrado, `require` gera um erro fatal e para a execução do script;
- **`require_once`**: Semelhante a `require`, mas garante que o arquivo seja incluído apenas uma vez. Se o arquivo já tiver sido incluído anteriormente, ele não será carregado novamente;
- **`include`**: Inclui e avalia o arquivo especificado. Se o arquivo não for encontrado, `include` gera um aviso (warning) e o script continua a execução;
- **`include_once`**: Semelhante a `include`, mas também garante que o arquivo seja incluído apenas uma vez.

### Detalhes e Comparação

#### 1. **`require`**

**Uso:**
```php
require 'arquivo.php';
```

**Características:**
- **Erro Fatal:** Se o arquivo especificado não for encontrado, o PHP gera um erro fatal (`E_COMPILE_ERROR`), o que significa que a execução do script será interrompida;
- **Obrigatório:** Use `require` quando o arquivo a ser incluído é essencial para o funcionamento do seu script. Por exemplo, se você incluir um arquivo de configuração, o script não deve continuar sem ele.

**Quando Usar:**
- Quando a inclusão do arquivo é crítica para o funcionamento da aplicação;
- Quando você precisa garantir que o código do arquivo incluído está presente e corretamente carregado.

#### 2. **`require_once`**

**Uso:**
```php
require_once 'arquivo.php';
```

**Características:**
- **Evita Inclusão Duplicada:** Garante que o arquivo seja incluído apenas uma vez, mesmo se o `require_once` for chamado várias vezes;
- **Erro Fatal:** Assim como `require`, se o arquivo não for encontrado, um erro fatal será gerado e a execução do script interrompida.

**Quando Usar:**
- Quando você precisa garantir que um arquivo não seja incluído mais de uma vez, o que é comum para arquivos que definem funções, classes ou configurações;
- Ideal para evitar conflitos e redefinições, especialmente em projetos grandes e complexos.

#### 3. **`include`**

**Uso:**
```php
include 'arquivo.php';
```

**Características:**
- **Aviso:** Se o arquivo especificado não for encontrado, o PHP gera um aviso (`E_WARNING`), mas a execução do script continua;
- **Opcional:** Use `include` quando a inclusão do arquivo não for crítica para o funcionamento do script e você deseja que o script continue mesmo se o arquivo não estiver disponível.

**Quando Usar:**
- Quando a inclusão do arquivo é opcional e não comprometerá a execução do script se o arquivo não estiver presente;
- Ideal para incluir arquivos que fornecem funcionalidades secundárias ou que são necessários apenas em determinadas condições.

#### 4. **`include_once`**

**Uso:**
```php
include_once 'arquivo.php';
```

**Características:**
- **Evita Inclusão Duplicada:** Garante que o arquivo seja incluído apenas uma vez, como o `require_once`;
- **Aviso:** Se o arquivo não for encontrado, um aviso é gerado e a execução do script continua.

**Quando Usar:**
- Quando você precisa incluir um arquivo de forma opcional e evitar múltiplas inclusões;
- Ideal para arquivos que podem ser incluídos em várias partes do script, mas onde a inclusão repetida não deve ocorrer.

### Exemplos Práticos

Vamos considerar um exemplo para ilustrar a diferença entre essas funções:

**Exemplo com `require`:**
```php
// config.php
return [
    'db_host' => env('HOST'),
    'db_name' => env('DB_NAME'),
];

// index.php
$config = require 'config.php';
```
O arquivo functions.php será anexado e caso não sejá encontrado uma exceção será disparada e o script interrompido.

**Exemplo com `require_once`:**
```php
// functions.php
function sayHello(): void {
    echo "Hello, world!";
}

// index.php
require_once 'functions.php';
sayHello();
```
Mesmo que existam multiplos 'require_once' o arquivo functions.php será anexado somente uma vez e caso não sejá encontrado uma exceção será disparada e o script interrompido.

**Exemplo com `include`:**
```php
// footer.php
echo "<footer>Footer content</footer>";

// index.php
include 'footer.php';
```
O arquivo footer.php será anexado e caso não seja encontrado um warning é disparado.

**Exemplo com `include_once`:**
```php
// user.php
class User {
    // Class definition
}

// index.php
include_once 'user.php';
```
O arquivo user.php será incluído apenas uma vez, mesmo que seja chamado múltiplas vezes e caso não seja encontrado um warging é disparado.

### Conclusão

Entender as diferenças entre `require`, `require_once`, `include` e `include_once` é crucial para escrever código PHP robusto e eficiente. Enquanto `require` e `require_once` garantem que o código necessário seja incluído, `include` e `include_once` oferecem uma abordagem mais flexível, onde a inclusão do arquivo não é tão crítica. Saber quando usar cada uma destas funções pode melhorar a organização do seu código e evitar problemas comuns, como inclusões duplicadas e erros de execução.

Gostou do conteúdo? Então compartilhe com o máximo de pessoas e contribua com a comunidade PHP.