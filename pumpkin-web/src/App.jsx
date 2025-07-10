import { Link, Routes, Route, Outlet } from 'react-router-dom';
import History from './pages/History';
import Varieties from './pages/Varieties';
import Game from './pages/Game';
import './App.css';
import { Checkbox, Radio } from 'antd';
import { useState } from 'react';

function Layout() {
  return (
    <div className="pumpkin-theme">
      <nav className="navbar">
        <Link to="/" className="nav-logo">🎃 南瓜的世界</Link>
        <div className="nav-links">
          <Link to="/history">南瓜的历史</Link>
          <Link to="/varieties">南瓜的品种</Link>
          <Link to="/game">南瓜游戏</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

function Home() {
  const [eatWays, setEatWays] = useState([]);
  const [country, setCountry] = useState();
  const options = [
    { label: '南瓜粥 🥣', value: 'porridge' },
    { label: '南瓜饼 🥞', value: 'cake' },
    { label: '南瓜汤 🍲', value: 'soup' },
    { label: '烤南瓜 🍠', value: 'bake' },
    { label: '南瓜派 🥧', value: 'pie' },
    { label: '南瓜馒头 🥯', value: 'mantou' },
    { label: '炒南瓜 🍳', value: 'stirfry' },
    { label: '其他 🍽️', value: 'other' },
  ];
  const countryOptions = [
    { label: '中国 🇨🇳', value: 'china' },
    { label: '美国 🇺🇸', value: 'usa' },
    { label: '墨西哥 🇲🇽', value: 'mexico' },
    { label: '法国 🇫🇷', value: 'france' },
    { label: '英国 🇬🇧', value: 'uk' },
    { label: '意大利 🇮🇹', value: 'italy' },
    { label: '其他 🌎', value: 'other' },
  ];
  return (
    <div className="home-page">
      <h2>欢迎来到南瓜的世界！</h2>
      <p>探索南瓜的历史、品种与趣味互动，发现更多关于南瓜的精彩内容。</p>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32, width: '100%' }}>
        <div className="card" style={{ maxWidth: 480, width: '100%', minWidth: 280, flex: 1, textAlign: 'left', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, marginBottom: 8, alignSelf: 'flex-start' }}>你最喜欢的南瓜吃法（可多选）：</div>
          <Checkbox.Group
            options={options}
            value={eatWays}
            onChange={setEatWays}
            style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', marginBottom: 12, boxSizing: 'border-box' }}
          />
          {eatWays.length > 0 && (
            <div style={{ 
              marginTop: 12, 
              color: '#b86b1b', 
              fontWeight: 600, 
              alignSelf: 'flex-start', 
              maxWidth: '100%', 
              wordBreak: 'break-all', 
              whiteSpace: 'normal', 
              overflowWrap: 'break-word', 
              width: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              你选择了：{eatWays.map(v => options.find(o => o.value === v)?.label).join('、')}
            </div>
          )}
        </div>
        <div className="card" style={{ maxWidth: 480, width: '100%', minWidth: 280, flex: 1, textAlign: 'left', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, marginBottom: 8, alignSelf: 'flex-start' }}>你所在的地区：</div>
          <Radio.Group
            options={countryOptions}
            value={country}
            onChange={e => setCountry(e.target.value)}
            style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', marginBottom: 12, boxSizing: 'border-box' }}
          />
          {country && (
            <div style={{ 
              marginTop: 12, 
              color: '#b86b1b', 
              fontWeight: 600, 
              alignSelf: 'flex-start',
              maxWidth: '100%',
              wordBreak: 'break-all',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              你选择了：{countryOptions.find(o => o.value === country)?.label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="varieties" element={<Varieties />} />
        <Route path="game" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
