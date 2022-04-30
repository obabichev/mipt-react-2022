## Задание 1. React компоненты

Все задания будут частями одного общего проекта. В данном заходе курса я прделагаю 
в качестве бекенда максимально упрощенный вариант Amazon shop. Глобально приложение 
будет содержать функционал поиска и отображения продуктов из магазина.


В данном задании предлагается сделать статическую верстку двух страниц на react. 
Первая страница будет содержать список товаров, вторая страница будет отображать детальную информацию
по конкретному товару.

### Модель данных

```typescript
interface Product { // Product describes an item of the shop
    usin:        string; // ID of the product, unique for each product
    title:       string; 
    description: string;
    attributes:  Map<string, string>; // map of non structured attributes of the product 
    images:      string[]; // list of urls to the images related to the product
    ratings:     Rating[];
    sellOptions: SellOption[]; 
    tag:         string; // key of the related tag for this product
}

interface Rating { 
    rate:   number; // value from 1 to 5 that user can vote for the product
    amount: number; // amount of users which voted for the product with rate `rate`
}

interface SellOption {
    price:    number; // Integer number that shows the price in cents 
    currency: string; // 3 letter identificator of the currency (EUR, USD, ...)
    type:     string; // Free text parameter that describes the option
}


/**
 * Tags form a tree. Each tag may have a parent tag. 
 * Each product can have the key of certain tag what allows to show breadscrumb for the product in the tags tree. 
 */
interface Tag { 
    key:    string; // unique identificator of the tag
    parent: null; // key of the parent tag
    title:  string; // text representation of the tag
}
```

### Референсы

В качестве референсов можно использовать страницы оригинального Amazon shop. 
Например [страница поиска товаров](https://www.amazon.de/s?k=Designing+Data-Intensive+Applications&crid=J1V5O4EAUGW8&sprefix=designing+data-intensive+applications%2Caps%2C235&ref=nb_sb_noss) 
или [страница детальной информации](https://www.amazon.de/-/en/dp/B08VL9YXML/ref=sr_1_3?crid=J1V5O4EAUGW8&keywords=designen+datenintensiver+anwendungen&qid=1645110735&sprefix=designing+data-intensive+applications%2Caps%2C235&sr=8-3)

Также по первой ссылке можно увидеть дерево тегов (также каждой из тегов может быть свернут/развернут при наличии дочерних тегов).


### Функциональные требования и разбалловка

1) **(1 балл)** Компонент (/страница) для отрисовки списка продуктов. Пример данных находится в файле `src/mock/products-sample.json`
2) **(1 балл)** Компонент (/страница) для отрисовки детальной информации по продукту. Пример данных находится в файле `src/mock/products-sample.json`
3) **(1 балл)** Компонент, использующий BrowserRouter (из `react-router-dom`) для отрисовки списка продуктов и деталки продукта в зависимости от значения адресной строки 

Дополнительное задание для саморазвлечения (/альтернатива основным пунктам)
1) **(1 балл)** Отрисовка дерева тегов и отрисовка "хлебных крошек" для конкретного продукта. Пример тегов находится в файле `src/mock/tags-sample.json`. Отрисовка такой структуры потребует или рекурсивной отрисовки компонентов, или расчета отступов от вложенности тега.

#### Нефункциональные требования

- можно писать на любом ЯП
- можно использовать любые дополнительные библиотеки

### Шаги выполнения

1) Сделать форк репозитория для заданий на GitHub https://github.com/obabichev/mipt-react-2022
2) В своем форке реализовать функционал описанный выше
3) Сделать Pull request в свою ветку в исходном репозитории (названия веток можно посмотреть в гугл таблице [Link](https://docs.google.com/spreadsheets/d/182vz2iqxhBtJs-Mwo6tDmXU5ZAmhkA7MNDq0jXMuQHg/edit?usp=sharing))
4) После проверки задания комментарии будут оставлены в pull request'е, а баллы проставлены в гугл таблице
5) Если реализован не весь функционал или есть желание что-то исправить после комментариев - вернуться к шагу 2

### Дидлайн

Задание становится доступным 17.02.2022, на выполнение отводится 1 месяц, т.е. **17.03.2022** - последний день, когда 
за сдачу можно получить максимальный балл. Сдача после дидлайна также приветствуется, но оценивается в половину баллов.