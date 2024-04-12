# Документация проекта

## Содержание
1. [Как запустить проект](#как-запустить-проект)
2. [Стек проекта](#стек-проекта)
3. [Моковые данные](#моковые-данные)
4. [Что было реализовано](#что-было-реализовано)
5. [Проблемы](#проблемы)
6. [Выводы](#выводы)

# Как запустить проект
### Клонирование проекта:

```bash
git clone https://github.com/JustDoinGL/avito-test.git
```

### Переход в директорию проекта:

```bash
cd avito-test
```

### Создание локального файла .env:

Создайте и добавьте следующее содержимое в файл .env:

```bash
echo REACT_APP_TOKEN=your_api_token > .env
```

Обязательно замените `your_api_token` на фактическое значение вашего API токена перед выполнением команды.

Или создайте файл .env вручную.

# Стек проекта

| Библиотека   | Описание                            |
| :----------- | :---------------------------------- |
| React        | UI Библиотека                       |
| Ant          | Библиотека интерфейсных компонентов |
| Scss         | CSS                                 |
| ReduxToolkit | Стейт менеджер                      |
| Axios        | Библиотека для HTTP-запросов        |

# Моковые данные
### Моковые данные для авторизации

В этом разделе приведены моковые данные для процесса авторизации в демонстрационном проекте. Но вы также можете зарегистрироваться.


# Данные для входа
- **Email**: admin@mail.ru
- **Пароль**: admin1234

## Что было реализовано
Были успешно выполнены все задачи, за исключением:
1. Написания Docker-файла.
2. Сброса запросов при переходе на другую страницy.

Кроме того, была реализована авторизация через API https://reqres.in. При успешной аутентификации получаем токен, который сохраняется в локальном хранилище. Хоть это не самый безопасный подход, он используется здесь как демонстрация приватных маршрутов и логики аутентификации.

## Функциональность приложения

### Авторизация и приватные роутеры
- Пользователи могут авторизоваться, а также пользоваться приватными маршрутами для защиты конфиденциальной информации.

### Поиск актеров по ID фильма
- Поиск актеров осуществляется по идентификатору фильма, что поможет вам быстро найти необходимую информацию.

### Похожие фильмы по массиву generic
- Поиск похожих фильмов осуществляется на основе массива категорий фильма, что поможет вам найти новые интересные фильмы.

### Пагинация
- Используется как динамическая, так и статическая пагинация для удобного просмотра контента без лишних усилий.

### Динамические карусели
- Реализованы динамические карусели с подгрузкой дополнительного контента при прокрутке, чтобы обеспечить непрерывный поток информации.

### Переключение тем
- Вы можете настроить тему интерфейса по вашему вкусу для комфортного использования приложения.
  
### Реализован скелитон
- Сделан минимальный скелетон, для user friendly interface.

# Проблемы

1. Трудность в создании приятного интерфейса без дизайна.
2. Постоянные проблемы с доступностью сервера во время прайм-тайма, что приводило к использованию моковых данных с помощью ИИ.
3. Отсутствие возможности одновременной сортировки и поиска по названию в приложении. Попытки решить проблему с помощью джинерика не увенчались успехом.


## Выводы

Разработка проекта без четкого представления о конечном результате привело к нежелательным последствиям, таким как возникновение множества багов и нарушение принципов разработки, таких как "Don't repeat yourself". Много логики можно вынести и переиспользовать, однако из-за ограниченного времени нет возможности провести необходимые доработки и протестировать код.

Необходимо соблюдать принцип едичной ответственности, чтобы избежать перегрузки структуры и гарантировать единообразие использования ответственности. А у меня в сторе это не так.

И главный выод, что динамическая пагинация с парметрами не лучший способ реализации.