/**
 * k-d Tree JavaScript - V 1.0
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */ (function() {
  function a(a, b, c) {
    (this.obj = a),
      (this.left = null),
      (this.right = null),
      (this.parent = c),
      (this.dimension = b);
  }
  function b(b, d, e) {
    function g(b, c, d) {
      var f = c % e.length,
        h,
        i;
      return b.length === 0
        ? null
        : b.length === 1
        ? new a(b[0], f, d)
        : (b.sort(function(a, b) {
            return a[e[f]] - b[e[f]];
          }),
          (h = Math.floor(b.length / 2)),
          (i = new a(b[h], f, d)),
          (i.left = g(b.slice(0, h), c + 1, i)),
          (i.right = g(b.slice(h + 1), c + 1, i)),
          i);
    }
    var f = this;
    (this.root = g(b, 0, null)),
      (this.insert = function(b) {
        function c(a, d) {
          if (a === null) return d;
          var f = e[a.dimension];
          return b[f] < a.obj[f] ? c(a.left, a) : c(a.right, a);
        }
        var d = c(this.root, null),
          f,
          g;
        if (d === null) {
          this.root = new a(b, 0, null);
          return;
        }
        (f = new a(b, (d.dimension + 1) % e.length, d)),
          (g = e[d.dimension]),
          b[g] < d.obj[g] ? (d.left = f) : (d.right = f);
      }),
      (this.remove = function(a) {
        function c(b) {
          if (b === null) return null;
          if (b.obj === a) return b;
          var d = e[b.dimension];
          return a[d] < b.obj[d] ? c(b.left, b) : c(b.right, b);
        }
        function d(a) {
          function h(a, b) {
            var c, d, f, g, i;
            return a === null
              ? null
              : ((c = e[b]),
                a.dimension === b
                  ? a.right !== null
                    ? h(a.right, b)
                    : a
                  : ((d = a.obj[c]),
                    (f = h(a.left, b)),
                    (g = h(a.right, b)),
                    (i = a),
                    f !== null && f.obj[c] > d && (i = f),
                    g !== null && g.obj[c] > i.obj[c] && (i = g),
                    i));
          }
          function i(a, b) {
            var c, d, f, g, h;
            return a === null
              ? null
              : ((c = e[b]),
                a.dimension === b
                  ? a.left !== null
                    ? i(a.left, b)
                    : a
                  : ((d = a.obj[c]),
                    (f = i(a.left, b)),
                    (g = i(a.right, b)),
                    (h = a),
                    f !== null && f.obj[c] < d && (h = f),
                    g !== null && g.obj[c] < h.obj[c] && (h = g),
                    h));
          }
          var b, c, g;
          if (a.left === null && a.right === null) {
            if (a.parent === null) {
              f.root = null;
              return;
            }
            (g = e[a.parent.dimension]),
              a.obj[g] < a.parent.obj[g]
                ? (a.parent.left = null)
                : (a.parent.right = null);
            return;
          }
          a.left !== null
            ? (b = h(a.left, a.dimension))
            : (b = i(a.right, a.dimension)),
            (c = b.obj),
            d(b),
            (a.obj = c);
        }
        var b;
        b = c(f.root);
        if (b === null) return;
        d(b);
      }),
      (this.nearest = function(a, b, g) {
        function k(c) {
          function o(a, c) {
            j.push([a, c]), j.size() > b && j.pop();
          }
          var f,
            g = e[c.dimension],
            h = d(a, c.obj),
            i = {},
            l,
            m,
            n;
          for (n = 0; n < e.length; n += 1)
            n === c.dimension ? (i[e[n]] = a[e[n]]) : (i[e[n]] = c.obj[e[n]]);
          l = d(i, c.obj);
          if (c.right === null && c.left === null) {
            (j.size() < b || h < j.peek()[1]) && o(c, h);
            return;
          }
          c.right === null
            ? (f = c.left)
            : c.left === null
            ? (f = c.right)
            : a[g] < c.obj[g]
            ? (f = c.left)
            : (f = c.right),
            k(f),
            (j.size() < b || h < j.peek()[1]) && o(c, h);
          if (j.size() < b || Math.abs(l) < j.peek()[1])
            f === c.left ? (m = c.right) : (m = c.left), m !== null && k(m);
        }
        var h, i, j;
        j = new c(function(a) {
          return -a[1];
        });
        if (g) for (h = 0; h < b; h += 1) j.push([null, g]);
        k(f.root), (i = []);
        for (h = 0; h < b; h += 1)
          j.content[h][0] && i.push([j.content[h][0].obj, j.content[h][1]]);
        return i;
      }),
      (this.balanceFactor = function() {
        function a(b) {
          return b === null ? 0 : Math.max(a(b.left), a(b.right)) + 1;
        }
        function b(a) {
          return a === null ? 0 : b(a.left) + b(a.right) + 1;
        }
        return a(f.root) / (Math.log(b(f.root)) / Math.log(2));
      });
  }
  function c(a) {
    (this.content = []), (this.scoreFunction = a);
  }
  (c.prototype = {
    push: function(a) {
      this.content.push(a), this.bubbleUp(this.content.length - 1);
    },
    pop: function() {
      var a = this.content[0],
        b = this.content.pop();
      return (
        this.content.length > 0 && ((this.content[0] = b), this.sinkDown(0)), a
      );
    },
    peek: function() {
      return this.content[0];
    },
    remove: function(a) {
      var b = this.content.length;
      for (var c = 0; c < b; c++)
        if (this.content[c] == a) {
          var d = this.content.pop();
          c != b - 1 &&
            ((this.content[c] = d),
            this.scoreFunction(d) < this.scoreFunction(a)
              ? this.bubbleUp(c)
              : this.sinkDown(c));
          return;
        }
      throw new Error("Node not found.");
    },
    size: function() {
      return this.content.length;
    },
    bubbleUp: function(a) {
      var b = this.content[a];
      while (a > 0) {
        var c = Math.floor((a + 1) / 2) - 1,
          d = this.content[c];
        if (!(this.scoreFunction(b) < this.scoreFunction(d))) break;
        (this.content[c] = b), (this.content[a] = d), (a = c);
      }
    },
    sinkDown: function(a) {
      var b = this.content.length,
        c = this.content[a],
        d = this.scoreFunction(c);
      for (;;) {
        var e = (a + 1) * 2,
          f = e - 1,
          g = null;
        if (f < b) {
          var h = this.content[f],
            i = this.scoreFunction(h);
          i < d && (g = f);
        }
        if (e < b) {
          var j = this.content[e],
            k = this.scoreFunction(j);
          k < (g == null ? d : i) && (g = e);
        }
        if (g == null) break;
        (this.content[a] = this.content[g]), (this.content[g] = c), (a = g);
      }
    }
  }),
    (this.kdTree = b),
    typeof exports != "undefined" &&
      ((exports.kdTree = b), (exports.BinaryHeap = c));
})();