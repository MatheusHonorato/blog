---
title: CRUD PHP POO (Orientado a objetos) com MySQL e PDO (PHP 8 Vanilla)
date: '2024-09-09'
tags: ['php', 'poo', 'crud', 'mysql', 'pdo', 'sql']
draft: false
summary: 'Neste artigo você aprenderá como desenvolver um CRUD com PHP Orientado a objetos, MySQL  e PDO'
image: '/static/images/crud-poo.jpg'
---

### Introdução

Fala, galera! Neste artigo vamos aprender como desenvolver uma aplicação [CRUD](https://devcontratado.com/blog/php/crud-php-mysql) orientada a objetos com a extensão PDO, utilizada para se comunicar de maneira nativa com diversos bancos de dados no PHP. Existem diversas maneiras de se implementar um CRUD, esta é uma sujestão de implementação para auxiliar na compreensão sobre como uma aplicação web orientada a objetos pode funcionar, neste projeto utilizamos o padrão de arquitetura [MVC](https://pt.wikipedia.org/wiki/MVC). É importante ter compreensão dos pré-requisitos indicados no tópico a seguir, por que  não é objetivo deste artigo o aprofundamento nestes temas específicos, mas sim da organização e implementação do CRUD orientado a objetos como um todo. Observação: A ideia deste artigo é estudo e discussão de como organizar uma aplicação PHP orientada a objetos, se você deseja implementar sua aplicação para colocar em ambiente de produção recomendamos o uso de uma solução mais robusta como [Slim frameowrk](https://www.slimframework.com) ou [Laravel](https://laravel.com).

### Pré-requisitos e conceitos envolvidos:

- Noções de desenvolvimento web (Cliente/Servidor);
- PHP básico
- [Ambiente de desenvolvimento PHP e MySQL](https://devcontratado.com/blog/php/como-configurar-um-ambiente-php-mysql);
- [CRUD](https://devcontratado.com/blog/php/crud-php-mysql);
- [PHP orientado a objetos](https://devcontratado.com/blog/engenharia-de-software/orientacao-a-objetos);
- Composer;
- [Design Patterns](https://devcontratado.com/blog/engenharia-de-software/design-patterns/design-patterns-o-que-e);
- [Repositories](https://devcontratado.com/blog/engenharia-de-software/design-patterns/repository);
- [Sistema de rotas](https://devcontratado.com/blog/php/sistema-de-rotas);
- MySQL.

### Apresentação da aplicação

Antes de começarmos a desenvolver você pode conferir como a nossa aplicação ficará através dos prints abaixo.

![CRUD PHP LIST](/static/images/crud-poo-list.png)

![CRUD PHP SHOW](/static/images/crud-poo-show.png)

![CRUD PHP CREATE](/static/images/crud-poo-create.png)

![CRUD PHP EDIT](/static/images/crud-poo-edit.png)

O nosso CRUD será um cadastro de usuários com os campos id, name e e-mail.

Link do projeto: https://github.com/MatheusHonorato/crud-php-mysql-poo

### Arquitetura

![Crud PHP POO](/static/images/diagrama-crud-poo.png)

Neste diagrama temos uma visão da organização da nossa aplicação e do fluxo de comunicação dos objetos que a compoem. Você pode perceber que o fluxo inicia com uma requisição que vem do cliente e ao chegar no servidor é capturada pelo Front-Controller. Em seguida o fluxo segue para Router que de acordo com a rota acessada pelo cliente encaminha a requisição para o respectivo controlador na camada Controllers. De acordo com a lógica de cada controlador são chamados objetos das camadas Models, Repositories ou instancias de classes auxiliares se necessário. Por fim o controlador retorna a resposta ao cliente diretamente ou se necessário chama e retorna a camada de View.

### Mão na massa

Para que você rode o CRUD e importe o sql do nosso banco de dados é necessário ter o seu ambiente de desenvolvimento configurado com o PHP e o MySQL. Você pode conferir como configurar no nosso artigo: [Ambiente de desenvolvimento com PHP e MySQL no Windows
](/blog/php/como-configurar-um-ambiente-php-mysql).

### SQL

A seguir você pode conferir o SQL do nosso banco:

```sql
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;
```

### Organizando nossa aplicação

Para focarmos no entendimento da lógica de CRUD iremos abstrair a implementação do sistema de rotas que você pode compreender melhor no artigo: https://devcontratado.com/blog/php/sistema-de-rotas.  

- public (Diretório responsável por armazenar o front-controller da aplicação)

    - index.php

    ```php
    <?php
    session_start();

    define('ROOT', dirname(__FILE__, 2).DIRECTORY_SEPARATOR);

    require_once ROOT.'vendor'.DIRECTORY_SEPARATOR.'autoload.php';

    $routes = require_once ROOT.'config'.DIRECTORY_SEPARATOR.'routes.php';

    try {
        \App\Http\Router::run($routes);
    } catch (\Exception $e) {
        echo $e->getMessage();
        http_response_code($e->getCode());
    }
    ```

    O aquivo index.php é responsável pelo boot da nossa aplicação. No arquivo index.php fazemos o bootstrap de algumas definições necessárias para a aplicação. Além disso iniciamos o sistema de rotas. O arquivo index.php é composto pelos seguintes passos:
    
    - Habilita uso de sessões (Utilizado neste exemplo para armazenarmos mensagens de sucesso e erro);
    - Define constante ROOT (Utilizado para guardar o caminho para a raiz do projeto);
    - Importa autload do composer (Autoloading e Gerenciador de dependências);
    - Importa arquivo config/routes.php com a definição das rotas;
    - Inicializa o sistema de rotas.
    
  (Lembrando que o conteúdo deste arquivo pode ser abstraído por alguma ferramenta de rotas ou framework);

- config (Diretório responsável por armazenar arquivos de configuração da aplicação)
    - routes.php (Arquivo responsável por armazenar a definição das rotas)

      ```php
      <?php

      declare(strict_types=1);

      use App\Controllers\UserController;
      use App\Enums\HttpMethodEnum;

      return [
          ['users/create',  [UserController::class, 'create'], HttpMethodEnum::GET],
          ['users/{id}',  [UserController::class, 'show'], HttpMethodEnum::GET],
          ['users',  [UserController::class, 'index'], HttpMethodEnum::GET],
          ['users',  [UserController::class, 'store'], HttpMethodEnum::POST],
          ['users/edit/{id}',  [UserController::class, 'edit'], HttpMethodEnum::GET],
          ['users/update/{id}',  [UserController::class, 'update'], HttpMethodEnum::POST],
          ['users/delete/{id}',  [UserController::class, 'destroy'], HttpMethodEnum::POST],
      ];
      ```

  Se você já utilizou alguma biblioteca de rotas, framework ou leu nosso artigo sobre rotas com php deve compreender que é comum definirmos o mapeamento das nossas rotas em um arquivo. O arquivo utilizado para este mapeamento/bind na nossa aplicação é o config/routes.php. Perceba que somente utilizamos os métodos HTTP GET e POST, pois a nossa aplicação trabalha com formulários HTML e não é uma api rest, sendo assim não suporta outros métodos do protocolo HTTP como PUT e DELETE de maneira nativa.

- src (Diretório principal do nosso projeto: responsável por armazenar modelos, visualizações, controladores..)

    -  Controllers

    Armazena classes do tipo controlador, camada intermerdiária da arquitetura MVC responsável por receber requisições, se comunicar com classes de regra de negócio, se necessário, e retornar uma resposta ao usuário.

    - AbstractController.php

    ```php
    <?php

    declare(strict_types=1);

    namespace App\Controllers;

    abstract class AbstractController
    {
        public function view(string $view, array $data = []): void
        {
            extract($data);

            include_once ROOT.'src'.DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR.$view.'.php';
        }
    }
    ```

    Classe responsável pelas características básicas de controladores como: retorno de visualizações. Por ser uma classe abstrata não pode ser diretamente instanciada.

    - UserController.php

    ```php
    <?php

    declare(strict_types=1);

    namespace App\Controllers;

    use App\Enums\HttpStatusEnum;
    use App\Http\RequestInterface;
    use App\Models\User;
    use App\Repositories\UserRepositoryInterface;
    use App\Repositories\UserRepositoryPDO;

    class UserController extends AbstractController
    {
        public function __construct(
            private RequestInterface $request,
            private UserRepositoryInterface $userRepository = new UserRepositoryPDO()
        ) {
        }

        public function index(): void
        {
            $users = $this->userRepository->list();

            http_response_code(HttpStatusEnum::OK->value);

            $this->view('index', compact('users'));
        }

        public function show(int $id): void
        {
            $user = $this->userRepository->find($id);

            http_response_code(HttpStatusEnum::OK->value);

            $this->view('show', compact('user'));
        }

        public function create(): void
        {
            http_response_code(HttpStatusEnum::OK->value);

            $this->view('create');
        }

        public function store(): void
        {
            $user = new User(...$this->request::getBody());

            $this->userRepository->save($user);

            http_response_code(HttpStatusEnum::SEE_OTHER->value);

            $_SESSION['success'] = 'Registration completed successfully!';

            header("Location: ".$this->request::getBaseUrl()."/users", true);
        }

        public function edit(int $id): void
        {
            $user = $this->userRepository->find($id);

            http_response_code(HttpStatusEnum::OK->value);

            $this->view('edit', compact('user'));
        }

        public function update(int $id): void
        {
            $user = new User(...[...$this->request::getBody(), 'id' => $id]);

            $this->userRepository->update($user);

            http_response_code(HttpStatusEnum::OK->value);

            $_SESSION['success'] = 'Registration updated successfully!';

            header("Location: ".$this->request::getBaseUrl()."/users", true);
        }

        public function destroy(int $id): void
        {
            $this->userRepository->delete($id);

            http_response_code(HttpStatusEnum::NO_CONTENT->value);

            $_SESSION['success'] = 'Registration deleted successfully!';

            header("Location: ".$this->request::getBaseUrl()."/users", true);
        }
    }
    ```

  Controlador para a entidade User. O controlador UserController inicia extendendo a classe AbstractController, reponsável por compartilhar caracteristicas básicas de um controlador como carregamento de visualizações. Em seguida é feita a injeção das dependências do controlador pelo método __construct. A primeira dependência injetada é RequestInterface, para exigir uma classe que implemente métodos relacionados a requisição atual ex: obtenção de método http atual, obtenção de corpo de requisição. A segunda dependência é UserRepositoryInterface, que exige uma classe que implemente métodos para persistência de dados (no nosso caso o banco). Perceba que aqui estamos implementando o principio 'Dependency Inversion' (Inversão de dependência) do [SOLID](https://devcontratado.com/blog/engenharia-de-software/solid-principios-da-poo-com-exemplos), não estamos dependendo de classes concretas, mas sim de abstrações.

    - O primeiro método do controlador é o index(), método para listagem de usuários. O método index() é composto pelos seguintes passos:

      - Carregamento de usuários utilizando repositório;
      - Preenchimento de status http para resposta;
      - Carregamento de visualização.

    - O segundo método do controlador é o show(), método responsável por retornar a instância do usuário associado ao id passado pela url. O método show() possui a seguinte estrutura.

      - Carregamento de usuário utilizando repositório e id passado pela url;
      - Preenchimento de status http para resposta;
      - Carregamento de visualização.

    - O terceiro método do controlador é o create(), responsável por carregar o formulário de cadastro de usuário. O método create() possui a seguinte estrutura.

        - Preenchimento de status http para resposta;
        - Carregamento de visualização.

    - O quarto método é o store(), responsável por obter os dados do usuário preenchidos no formulário e persistir no banco de dados. O método store() possui a seguinte estrutura.

        - Preenchimento de objeto user com dados vindos da requisição;
        - Persistência de usuário utilizando repositório;
        - Preenchimento de status http para resposta;
        - Preenchimento de mensagem de sucesso em variável de sessão;
        - Carregamento de visualização.

    - O quinto método do controlador é o edit(), responsável por carregar um formulário de edição inicializado com dados do usuário carregado a partir do id passado pela url. A estrutura do método edit é a seguinte:

        - Preenchimento de objeto user com id vindo da requisição;
        - Preenchimento de status http de resposta;
        - Carregamento de visualização
        
    - O sexto método do controlador é o update(), responsável por receber os dados da requisição enviada pelo formulário e atualizar no banco de dados. A estrutura do método update() é a seguinte:

        - Preenchimento de objeto user com dados vindos da requisição;
        - Atualização de dados do usuário no banco utilizando repositório;
        - Preenchimento de status http para resposta;
        - Preenchimento de mensagem de sucesso em variável de sessão.
        - Redirecionamento para rota de listagem.

    - O sétimo e último método do controlador é o destroy(), responsável por remover um registro de acordo com o id. A estrutura do método destroy() é a seguinte:

        - Remoção de usuário utilizando repositório e id vindo da requisição.
        - Preenchimento de status http de resposta;
        - Preenchimento de mensagem de sucesso em variável de sessão;
        - Redirecionamento para rota de listagem.

  - DB

    O diretório DB armazena classes relacionadas a conexão com banco de dados.

    - DBConnection.php

    ```php
    <?php

    declare(strict_types=1);

    namespace App\DB;

    class DBConnection
    {
        private static \PDO $instance;

        private static string $host = "db";

        private static string $user = "user";

        private static string $password = "password";

        private static string $db = "app";

        public function __construct()
        {
            if(!isset(self::$instance)) {
                $this->connect();
            }
        }

        private function connect(): void
        {
            self::$instance = new \PDO("mysql:host=".self::$host.";dbname=".self::$db, self::$user, self::$password);
        }

        public function getInstance(): \PDO
        {
            return self::$instance;
        }
    }
    ```

    Classe responsável por obter conexão com banco de dados utilizando PDO. DbConnection é uma implementação do padrão Monostate, variação do padrão [Singleton](https://www.devmedia.com.br/php-singleton-aplicando-o-padrao-de-projeto-na-pratica/28469). Em DBconnection diferente do Singleton convencional conseguimos criar multiplas instancias da classe, mas ainda temos o compartilhamento de estado entre todos os objetos.
    Observação: Em um projeto real em produção não deixe dados de acesso como usuário e senha escritos explicitamente no código, utilize alguma solução como variáveis de ambiente.

  - Enums

    Diretório responsável por armazenar estruturas de dados do tipo Enum.

    - HttpMethodEnum

    ```php
    <?php

    declare(strict_types=1);

    namespace App\Enums;

    enum HttpMethodEnum: string
    {
        case GET = 'GET';
        case POST = 'POST';
        case PUT = 'PUT';
        case PATCH = 'PATCH';
        case DELETE = 'DELETE';
        case OPTIONS = 'OPTIONS';
        case HEAD = 'HEAD';
        case TRACE = 'TRACE';
        case CONNECT = 'CONNECT';

        public static function fromValue(string $value): self
        {
            return match ($value) {
                'GET' => self::GET,
                'POST' => self::POST,
                'PUT' => self::PUT,
                'PATCH' => self::PATCH,
                'DELETE' => self::DELETE,
                'OPTIONS' => self::OPTIONS,
                'HEAD' => self::HEAD,
                'TRACE' => self::TRACE,
                'CONNECT' => self::CONNECT,
            };
        }
    }
    ```

    Enum responsável por representar métodos disponíveis no protocolo HTTP.

    - HttpStatusEnum

    ```php
    <?php

    declare(strict_types=1);

    namespace App\Enums;

    enum HttpStatusEnum: int
    {
        case OK = 200;
        case CREATED = 201;
        case ACCEPTED = 202;
        case NO_CONTENT = 204;
        case MOVED_PERMANENTLY = 301;
        case TEMPORARY_REDIRECT = 302;
        case SEE_OTHER = 303;
        case BAD_REQUEST = 400;
        case UNAUTHORIZED = 401;
        case FORBIDDEN = 403;
        case NOT_FOUND = 404;
        case METHOD_NOT_ALLOWED = 405;
        case NOT_ACCEPTABLE = 406;
        case CONFLICT = 409;
        case UNPROCESSABLE_ENTITY = 422;
        case INTERNAL_SERVER_ERROR = 500;
        case NOT_IMPLEMENTED = 501;
        case BAD_GATEWAY = 502;
        case SERVICE_UNAVAILABLE = 503;
    }
    ```

    Enum responsável por representar status disponíveis no protocolo HTTP.

  - Http

    Diretório responsável por armazenar classes relacionadas a requisição e sistema de rotas. Se deseja compreender mais a fundo como um sistema de rotas funciona pode ler o seguinte artigo: [Sistema de rotas](https://devcontratado.com/blog/php/sistema-de-rotas). Se o seu objetivo é especificamente o endendimento do CRUD POO, prossiga.

  - Models

    Diretório responsável por armazenar classes relacionadas as entidades do sistema.

    User. php

    ```php
    <?php

    declare(strict_types=1);

    namespace App\Models;

    class User
    {
        public function __construct(
            public readonly string $name,
            public readonly string $email,
            public readonly ?int $id = null
        ) {
            if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
                throw new \Exception('Invalid E-mail');
            }
        }

        public function toArray(): array
        {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email
            ];
        }
    }
    ```

    Classe responsável por representar a entidade User.

  - Repositories

    Diretório responsável por armazenar classes do tipo repositório. Este diretório possui classes que abstraem nossa comunicação com a fonte de dados do sistema.

    - UserRepositoryInterface.php

    ```php
    <?php

    declare(strict_types=1);

    namespace App\Repositories;

    use App\Models\User;

    interface UserRepositoryInterface
    {
        public function list(): array;

        public function find(int $id): User;

        public function save(User $user): void;

        public function update(User $user): void;

        public function delete(int $id): void;
    }
    ```

    Interface responsável por definir os métodos e parâmetros que devem ser implementados por uma classe repositório que se refira a entidade User. Sempre injetamos esta interface como dependência em métodos para facilitar a evolução do sistema. Injetar uma interface como dependência ao invés de uma classe concreta permite mais desacoplamento. Neste caso por exemplo podemos trocar uma classe concreta que se comunica com um banco x para uma que se comunica com um banco y ou até mesmo por uma classe que faça essa persistência em arquivos de maneira rapida sem impactar na classe que a utiliza. Esta pratica flexibiliza nosso sistema mantendo a confiabilidade e agilidade no desenvolvimento.

    - UserRepositoryPDO.php

    ```php
    <?php

    declare(strict_types=1);

    namespace App\Repositories;

    use App\DB\DBConnection;
    use App\Models\User;

    class UserRepositoryPDO implements UserRepositoryInterface
    {
        private \PDO $pdo;

        public function __construct(
        ) {
            $this->pdo = (new DBConnection())->getInstance();
        }

        public function list(): array
        {
            try {
                $sql = "SELECT id, name, email FROM users";
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute();

                $users = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                if(count($users) > 0) {
                    $users = array_map(fn ($user) => new User(...$user), $users);
                }

                return $users;
            } catch (\Exception $e) {
                throw $e;
            }

        }

        public function find(int $id): User
        {
            try {
                $sql = "SELECT id, name, email FROM users WHERE id = :id";
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindValue(':id', $id);
                $stmt->execute();
                $user = $stmt->fetch(\PDO::FETCH_ASSOC);

                if ($user == false) {
                    throw new \Exception('User not found');
                }

                return new User(...$user);
            } catch (\Exception $e) {
                throw $e;
            }
        }

        public function save(User $user): void
        {
            try {
                $sql = "INSERT INTO users (name, email) VALUES (:name, :email)";

                $this->pdo->beginTransaction();

                $stmt = $this->pdo->prepare($sql);
                $stmt->bindValue(':name', $user->name);
                $stmt->bindValue(':email', $user->email);
                $stmt->execute();

                $this->pdo->commit();
            } catch (\Exception $e) {
                $this->pdo->rollBack();

                throw $e;
            }
        }

        public function update(User $user): void
        {
            try {
                $sql = "UPDATE users SET name = :name WHERE id = :id";

                $this->pdo->beginTransaction();

                $stmt = $this->pdo->prepare($sql);
                $stmt->bindValue(':id', $user->id);
                $stmt->bindValue(':name', $user->name);
                $stmt->bindValue(':email', $user->email);
                $stmt->execute();

                $this->pdo->commit();
            } catch (\Exception $e) {
                $this->pdo->rollBack();

                throw $e;
            }
        }

        public function delete(int $id): void
        {
            try {
                $this->find($id);

                $sql = "DELETE FROM users WHERE id = :id";
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindValue(':id', $id);
                $stmt->execute();

            } catch (\Exception $e) {
                throw $e;
            }
        }
    }
    ```

    Classe concreta que implementa interface UserRepositoryInterface utilizando PDO para se comunicar com o banco de dados.

  - views

    Diretório responsável por armazenar arquivos da camada View.

    - layout.php

        ```php
        <?php

        use App\Http\Request;

        include_once 'messages.php';
        ?>

        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="<?php echo Request::getBaseUrl(); ?>/css/style.css">
                <title><?php echo $title ?? 'CRUD users'; ?></title>
            </head>
            <body>
                <header>
                    <nav>
                        <div class="container">
                            <?php echo $message; ?>
                            <?php if(Request::getUri() != '/users'): ?>
                                <a class="btn btn-primary text-white" href="<?php echo Request::getBaseUrl(); ?>/users">List</a>
                            <?php endif; ?>
                            <?php if(Request::getUri() != '/users/create'): ?>
                                <a class="btn btn-success text-white" href="<?php echo Request::getBaseUrl(); ?>/users/create">Create</a>
                            <?php endif; ?>
                        </div>
                    </nav>
                </header>

                <main>
                    <?php echo $content; ?>
                </main>

                <footer class="footer">
                    <p>&copy; <?php echo date('Y'); ?> - DevContratado</p>
                </footer>
            </body>
        </html>
        ```

        Arquivo que contém o layout base de nossas views. Todo o conteúdo definido em uma view será renderizado no local da variável $content.

    - create.php

        ```php
        <?php

        use App\Http\Request;

        $title = "CRUD users - Create";

        ob_start();
        ?>

        <div class="container">
            <div class="row">
                <h1>Create</h1>
            </div>
            <div class="row flex-center">
                <div class="form-div">
                    <form class="form" action="<?php echo Request::getBaseUrl(); ?>/users" method="POST">
                        <input type="text" name="name" placeholder="Name" required>
                        <input type="email" name="email" placeholder="E-mail" required>
                        <button class="btn btn-success text-white" type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>

        <?php

        $content = ob_get_clean();

        require_once 'layout.php';
        ```

        Arquivo que contém o conteúdo do formulário de criação. O arquivo create.php é composto pelos seguintes passos:

        - Use em Request para obter base url;
        - Inclusão de script messages.php, responsável por formatar e exibir mensagens de sucesso e erro vindos por meio de variáveis de sessão, definidas na camada Controllers;
        - Inicio de buffer de saída;
        - HTML de formulário;
        - Preenchendo variável content com conteúdo do buffer (Esta lógica permite guardar todo o conteúdo HTML escrito para ser renderizado na variável content do script layout.php);
        - Inclusão de arquivo de layout.

    - edit.php

        ```php
        <?php

        use App\Http\Request;

        $title = "CRUD users - Edit";

        ob_start();
        ?>

        <div class="container">
            <div class="row">
                <h1>Edit</h1>
            </div>
            <div class="row flex-center">
                <div class="form-div">
                    <form class="form" action="<?php echo Request::getBaseUrl(); ?>/users/update/<?php echo htmlspecialchars($user->id); ?>" method="POST">
                        <input type="text" name="name" placeholder="Name" value="<?php echo htmlspecialchars($user->name); ?>" required>
                        <input type="email" name="email" placeholder="E-mail" value="<?php echo htmlspecialchars($user->email); ?>" required>
                        <button class="btn btn-success text-white" type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>

        <?php

        $content = ob_get_clean();

        require_once 'layout.php';
        ```

        Arquivo que contém o conteúdo do formulário de edição. O arquivo edit.php possui basicamente a mesma estrutura do arquivo create.php. Diferente do create.php agora estamos trabalhando com um registro que já existe, sendo assim temos como diferenças a passagem do id do registro atual pela url e o preenchimento do input name com o valor atual de name.

    - show.php

        ```php
        <?php

        $title = "CRUD users - Show";

        ob_start();
        ?>

        <div class="container">
            <div class="row">
                <h1>Show</h1>
            </div>
            <div class="row flex-center">
                <div class="form-div">
                    <p>
                        Id: <?php echo htmlspecialchars($user->id); ?>
                        <br>
                        Name: <?php echo htmlspecialchars($user->name); ?>
                        <br>
                        E-mail: <?php echo htmlspecialchars($user->email); ?>
                    </p>
                </div>
            </div>
        </div>

        <?php

        $content = ob_get_clean();

        require_once 'layout.php';
        ```

    - index.php

        ```php
        <?php

        use App\Http\Request;

        $title = "CRUD users - List";

        ob_start();
        ?>

        <div class="container">
            <h1>List</h1>

            <table class="table-users">
                <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Actions</th>
                </tr>
                <?php foreach ($users as $user): ?>
                <tr>
                    <td class="user-name">
                        <?php echo htmlspecialchars($user->name); ?>
                    </td>
                    <td class="user-email">
                        <?php echo htmlspecialchars($user->email); ?>
                    </td>
                    <td>
                        <a class="btn btn-primary text-white" href="<?php echo Request::getBaseUrl(); ?>/users/<?php echo htmlspecialchars($user->id); ?>">Show</a>
                        <a class="btn btn-primary text-white" href="<?php echo Request::getBaseUrl(); ?>/users/edit/<?php echo htmlspecialchars($user->id); ?>">Edit</a>
                        <form class="inline-block" action="<?php echo Request::getBaseUrl(); ?>/users/delete/<?php echo htmlspecialchars($user->id); ?>" method="POST" onsubmit="return confirm('Certeza?')">
                            <button class="btn btn-danger text-white" type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
            </table>
        </div>

        <?php

        $content = ob_get_clean();

        require_once 'layout.php';
        ```

        Arquivo que contém listagem de usuários, link para formulário de edição e formulário para remoção de registro.

    - messages.php

        ```php
        <?php

        $key = 'success';
        $message = '';

        if (isset($_SESSION['error'])) {
            $key = 'error';
        }

        if (isset($_SESSION[$key])) {
            $message = '<div class="row flex-center text-'.$key.'">'.$_SESSION[$key].'</div>';

            unset($_SESSION[$key]);
        }
        ```

        Arquivo responsável por definir a apresentação das mensagens armazenadas em variáveis de sessão.

Para a proposta do artigo.. é isso :) E aí? O que achou? Tem alguma sugestão? Comenta aí.


