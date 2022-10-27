class DeepCloner {
  constructor() {
    this.cache = []; //作缓存
  }
  clone(source) {
    if (source instanceof Object) {
      let cacheList = this.findCache(source);
      if (cacheList) {
        return cacheList;
      } else {
        let dist;
        if (source instanceof Array) {
          dist = new Array();
        } else if (source instanceof Function) {
          dist = function () {
            return source.apply(this, arguments);
          };
        } else if (source instanceof Date) {
          dist = new Date(source);
        } else if (source instanceof RegExp) {
          dist = new RegExp(source.source, source.flags);
        } else {
          //普通对象
          dist = new Object();
        }
        this.cache.push([source, dist]);
        for (let key in source) {
          if(source.hasOwnProperty(key)) { //不拷贝原型属性
            dist[key] = this.clone(source[key]);
          }
        }
        return dist;
      }
    }
    return source; //如果是基本类型，则直接返回
  }
  findCache(source) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === source) {
        return this.cache[i][1];
      }
    }
  }
}

module.exports = DeepCloner;
