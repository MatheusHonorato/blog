---
title: 'Repository: Design Patterns - o que é? porque usar? Resumo com exemplos em PHP!'
date: '2023-11-16'
tags: ['repository', 'design-patterns', 'php']
draft: true
summary: 'Neste artigo você aprenderá o que é o design pattern repository e como utiliza-lo para escrever códigos melhores.'
image: '/static/images/repository.jpg'
---

Fala, galera! Neste artigo iremos aprender um pouco mais sobre o padrão repository e como implementa-lo na linguagem de programação PHP.

Os repositórios são classes ou componentes que encapsulam a lógica necessária para acessarmos uma fonte de dados, removendo assim a dependência direta de mecanismos de infraestrutura. Ou seja, desacoplam a camada de acesso a dados da camada de domínio.

Com a utilização de repositórios temos benefícios como:
- Diminui o acoplamento entre classes;
- Podemos trocar a forma como armazenamos os dados sem afetar todo o sistema;
- Facilita o uso de injeção de dependência;
- Facilita a implementação de testes de unidade;
- Padronização de códigos e serviços.

Existem diversas formas de implementação de repositórios, nesse conteúdo abordaremos repositórios genéricos e especializados.

### Exemplo de repositório genérico

```php
<?php

declare(strict_types=1);

interface GenericInterfaceRepository
{
  public function getAll();
 
  public function find($id);
 
  public function update($id, array $attributes);
}

class UserRepository implements GenericInterfaceRepository
{
    protected $model;

    public function __construct()
    {
    $this->model = new User();
    }

    public function getAll()
    {
    return $this->model->get();
    }
 
    public function find($id)
    {
    return $this->model->find($id);
    }
 
    public function update($id, array $attributes)
    {
    return $this->model->find($id)->update($attributes);
    }

}

```

No exemplo acima a classe de repositório é uma classe anêmica, ela atua somente como um proxy do nosso modelo adicionando complexidade ao código sem nenhum benefício. Além disso, utilizando interfaces genéricas assumimos que todas as entidades possuem os mesmos comportamentos, o que nem sempre é verdade. Também quebramos o princípio SOLID interface segregation que diz que interfaces específicas são melhores que interfaces genéricas. 

### Exemplo de repositório específico


```php
<?php

class User
{
  public function __construct($name, $email, $password)
  {
    $this->name = $name;
    $this->email = $email;
    $this->password = bcrypt($password);
  }
 
  public function getName()
  {
    return $this->name;
  }
 
  public function getEmail()
  {
    return $this->email;
  }
 
  public function getPassword()
  {
    return $this->password();
  }
}

// Definindo funções que serão utilizadas na camada de acesso a dados
interface UserRepositoryInterface
{
  public function createNewUser(User $user): User;
  public function UpdateUserById(User $user, $id): User;
}

class UserModel extends Illuminate\Database\Eloquent\Model
{
  protected $table = 'users';
}

// Definindo repositório implementando interface
class UserRepositoryDB implements UserRepositoryInterface
{
    private $userEloquentModel;
 
    public function __construct(UserModel $userModel)
    {
        $this->userEloquentModel = $userModel;
    }

    public function createNewUser(User $user): User
    {
        $newUser = $this->userEloquentModel;

        $newUser->name = $user->getName();
        $newUser->email = $user->getEmail();
        $newUser->password = $user->getPassword();
        $newUser->save();

        return $user;
    }
 
    public function updateUserById(User $user, $id): User
    {
        $newUser = $this->userEloquentModel->find($id);
        
        $newUser->name = $user->getName();
        $newUser->email = $user->getEmail();
        $newUser->password = bcrypt($user->getPassword());
        $newUser->save();

        return $user;
    }
}

// Definindo repositório implementando interface
class UserRepositoryMemory implements UserRepositoryInterface
{
  private array $usersMemory = [];
 
  public function createNewUser(User $user): User
  {
    $newUser = new User();

    $newUser->name = $user->getName();
    $newUser->email = $user->getEmail();
    $newUser->password = $user->getPassword();

    $this->usersMemory[] = $newUser;

    return $user;
  }
 
  public function updateUserById(User $user, $id): User
  {
    foreach ($this->usersMemory as $key => $userMemory) {
        if ($id == $key) {
            $newUser = new User;
            $newUser->name = $user->getName();
            $newUser->email = $user->getEmail();
            $newUser->password = bcrypt($user->getPassword());

            unset($this->usersMemory[$key]);
            $this->usersMemory[$key] = $newUser;
            break;
        }
    }
    return $user;
  }
}

// Classe de negócio que utiliza o repositório
class UserController {
    public function __construct(UserRepositoryInterface $userRepository){}


    public function createNewUser(UserRequest $userRequest): User {
        $user = = new User;
        $user->name = $userRequest->getName();
        $user->email = $userRequest->getEmail();
        $user->password = bcrypt($userRequest->getPassword());
        $user->save();


        return $this->$userRepository->createNewUser($user);
    }
}

// Exemplo de uso
// RepositoryDB
$userControllerExemploDB = new UserController(new UserRepositoryDB(new UserModel));

$userControllerExemploDB->createNewUser($userRequest);

// RepositoryMemory
$userControllerExemploMemory = new UserController(new UserRepositoryMemory);
$userControllerExemploMemory->createNewUser($userRequest);

```

Perceba que a implementação do repositório isola a camada de acesso a dados. A classe que utiliza nosso repositório não precisa ter conhecimentos específicos de como esses dados são armazenados e recuperados. O cliente precisa somente passar o repositório que deseja utilizar em conjunto com os dados. Além disso, a implementação de repositórios específicos aplica o princípio SOLID, interface segregation que diz: interfaces específicas são melhores que interfaces genéricas. O princípio interface segregation contribui para não criarmos classes quer sejam obrigadas a implementar métodos que não utilizam.
