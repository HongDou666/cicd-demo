{
// https://juejin.cn/post/6844904178234458120?from=search-suggest#heading-15
// https://blog.csdn.net/weixin_44786530/article/details/130157465
/_ 配置编译选项 _/
"compilerOptions": {
"target": "ES5", // 目标语言的版本
"module": "esnext", // 指定生成代码的模板标准, 指定编译后代码使用的模块化规范 (支持 import.meta 语法编译)
"noImplicitAny": true, // 不允许隐式的 any 类型
"removeComments": true, // 编译为js代码将删除注释
"preserveConstEnums": true, // 保留 const 和 enum 声明
"sourceMap": true, // 是否生成相应的Map映射的文件，默认：false。
"incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
// "tsBuildInfoFile": "./buildFile", // 指定增量编译信息文件的位置，使用该功能时，必须开启incremental选项
"diagnostics": true, // 用于打印输出用于调试的诊断信息
// "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
"lib": ["DOM", "ES2020", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
// "allowJS": true, // 默认：false; 允许编译器编译JS，JSX文件
// "checkJs": true, // 默认：false; 是否检查js代码是否符合语法规范，当使用checkJs，必须使用allowJs
// "outDir": "./dist", // 指定输出目录
"rootDir": "./", // 指定输入文件的根目录，默认情况下当前的项目目录为根目录
"declaration": true, // 否生成相应的 .d.ts 声明文件，默认：false
// "declarationDir": "./file", // 指定生成声明文件存放的目录
// "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件; 默认：false。
// "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中; 默认：false。
// "declarationMap": true, // 为声明文件生成sourceMap; 默认：false。
// "typeRoots": [], // 声明文件目录,指定声明文件或文件夹的路径列表,默认时node_modules/@types
// "types": [], // 加载的声明文件包, 用来指定需要包含的模块，并将其包含在全局范围内, ["vite/client"]支持环境变量
// "noEmit": true, // 不输出文件,即编译后不会生成任何js文件,默认：false
// "noEmitOnError": true, // 发送错误时不输出任何文件
// "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
// "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
// "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现; 默认：false。
// "strict": true, // 开启所有严格的类型检查
// "alwaysStrict": true, // 是否以严格模式解析，并为每个源文件发出"use strict"; 默认：false
// "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量; 默认：false。
// "strictFunctionTypes": true, // 是否启用对函数类型的严格检查，默认：false
// "strictPropertyInitialization": true, // 类的实例属性必须初始化(是否启用严格检查类的属性初始化，默认：false)
// "strictBindCallApply": true, // 严格的bind/call/apply检查; 默认：false
"noImplicitThis": true, // 不允许this有隐式的any类型(是否禁止不明确类型的this，默认：false)
// "noUnusedLocals": true, // 是否检查未使用的局部变量，默认：false (只提示不报错)
// "noUnusedParameters": true, // 是否检查未使用的参数，默认：false (只提示不报错)
// "noFallthroughCasesInSwitch": true, // 检查switch中是否含有case没有使用break跳出，默认：false (即如果没有break语句后面不会执行)
// "noImplicitReturns": true, // 检查函数是否不含有隐式返回值，默认：false。
// "esModuleInterop": true, // 允许export=导出，由import from 导入(是否通过为所有导入模块创建命名空间对象，允许CommonJS和ES模块之间的互操作性，开启改选项时，也自动开启allowSyntheticDefaultImports选项，默认：false。)
// "allowUmdGlobalAccess": true, // 允许您从模块文件内部访问作为全局变量的 UMD 导出，如果不使用该选项，从 UMD 模块导出需要一个导入声明，默认：false。
// "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
// "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录(用于解析非绝对模块名的基本目录，相对模块不受影响。)
// "paths": { // 路径映射，相对于baseUrl(用于设置模块名称基于baseUrl的路径映射关系。)
// // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
// "jquery": ["node_modules/jquery/dist/jquery.min.js"]
// },
// "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
// "listEmittedFiles": true, // 是否将编译部分生成的文件的名称打印到终端，默认：false。
// "listFiles": true // 是否打印编译文件部分的名称，默认：false (包括引用的声明文件)

    "baseUrl": "./",
    "paths": {
      // 解决项目中使用@作为路径别名，导致vscode无法跳转文件的问题
      "@/*": ["src/*"]
    },
    "experimentalDecorators": false, // 解决prettier对于装饰器语法的警告
    "jsx": "preserve", // 解决.jsx文件无法快速跳转的问题
    "resolveJsonModule": true, // 是否解析 JSON 模块，默认：false
    "allowJs": true,
    "forceConsistentCasingInFileNames": false, // 是否区分文件系统大小写规则，默认：false
    // "types": ["node"],
    "types": ["vite/client"], // 支持环境变量
    "moduleResolution": "node",
    "strict": false

},
"compileOnSave": true, // compileOnSave 属性作用是设置保存文件的时候自动编译，但需要编译器支持
/_
files 配置项值是一个数组，用来指定了待编译文件，即入口文件
当入口文件依赖其他文件时，不需要将被依赖文件也指定到 files 中，因为编译器会自动将所有的依赖文件归纳为编译对象
即 index.ts 依赖 user.ts 时，不需要在 files 中指定 user.ts，user.ts 会自动纳入待编译文件
_/
"files": [], // 指定待编译文件; files 属性作用是指定需要编译的单个文件列表。
"exclude": ["node_modules", "dist"], // exclude 属性作用是指定编译器需要排除的文件或文件夹。
"extends": [], // exclude 属性作用是引入其他配置文件，继承配置。
"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "types/*.d.ts"], // include 属性作用是指定编译需要编译的文件或目录。
/_
references 属性作用是指定工程引用依赖。
在项目开发中，有时候我们为了方便将前端项目和后端node项目放在同一个目录下开发，两个项目依赖同一个配置文件和通用文件，
但我们希望前后端项目进行灵活的分别打包，那么我们可以进行如下配置：
_/
"references": [
{
"path": "./tsconfig.vite-config.json"
},
{
"path": "./tsconfig.app.json"
},
{
"path": "./tsconfig.vitest.json"
}
],
/_
typeAcquisition 属性作用是设置自动引入库类型定义文件(.d.ts)相关。
包含 3 个子属性：
enable  : 布尔类型，是否开启自动引入库类型定义文件(.d.ts)，默认为 false；
include  : 数组类型，允许自动引入的库名，如：["jquery", "lodash"]；
exculde  : 数组类型，排除的库名。
_/
"typeAcquisition": {
"enable": false,
"exclude": ["jquery"],
"include": ["lodash"]
}
}
