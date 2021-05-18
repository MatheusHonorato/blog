---
title: CRUD com PHP Procedural, PDO e MYSQL
date: '2021-05-17'
tags: ['php', 'crud', 'pdo']
draft: false
summary: 'Nesse artigo você aprenderá como desenvolver um CRUD com PHP, PDO e MYSQL'
image: '/static/images/crud-php.jpg'
---

Fala, galera! Nesse artigo vamos aprender como desenvolver uma aplicação CRUD básica com a biblioteca PDO, lib utilizada para se comunicar de forma simples com os principais bancos de dados do mercado. Como banco de dados utilizaremos o mysql/mariadb.
Mas afinal o que é um CRUD? De acordo com a mozilla foundation CRUD são as quatro operações básicas de armazenamento persistente: CREATE(criar), READ(ler), UPDATE(atualizar) e DELETE(remover).

E por que é tão importante aprender a desenvolver um CRUD? basicamente qualquer sistema que manipule dados de maneira persistente utilizará essas operações, sendo assim essencial para você que está iniciando no mundo do desenvolvimento de software.

Para que você se situe em relação ao conteúdo do artigo colocamos algumas observações a seguir:

- Nível: Básico
- Pré requisitos: Lógica de programação, PHP básico e banco de dados relacional
- Conteudo: PHP procedural e banco de dados

# Apresentação da aplicação

Antes de começarmos a desenvolver você pode conferir como a nossa aplicação ficará através dos prints abaixo ou clicando no [link](). O nosso crud será um cadastro de usuários com os campos id, name, email e phone.

Link do projeto: https://github.com/MatheusHonorato/crud-php-mysql-procedural

## Mão na massa

Para que você rode o seu CRUD e importe o sql do nosso banco de dados utilizaremos a ferramenta xampp que já um inclui os softwares apache, php, mysql/mariadb e phpmyadmin.

