## Cypress 测试常见问题与解决方案

### 1. cy.scrollTo() 报错：元素不可滚动

**报错现象：**

```
CypressError: Timed out retrying after 4000ms: `cy.scrollTo()` failed because this element is not scrollable:
<div class="article-page">...</div>
```

**原因分析：**
- cy.scrollTo 只能用于可滚动的元素（内容超出容器高度，出现滚动条）。
- 如果目标元素内容不足以溢出，Cypress 检查到它不是 scrollable 元素，scrollTo 操作会失败。

**解决方法：**
- 如无实际滚动需求，可直接去掉 scrollTo 测试步骤。
- 如需强制 scrollTo，可加参数 `{ ensureScrollable: false }`，如：
  ```js
  cy.get('.article-page').scrollTo('bottom', { ensureScrollable: false });
  ```
- 如需测试滚动行为，应确保页面内容足够长，能出现滚动条。

**推荐实践：**
- 不要对不可滚动的元素使用 scrollTo。
- 测试前可用 `.should('be.scrollable')` 断言辅助判断。

---

### 2. 断言内容不存在导致的断言失败

**报错现象：**

```
AssertionError: Timed out retrying after 4000ms: Expected to find content: '你选择了' within the element: <div.card> but never did.
```

**原因分析：**
- 页面初始状态下，没有任何选项被选中，相关内容（如“你选择了”）不会渲染。
- 测试用例直接断言内容存在，导致失败。

**解决方法：**
- 如果断言页面初始状态，应断言内容不存在：
  ```js
  HomePage.getEatWaysResult().should('not.exist');
  ```
- 如果需要断言内容存在，应先进行相关操作（如选择选项）后再断言：
  ```js
  HomePage.selectEatWays(['南瓜粥 🥣']);
  HomePage.getEatWaysResult().should('contain', '南瓜粥');
  ```

**推荐实践：**
- 理解页面渲染逻辑，断言前确保页面状态与预期一致。
- 针对初始状态和操作后状态分别编写断言。 