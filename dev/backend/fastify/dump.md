# Fastify

Fastest Node.js framework available.

## Getting Started

1. Install: npm i fastify
2. Log:
   - It uses pino by default.
   - fastify.log.info() / fastify.log.error()
   - All Errors are automatically handled by Fastify.
3. Middlewares/Routers:
   - It has concepts of plugins/hooks and needs to register them to use.
   - fastify.register()
4. Database Integration
   - Supports MongoDB, MySQL and PostGreSQL by providing plugins for that.
   - For ORM: first create instance of Prisma, then register prisma as plugin wrapper in fastify application.

## ECOSYSTEM

1.  ContentTypeParser:
    - Supports application/json and text/plain with default charset of utf-8.
    - Unsupported content thorws 'FST_ERR_CTP_INVALID_MEDIA_TYPE' error.
    - To Support other Content Types:
    - use _addContentTypeParser_ API
      - this is encapsulated in scope it is declared.
    - For 'GET' and 'HEAD', requests are not parsed.
    - For 'OPTIONS' and 'DELETE', it is parsed only if valid content-type header is provided.
    - For piping file uploads, @fastify/multipart can be used.
    - Usage:
      - hasContentTypeParser, removeContentTypeParser, removeAllContentTypeParser
    - BodyParser: customParserOptions such as _parseAs_, _bodyLimit(number)_

2.  Decorator:
    - It is _synchronous_ API which is used to customize core Fastify Objects, such as server or request object during HTTP lifecycle.
    - To register async decoration, use `register` API with `fastify-plugin`.
    - Usage:
      - decorate(name, value, [dependencies]): modifies fastify `server` instance. dependencies is optional list of decorators that decorator being defined relies upon.
      - decorateReply(name, value, [dependencies]): modifies fastify `reply` instance.
      - decorateRequest(name, value, [dependencies]): modifies fastify `request` instance.
      - hasDecorator(name): check existence of server instance decoration
      - hasRequestDecorator(name): check existence of request instance decoration
      - hasReplyDecorator(name): check existence of reply instance decoration
      - getDecorator(name)
      - setDecorator(name, value)
3.  Encapsulation:
    - Encapsulation context that governs which decorators, registered hooks, and plugins are available to routes.
    - Sharing Between Contexts:
      Each context inherits only from its parent contexts. Parent contexts cannot access entities within their descendant contexts. If needed, encapsulation can be broken using fastify-plugin, making anything registered in a descendant context available to the parent context.
4.  Errors:
    - Fastify follows an all-or-nothing approach and aims to be lean and optimal. Dev is responsible for proper error handling.
5.  HTTP2:
    - Fastify supports HTTP2 over HTTPS (h2) or plaintext (h2c).
6.  Hooks:
    - Hooks are registered with `fastify.addHook` method and allow you to listen to specific events in application or request/response lifecycle. Hook must be registered before an event is triggered, otherwise event is lost. It allows to interact lifecyle of fastify.
    - Available Hooks:
      - Request/Reply Hooks:
        Request and Reply are core fastify objects. `done` is function to continue with lifecycle. Easily understand from LifeCycle section.
        Hooks are affected by Fastify encapsulation and thus can be applied to set of routes `Scopes`.

        i. onRequest
        ii. preParsing: transform request payload stream before it is parsed like decompressing the body.
        iii. preValidation: transfrom req payload before it is validated.
        iv. preHandler: specify function to be executed before routes handler like auth middleware.
        v. preSerialization: change the payload before it is serialized. Not Called if: string, buffer, stream or null.
        vi. onError: used for custom Error Logging or setting specific header in case of an error.
        vii. onSend: used to transform payload before sending response to client.
        viii. onResponse: exceuted once client response is sent. Used to send statistics to external service ie monitoring.
        ix. onTimeout: executed when a request is timed out and the HTTP socket has been hung up. no data sent to client.
        x. onRequestAbort: executed when a client closes the connection before the entire request has been processed

      - Application Hooks:
        i. onReady: Triggered before the server starts listening for requests. Cant change routes or add new hooks.
        ii. onListen: Triggered when the server starts listening for requests
        iii. onClose: Triggered when fastify.close() is invoked to stop the server, after all in-flight HTTP requests have been completed. It is useful when plugins need a "shutdown" event, for example, to close an open connection to a database.
        iv. preClose: Triggered when fastify.close() is invoked to stop the server, before all in-flight HTTP requests have been completed
        v. onRoute: Triggered when a new route is registered. Listeners are passed a routeOptions object as the sole parameter.
        vi. onRegister: Triggered when a new plugin is registered and a new encapsulation context is created. executed before the registered code.

    - Scope:
      - Except for onClose, all hooks are encapsulated. Means we can control where hoooks run by using register.
    - Route Level Hooks
      - Custom lifecycle hooks can can be defined that are unique to route. These hooks will be executed as last in their category.

7.  LifeCycle
    - Routing -> Instance Logger -> Parsing -> Validation -> User Handler -> Reply -> Outgoing Response
8.  Logging
    - Uses pino as logger, and logging is disabled by default. Can't be enabled at runtime.
    - Environment based logging is also available.
    - Usage:
      - Request Id Tracking: By default, fasify adds an ID to every request for easier tracking. `requestIdHeader` header is reused or new value is generated
      - Custom Logger: custom logger can be supplied by passing it as loggerInstance.
      - Log redaction: pino supports obscurity by removing any sensitive information.

