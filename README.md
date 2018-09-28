
# iView Admin
[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
[![vue](https://img.shields.io/badge/vue-2.5.13-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-2.8.0-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)
[![npm](https://img.shields.io/npm/l/express.svg)]()


## 当前版本：v1.3.1


## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```



## 功能

- 登录/登出
- 权限管理
    - 列表过滤
    - 权限切换
- 多语言切换
- 组件
    - 富文本编辑器
    - Markdown编辑器
    - 城市级联
    - 图片预览编辑
    - 可拖拽列表
    - 文件上传
    - 数字渐变
    - split-pane
- 表单编辑
    - 文章发布
    - 工作流
- 表格
    - 可拖拽排序
    - 可编辑表格
        - 行内编辑
        - 单元格编辑
    - 可搜索表格
    - 表格导出数据
        - 导出为Csv文件
        - 导出为Xls文件
    - 表格转图片
- 错误页面
    - 403页面
    - 404页面
    - 500页面
- 高级路由
    - 动态路由
    - 带参页面
- 换肤
- 收缩侧边栏
- tag标签导航
- 面包屑导航
- 全屏/退出全屏
- 锁屏
- 消息中心
- 个人中心

## 文件结构
```shell
.
├── build  项目构建配置
└── src
    ├── images  图片文件
    ├── libs  工具方法
    ├── locale  多语言文件
    ├── router  路由配置
    ├── store  状态管理
    ├── styles  样式文件
    ├── template  模板文件
    ├── vendors  公共库文件
    └── views
        ├── access  权限管理
        ├── advanced-router  高级路由
        ├── error_page  错误页面
        ├── form  表单编辑
        ├── home  首页
        │   ├── components  首页组件
        ├── international  多语言
        ├── main_components  Main组件
        │   ├── lockscreen  锁屏
        │   ├── shrinkable-menu  可收缩菜单
        │   └── theme-switch  主题切换
        ├── message  消息中心
        ├── my_components  业务组件
        │   ├── area-linkage  中国行政区级联选择器
        │   ├── count-to  数字渐变
        │   ├── draggable-list  可拖拽列表
        │   ├── file-upload  文件上传
        │   ├── image-editor  图片预览编辑
        │   ├── markdown-editor  Markdown编辑器
        │   └── text-editor  富文本编辑器
        ├── own-space  个人中心
        └── tables  综合表格
```

## Links

- [TalkingData](https://github.com/TalkingData)
- [iView](https://github.com/iview/iview)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)




## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, iView
