const path = require('path');
const {
  screenshot,
  waitForSelector,
  waitTimeout,
  runTestEntry,
  gotoTab,
} = require('./common/utils');

runTestEntry(async (page, browser) => {
  console.log('🚀 开始测试 pumpkin-web 应用...');
  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!require('fs').existsSync(screenshotDir)) require('fs').mkdirSync(screenshotDir);

  try {
    // 1. 访问应用首页
    console.log('📱 访问 pumpkin-web 首页...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    await waitForSelector(page, '.pumpkin-theme');
    console.log('✅ 首页加载成功');
    await screenshot(page, screenshotDir, 'home.png');
    
    // 2. 测试首页的单选和多选功能
    console.log('🎯 测试首页表单功能...');
    
    // 等待表单元素加载
    await waitForSelector(page, '.ant-checkbox-group');
    await waitForSelector(page, '.ant-radio-group');
    
    // 测试多选功能 - 选择几个南瓜吃法
    console.log('🍽️ 测试多选功能 - 选择南瓜吃法...');
    const checkboxOptions = [
      '南瓜粥 🥣',
      '南瓜饼 🥞', 
      '南瓜汤 🍲',
      '南瓜派 🥧'
    ];
    
    for (const option of checkboxOptions) {
      const checkbox = await page.$(`text=${option}`);
      if (checkbox) {
        await checkbox.click();
        console.log(`✅ 选择了: ${option}`);
        await waitTimeout(page, 500); // 等待动画
      }
    }
    
    // 验证多选结果显示
    await waitForSelector(page, 'text=你选择了：');
    const selectedText = await page.$eval('text=你选择了：', el => el.textContent);
    console.log(`📝 多选结果: ${selectedText}`);
    await screenshot(page, screenshotDir, 'multi-select.png');
    
    // 测试单选功能 - 选择地区
    console.log('🌍 测试单选功能 - 选择地区...');
    const radioOptions = ['中国 🇨🇳', '美国 🇺🇸', '墨西哥 🇲🇽'];
    
    for (const option of radioOptions) {
      const radio = await page.$(`text=${option}`);
      if (radio) {
        await radio.click();
        console.log(`✅ 选择了: ${option}`);
        await waitTimeout(page, 500); // 等待动画
        
        // 验证单选结果显示
        await waitForSelector(page, 'text=你选择了：');
        const radioSelectedText = await page.$eval('text=你选择了：', el => el.textContent);
        console.log(`📝 单选结果: ${radioSelectedText}`);
        await screenshot(page, screenshotDir, 'radio-select.png');
        break; // 只测试一个选项
      }
    }
    
    // 3. 测试导航功能 - 点击不同的 tab
    console.log('🧭 测试导航功能...');
    
    // 点击"南瓜的历史" tab
    console.log('📚 点击"南瓜的历史" tab...');
    await gotoTab(page, '南瓜的历史');
    await waitForSelector(page, '.article-page');
    console.log('✅ 南瓜的历史页面加载成功');
    const historyTitle = await page.$eval('h2', el => el.textContent);
    console.log(`📖 页面标题: ${historyTitle}`);
    await screenshot(page, screenshotDir, 'pumpkin-history.png');
    
    // 点击"南瓜的品种" tab
    console.log('🎃 点击"南瓜的品种" tab...');
    await gotoTab(page, '南瓜的品种');
    await waitForSelector(page, '.article-page');
    console.log('✅ 南瓜的品种页面加载成功');
    const varietiesTitle = await page.$eval('h2', el => el.textContent);
    console.log(`🎃 页面标题: ${varietiesTitle}`);
    await screenshot(page, screenshotDir, 'pumpkin-varieties.png');

    // 新增：上下滚动操作
    const VarietiesPage = require('./pages/VarietiesPage');
    const varietiesPage = new VarietiesPage(page, screenshotDir);
    await varietiesPage.scrollDown(600);
    await screenshot(page, screenshotDir, 'varieties-scroll-down.png');
    await varietiesPage.scrollUp(600);
    await screenshot(page, screenshotDir, 'varieties-scroll-up.png');
    
    // 点击"南瓜游戏" tab
    console.log('🎮 点击"南瓜游戏" tab...');
    await gotoTab(page, '南瓜游戏');
    await waitForSelector(page, '.article-page');
    console.log('✅ 南瓜游戏页面加载成功');
    const gameTitle = await page.$eval('h2', el => el.textContent);
    console.log(`🎮 页面标题: ${gameTitle}`);
    
    // 测试游戏功能 - 点击重置按钮
    console.log('🔄 测试游戏重置功能...');
    const resetButton = await page.$('button');
    if (resetButton) {
      await resetButton.click();
      console.log('✅ 游戏重置按钮点击成功');
      await waitTimeout(page, 500);
    }
    await screenshot(page, screenshotDir, 'pumpkin-game.png');
    
    // 4. 返回首页并再次测试表单
    console.log('🏠 返回首页...');
    await gotoTab(page, '🎃 南瓜的世界');
    await waitTimeout(page, 1000);
    
    // 测试取消选择功能
    console.log('❌ 测试取消选择功能...');
    
    // 取消选择一些多选项
    const uncheckOptions = ['南瓜饼 🥞', '南瓜汤 🍲'];
    for (const option of uncheckOptions) {
      const checkbox = await page.$(`text=${option}`);
      if (checkbox) {
        await checkbox.click();
        console.log(`❌ 取消选择: ${option}`);
        await waitTimeout(page, 300);
      }
    }
    
    // 验证最终选择结果
    await waitTimeout(page, 500);
    const finalSelectedText = await page.$eval('text=你选择了：', el => el.textContent);
    console.log(`📝 最终选择结果: ${finalSelectedText}`);
    await screenshot(page, screenshotDir, 'pumpkin-final.png');
    
    console.log('🎉 所有测试完成！');
    console.log('📁 生成的截图文件:');
    console.log('  - pumpkin-history.png (南瓜的历史页面)');
    console.log('  - pumpkin-varieties.png (南瓜的品种页面)');
    console.log('  - pumpkin-game.png (南瓜游戏页面)');
    console.log('  - pumpkin-final.png (最终页面)');
    
  } catch (error) {
    console.error('❌ 测试过程中出现错误:', error);
    await screenshot(page, screenshotDir, 'pumpkin-error.png');
    console.log('📸 错误截图已保存为 pumpkin-error.png');
  } finally {
    // 等待一段时间让用户查看结果
    console.log('⏳ 等待 5 秒后关闭浏览器...');
    await waitTimeout(page, 5000);
  }
}); 