import React, { useState, useEffect, useRef } from 'react';
import pumpkinImg from '../assets/pumpkin-cursor-apple-24.png';
import worldMap from '../assets/world-map.png';

const pumpkinLantern = '🎃';
const pumpkinMantou = '🥯';

// S(4,3)到E(3,9)和C(9,18)有通路
const MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,0,'E',0,0,0,'C',0,0,1,0,1],
  [1,0,1,'S',0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],
];

const ROWS = MAZE.length;
const COLS = MAZE[0].length;
const CELL_W = 6460 / COLS;
const CELL_H = 3403 / ROWS;

function findStart() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (MAZE[r][c] === 'S') return [r, c];
    }
  }
  return [0, 0];
}

function findEnd(type) {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (MAZE[r][c] === type) return [r, c];
    }
  }
  return [ROWS - 1, COLS - 1];
}

export default function Game() {
  const [pos, setPos] = useState(findStart());
  const [win, setWin] = useState(false);
  const [form, setForm] = useState('pumpkin');
  const mazeRef = useRef(null);

  useEffect(() => {
    function handleKey(e) {
      if (win) return;
      const [r, c] = pos;
      let nr = r, nc = c;
      if (e.key === 'ArrowUp') nr--;
      if (e.key === 'ArrowDown') nr++;
      if (e.key === 'ArrowLeft') nc--;
      if (e.key === 'ArrowRight') nc++;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return;
      if (MAZE[nr][nc] === 1) return;
      setPos([nr, nc]);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [pos, win]);

  useEffect(() => {
    const [er, ec] = findEnd('E');
    const [cr, cc] = findEnd('C');
    if (pos[0] === er && pos[1] === ec && form !== 'lantern') {
      setForm('lantern');
      setTimeout(() => {
        alert('南瓜传播到欧洲，变成南瓜灯🎃！可以继续前往中国！');
      }, 100);
    } else if (pos[0] === cr && pos[1] === cc && form !== 'mantou') {
      setWin(true);
      setForm('mantou');
      setTimeout(() => {
        alert('南瓜传播到中国，变成南瓜馒头！');
      }, 100);
    }
  }, [pos]);

  function resetGame() {
    setPos(findStart());
    setWin(false);
    setForm('pumpkin');
  }

  return (
    <div className="article-page">
      <h2>南瓜世界传播迷宫</h2>
      <p>用键盘方向键（↑↓←→）控制南瓜从墨西哥出发，传播到欧洲或中国，看看南瓜会变成什么吧！</p>
      <div
        ref={mazeRef}
        style={{
          display: 'inline-block',
          background: `url(${worldMap}) center/cover no-repeat`,
          padding: 0,
          borderRadius: 12,
          boxShadow: '0 2px 8px 0 rgba(255,153,0,0.08)',
          margin: '2em 0',
          width: 646,
          height: 340,
          position: 'relative',
          overflow: 'hidden',
        }}
        tabIndex={0}
      >
        <table style={{ borderCollapse: 'collapse', width: '100%', height: '100%' }}>
          <tbody>
            {MAZE.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => {
                  let content = '';
                  if (pos[0] === r && pos[1] === c) {
                    if (form === 'pumpkin') {
                      content = <img src={pumpkinImg} alt="南瓜" style={{ width: 38, height: 38, zIndex: 10, position: 'relative', filter: 'drop-shadow(0 0 6px #000)' }} />;
                    } else if (form === 'lantern') {
                      content = <span style={{ fontSize: 38, zIndex: 10, position: 'relative', filter: 'drop-shadow(0 0 6px #000)' }}>{pumpkinLantern}</span>;
                    } else if (form === 'mantou') {
                      content = <span style={{ fontSize: 38, zIndex: 10, position: 'relative', filter: 'drop-shadow(0 0 6px #000)' }}>{pumpkinMantou}</span>;
                    }
                  } else if (cell === 1) {
                    content = '';
                  } else if (cell === 'S') {
                    content = <span style={{ color: '#388e3c', fontWeight: 'bold' }}>墨</span>;
                  } else if (cell === 'E') {
                    content = '';
                  } else if (cell === 'C') {
                    content = <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>中</span>;
                  }
                  let borderColor = '#222';
                  if (cell === 'S') borderColor = '#388e3c';
                  if (cell === 'E') borderColor = '#6c3fc5';
                  if (cell === 'C') borderColor = '#d32f2f';
                  return (
                    <td
                      key={c}
                      style={{
                        width: `${CELL_W/10}px`,
                        height: `${CELL_H/10}px`,
                        background: cell === 1 ? 'rgba(255,183,77,0.5)' : 'none',
                        border: `2.5px solid ${borderColor}`,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 22,
                        borderRadius: 6,
                        position: 'relative',
                        transition: 'background 0.2s',
                        zIndex: cell === 1 ? 2 : 1,
                      }}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16 }}>
        <button onClick={resetGame} style={{
          background: '#fff7e6',
          color: '#b86b1b',
          border: 'none',
          borderRadius: 10,
          padding: '0.5em 1.5em',
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 2px 8px 0 rgba(255,153,0,0.08)',
        }}>重置迷宫</button>
      </div>
    </div>
  );
} 