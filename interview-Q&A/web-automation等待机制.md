# Web Automation 的等待机制

在 Web 自动化（如 Puppeteer、Selenium、Playwright 等）中，“等待”机制是保证脚本稳定、可靠的核心手段。等待的实现方式主要有以下几种：

---

## 1. 显式等待（Explicit Wait）

**原理**：等待某个特定条件成立（如元素出现、可见、可点击、文本加载等）再继续执行后续操作。

**Puppeteer 示例**：
```js
// 等待某个元素出现在页面上
await page.waitForSelector('.my-element', { timeout: 5000 });
// 等待某个文本出现在页面上
await page.waitForFunction(
  text => document.body.innerText.includes(text),
  {},
  '加载完成'
);
```

**Selenium 示例**（Python）：
```python
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, ".my-element"))
)
```

---

## 2. 隐式等待（Implicit Wait）

**原理**：设置全局查找元素的超时时间，查找不到时自动轮询直到超时。
**注意**：Puppeteer/Playwright 没有隐式等待，Selenium 支持但不推荐依赖。

**Selenium 示例**：
```python
driver.implicitly_wait(10)  # 全局等待10秒
```

---

## 3. 固定等待（Sleep/Timeout）

**原理**：无条件等待指定时间，简单但不推荐作为主要手段。

**Puppeteer 示例**：
```js
await page.waitForTimeout(2000); // 等待2秒
```

---

## 4. 网络/页面状态等待

**原理**：等待页面加载到某种状态（如网络空闲、DOM 完成等）。

**Puppeteer 示例**：
```js
await page.goto('http://example.com', { waitUntil: 'networkidle2' }); // 网络空闲
await page.waitForNavigation({ waitUntil: 'domcontentloaded' }); // DOM 加载完成
```

---

## 5. 自定义等待（Wait for Function）

**原理**：等待某个自定义 JS 条件成立。

**Puppeteer 示例**：
```js
await page.waitForFunction(() => window.appReady === true);
```

---

## 6. 组合等待

实际项目中，常常组合多种等待方式，如先等待元素出现，再等待其可见、可点击等。

---

## 7. Page Object 封装等待

最佳实践是将等待逻辑封装在 Page Object 层，避免在每个测试用例里重复写等待代码，提高可维护性和稳定性。

---

### 总结

- **显式等待**是最常用、最可靠的方式。
- **固定等待**仅用于调试或特殊场景。
- **网络状态等待**适合页面跳转、数据加载场景。
- **自定义等待**适合复杂异步场景。
- 推荐将等待逻辑封装，提升代码质量。 