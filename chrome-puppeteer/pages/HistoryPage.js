const { screenshot, waitForSelector } = require('../common/utils');
const path = require('path');

class HistoryPage {
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
}

module.exports = HistoryPage; 