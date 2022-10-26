const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const DeepCloner = require("../src/index");

chai.use(sinonChai);
const assert = chai.assert;

describe("new DeepCloner().clone", () => {
  it("是一个类", () => {
    assert.isFunction(DeepCloner);
  });
  it("能够复制基本类型", () => {
    const n = 123;
    const n2 = new DeepCloner().clone(n);
    assert(n2 === n);
    const s = "123";
    const s2 = new DeepCloner().clone(s);
    assert(s === s2);
    const bool = true;
    const bool2 = new DeepCloner().clone(bool);
    assert(bool === bool2);
    const u = undefined;
    const u2 = new DeepCloner().clone(u);
    assert(u === u2);
    const empty = null;
    const empty2 = new DeepCloner().clone(empty);
    assert(empty === empty2);
    const sym = Symbol();
    const sym2 = new DeepCloner().clone(sym);
    assert(sym === sym2);
  });
  describe("对象", () => {
    it("能够复制普通对象", () => {
      const a = { name: "小雪", child: { name: "小小雪" } };
      const a2 = new DeepCloner().clone(a);
      assert(a2 !== a);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
      assert(a.child.name === a2.child.name);
    });

    it("能够复制数组对象", () => {
      const a = [
        [1, 2],
        [11, 22],
        [22, 33],
      ];
      const a2 = new DeepCloner().clone(a);
      assert(a2 !== a);
      assert(a2[0] !== a[0]);
      assert(a2[1] !== a[1]);
      assert(a2[2] !== a[2]);
      assert.deepEqual(a, a2); //值全部相等
    });

    it("能够复制函数", () => {
      const a = function (x, y) {
        return x + y;
      };
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a2 !== a);
      assert(a2.xxx !== a.xxx);
      assert(a2.xxx.yyy !== a.xxx.yyy);
      assert(a2.xxx.yyy.zzz === a.xxx.yyy.zzz);
      assert(a2(1, 2) === a(1, 2));
    });

    it("环也能复制", () => {
      const a = { name: "方方" };
      a.self = a;
      const a2 = new DeepCloner().clone(a);
      assert(a2 !== a);
      assert(a2.name === a.name);
      assert(a2.self !== a.self);
    });

    it("可以复制日期", () => {
      const a = new Date();
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a2 !== a);
      assert(a2.getTime() === a.getTime());
      assert(a2.xxx !== a.xxx);
      assert(a2.xxx.yyy !== a.xxx.yyy);
      assert(a2.xxx.yyy.zzz === a.xxx.yyy.zzz);
    });

    it("可以复制正则表达式", () => {
      // const a = /hi\d+/gi
      const a = new RegExp("hi\\d+", "gi");
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a2 !== a);
      assert(a2.source === a.source);
      assert(a2.flags === a.flags);
      assert(a2.xxx !== a.xxx);
      assert(a2.xxx.yyy !== a.xxx.yyy);
      assert(a2.xxx.yyy.zzz === a.xxx.yyy.zzz);
    });

    it("自动跳过原型属性", () => {
      const a = Object.create({ name: "a" });
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a2 !== a);
      assert.isFalse("name" in a2);
      assert(a2.xxx !== a.xxx);
      assert(a2.xxx.yyy !== a.xxx.yyy);
      assert(a2.xxx.yyy.zzz === a.xxx.yyy.zzz);
    });

    it("很复杂的对象", () => {
      const a = {
        n: NaN,
        n2: Infinity,
        s: "",
        bool: false,
        null: null,
        u: undefined,
        sym: Symbol(),
        o: {
          n: NaN,
          n2: Infinity,
          s: "",
          bool: false,
          null: null,
          u: undefined,
          sym: Symbol(),
        },
        array: [
          {
            n: NaN,
            n2: Infinity,
            s: "",
            bool: false,
            null: null,
            u: undefined,
            sym: Symbol(),
          },
        ],
      };
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert.isNaN(a2.n);
      assert(a.n2 === a2.n2);
      assert(a.s === a2.s);
      assert(a.bool === a2.bool);
      assert(a.null === a2.null);
      assert(a.u === a2.u);
      assert(a.sym === a2.sym);
      assert(a.o !== a2.o);
      assert.isNaN(a2.o.n);
      assert(a.o.n2 === a2.o.n2);
      assert(a.o.s === a2.o.s);
      assert(a.o.bool === a2.o.bool);
      assert(a.o.null === a2.o.null);
      assert(a.o.u === a2.o.u);
      assert(a.o.sym === a2.o.sym);
      assert(a.array !== a2.array);
      assert(a.array[0] !== a2.array[0]);
      assert.isNaN(a2.array[0].n);
      assert(a.array[0].n2 === a2.array[0].n2);
      assert(a.array[0].s === a2.array[0].s);
      assert(a.array[0].bool === a2.array[0].bool);
      assert(a.array[0].null === a2.array[0].null);
      assert(a.array[0].u === a2.array[0].u);
      assert(a.array[0].sym === a2.array[0].sym);
    });
  });
});
