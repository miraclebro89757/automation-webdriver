import HomePage from '../support/pageObjects/HomePage';
import Navbar from '../support/pageObjects/Navbar';
import HistoryPage from '../support/pageObjects/HistoryPage';
import VarietiesPage from '../support/pageObjects/VarietiesPage';
import GamePage from '../support/pageObjects/GamePage';

describe('Pumpkin Web 全量回归测试', () => {
  it('首页表单多选、单选、取消选择', () => {
    HomePage.visit();
    // 多选
    const checkboxOptions = ['南瓜粥 🥣', '南瓜饼 🥞', '南瓜汤 🍲', '南瓜派 🥧'];
    HomePage.selectEatWays(checkboxOptions);
    HomePage.getEatWaysResult().should('contain', '南瓜粥').and('contain', '南瓜饼').and('contain', '南瓜汤').and('contain', '南瓜派');
    // 单选
    HomePage.selectCountry('中国 🇨🇳');
    HomePage.getCountryResult().should('contain', '中国');
    // 取消选择部分多选项
    HomePage.selectEatWays(['南瓜饼 🥞', '南瓜汤 🍲']); // 再次点击取消
    HomePage.getEatWaysResult().should('not.contain', '南瓜饼').and('not.contain', '南瓜汤');
  });

  it('导航栏跳转与页面内容校验', () => {
    HomePage.visit();
    Navbar.goToHistory();
    HistoryPage.assertLoaded();
    HistoryPage.getTitle().should('contain', '南瓜的历史');
    Navbar.goToVarieties();
    VarietiesPage.assertLoaded();
    VarietiesPage.getTitle().should('contain', '南瓜的品种');
    //VarietiesPage.scrollDown();
    //VarietiesPage.scrollUp();
    Navbar.goToGame();
    GamePage.assertLoaded();
    GamePage.getTitle().should('contain', '南瓜世界传播迷宫');
    GamePage.clickReset();
    Navbar.goToHome();
    HomePage.getEatWaysResult().should('not.exist');
  });
}); 