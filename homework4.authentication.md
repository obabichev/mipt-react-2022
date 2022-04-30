## Задание 4. Authentication

В данном задании необходимо реализовать регистрацию и аутентификацию пользователя.

На беке используется [Ory kratos](https://www.ory.sh/docs/welcome) для управления пользователями.

### Функциональные требования и разбалловка

1) **(1 балл)** Создать форму регистрации при сабмите который будет создаваться новая учетная запись
2) **(1 балл)** Отображать ошибки регистрации, если пользователь после сабмита был отправлен обратно на страницу регистрации
3) **(1 балл)** Создать форму авторизации при сабмите который будет создавать новая сессия пользователя  
4) **(1 балл)** Отображать ошибки регистрации, если пользователь после сабмита был отправлен обратно на страницу авторизации

Дополнительные задания:

1) **(1 балл)** Реализовать удаление сессии пользователя через создание соответствующего flow

### Сроки

Задание вступает в силу с 1 Мая, как следствие основной дидлайн его выполнения - **1 июня**

### Коммуникация с сервером

Для того, чтобы использовать сервер авторизации, необходимо установить проксирование запросов на основной сервера (
аналогично предыдущему заданию), что можно сделать через параметр `proxy` в `package.json`:

```json
{
  "proxy": "https://ultimate-ecommerce.v-query.com"
}
```

Помимо этого, браузер в хедере `host` отправляет значение домена, на котором открыт сайт. В случае локальной разработки
это может быть `localhost` или `127.0.0.1`. Сервер авторизации ожидает, что все запросы будут происходить с
домена `127.0.0.1`, поэтому сайт необходимо открывать на нем:

```
http://127.0.0.1:3000
```

### Особенности Ory kratos

Для каждого процесса логина или регистрации kratos создает так называемый `flow`. Далее, пока пользователь находится на
странице логина/регистрации все его действия ассоцируются с этим flow. Это связано с тем, что в процессе
логина/регистрации может происходить множество редиректов, а передающийся через эти редиректы flow id позволяет получать
информацию связанную с этим процессом.

В нашем случае, это будет использоваться в случае, когда пользователь неправильно заполнин форму логина/регистрации, он
будет перенаправлен назад на страницу логина/регистрации, но уже с указанием flow id в path. По этому flow id можно
будет получить ошибки, из за которых форма не была принята.

Помимо этого, kratos позволяет настраивать разные формы для разных групп пользователь, поэтому набор полей в общем
случае generic. В нашем случае, это означает, что нельзя (или можно но аккуратно-осознанно) отрисовать статичную форму.
Для того, чтобы отрисовать форму, нужно сначала сделать запрос на сервер для получения описания формы, а затем из него
уже отрисовывать html элементы.

### Регистрация пользователя

Страница регистрации должна находиться по пути `/registration` в `react-router-dom`. В случае неправильного заполнения
формы kratos будет перенаправляь пользователя на `http://127.0.0.1:3000/registration`

При открытии страницы регистрации прилоежние должно сделать GET запрос на `/self-service/registration/browser` (в
хедерах должно быть `accept: application/json`, чтобы бек понял, что это ajax запрос и вернул json, иначе вернет
редирект)

В ответ на этот запрос kratos вернет описание формы, которую нужно показать пользователю. Выглядет оно следующим
образом:

```json
{
  "id": "<id>",
  "type": "browser",
  "expires_at": "<expires_at>",
  "issued_at": "<issued_at>",
  "request_url": "http://ultimate-ecommerce.v-query.com/self-service/registration/browser",
  "ui": {
    "action": "http://127.0.0.1:3000/self-service/registration?flow=<id>",
    "method": "POST",
    "nodes": [
      {
        "type": "input",
        "group": "default",
        "attributes": {
          "name": "csrf_token",
          "type": "hidden",
          "value": "<token>",
          "required": true,
          "disabled": false,
          "node_type": "input"
        },
        "messages": [],
        "meta": {}
      },
      {
        "type": "input",
        "group": "password",
        "attributes": {
          "name": "traits.email",
          "type": "email",
          "required": true,
          "disabled": false,
          "node_type": "input"
        },
        "messages": [],
        "meta": {
          "label": {
            "id": 1070002,
            "text": "E-Mail",
            "type": "info"
          }
        }
      },
      {
        "type": "input",
        "group": "password",
        "attributes": {
          "name": "password",
          "type": "password",
          "required": true,
          "disabled": false,
          "node_type": "input"
        },
        "messages": [],
        "meta": {
          "label": {
            "id": 1070001,
            "text": "Password",
            "type": "info"
          }
        }
      },
      {
        "type": "input",
        "group": "password",
        "attributes": {
          "name": "traits.name.first",
          "type": "text",
          "disabled": false,
          "node_type": "input"
        },
        "messages": [],
        "meta": {
          "label": {
            "id": 1070002,
            "text": "First Name",
            "type": "info"
          }
        }
      },
      {
        "type": "input",
        "group": "password",
        "attributes": {
          "name": "traits.name.last",
          "type": "text",
          "disabled": false,
          "node_type": "input"
        },
        "messages": [],
        "meta": {
          "label": {
            "id": 1070002,
            "text": "Last Name",
            "type": "info"
          }
        }
      },
      {
        "type": "input",
        "group": "password",
        "attributes": {
          "name": "method",
          "type": "submit",
          "value": "password",
          "disabled": false,
          "node_type": "input"
        },
        "messages": [],
        "meta": {
          "label": {
            "id": 1040001,
            "text": "Sign up",
            "type": "info",
            "context": {}
          }
        }
      }
    ]
  }
}
```

