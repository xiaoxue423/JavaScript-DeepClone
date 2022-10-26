# JavaScript-DeepClone
## 什么是深拷贝
简单理解：b是a的一份拷贝，b中没有对a中对象的引用

另一种理解：b是a的一份拷贝；把a和b各画出图，a与b没有连结

## 最简单的方法-JSON序列化反序列化
### 缺点
1. 不支持函数，直接忽略
2.  不支持undefined，只支持null
3.  不支持引用，JSON不支持环状的结构，只支持树状的结构
4.  不支持Date
5.  不支持正则表达式
6.  不支持Symbol，直接忽略

## 全面的方法-递归克隆
### 注意
1. 看节点的类型-js的7种类型
2. 如果是基本类型就直接拷贝
3. 如果是object就分情况讨论

## 开始
1. 创建目录并初始化-`yarn init -y`
2. 引入chai和sinon
3. 开始测试驱动开发Test Driven Development(TDD)
4. 测试失败-改代码-测试成功-加测试-测试失败-改代码

### 注意
1. 如何区分类型 object分为array/function/date/regexp
2. 如何避免环 `let a = {name:'xxx'};a.self = a`
3. 是否拷贝原型属性 一般不拷贝，否则会把所有的js对象都拷贝
4. 爆栈要不要考虑 一般来说不考虑