Você pode efetuar o download no seguinte [link](https://www.apachefriends.org/pt_br/index.html).

O processo de instalação no windows é o velho next next que estamos acostumados e para usuários de linux basta executar o arquivo .run ou instalar utilizando seu gerenciador de pacotes preferido.

## SQL

```sql
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;
```

## Organizando nossa aplicação

Em relação à organização da nossa aplicação temos na raiz do nosso projeto o arquivo config.php, que armazena nossas configurações de banco de dados como usuário, senha, nome da base de dados e nossa instância do pdo. Também temos o arquivo index.php que importa nosso arquivo read.php, responsável por listar nossos registros.

Como podemos observar a seguir temos o diretório ‘/src’ responsável por armazenar a lógica da nossa aplicação e o diretório ‘/css’, responsável por armazenar nosso estilo. (Você pode baixar o código css no seguinte link. Como não é o foco deste artigo não iremos abordar, mas fizemos questão de desenvolver um código simples para que você possa se sentir inteirado mais rapidamente em relação a como o estilo está sendo aplicado).

![CRUD PHP](/static/images/project.jpg)

### Conexão com banco de dados

A seguir você pode visualizar o código do arquivo config.php onde temos as variáveis $db_name que armazena o nome da nossa base de dados, $db_host guardando o nome do nosso host, $db_user que armazena o nome do nosso usuário de banco de dados e $db_pass armazenando a senha do nosso banco de dados. Todas essas variáveis são passadas para a nossa lib PDO, responsável por gerar a instância da nossa conexão com o banco de dados. A api da biblioteca PDO é orientada a objetos, mas não se preocupe com isso nesse momento.

Entenda como se estivéssemos importando uma lib para utilizarmos suas funções e executarmos nossas queries.

Obs: No arquivo ‘config.php’ também criamos a variável $host, responsável por armazenar o endereço da nossa aplicação gerando menos problemas ao mudar nosso app de diretório ou domínio.

```php
<?php

// Sample file: Never send your credentials to github

// db
$db_name = 'crud';
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';

$pdo = new PDO("mysql:dbname=".$db_name.";host=".$db_host, $db_user, $db_pass);

// host
$host = 'http://localhost/conteudos/crud-php-mysql-procedural/';
```

### src

Nosso diretório src como dito anteriormente armazena a lógica da nossa aplicação, basicamente arquivos de actions e pages onde as pages são responsáveis por gerar o html da nossa aplicação e as actions a lógica de banco de dados e validações.

![CRUD PHP SRC](/static/images/src.jpg)

#### pages/create.php

A seguir temos o código do arquivo ‘src/pages/create.php’, responsável por exibir o formulário de criação do nosso crud. Nosso arquivo possui basicamente um formulário html utilizado para receber os dados de um novo cadastro como: name, email e phone. Perceba também que utilizamos ‘required’ em nossos campos para que o formulário não seja submetido sem que sejam preenchidos. Também temos em nosso código a utilização do ‘require_once’ para importar os arquivos header.php e footer.php, como iremos utilizar o mesmo cabeçalho e rodapé para todas as nossas páginas separamos em arquivos isolados e importamos aqui e nas outras páginas do crud.

```php
<?php

require_once '../../config.php';
require_once 'partials/header.php';

?>
<div class="container">
	<div class="row">
        <a href="../../index.php"><h1>Users - Create</h1></a>
        <a class="btn btn-success text-white" href="../../index.php">Prev</a>
    </div>
    <div class="row flex-center">
        <div class="form-div">
            <form class="form" action="../actions/save.php" method="POST">
                <label>Name</label>
                <input type="text" name="name" required/>
                <label>E-mail</label>
                <input type="email" name="email" required/>
                <label>Phone</label>
                <input type="text" name="phone" required/>

                <button class="btn btn-success text-white" type="submit">Save</button>
            </form>
        </div>
    </div>
</div>
<?php require_once 'partials/footer.php'; ?>
```

#### actions/create.php

Agora temos o arquivo ‘src/actions/create.php’, responsável por executar o armazenamento do conteúdo que recebemos do formulário em nosso banco de dados. Perceba que logo no início do nosso arquivo importamos o arquivo ‘config.php’, responsável por armazenar a instância do nosso banco. Em seguida utilizamos ‘filter_input’ para limpar e validar os dados vindos do nosso formulário. Com os dados devidamente tratados executamos uma query que verifica se já existe um usuário com o email informado, se o email já existir então o usuário é encaminhado novamente para o formulário de cadastro se não prosseguimos, armazenamos o novo usuário utilizando o metodo prepare para evitarmos ataques de sql injection e efetuamos um redirecionamento para o ‘index.php’.

```php
<?php

require_once '../../config.php';

$name = filter_input(INPUT_POST, 'name');
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone');

if($name && $email) {
    $sql = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $sql->bindValue(':email', $email);
    $sql->execute();

    if($sql->rowCount() === 0) {
        $sql = $pdo->prepare("INSERT INTO users (name, email, phone) VALUES (:name, :email, :phone)");
        $sql->bindValue(':name', $name);
        $sql->bindValue(':email', $email);
        $sql->bindValue(':phone', $phone);
        $sql->execute();

        header("Location: ../../index.php");
        exit;
    } else {
        header("Location: ../../src/pages/create.php");
        exit;
    }
} else {
    header('location: ../../index.php');
}
```

#### pages/read.php

A seguir temos o código do arquivo ‘src/pages/read.php’ responsável por exibir a listagem dos usuários cadastrados. Como no arquivo ‘pages/create.php’ também importamos nossos arquivos ‘header.php’ e ‘footer.php’ para evitar a repetição de código e também importamos o arquivo ‘actions/read.php’ que efetua nossa consulta ao banco e retorna todos os nossos usuários, em seguida percorremos a variável users e exibimos nossos usuários em uma tabela html.

```php
<?php

require_once 'partials/header.php';
require_once 'src/actions/read.php';

?>
<div class="container">
	<div class="row">
		<a href=""><h1>Users - List</h1></a>
		<a class="btn btn-success text-white" href="src/pages/create.php">New</a>
	</div>

	<table class="table-users">
		<tr>
			<th>NAME</th>
			<th>EMAIL</th>
			<th>PHONE</th>
		</tr>
		<?php foreach($users  as $user): ?>
		<tr>
			<td class="user-name"><?=htmlspecialchars($user['name']);?></td>
			<td class="user-email"><?=htmlspecialchars($user['email']);?></td>
			<td class="user-phone"><?=htmlspecialchars($user['phone']);?></td>
			<td>
				<a class="btn btn-primary text-white" href="src/pages/edit.php?id=<?=$user['id'];?>&name=<?=htmlspecialchars($user['name']);?>&email=<?=htmlspecialchars($user['email']);?>&phone=<?=htmlspecialchars($user['phone']);?>">Edit</a>
			</td>
			<td>
				<a class="btn btn-danger text-white" href="src/actions/delete.php?id=<?=$user['id'];?>" onclick="return confirm('Tem certeza que deseja excluir?')">Remove</a>
			</td>
		</tr>
		<?php endforeach; ?>
	</table>
</div>
<?php require_once 'partials/footer.php'; ?>
```

#### actions/read.php

A seguir temos o código do arquivo ‘actions/read.php’ responsável por buscar no banco de dados os nossos registros na tabela users. No início do nosso código importamos nosso arquivo ‘config.php’ responsável por instanciar nossa conexão com nosso banco e em seguida executamos nossa query.

```php
<?php

require_once 'config.php';

$users = [];
$sql = $pdo->query("SELECT * FROM users");

if($sql->rowCount() > 0) {
    $users = $sql->fetchAll(PDO::FETCH_ASSOC);
}
```

#### pages/update.php

A seguir temos o código do arquivo ‘src/pages/update.php’ responsável por exibir o formulário de edição de dados de um usuário.

```php
<?php

require_once '../../config.php';
require_once 'partials/header.php';

?>
<div class="container">
	<div class="row">
        <a href="../../index.php"><h1>Users - Edit</h1></a>
        <a class="btn btn-success text-white" href="../../index.php">Prev</a>
    </div>
    <div class="row flex-center">
        <div class="form-div">
            <form class="form" action="../actions/update.php" method="POST">
                <input type="hidden" name="id" value="<?php echo filter_input(INPUT_GET, 'id'); ?>" required/>
                <label>Name</label>
                <input type="text" name="name" value="<?php echo filter_input(INPUT_GET, 'name'); ?>" required/>
                <label>E-mail</label>
                <input type="email" name="email" value="<?php echo filter_input(INPUT_GET, 'email'); ?>" required/>
                <label>Phone</label>
                <input type="text" name="phone" value="<?php echo filter_input(INPUT_GET, 'phone'); ?>" required/>

                <button class="btn btn-success text-white" type="submit">Save</button>
            </form>
        </div>
    </div>
</div>
<?php require_once 'partials/footer.php'; ?>
```

#### actions/update.php

A seguir temos o código do arquivo ‘/actions/update.php’’ responsável por atualizar nosso banco. Importamos nossa instância de conexão com o banco, validamos e tratamos nossos dados vindos do formulário, executamos nossa query e efetuamos um redirecionamento para nosso index.php.

```php
<?php

require_once '../../config.php';

$id = filter_input(INPUT_POST, 'id');
$name = filter_input(INPUT_POST, 'name');
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone');

if($id && $name && $email) {
    $sql = $pdo->prepare("UPDATE users SET name = :name, email = :email, phone = :phone WHERE id = :id");
    $sql->bindValue(':name', $name);
    $sql->bindValue(':email', $email);
    $sql->bindValue(':phone', $phone);
    $sql->bindValue(':id', $id);
    $sql->execute();

    header("Location: ../../index.php");
} else {
    header("Location: ../../pages/create.php");
}
```

#### actions/delete.php

A seguir temos o arquivo ‘src/actions/delete.php’ responsável por remover o registro selecionado do nosso banco e encaminhar nosso usuário para a página de ‘index.php’. Mas e a nossa ‘pages/delete.php’? talvez você tenha se perguntado o porquê de não existir um arquivo para selecionarmos o usuário que será removido e a resposta é que a seleção do usuário a ser removido acontece na ‘pages/read.php’ que possui um botão de delete para cada usuário encaminhando assim o seu identificador para nossa action ‘delete.php’.

Em nossa action ‘delete.php’ importamos nossa conexão com o banco de dados do config.php tratamos nosso parâmetro id, executamos a remoção do registro e efetuamos nosso redirect para o index.php.

```php
<?php

require_once '../../config.php';

$id = filter_input(INPUT_GET, 'id');

if($id) {
    $sql = $pdo->prepare("DELETE FROM users WHERE id = :id");
    $sql->bindValue(':id', $id);
    $sql->execute();
}

header("Location: ../../index.php");
```

Para a proposta do artigo.. é isso :)
E aí? O que achou? Tem alguma sugestão? Comenta aí
