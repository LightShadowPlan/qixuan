### 这是一个轻量级的css响应式栅格系统
- - -
* qixuan 是一个采用 12 || 24 栅格系统的响应式框架，在生成的目录 stylesheets/qixuan 下有两个css文件。
 * qixuan.min.css  12栅格  49.9KB      
 * qixuan.css  24栅格   31.3KB

#### 使用
* 代码结构
```html
<div class="container">
  <div class="row">
    <div class="col"></div>
    <div class="col-3"></div>
  </div>
</div>
```

* 栅格说明
 * container 宽度100%，最大宽度1200px，另有 container-full，宽度满屏
 * col 默认占 6 / 24 ,等同于 col-6
 * col-xs, col-sm, col-md, col-lg 分别表示超小屏，小屏，中屏，大屏下的占比, 默认占 6 / 24 , 如: col-md-6
 
* 栅格边距
 * col-left 表示栅格单元左边距的占比, 默认占 6 / 24 , 如: col-left-6
 * col-xs-left, col-sm-left, col-md-left, col-lg-left 分别表示超小屏，小屏，中屏，大屏下栅格单元左边距的占比, 默认占 6 / 24 , 如: col-md-left-6
 
 
 #### Demo
 [DEMO](http://likeshadow.gitee.io/qixuan)
