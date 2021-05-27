---
title: CRUD com PHP e MYSQL I
date: '2021-05-17'
tags: ['php', 'mysql', 'crud']
draft: false
summary: 'Nesse artigo você aprenderá como desenvolver um CRUD com PHP e MYSQL I'
image: '/static/images/crud-php.jpg'
---

Fala, galera! Nesse artigo vamos aprender como desenvolver uma aplicação CRUD básica com a biblioteca Mysql I, lib utilizada para se comunicar de maneira nativa com o banco de dados Mysql/MariaDB no PHP.
Mas afinal o que é um CRUD? Um CRUD é basicamente uma aplicação que efetua as quatro operações básicas de persistencia de dados, CREATE(criar), READ(ler), UPDATE(atualizar) e DELETE(remover).

E por que é tão importante aprender a desenvolver um CRUD? basicamente qualquer sistema que manipule dados implementará funções de um CRUD, sendo assim essencial para você que está iniciando no mundo do desenvolvimento de software.

Para que você se situe em relação ao conteúdo do artigo colocamos algumas observações a seguir:

- Nível: Básico
- Pré requisitos: PHP básico e banco de dados relacional
- Conteúdo: PHP procedural e banco de dados

# Apresentação da aplicação

Antes de começarmos a desenvolver você pode conferir como a nossa aplicação ficará através dos prints abaixo. O nosso crud será um cadastro de usuários com os campos id, name, email e phone.

Link do projeto: https://github.com/MatheusHonorato/crud-php-mysql-procedural

## Mão na massa

Para que você rode o seu CRUD e importe o sql do nosso banco de dados utilizaremos a ferramenta xampp que já um inclui os softwares apache, php, mysql/mariadb e phpmyadmin.

