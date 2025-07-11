const http = require('http');

function checkApp() {
  console.log('🔍 检查 pumpkin-web 应用状态...');
  
  const options = {
    hostname: 'localhost',
    port: 5173,
    path: '/',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log(`✅ 应用正在运行! 状态码: ${res.statusCode}`);
    console.log('🌐 访问地址: http://localhost:5173');
    process.exit(0);
  });

  req.on('error', (error) => {
    console.log('❌ 应用未运行或无法连接');
    console.log('\n🔧 请按以下步骤启动应用:');
    console.log('1. 打开新终端窗口');
    console.log('2. 进入 pumpkin-web 目录:');
    console.log('   cd ../pumpkin-web');
    console.log('3. 安装依赖:');
    console.log('   npm install');
    console.log('4. 启动开发服务器:');
    console.log('   npm run dev');
    console.log('5. 等待应用启动完成');
    console.log('6. 重新运行测试');
    process.exit(1);
  });

  req.on('timeout', () => {
    console.log('⏰ 连接超时');
    req.destroy();
    process.exit(1);
  });

  req.end();
}

checkApp(); 