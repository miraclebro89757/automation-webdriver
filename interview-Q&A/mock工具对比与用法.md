# 常用 Mock 工具对比与用法

---

## 1. nock（Node.js HTTP Mock）

**用途**：拦截 Node.js 里的 HTTP 请求，常用于接口测试、前后端分离开发。

**典型用法：**
```js
const nock = require('nock');
// 拦截 http://api.example.com/user/123 的 GET 请求
nock('http://api.example.com')
  .get('/user/123')
  .reply(200, { id: 123, name: 'Tom' });
// 你的代码发起请求时会直接拿到上面 mock 的数据
```
**特点**：只适用于 Node.js，适合单元测试、集成测试。

---

## 2. mockserver（独立Mock服务，支持多语言）

**用途**：启动一个本地或远程的 Mock HTTP(S) 服务器，支持 REST、SOAP、TCP 等协议。

**典型用法：**
- 启动 mockserver（命令行/Java API/Docker）：
  ```bash
  docker run -d --name mockserver -p 1080:1080 mockserver/mockserver
  ```
- 配置 mock（以 JavaScript 客户端为例）：
  ```js
  const mockserver = require('mockserver-client').mockServerClient;
  mockserver("localhost", 1080)
    .mockAnyResponse({
      "httpRequest": { "method": "GET", "path": "/user/123" },
      "httpResponse": { "statusCode": 200, "body": JSON.stringify({ id: 123, name: "Tom" }) }
    });
  ```
**特点**：支持多语言，适合集成测试、系统测试、团队协作。

---

## 3. wiremock（Java生态，强大Mock服务器）

**用途**：本地或远程启动 HTTP(S) Mock 服务，支持丰富的请求匹配、延迟、场景切换等。

**典型用法：**
- 启动 wiremock（命令行/Java/Docker）：
  ```bash
  docker run -d -p 8080:8080 wiremock/wiremock
  ```
- 配置 mock（REST API 或 Java 代码）：
  ```bash
  curl -X POST http://localhost:8080/__admin/mappings \
    -H "Content-Type: application/json" \
    -d '{
      "request": { "method": "GET", "url": "/user/123" },
      "response": { "status": 200, "body": "{\"id\":123,\"name\":\"Tom\"}" }
    }'
  ```
**特点**：功能强大，适合后端、微服务、集成测试。

---

## 4. sinon（JavaScript 测试中的 stub/mock/spies）

**用途**：对函数、对象方法进行 stub、mock、spy，常用于单元测试。

**典型用法：**
```js
const sinon = require('sinon');
const paymentService = { pay: (order) => {/*真实实现*/} };
// stub：替换 pay 方法
const stub = sinon.stub(paymentService, 'pay').returns({ status: 'success' });
// mock：可以设置期望调用
const mock = sinon.mock(paymentService);
mock.expects('pay').once().withArgs({ id: 1 }).returns({ status: 'success' });
// spy：监控函数调用
const spy = sinon.spy(paymentService, 'pay');
```
**特点**：适合单元测试，mock/stub/spy 皆可。

---

## 5. jest mock（Jest 测试框架的 mock 功能）

**用途**：对模块、函数、类进行自动或手动 mock，适合前端/Node.js 单元测试。

**典型用法：**
```js
// 自动 mock
jest.mock('./paymentService');
const paymentService = require('./paymentService');
paymentService.pay.mockReturnValue({ status: 'success' });
// 手动 mock
const payMock = jest.fn().mockReturnValue({ status: 'success' });
paymentService.pay = payMock;
// mock fetch
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ id: 1 }) }));
```
**特点**：与 Jest 框架深度集成，mock 能力强大，适合前端和 Node.js 项目。

---

## 总结对比

| 工具         | 适用场景           | 语言/平台      | 主要能力                  |
|--------------|--------------------|---------------|---------------------------|
| nock         | Node.js接口测试    | Node.js       | 拦截HTTP请求              |
| mockserver   | 系统/集成测试      | 多语言        | 独立Mock服务，协议丰富    |
| wiremock     | 系统/集成测试      | Java/REST     | 独立Mock服务，功能强大    |
| sinon        | 单元测试           | JavaScript    | 函数/对象mock、stub、spy  |
| jest mock    | 单元/集成测试      | JavaScript    | 模块/函数mock，集成Jest   | 