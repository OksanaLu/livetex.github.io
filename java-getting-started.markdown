# LiveTex SDK. Стартовая документация. Android.

## Глоссарий

__LiveTex SDK__ - Software Developer Kit. Набор инструментов для интеграции с системой LiveTex.

__Мобильный клиент__ или __клиент__ - конечный пользователь SDK, пользователь приложения с интегрированным SDK.

__Приложение__ - программа для предоставления возможности коммуникации с клиентом.

__Ключ SDK__ - уникальный идентификатор разработчика приложения.

__Клиентское приложение__ - программа осуществляющая интеграцию с SDK.

__Токен посетителя__ - уникальный идентификатор посетителя.

## Что мы предлагаем?

- [Сущностную модель и API](http://splusminusx.github.io/java/index.html). 
- Огромную возможность кастомизации UI.
- Демонстрационное приложение с примером использования SDK.


## Архитектура приложения использующего LiveTex SDK

![Модель](http://goo.gl/ICS0LE)

<!--
@startuml

component App {

  interface IInitHandler
  interface INotificationHandler
  interface ILivetex

  component LiveTexSDK
  component CustomInitHandler
  component CustomNotificationHandler
  
  LiveTexSDK .left.> IInitHandler: use
  LiveTexSDK ..> INotificationHandler: use
  LiveTexSDK -right- ILivetex: provide
  
  CustomInitHandler -right- IInitHandler: provide
  CustomNotificationHandler -right- INotificationHandler: provide 
  
}

@enduml
-->

### Описание интерфейсов

```java

public interface IInitHandler {
  
    /**
     * Обработка результат успешной инициализации SDK.
     *
     * @param token - идентификатор посетителя.
     */
    void onSuccess(String token);
    
    /**
     * Обработчик ошибки инициализации.
     */
    void onError(String error);
}

```

`IInitHandler` - обработчик события инициализации SDK, после вызова метода 
`onSuccess` данного обработчика можно начинать взаимодействие с экземпляром 
`Livetex`. Обработчик успешной инициализации принимает аргументом уникальный 
токен посетителя `token`. Токен может быть использован при повторной 
инициализации SDK. Необходим для восстановления истории переписки посетителя.


```java

public interface INotificationHandler {
    /**
     * Оповещение посетителя о блокировке.
     *
     *
     * @param message сообщение блокировки.
     *
     */
    void ban(String message);

    /**
     * Оповещение об изменении состояния сервиса диалога.
     *
     *
     * @param state  новое состояние интерфейса сервиса диалога.
     *
     */
    void updateDialogState(DialogState state);

    /**
     * Оповещение о переданном файле.
     *
     *
     * @param message сообщение передачи файла.
     *
     */
    void receiveFileMessage(FileMessage message);

    /**
     * Оповещение о переданном текстовом сообщении.
     *
     *
     * @param message  текстовое сообщение.
     *
     */
    void receiveTextMessage(TextMessage message);

    /**
     * Оповещение о новом удерживающем сообщении.
     *
     *
     * @param message удерживающее сообщение.
     *
     */
    void receiveHoldMessage(HoldMessage message);

    /**
     * Оповещение о наборе текста.
     *
     *
     * @param message сообщение оповещения о наборе текста.
     *
     */
    void receiveTypingMessage(TypingMessage message);

    /**
     * Обработчик ошибок.
     */
    void onError(String message);
}

```   

`INotificationHandler` - обработчик оповещений от сервера. 


```java

public interface ILivetex {

    /**
     * Инициализация SDK
     *
     * @param handler - обработчик результата инициализации.
     *
     * @param notificationHandler - обработчик оповещений.
     */
    void init(final IInitHandler handler, final INotificationHandler notificationHandler);
    
    /**
     * Разрушение SDK.
     */
    void destroy();

    /**
     * Запрос собеседника для диалога.
     *
     * @param handler - обработчик
     */
    void request(AHandler<DialogState> handler);

    /**
     * Запрос собеседника для диалога.
     *
     * @param attributes - данные сопутствующие диалогу.
     * @param handler    - обработчик
     */
    void request(DialogAttributes attributes, AHandler<DialogState> handler)

    /**
     * Запрос диалога с конкретным оператором.
     *
     * @param operator - оператор, к которым необходимо начать диалог.
     * @param handler  - обработчик
     */
    void request(Employee operator, AHandler<DialogState> handler)

    /**
     * Запрос диалога с конкретным оператором.
     *
     * @param operator   - оператор, к которым необходимо начать диалог.
     * @param attributes - данные сопутствующие диалогу.
     * @param handler    - обработчик
     */
    void request(Employee operator, DialogAttributes attributes, AHandler<DialogState> handler)

    /**
     * Запрос диалога с операторами указанного департамента.
     *
     * @param department - департамент, с оператором которого необходимо начать диалог.
     * @param handler    - обработчик
     */
    void request(Department department, AHandler<DialogState> handler);

    /**
     * Запрос диалога с операторами указанного департамента.
     *
     * @param department - департамент, с оператором которого необходимо начать диалог.
     * @param attributes - данные сопутствующие диалогу.
     * @param handler    - обработчик
     */
    void request(Department department, DialogAttributes attributes, AHandler<DialogState> handler);
    
    /**
     * Прекращение диалога с собеседником.
     *
     * @param handler - обработчик
     */
    void close(AHandler<DialogState> handler);

    /**
     * Оценка диалога с собеседником.
     *
     * @param vote    - оценка собеседника.
     * @param handler - обработчик
     */
    void vote(Vote vote, AHandler handler);

    /**
     * Оповещение о наборе текста.
     *
     * @param message - набранное сообщение.
     * @param handler - обработчик
     */
    void typing(TypingMessage message, AHandler handler);

    /**
     * Отправка текстового сообщения.
     *
     * @param text    - текст сообщения.
     * @param handler - обработчик
     */
    void sendTextMessage(String text, AHandler<TextMessage> handler);

    /**
     * Подтверждение получения сообщения. Необходимо вызывать
     * при получение сообщения от собеседника.
     *
     * @param message - текст сообщения.
     * @param handler - обработчик
     */
    void confirmTextMessage(livetex.message.TextMessage message, AHandler handler);

    /**
     * Получение истории сообщений диалога.
     *
     * @param limit   - количество запрашиваемых сообщений из истории.
     * @param offset  - количество пропускаемых сообщений истории.
     * @param handler - обработчик
     */
    void messageHistory(short limit, short offset, AHandler<List<TextMessage>> handler);

    /**
     * Установка имени посетителя.
     *
     * @param name    - имя посетителя.
     * @param handler - обработчик
     */
    void setName(String name, AHandler handler);

    /**
     * Получение списка операторов с указанным статусом.
     *
     * @param status  - интересующий статус.
     * @param handler - обработчик
     */
    void getOperators(String status, AHandler<ArrayList<Employee>> handler);

    /**
     * Получение списка департаментов, в котором присутствуют операторы
     * с указанным статусом.
     *
     * @param status  - интересующий статус.
     * @param handler - обработчик
     */
    void getDepartments(String status, AHandler<ArrayList<Department>> handler);

    /**
     * Получение списка операторов привязанных к указанному департаменту.
     *
     * @param department - департамент, операторы которого будут получены.
     * @param handler    - обработчик
     */
    void getDepartmentOperators(Department department, AHandler<ArrayList<Employee>> handler);
}

```


## С чего начать?

1. Создать аккаунт в LiveTex.
2. Создать операторов, группы и сайты в Личном Кабинете.
3. Получить бинарный пакет SDK и добавить его в свой проект.
4. Получить ключ разработчика и доступ к `sendbox` окружения для отладки.

После выполнения вышеуказанных шагов у вас будет:
- Адрес сервиса аутентификации на `sendbox` окружении. (Пример: http://authentication-sendbox.livetex.ru:9000).
- Ключ SDK. (Пример: `NEVER_SHOW_THIS_KEY_TO_STRANGERS`).
- Идентификатор приложения, он же идентификатор сайта полученный в Личном Кабинете (Пример: 10001350).

## Первые шаги. Инициализация SDK.

Инициализация SDK в основном потоке приложения.

```java

public void run() {

  import ru.livetex.sdk.handler.IInitHandler;
  import ru.livetex.sdk.handler.INotificationHandler;
  import ru.livetex.sdk.*
  import ru.livetex.sdk.*
  import ru.livetex.capabilities.*
  import ru.livetex.token.*

  // клиентские пакеты
  import custom.package.CustomInitHandler // реализует интерфейс IInitHandler
  import custom.package.CustomNotificationHandler // реализует интерфейс INotificationHandler

  // URL сервиса аутентификации.
  string url = "http://authentication-sendbox.livetex.ru:9000";

  // Ключ SDK для авторизации кодовой базы клиент.
  string key = "NEVER_SHOW_THIS_KEY_TO_STRANGERS";

  // Идентификатор приложения клиента, в текущий 
  // момент - это идентификатор сайта, который можно 
  // получить из личного кабинета.
  string application = "10001350";

  // Список возможностей реализованных в клиентском приложении.
  List<Capabilities> capabilities = new ArrayList<Capabilities>();

  // Получение токена аутентификации из персистентного хранилища клиента SDK.
  // Реализуется на усмотрение разработчика.
  String token = getTokenFromCustomClientStorage();

  // Пользовательское приложение умеет вести диалог.
  capabilities.add(Capabilities.CHAT);

  // Пользовательское приложение умеет принимать файлы.
  capabilities.add(Capabilities.FILES_RECEIVE);

  Builder builder = new Builder(url, key, application);
  builder.addCapabilities(capabilities);
  builder.addToken(token);

  Livetex livetex = new builder.build();

  CustomInitHandler initHandler = new CustomInitHandler();
  CustomNotificationHandler notificationHandler = new CustomNotificationHandler();

  livetex.init(initHandler, notificationHandler);

}
```

## Сценарии использования

### Начало диалога с оператором

![Модель](http://goo.gl/Nwr9Pv)

<!--

@startuml

!include "request-dialog-with-operator.puml"
  
@enduml

-->

1. Посетитель открывает приложение с интегрированным SDK.
2. Посетитель открывает окно выбора оператора для диалога.
3. Посетитель выбирает оператора для диалога.
4. Система назначает посетителю оператора для диалога.
