## Задание 2. Обработка событий и использование хуков

Данное задание базируется на предыдущем. Модель данных остается той же.

На этот раз будет необходимо привнести на статическую страницу немного взаимодействия с пользователем. 
А именно поиск по продуктам и создание (/редактирование) новых продуктов.

### Функционал поиска

Для поиска продуктов на странице списка продуктов необходимо добавить компонент с текстовым полем ввода. 
При вводе в это поле, значение должно сохраняться внутри состояния приложения (или как часть url). 
При наличии непустого введенного значения на экране должны отображаться только те продукты, которые содержат внутри себя
(к примеру в полях `title` и `description`) данное значение.

[Amazon](https://www.amazon.de/s?k=designing+data-intensive+applications&sprefix=designing+da%2Caps%2C96&ref=nb_sb_ss_ts-doa-p_1_12)
все также является отличным источником вдохновения.


### Функционал создания продуктов

Для создания новых продуктов необходимо создать форму (на любой из страниц, или в виде новый страницы), 
с помощью которой пользователь сможет заполнить все необходимые поля.

Объект, который должен быть собран после окончания ввода пользователя должен быть одинаковой с продуктами структурой,
за исключением полей `usin`, `ratings`, которые вводить не нужно. Объект должен выглядеть примерно следующим образом:

```json
{
      "title": "Title",
      "description": "Description",
      "images": ["<url 1>", "<url 2>"],
      "attributes": {
        "isbn-10": "1234567890",
        "isbn-13": "123-1234567890",
        "publisher": "Publisher",
        "language": "English",
        "paperback": "1000 pages",
        "dimensions": "10 x 10 x 10 cm",
        "author": "John Smith"
      },
      "ratings": [],
      "sellOptions": [
        {
          "price": 0,
          "currency": "EUR",
          "type": "Audiobook"
        },
        {
          "price": 1000,
          "currency": "EUR",
          "type": "Paperback"
        }
      ],
      "tag": "<key>"
    }
```

После чего для этого объекта должен быть сгенерирован `usin` 
(можно использовать `Date.now()`, чтобы гарантировать его уникальность), и он должен быть добавлен к существующим 
продуктам.

Таким образом, чтобы приложени корректно отобразило изменения, все продукты также должны лежать внутри состояния
приложения. И скорее всего выше роутера в иерархии компонентов, если для отрисовки списка продуктов и деталки используются
разные страницы.

По большому счету все параметры могут быть заполнены с помощью обычных текстовых полей. `tag` может быть заполнен
с помощью списка (или посредством честной отрисовки дерева тегов). Самое пакостное - `sellOptions`, так как 
их может быть несколько; есть разные варианты, как можно реализовать такое поле ввода. Один вариант - добавить 
кнопку `Add`, по нажатию на которую будет добавляться пустой способ покупки, а далее для каждого способа 
покупки отрисовывать группу полей ввода. Еще один вариант - отрисовывать одну группу полей ввода для всех параметров
и кнопку `Add`, а при нажатии на `Add` добавлять `sellOption` и опустошать поля ввода для последующих добавлений способов покупки.

#### Formik

Одна из самых популярных библиотек для работы с формами [Formik](https://formik.org/). На эту же библиотеку ссылкается 
документация React в разделе работы с формами [Forms](https://reactjs.org/docs/forms.html). Для упрощения работы с 
формой создания продукта можно использовать эту (или любую другую, или никакую дополнительную) библиотеку.

### Функциональные требования и разбалловка

1) **(1 балл)** Компонент поиска, при вводе текста в который, на экране остаются только продукты с этим текстом
2) **(1 балл)** Форма создания нового продукта, которая собирает из введенных данных объект продукта заданной структуры.
3) **(1 балл)** Сохранение новых продуктов в списке продуктов (и их отображение на странице приложения)
4) **(1 балл)** Форма редактирования продукта. Та же самая форма, но принимающая существующий продукт для заполнения дефолтных значений. Соответственно при сохранении результата соответствущий продукт должен быть обновлен (вместо создания нового)

Дополнительные задания:

1) **(1 балл)** так как мы еще не работаем с сетью все продуткы будут теряться при перезагрузке приложения. Для того, чтобы этого избежать, можно сохранять все продукты внутри local storage, а при открытии приложения восстанавливаться данные оттуда.

### Дидлайн

Задание становится доступным 3.03.2022, на выполнение отводится 1 месяц, т.е. **3.04.2022** - последний день, когда
за сдачу можно получить максимальный балл. Сдача после дидлайна также приветствуется, но оценивается в половину баллов.