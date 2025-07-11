# Puppeteer 入门学习 & pumpkin-web 自动化测试

## 1. 什么是 Puppeteer？

Puppeteer 是 Google 官方推出的一个 Node.js 库，可以用代码控制 Chrome 或 Chromium 浏览器，实现自动化测试、爬虫、截图、表单填写等操作。它常用于前端自动化测试和网页爬取。

## 2. 安装方法

确保你已经安装了 Node.js，然后在项目目录下运行：

```bash
npm install puppeteer
```

## 3. pumpkin-web 自动化测试说明

本目录下已集成 pumpkin-web 的自动化测试脚本，基于 Puppeteer 实现，支持一键测试页面导航、表单交互（单选、多选）、页面内容验证和截图。

### 主要文件
- `test-pumpkin-web.js` —— 完整功能测试脚本
- `quick-test.js` —— 快速基本功能测试脚本
- `run-test.sh` —— 一键启动测试脚本
- `package.json` —— 依赖与脚本配置
- `TEST_GUIDE.md` —— 详细测试指南

### 覆盖功能
- **导航测试**：点击“南瓜的历史”“南瓜的品种”“南瓜游戏”tab，并返回首页
- **表单交互**：多选南瓜吃法、单选地区、取消选择
- **页面验证**：标题、内容、交互响应
- **截图功能**：自动保存各页面截图，错误时保存错误截图

### 生成截图
- `pumpkin-history.png` —— 南瓜的历史页面
- `pumpkin-varieties.png` —— 南瓜的品种页面
- `pumpkin-game.png` —— 南瓜游戏页面
- `pumpkin-final.png` —— 最终页面
- `pumpkin-error.png` —— 错误截图（如有）

## 4. 快速开始

### 1. 启动 pumpkin-web 应用
```bash
cd ../pumpkin-web
npm install
npm run dev
```
确保应用运行在 `http://localhost:5173`

### 2. 安装 Puppeteer 依赖
```bash
cd ../chrome-puppeteer
npm install
```

### 3. 运行自动化测试

#### 推荐：一键启动脚本
```bash
./run-test.sh
```
根据提示选择：
- 1) 完整测试（包含截图和详细验证）
- 2) 快速测试（基本功能验证）

#### 手动运行
```bash
npm test        # 完整测试
npm run quick   # 快速测试
```

## 5. 常见问题与调试
- 确保 pumpkin-web 已启动且端口为 5173
- 如遇依赖问题，先执行 `npm install`
- 测试脚本为 `headless: false`，可观察浏览器自动操作过程
- 错误时会自动截图，便于排查

## 6. 进阶学习资源
- [Puppeteer 官方文档](https://pptr.dev/)
- [Puppeteer 中文文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/)

---

如需更多实战案例或自动化测试相关内容，可以随时补充！ 