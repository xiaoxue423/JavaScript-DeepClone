# JavaScript-DeepClone
## 什么是深拷贝
简单理解：b是a的一份拷贝，b中没有对a中对象的引用

另一种理解：b是a的一份拷贝；把a和b各画出图，a与b没有连结

##最简单的方法-JSON序列化反序列化
`var a = {
  b:1,
  c:[1,2,3],
  d:{d1:'xxx',d2:'yyy'}
}`
