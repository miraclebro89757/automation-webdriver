import time
import random
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.common.exceptions import NoSuchWindowException, NoSuchElementException, WebDriverException

# 获取百度热词
def get_baidu_hotwords(limit=20):
    url = "https://top.baidu.com/board?tab=realtime"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text, "html.parser")
    hotwords = []
    for tag in soup.select(".c-single-text-ellipsis"):
        word = tag.get_text(strip=True)
        if word:
            hotwords.append(word)
        if len(hotwords) >= limit:
            break
    return hotwords

# 获取Bing热词（Bing每日热搜）
def get_bing_hotwords(limit=20):
    url = "https://api.bing.com/qsonhs.aspx?type=cb&q=hotsearch"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    resp = requests.get(url, headers=headers)
    hotwords = []
    try:
        data = resp.json()
        for item in data.get('AS', {}).get('Results', [])[0].get('Suggests', []):
            word = item.get('Txt')
            if word:
                hotwords.append(word)
            if len(hotwords) >= limit:
                break
    except Exception as e:
        pass
    return hotwords

# 指定 EdgeDriver 为当前路径webdriver下的msedgedriver
edge_driver_path = './webdriver/msedgedriver'

# 获取百度和Bing热词
baidu_hotwords = get_baidu_hotwords(20)
bing_hotwords = get_bing_hotwords(20)
hotwords = list(dict.fromkeys(baidu_hotwords + bing_hotwords))  # 去重
if not hotwords:
    hotwords = ["python", "macbook", "人工智能"]

# 选取30个热词（如不足30则全部使用）
search_terms = hotwords[:10]

service = Service(edge_driver_path)
driver = webdriver.Edge(service=service)

try:
    driver.get("https://www.bing.com")
    # 全屏
    driver.fullscreen_window()
    input("请在浏览器中手动登录你的微软账号，然后回到终端按回车继续...")

    for idx, term in enumerate(search_terms):
        print(f"第{idx+1}次搜索: {term}")
        search_box = driver.find_element(By.NAME, "q")
        search_box.clear()
        search_box.send_keys(term)
        search_box.submit()
        time.sleep(random.uniform(3, 5))

        # 获取所有搜索结果的标题链接
        titles = driver.find_elements(By.CSS_SELECTOR, "li.b_algo h2 a")
        if not titles:
            print("未找到搜索结果，跳过。")
            continue

        # 随机选择1-2个标题进行点击
        click_count = random.randint(1, min(2, len(titles)))
        click_indices = random.sample(range(len(titles)), click_count)
        for i, idx_click in enumerate(click_indices):
            try:
                link = titles[idx_click]
                href = link.get_attribute('href')
                print(f"  点击第{i+1}个结果: {link.text.strip()} -> {href}")
                # 新标签页打开
                try:
                    driver.execute_script(f"window.open('{href}', '_blank');")
                    time.sleep(1)
                    driver.switch_to.window(driver.window_handles[-1])
                except (NoSuchWindowException, WebDriverException) as e:
                    print(f"    打开新标签页失败: {e}")
                    # 回到主窗口
                    try:
                        driver.switch_to.window(driver.window_handles[0])
                    except Exception:
                        pass
                    continue
                # 随机浏览时间
                browse_time = random.uniform(3, 10)
                elapsed = 0
                scroll_interval = 3
                while elapsed < browse_time:
                    sleep_time = min(scroll_interval, browse_time - elapsed)
                    time.sleep(sleep_time)
                    elapsed += sleep_time
                    # 每3秒滚动一屏
                    try:
                        driver.execute_script("window.scrollBy(0, window.innerHeight);")
                    except (NoSuchWindowException, WebDriverException) as e:
                        print(f"    滚动页面失败: {e}")
                        break
                # 关闭新标签页并回到主搜索页
                try:
                    driver.close()
                    driver.switch_to.window(driver.window_handles[0])
                except (NoSuchWindowException, WebDriverException) as e:
                    print(f"    关闭标签页失败: {e}")
                    # 如果主窗口还在，尽量切回
                    try:
                        driver.switch_to.window(driver.window_handles[0])
                    except Exception:
                        pass
            except (NoSuchElementException, IndexError, WebDriverException) as e:
                print(f"  处理结果时发生异常: {e}")
                continue
            # 搜索间隔
            time.sleep(random.uniform(2, 4))
finally:
    driver.quit()
