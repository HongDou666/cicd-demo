# Hello 红豆面包

# Vue3 - Vite - Ts

## 1. VsCode插件

- One Dark Pro 主题颜色插件
- Material Icon Theme 设置文件图标主题Icon
- Import Cost 导入依赖包显示包的大小
- Live Server 启动一个具有静态和动态页面实时重新加载功能的开发本地服务器
- Vue.volar 、Vue.vscode-typescript-vue-plugin （如今以弃用）改为 Vue - Official
- Vetur 开发Vue3项目需要禁用此插件
- Baidu Comate 代码智能提示

## 2. Git配置

- git config core.ignorecase false 可以跟踪到文件名的大小更改

## 3. Ts配置

- setting.json 添加 "typescript.validate.enable": true 开启ts验证
- ctrl + shift + P => Volar: Select Typescript Version 使用工作区版本
- ctrl + shift + P => Restart Extension Host 重启插件，重启扩展宿主（使用自动引入包的方式 直接使用包的方法 可能会有代码校验提示xxx is undefined）

## 4. 项目依赖包注释

- @vitejs/plugin-vue 可编译vue文件
- @vitejs/plugin-vue-jsx 可编译jsx文件
- @types/node ts语言支持node
- @types/nprogress 进度条ts类型
- vue-tsc ts文本类型检查工具

## 5. package.json

- scripts => "dev": "vite --mode development" （项目运行加载.env.development文件中的相关变量）
- scripts => "build:pro": "vue-tsc && vite build --mode production" （项目打包加载.env.production文件中的相关变量）
- scripts => "eslint --cache --max-warnings 0 {src,mock}/\*_/_.{vue,ts,tsx} --fix" （--cache 为仅检测改动过的代码, --max-warnings 0 表示出现超过0个警告强制eslint以错误状态退出）
- scripts => "lint:prettier": "prettier --write \*_/_.{ts,js,json,tsx,css,less,scss,vue,html,md}" 便于我们使用prettier进行修复代码风格

- scripts => "prepare": "husky install" （运行后会初始化husky，运行之后就会出现.husky文件夹，之后我们就可以配置在GItHook中执行的操作啦😀。）
- scripts => "lint:lint-staged": "lint-staged" 执行命令npx husky add .husky/pre-commit "npm run lint:lint-staged"（使用 husky 配置一个 pre-commit 钩子，使得在提交代码之前先运行 npm run lint:lint-staged命令）

## 6. 代码保存自动格式化

- ctrl + shift + P => Open Workspace Settings (JSON)
  （将在根目录生成settings.json 文件, 添加  
  "editor.codeActionsOnSave": {
  "source.fixAll": true // 代码保存时自动格式化
  }
  ）
