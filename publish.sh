#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npx vue-cli-service build

# 进入生成的文件夹
cd dist

# push
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:lixianbin1/polymesh-sdk-wiki.git master:gh-pages

# 删除dist文件夹
cd ../
rm -rf dist