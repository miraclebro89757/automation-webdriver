# Puppeteer 入门学习

## 1. 什么是 Puppeteer？

Puppeteer 是 Google 官方推出的一个 Node.js 库，可以用代码控制 Chrome 或 Chromium 浏览器，实现自动化测试、爬虫、截图、表单填写等操作。它常用于前端自动化测试和网页爬取。

## 2. 安装方法

确保你已经安装了 Node.js，然后在项目目录下运行：

```bash
npm install puppeteer
```

## 3. 简单示例

下面是一个简单的 Puppeteer 脚本，自动打开百度，搜索“Puppeteer”，并截图：

```javascript
const puppeteer = require('puppeteer');

(async () => {
  // 启动浏览器
  const browser = await puppeteer.launch({ headless: false }); // headless: false 会显示浏览器界面
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');

  // 输入搜索内容
  await page.type('input[name="wd"]', 'Puppeteer');
  await page.click('input[type="submit"]');

  // 等待搜索结果加载
  await page.waitForSelector('#content_left');

  // 截图
  await page.screenshot({ path: 'baidu_search.png' });

  await browser.close();
})();
```

## 4. 常用 API

- 打开网页：`await page.goto(url)`
- 输入内容：`await page.type(selector, text)`
- 点击按钮：`await page.click(selector)`
- 等待元素出现：`await page.waitForSelector(selector)`
- 截图：`await page.screenshot({ path: 'screenshot.png' })`
- 获取页面内容：`const html = await page.content()`

## 5. 进阶学习资源

- [Puppeteer 官方文档](https://pptr.dev/)
- [Puppeteer 中文文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/)

---

如需更多实战案例或自动化测试相关内容，可以随时补充！ 