9.  Middlewares
    - Middleware is not supported out of box and requires external plugin such as @fastify/express or @fastify/middle
10. Plugins
    - Used to extend fastify, which can be set of routes, a server decorator of functionality. Uses `register` API to add plugins.
    - By default, `register` creates new scope which meams changes to fastify instance will not affect current context ancestors only descendants.
    - fastify.register(plugin, [options])
    - Plugin Options:
      - supports predefined set of options that Fastify itself will use, except when plugin has been wrapped with fastify-plugin.
        Current specific options: logLevel, logSerializers, prefix
      - To avoid colllisions, plugin hsould consider namespacing its options
      - Route Prefixing
      - Error Handling
      - async/await
    - Create a plugin:
      - create function that takes three parameters: fastify instance, options object and done callback.
    - Handle the scope:
      - If register is used to extend server function with decorate, tell Fastify not to create new context. Else, changes will not be accessible in upper scope.
      - Ways: fastify-plugin or skip-override

11. Reply:
    Core Fastify object that exposes functions and properties::
    i. .code(statusCode)/.status(statusCode)
    ii. .elapsedTime: returns time passed since request was received by Fastify.
    iii. .server: reference to Fastify object.
    iv. .header(name, value): sets response header
    v. .headers(object): sets all key of object as response headers
    vi. .getHeader(name): retrieve value of already set header
    vii. .removeHeader(key): remove value of already set header
    viii. .hasHeader(name): determine if header has been set
    ix. .writeEarlyHints(hints, callback) - sends early hints to user while response is being prepared
    x. .trailer(key, function): sets response trailer
    xi. .type(value): Sets header `Content-Type`
    xii. .redirect(dest, [code,]) - redirects to specified url, optional status code (302-default)
    xiii. send(payload)
    xiv. .hijack() - Interrup normal request lifecycle
    xv. .raw - raw node core response
    xv. .request - incoming request
12. Request
    Core fastify object which contains fields:
    i. query - parsed querystring
    ii. body - request payload
    iii. params - params matching url
    iv. header - headers getter and setter
    v. raw - incoming HTTP request from Node Core
    vi. server - fastify server instance
    vii. id - request id
    viii. log - logger instance
    ix. ip - ip address of request.
    x. ips - array of ip addresses
    xi. host - host of incoming request
    xii. hostname - derived from host property
    xiii. port - port from host property
    xiv. protocol
    xv. method
    xvi. url/originalUrl - url of request

13. Routes:
    Route method configure endpoints of application.
14. Server
    - The fastify instance is the main entry point.
      Factory Function: Created via const fastify = require('fastify')({ options }).
      Listen: .listen({ port: 3000, host: '0.0.0.0' }) returns a Promise or uses a callback.
      Ready: .ready() is a crucial method that ensures all plugins have been loaded/initialized before the server starts.
      Closing: .close() shuts down the server gracefully, allowing active connections to finish (tied to onClose hooks).
15. Type-Providers:
    - This is a modern Fastify feature (v4+) that provides type-safety between your JSON Schemas and TypeScript.
    - Purpose: It allows you to write a schema once and have TypeScript automatically infer the types for request.body, request.query, etc.
    - Common Providers: \* TypeBox: The most popular, using JSON-schema compatible builders.
    - Zod: Used via a specific type provider for those who prefer Zod's syntax.
    - Benefit: Eliminates the need to manually write interfaces like interface MyRequestBody { ... }.

16. Validation-and-Serialization
    - Fastify uses a schema-based approach. Use JSON Schema to validate routes and serialize outputs. Validation is only attempted if the content type is application/json.
    - Shared Schema:
      addSchema API allows adding multiple schemas to Fastify Instance to reuse thorughout application. This API is encapsulated.
      Shared schemas can be reused with the JSON Schema $ref keyword.

17. Warnings
    Fastify uses Node.js's warning event API to notify users of deprecated features and coding mistakes. Fastify's warnings are recognizable by the FSTWRN and FSTDEP prefixes.

18. Testing:
    Mention fastify.inject(). It allows you to fake HTTP requests to your server without actually hitting the network layer—making unit tests incredibly fast.

19. Security:
    Mention @fastify/helmet and @fastify/rate-limit as the standard ecosystem picks for hardening.

### GOTCHAS

- Piping in Node js: You break whole file into multiple chunks and send them over requests.
- Workers in Node.js: Even though is single threaded (event loop), We can spawn new nodejs process for high computation tasks such as image resize etc.
- The "Double Call" Error: If you use reply.send() inside a hook or handler and then return a value (or call done()), Fastify will throw an error because you are trying to send the response twice.
- Async/Await vs Done: \* If your handler/hook is async, do not use the done callback.
  If it is a standard function, you must call done().
  Mixing them is a common cause of hanging requests.
- Plugin Registration Order: Since Fastify is built on a directed acyclic graph (DAG), the order in which you .register() plugins matters. If Plugin B depends on a decorator from Plugin A, Plugin A must be registered first.
- Encapsulation vs. Global: New users often forget that decorate stays inside the folder/plugin where it was called. If you want a database connection to be "global," you must wrap your database plugin with fastify-plugin.
- CORS: Unlike Express, Fastify doesn't have a built-in "all-access" default. You almost always need @fastify/cors immediately.
- Prisma Setup: [Prisma v7 Setup](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7#driver-adapters-and-client-instantiation)
