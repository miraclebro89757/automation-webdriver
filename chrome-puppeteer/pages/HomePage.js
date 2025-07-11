const path = require('path');

class HomePage {
  constructor(page, screenshotDir) {
    this.page = page;
    this.screenshotDir = screenshotDir;
  }

  // 多选南瓜吃法（支持 label，XPath）
  async selectEatWays(labels) {
    for (const label of labels) {
      const [el] = await this.page.$x(`//label[contains(., '${label}')]`);
      if (el) await el.click();
    }
  }

  // 等待“你选择了：...”文本
  async waitEatWaysSelectedText(text, timeout = 4000) {
    await this.page.waitForSelector(`text=${text}`, { timeout });
  }

  // 等待 input[type=checkbox][value=xxx] 被选中
  async waitEatWayChecked(value, timeout = 1000) {
    await this.page.waitForFunction((v) => {
      const checkbox = document.querySelector(`input[type="checkbox"][value="${v}"]`);
      return checkbox && checkbox.checked;
    }, { timeout }, value);
  }

  // 等待对应 span.ant-checkbox-checked
  async waitEatWayCheckedUI(label, timeout = 1000) {
    await this.page.waitForFunction((l) => {
      const [el] = Array.from(document.querySelectorAll('label')).filter(labelEl => labelEl.textContent.includes(l));
      if (!el) return false;
      const span = el.querySelector('span.ant-checkbox');
      return span && span.classList.contains('ant-checkbox-checked');
    }, { timeout }, label);
  }


  // 单选地区
  async selectCountry(label) {
    await this.page.click(`text=${label}`);
  }

  // 等待“你选择了：...”文本（地区）
  async waitCountrySelectedText(text, timeout = 1500) {
    await this.page.waitForSelector(`text=${text}`, { timeout });
  }

  // 等待 input[type=radio][value=xxx] 被选中
  async waitCountryRadioChecked(value, timeout = 1000) {
    await this.page.waitForFunction((v) => {
      const radio = document.querySelector(`input[type="radio"][value="${v}"]`);
      return radio && radio.checked;
    }, { timeout }, value);
  }

  // 取消多选
  async uncheckEatWays(labels) {
    for (const label of labels) {
      const [el] = await this.page.$x(`//label[contains(., '${label}')]`);
      if (el) await el.click();
    }
  }
}

module.exports = HomePage; 