const fs = require('fs');
const path = require('path');
const HomePage = require('./pages/HomePage');
const HistoryPage = require('./pages/HistoryPage');
const VarietiesPage = require('./pages/VarietiesPage');
const GamePage = require('./pages/GamePage');
const {
  screenshot,
  waitForSelector,
  waitTimeout,
  gotoTab,
  runTestEntry,
} = require('./common/utils');

// 截图目录
const screenshotDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);
else fs.readdirSync(screenshotDir).forEach(f => fs.unlinkSync(path.join(screenshotDir, f)));

runTestEntry(async (page, browser) => {
  console.log('🚀 开始快速测试 pumpkin-web...');

  // 首页
  const home = new HomePage(page, screenshotDir);
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 20000 });
  await waitForSelector(page, '.pumpkin-theme', 5000);
  await screenshot(page, screenshotDir, 'home.png');
  await waitForSelector(page, '.ant-checkbox-group', 5000);
  await waitForSelector(page, '.ant-radio-group', 5000);

  // 多选
  await home.selectEatWays(['南瓜粥 🥣', '南瓜饼 🥞']);
  await home.waitEatWaysSelectedText('你选择了：南瓜粥 🥣、南瓜饼 🥞', 4000);
  await home.waitEatWayChecked('cake');
  await home.waitEatWayCheckedUI('南瓜饼');
  await waitTimeout(page, 100);
  await screenshot(page, screenshotDir, 'multi-select.png');
  await waitTimeout(page, 500);

  // 单选
  await home.selectCountry('中国 🇨🇳');
  await home.waitCountrySelectedText('你选择了：中国 🇨🇳', 1500);
  await home.waitCountryRadioChecked('china');
  await screenshot(page, screenshotDir, 'radio-select.png');
  await waitTimeout(page, 500);

  // 导航到历史
  await gotoTab(page, '南瓜的历史');
  const history = new HistoryPage(page, screenshotDir);
  await history.waitLoaded();
  await screenshot(page, screenshotDir, 'history.png');

  // 导航到品种
  await gotoTab(page, '南瓜的品种');
  const varieties = new VarietiesPage(page, screenshotDir);
  await varieties.waitLoaded();
  await screenshot(page, screenshotDir, 'varieties.png');

  // 导航到游戏
  await gotoTab(page, '南瓜游戏');
  const game = new GamePage(page, screenshotDir);
  await game.waitLoaded();
  await screenshot(page, screenshotDir, 'game.png');

  // 返回首页
  await gotoTab(page, '🎃 南瓜的世界');
  await screenshot(page, screenshotDir, 'back-home.png');

  console.log('🎉 快速测试完成！所有截图已保存在 screenshots 文件夹。');
}); 