Из этого описания должен быть отрисован html:

```html

<form action="{.ui.action}" method="{.ui.method}">
    <input
            name="{.ui.nodes.[].attributes.name}"
            type="{.ui.nodes.[].attributes.type}"
            value="{.ui.nodes.[].attributes.value}"
    <!--            Остальные параметры как required, disabled могут быть также переданы, но не должны быть критичны для отправки формы, если я не ошибаюсь-->
    <!--            Также можно использовать стилизацию и библиотечные инпуты, главное, чтобы при сабмите формы был отправлен правильный запрос -->
    <!--            Значение из .ui.nodes.[].meta можно использовать для отрисовки лейблов-->
    >
</form>
```

Когда пользователь заполнит и засабмитит эту форму, должен уйти запрос по url указанному в `action` со следующим
содержимым (тип содержимого `application/x-www-form-urlencoded`:

```
csrf_token=t%2Fbcuhf2CcgKJNQcBIKXjX05FAKYy9tEVn1FYsD8qzJYEZOvlk1vFvLegvwUDUNrQOzTAXZxIfWaLo%2F%2FoGYLXQ%3D%3D
&traits.email=test%40test
&password=test
&traits.name.first=test
&traits.name.last=test
&method=password
```

Если форма была заполнеа корректно, то пользователь будет отправлен на главную страницу приложения `http://127.0.0.1`.

### Регистрация пользователя (отображение ошибок)

Если же форма была заполнена неккоретно (например email уже использовался, или пароль слишком простой), то пользователь
будет отправлен назад на страницу регистрации, но уже с id того flow, с которым сабмитилась форма. После этого форму
регистрации можно запросить через новый url с указанием id этого flow. В этом случае описание формы будет возвращено
вместе с ошибками, допущенными при заполнении формы.

Например после неправильного заполнения формы бек отредиректил нас на
страницу: `http://127.0.0.1:3000/registration?flow=<id1>`,

тогда мы можем сделать GET запрос (`accept: application/json`) на `/self-service/registration/flows?id=<id1>`

и получить ту же форму, но с дополнительной информацией:

```json
{
  "id": "<id1>",
  ...
  "ui": {
    ...
    "nodes": [
      {
        "type": "input",
        "group": "password",
        "attributes": {
          ...
        },
        "messages": [
          {
            "id": 4000005,
            "text": "The password can not be used because password length must be at least 6 characters but only got 3.",
            "type": "error",
            "context": {
              "reason": "password length must be at least 6 characters but only got 3"
            }
          }
        ],
        "meta": {
          ...
        }
      }
    ]
  }
}
```

Эти сообщения можно использовать для отображения причин возврата на страницу регистрации.

### Авторизация пользователя

Для авторизации пользователя все происходит аналогично, но получение исходной формы происходит по
пути `/self-service/login/browser`, а формы по id flow по пути `/self-service/login/flows?id=<id>`

### Logout пользователя

Для создания logout flow используется путь `/self-service/logout/browser`. Запрос по этому пути вернет объект вида:

```json
{
  "logout_url": "http://127.0.0.1:3000/self-service/logout?token=MbznNHNGMIORogXxepLQB0uUnmxOBaMI",
  "logout_token": "MbznNHNGMIORogXxepLQB0uUnmxOBaMI"
}
```

`logout_url` из этого объекта можно использовать в обычном элементе `<a>`, при нажатии на который сессия пользователя
будет удалена.