Você pode efetuar o download no seguinte [link](https://www.apachefriends.org/pt_br/index.html).

O processo de instalação no windows é o velho next next que estamos acostumados e para usuários de linux basta utilizar seu gerenciador de pacotes.

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

Em relação à organização da nossa aplicação temos na raiz do nosso projeto o arquivo 'config.php', que armazena nossas configurações de banco de dados como usuário, senha, nome da base de dados e nossa instância do Mysql I. Também temos o arquivo 'index.php' que inicializa nossa aplicação e a pasta '/src' com a lógica do nosso CRUD. Além do diretório '/src' na nossa raiz também temos o '/css' com o estilo da nossa aplicação. (Como não é o foco deste artigo não abordaremos o css).

![CRUD PHP](/static/images/project.jpg)

### Conexão com banco de dados

A seguir você pode visualizar o código do arquivo 'config.php' onde temos as variáveis $db_name que armazena o nome da nossa base de dados, $db_host guardando o nome do nosso host, $db_user que armazena o nome do nosso usuário de banco de dados e $db_pass armazenando a senha do nosso banco de dados. Todas essas variáveis são passadas para a nossa lib Mysql I, responsável por gerar nossa conexão com o banco de dados.

Obs: No arquivo 'config.php' também criamos a variável $host, responsável por armazenar o endereço da nossa aplicação gerando menos problemas com as funções 'require_once' vistas posteriormente ao mudar nosso app de diretório ou domínio.

```php
<?php

// Sample file: Never send your credentials to git

// host
$host = 'http://localhost/conteudos/crud-php-mysql-procedural/';

// db
$db_name = 'crud';
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';

try {
  $conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
} catch (\Throwable $th) {
  throw $th;
}
```

### /src

Dentro do diretório '/src' temos a pasta '/pages' que contém arquivos responsáveis por gerar nosso html, '/database' com funções que trabalham com nossas querys de banco de dados e '/actions' que é responsável por fazer o meio de campo entre '/database' e '/pages'.

Mas então você se pergunta o porque de não colocarmos sqls, html e consultas ao banco nos mesmos arquivos de forma misturada. Simplesmente porque estariamos dificultando a manutenção da nosssa aplicação deixando nosso app com um código mais poluido e redundante.

Com uma arquitetura ou organização de pastas que divide nosso app em responsabilidades menores que dizem claramente o que fazem facilitamos a manutenção e compreensão de como nosso app funciona, por que tudo fica mais desacoplado.

Ex: Se mudarmos nosso banco de dados basta modificarmos o arquivo 'config.php' que mantém a nossa conexão e talvez o arquivo '/src/database/user.php' que contém as funções php com nossos códigos sql.

![CRUD PHP SRC](/static/images/src.jpg)

### /src/pages

Nossos arquivos de pages estão organizados em duas pastas '/user' responsável por armazenar os códigos de nossas páginas e '/partials' responsável por armazenar o código de header e footer que é comum a todas elas. Todos os nossos arquivos em '/src/pages/user'
se iniciam com 'require_once' para importar os arquivos 'config.php' que armazena nossa conexão com o banco de dados, '/src/actions/user.php' que armazena as funções básicas para nosso CRUD, 'header.php'(cabecaçho de nossas páginas), e terminam com 'footer.php' (Rodapé das nossas páginas).

#### /pages/user/read.php

A seguir temos o código do nosso arquivo '/src/pages/user/read.php' responsável por listar os cadastros do nosso CRUD. Nosso arquivo preenche logo no inicio a variável $users com o resultado da função 'readUserAction' que retorna nossos cadastros do banco de dados e em seguida preenche nossa tabela html através de um foreach em nosso array. Em seguida utilizamos a função 'printMessage' que exibirá posteriormente se uma operação no banco obteve sucesso. Também temos a função nativa do php htmlspecialchars para evitarmos ataques xss.

```php
<?php

require_once '../../../config.php';
require_once '../../../src/actions/user.php';
require_once '../../../src/modules/messages.php';
require_once '../partials/header.php';

$users = readUserAction($conn);

?>
<div class="container">
	<div class="row">
		<a href="../../../"><h1>Users - Read</h1></a>
		<a class="btn btn-success text-white" href="./create.php">New</a>
	</div>
	<div class="row flex-center">
		<?php if(isset($_GET['message'])) echo(printMessage($_GET['message'])); ?>
	</div>

	<table class="table-users">
		<tr>
			<th>NAME</th>
			<th>EMAIL</th>
			<th>PHONE</th>
		</tr>
		<?php foreach($users as $row): ?>
		<tr>
			<td class="user-name"><?=htmlspecialchars($row['name'])?></td>
			<td class="user-email"><?=htmlspecialchars($row['email'])?></td>
			<td class="user-phone"><?=htmlspecialchars($row['phone'])?></td>
			<td>
				<a class="btn btn-primary text-white" href="./edit.php?id=<?=$row['id']?>">Edit</a>
			</td>
			<td>
				<a class="btn btn-danger text-white" href="./delete.php?id=<?=$row['id']?>">Remove</a>
			</td>
		</tr>
		<?php endforeach; ?>
	</table>
</div>
<?php require_once '../partials/footer.php'; ?>
```

#### /pages/user/create.php

A seguir temos o código do arquivo '/src/pages/user/create.php', responsável por exibir o formulário de criação do nosso CRUD. Nosso arquivo possui um formulário html utilizado para receber os dados de um novo cadastro: name, email e phone. Perceba também que utilizamos 'required' em nossos campos para que o formulário não seja submetido sem que sejam preenchidos. Também temos no inicio do nosso arquivo uma condição if que verifica se o formulário foi submetido via método httpp POST e se os imputs foram preenchidos corretamente se sim os envia para a nossa função 'createUserAction' para salvar nosso cadastro.

```php
<?php

require_once '../../../config.php';
require_once '../../actions/user.php';
require_once '../partials/header.php';

if(isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["phone"]))
    createUserAction($conn, $_POST["name"], $_POST["email"], $_POST["phone"]);

?>
<div class="container">
	<div class="row">
        <a href="../../../index.php"><h1>Users - Create</h1></a>
        <a class="btn btn-success text-white" href="../../../index.php">Prev</a>
    </div>
    <div class="row flex-center">
        <div class="form-div">
            <form class="form" action="../../pages/user/create.php" method="POST">
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
<?php require_once '../partials/footer.php'; ?>

```

#### /pages/user/edit.php

Agora temos o código do arquivo '/src/pages/user/edit.php', responsável por exibir o formulário de edição do nosso CRUD. Nosso arquivo possui um formulário html preenchido com os valores atuais de name, email e phone. Perceba que de maneira similar ao arquivo anterior também utilizamos 'required' em nossos campos para que o formulário não seja submetido sem que sejam preenchidos. Além disso temos no inicio do nosso arquivo uma condição if que verifica se o formulário foi submetido via método httpp POST e se os imputs foram preenchidos corretamente se sim os envia para a função 'updateUserAction' para atualizar nosso cadastro, caso contrario preenche a variável $user com o retorno da função 'findUserAction' que busca o usuário pelo id vindo da nossa url, os dados são utilizados para preencher os inputs do formulário como mostrado no código. Em nosso formulário de edição também é utilizado 'htmlspecialchars' para tratar os dados vindos do banco.

```php
<?php

require_once '../../../config.php';
require_once '../../actions/user.php';
require_once '../partials/header.php';

if(isset($_POST["id"], $_POST["name"]) && isset($_POST["email"]) && isset($_POST["phone"]))
    updateUserAction($conn, $_POST["id"], $_POST["name"], $_POST["email"], $_POST["phone"]);

$user = findUserAction($conn, $_GET['id']);

?>
<div class="container">
	<div class="row">
        <a href="../../../index.php"><h1>Users - Edit</h1></a>
        <a class="btn btn-success text-white" href="../../../index.php">Prev</a>
    </div>
    <div class="row flex-center">
        <div class="form-div">
            <form class="form" action="../../pages/user/edit.php" method="POST">
                <input type="hidden" name="id" value="<?=$user['id']>" required/>
                <label>Name</label>
                <input type="text" name="name" value="<?=htmlspecialchars($user['name'])?>" required/>
                <label>E-mail</label>
                <input type="email" name="email" value="<?=htmlspecialchars($user['email'])?>" required/>
                <label>Phone</label>
                <input type="text" name="phone" value="<?=htmlspecialchars($user['phone'])?>" required/>

                <button class="btn btn-success text-white" type="submit">Save</button>
            </form>
        </div>
    </div>
</div>
<?php require_once '../partials/footer.php'; ?>
```

#### /pages/user/delete.php

A seguir temos o código do arquivo '/src/pages/user/delete.php', responsável por exibir o formulário de confirmação de exclusão do nosso CRUD. Nosso arquivo possui um formulário html preenchido com o id do nosso registro e um botão de confirmação. Perceba também que de maneira similar ao arquivo anterior utilizamos 'required' em nosso campo. Além disso temos no inicio do nosso arquivo uma condição if que verifica se o formulário foi submetido via método httpp POST e se o imput foi preenchido corretamente se sim o envia para a função 'deleteUserAction' para remover nosso cadastro, caso contrario preenche o campo id do formulário. Como não temos nenhum dado cadastrado pelo usuário no nosso formulário não utilizamos 'htmlspecialchars'.

```php
<?php

require_once '../../../config.php';
require_once '../../actions/user.php';
require_once '../partials/header.php';

if(isset($_POST['id']))
    deleteUserAction($conn, $_POST['id']);

?>
<div class="container">
	<div class="row">
        <a href="../../../index.php"><h1>Users - Delete</h1></a>
        <a class="btn btn-success text-white" href="../../../index.php">Prev</a>
    </div>
    <div class="row flex-center">
        <div class="form-div">
            <form class="form" action="../../pages/user/delete.php" method="POST">
                <label>Do you really want to remove the user?</label>
                <input type="hidden" name="id" value="<?=$_GET['id']?>" required/>

                <button class="btn btn-success text-white" type="submit">Yes</button>
            </form>
        </div>
    </div>
</div>
<?php require_once '../partials/footer.php'; ?>
```

### /src/actions

Em nosso diretório actions temos o arquivo '/src/actions/user.php' com as funções do nosso CRUD. No inicio do arquivo importamos '/src/datadase/user.php' com nossas funções para trabalhar com banco de dados. A primeira função presente no arquivo é a 'findUserAction' responsável por buscar nosso usuário no banco de dados através da função 'findUserDb', essa função é utlizada para carregar nosso usuário na nossa '/src/pages/user/edit.php' arquivo visto anteriormente.

Em seguida temos a função 'readUserAction' que busca nossos cadastros através da função 'readUserDb' e é utilizada na '/src/pages/user/read.php'

Agora temos as funções responsáveis por criar(createUserAction), atualizar(updateUserAction) e remover(deleteUserAction) nossos cadastros, cada uma recebe seus respectivos parametros (conexão e atributos do cadatastro) e os repassa para as funções do nosso arquivo '/src/databse/db.php' de acordo com o resultado redirecionamos o usuário para a page 'src/pages/user/read.php' passando como parametro a variável GET message que guarda nossa mensagem de sucesso ou erro.

```php
<?php

require_once '../../database/user.php';

function findUserAction($conn, $id) {
	return findUserDb($conn, $id);
}

function readUserAction($conn) {
	return readUserDb($conn);
}

function createUserAction($conn, $name, $email, $phone) {
	$createUserDb = createUserDb($conn, $name, $email, $phone);
	$message = $createUserDb == 1 ? 'success-create' : 'error-create';
	return header("Location: ./read.php?message=$message");
}

function updateUserAction($conn, $id, $name, $email, $phone) {
	$updateUserDb = updateUserDb($conn, $id, $name, $email, $phone);
	$message = $updateUserDb == 1 ? 'success-update' : 'error-update';
	return header("Location: ./read.php?message=$message");
}

function deleteUserAction($conn, $id) {
	$deleteUserDb = deleteUserDb($conn, $id);
	$message = $deleteUserDb == 1 ? 'success-remove' : 'error-remove';
	return header("Location: ./read.php?message=$message");
}
```

### /src/database

A seguir temos nosso arquivo '/src/database/db.php' responsável por executar nossas querys no banco de dados. Com exceção da nossa função 'readUserDb' que não utiliza nenhum dado vindo de formulário todas as nossas funções, para prevenção de SQL injection se iniciam utilizando 'mysqli_real_escape_string' para escapar nossos dados recebidos como parametro. Em seguida a query é definida em uma string. Na função 'readUserDb' executamos diretamente nossa query com a função 'mysqli_query' e retornamos nosso array. Em todos os outros métodos também para tratarmos SQL injection montamos a query por partes atrvés de prepared statements. Em todos os métodos encerramos nossa conexão com 'mysqli_close'.

```php
<?php

function findUserDb($conn, $id) {
    $id = mysqli_real_escape_string($conn, $id);
	$user;

	$sql = "SELECT * FROM users  WHERE id = ?";
	$stmt = mysqli_stmt_init($conn);

	if(!mysqli_stmt_prepare($stmt, $sql))
		exit('SQL error');

	mysqli_stmt_bind_param($stmt, 'i', $id);
	mysqli_stmt_execute($stmt);

	$user = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));

	mysqli_close($conn);
	return $user;
}

function createUserDb($conn, $name, $email, $phone) {
	$name = mysqli_real_escape_string($conn, $name);
	$email = mysqli_real_escape_string($conn,  $email);
	$phone = mysqli_real_escape_string($conn,  $phone);

	if($name && $email && $phone) {
		$sql = "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)";
		$stmt = mysqli_stmt_init($conn);

		if(!mysqli_stmt_prepare($stmt, $sql))
			exit('SQL error');

		mysqli_stmt_bind_param($stmt, 'sss', $name, $email, $phone);
		mysqli_stmt_execute($stmt);
		mysqli_close($conn);
		return true;
	}
}

function readUserDb($conn) {
    $users = [];

	$sql = "SELECT * FROM users";
	$result = mysqli_query($conn, $sql);

	$result_check = mysqli_num_rows($result);

	if($result_check > 0)
		$users = mysqli_fetch_all($result, MYSQLI_ASSOC);

	mysqli_close($conn);
	return $users;
}

function updateUserDb($conn, $id, $name, $email, $phone) {
    if($id && $name && $email && $phone) {
		$sql = "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?";
		$stmt = mysqli_stmt_init($conn);

		if(!mysqli_stmt_prepare($stmt, $sql))
			exit('SQL error');

		mysqli_stmt_bind_param($stmt, 'sssi', $name, $email, $phone, $id);
		mysqli_stmt_execute($stmt);
		mysqli_close($conn);
		return true;
	}
}

function deleteUserDb($conn, $id) {
    $id = mysqli_real_escape_string($conn, $id);

	if($id) {
		$sql = "DELETE FROM users WHERE id = ?";
		$stmt = mysqli_stmt_init($conn);

		if(!mysqli_stmt_prepare($stmt, $sql))
			exit('SQL error');

		mysqli_stmt_bind_param($stmt, 'i', $id);
		mysqli_stmt_execute($stmt);
		return true;
	}
}
```

### /src/modules

Além dos diretórios citados também temos em '/src' a pasta '/src/modules' responsável por armazenar nosso arquivo '/src/modules/messages.php' com a 'printMessage' que retorna nossas mensagens de validação impressas no arquivo '/src/pages/read.php' após alguma alteração foita no banco de dados através de inserção, edição ou remoção.

```php
<?php

function printMessage($message) {
    if($message=='success-create')
        return '<span class="text-success">Registration successfully Complete!</span>';
    if($message=='error-create')
        return '<span class="text-error">Error when registering.</span>';

    if($message=='success-remove')
        return '<span class="text-success">Registration removed successfully!</span>';
    if($message=='error-remove')
        return '<span class="text-error">Error removing registration.</span>';

    if($message=='success-update')
        return '<span class="text-success">Registration updated successfully!</span>';
    if($message=='error-update')
        return '<span class="text-error">Error updating registration.</span>';
}

```

Para a proposta do artigo.. é isso :)
E aí? O que achou? Tem alguma sugestão? Comenta aí
