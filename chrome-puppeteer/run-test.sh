#!/bin/bash

echo "🎃 Pumpkin-Web 自动化测试启动脚本"
echo "=================================="

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在 chrome-puppeteer 目录下运行此脚本"
    exit 1
fi

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误：未找到 npm，请先安装 npm"
    exit 1
fi

echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "🔧 安装 Puppeteer 依赖..."
    npm install
fi

echo ""
echo "🔍 检查 pumpkin-web 应用状态..."
if npm run check > /dev/null 2>&1; then
    echo "✅ 应用正在运行"
else
    echo "❌ 应用未运行"
    echo ""
    echo "请先启动 pumpkin-web 应用:"
    echo "cd ../pumpkin-web && npm run dev"
    echo ""
    read -p "应用启动后按回车继续..."
fi

echo ""
echo "🚀 选择测试模式："
echo "1) 完整测试 (包含截图和详细验证)"
echo "2) 快速测试 (基本功能验证)"
echo "3) 检查应用状态"
echo "4) 退出"
echo ""

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo "🎯 开始完整测试..."
        npm test
        ;;
    2)
        echo "⚡ 开始快速测试..."
        npm run quick
        ;;
    3)
        echo "🔍 检查应用状态..."
        npm run check
        ;;
    4)
        echo "👋 退出测试"
        exit 0
        ;;
    *)
        echo "❌ 无效选择，退出"
        exit 1
        ;;
esac

echo ""
echo "✅ 测试完成！" 