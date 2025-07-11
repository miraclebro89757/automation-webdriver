const { screenshot, waitForSelector } = require('../common/utils');
const path = require('path');

class VarietiesPage {
  constructor(page, screenshotDir) {
    this.page = page;
    this.screenshotDir = screenshotDir;
  }

  // 等待页面主内容加载
  async waitLoaded(timeout = 3000) {
    await waitForSelector(this.page, '.article-page', timeout);
  }

  // 获取页面标题
  async getTitle() {
    return await this.page.$eval('h2', el => el.textContent);
  }

  // 页面向下滚动
  async scrollDown(pixels = 500) {
    await this.page.evaluate(y => window.scrollBy({ top: y, behavior: 'smooth' }), pixels);
    await this.page.waitForTimeout(500); // 等待滚动动画
  }

  // 页面向上滚动
  async scrollUp(pixels = 500) {
    await this.page.evaluate(y => window.scrollBy({ top: -y, behavior: 'smooth' }), pixels);
    await this.page.waitForTimeout(500);
  }
}

module.exports = VarietiesPage; 