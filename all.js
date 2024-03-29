function aLoadFile(a, b) {
    var c = new XMLHttpRequest;
    c.open("GET", a, !0), c.onload = function(a) {
        b(a.target.response)
    }, c.send()
}

function aLoadJSON(a, b) {
    aLoadFile(a, function(a) {
        b(JSON.parse(a))
    })
}

function toVector() {
    var a = arguments[0];
    if (3 == a.length) return new Vector(a[0], a[1], a[2]);
    if (1 == a.length) {
        if (a[0] instanceof Vector) return a[0];
        if (a[0] instanceof Array) return new Vector(a[0][0], a[0][1], a[0][2])
    }
}

function saveObjectOnTheFly(a) {
    var b = "data:text/json;charset=utf8," + encodeURIComponent(JSON.stringify(a));
    window.open(b, "_blank"), window.focus()
}

function canvasInit() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height), gl.clearColor(0, 0, 0, 1), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT), gl.enable(gl.DEPTH_TEST), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
}

function enterFullScreen(a) {
    var b = document.getElementById(a);
    b.requestFullScreen ? b.requestFullScreen() : b.webkitRequestFullScreen ? b.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : b.mozRequestFullScreen ? b.mozRequestFullScreen() : alert("Your browser does not support full screen mode, it is time to move to a newer ;)"), gl.canvas && (gl.canvas.width = screen.width, gl.canvas.height = screen.height), canvasInit()
}

function setDict(a, b, c) {
    for (b = b.split("."); b.length > 1;) a = a[b.shift()];
    return a[b.shift()] = c
}

function trimWhitespace(a) {
    for (var b in a) "" == a[b] && a.splice(b, 1)
}

function trimString(a) {
    return String(a).replace(/^\s+|\s+$/g, "")
}

function compare(a, b) {
    if (a instanceof Array) {
        if (a.length != b.length) return !1;
        for (var c = 0, d = a.length; d > c; c++)
            if (a[c] instanceof Array && b[c] instanceof Array) {
                if (!compareArrays(a[c], b[c])) return !1
            } else if (a[c] != b[c]) return !1;
        return !0
    }
    return a == b
}

function defineDynamicProperty(a, b) {
    return function(c) {
        this[a][b] = c
    }
}

function printInFrame(a) {
    gl.frame == a
}

function pickOctant(a) {
    return new Vector(2 * (1 & a) - 1, (2 & a) - 1, (4 & a) / 2 - 1)
}

function regexMap(a, b, c) {
    for (; null != (result = a.exec(b));) c(result)
}

function fix(a, b) {
    var c = /^((\s*\/\/.*\n|\s*#extension.*\n)+)[^]*$/.exec(b);
    return b = c ? c[1] + a + b.substr(c[1].length) : a + b, regexMap(/\bgl_\w+\b/g, a, function(a) {
        b = b.replace(new RegExp(a, "g"), "_" + a)
    }), b
}

function loadFile(a, b, c, d) {
    var e = new XMLHttpRequest;
    e.open("GET", a, !0), e.onreadystatechange = function() {
        4 == e.readyState && (200 == e.status ? c(e.responseText, b) : d(a))
    }, e.send(null)
}

function loadFiles(a, b, c) {
    function d(a, c) {
        g[c] = a, f++, f == e && b(g)
    }
    for (var e = a.length, f = 0, g = [], h = 0; e > h; h++) loadFile(a[h], h, d, c)
}

function getTexNum() {
    for (var a = 0, b = 1; b < TXTS.length; b++)
        if ("empty" == TXTS[b]) {
            a = b;
            break
        }
    return a
}

function getShNum() {
    for (var a = 1; a < SHDS.length + 1; a++)
        if ("empty" == SHDS[a]) return SHDS[a] = "shader", a
}

function getImage() {
    BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
    var a = new XMLHttpRequest;
    a.open("GET", "/path/to/image.png", !0), a.responseType = "arraybuffer", a.onload = function() {
        if (200 == this.status) {
            var a = new BlobBuilder;
            a.append(this.response); {
                a.getBlob("image/jpg")
            }
        }
    }, a.send()
}

function glStart(a) {
    a();
    var b = !1;
    gl.canvas.width == window.innerWidth && gl.canvas.height == window.innerHeight && (b = !0), window.onresize = function() {
        gl.canvas.width = window.innerWidth, gl.canvas.height = window.innerHeight, canvasInit()
    }
}

function _ind(a) {
    var b = a.split("/"),
        c = [];
    for (var d in b) {
        var e = b[d];
        c.push(e ? parseInt(e) - 1 : -1)
    }
    for (; c.length < 3;) c.push(-1);
    return c.slice(0, 3)
}
TextNode = function(a) {
    var b = document.getElementById(a);
    if (!b) return null;
    for (var c = "", d = b.firstChild; d;) 3 == d.nodeType && (c += d.textContent), d = d.nextSibling;
    return this.str = c, this
};
var aGLExists = function(a) {
        var b = document.getElementById(a),
            c = document.body;
        if (c.background.color = "red", !b) return null;
        var d = b.getContext("webgl", {
            alpha: !1
        }) || b.getContext("experimental-webgl", {
            alpha: !1
        });
        return d ? (void 0 == d.FALSE && (d.FALSE = 0), void 0 == d.TRUE && (d.TRUE = 1), d.canvas = b, d.canvas.width = d.canvas.clientWidth, d.canvas.height = b.clientHeight, d) : (alert("No webgl supporta"), null)
    },
    gl, setGL = function(a) {
        gl = aGLExists(a)
    },
    returnGL = function(a) {
        return aGLExists(a)
    };
Object.byString = function(a, b) {
    b = b.replace(/\[(\w+)\]/g, ".$1"), b = b.replace(/^\./, "");
    for (var c = b.split("."); c.length;) {
        var d = c.shift();
        if (!(d in a)) return;
        a = a[d]
    }
    return a
}, Math.radToDeg = 180 / Math.PI, Math.degToRad = Math.PI / 180;
var Vector = function(a, b, c) {
    this.x = a || 0, this.y = b || 0, this.z = c || 0
};
Vector.prototype.negative = function() {
    return new Vector(-this.x, -this.y, -this.z)
}, Vector.prototype.add = function(a) {
    var b = a instanceof Vector;
    return new Vector(this.x + (b ? a.x : a), this.y + (b ? a.y : a), this.z + (b ? a.z : a))
}, Vector.prototype.subtract = function(a) {
    var b = a instanceof Vector;
    return new Vector(this.x - (b ? a.x : a), this.y - (b ? a.y : a), this.z - (b ? a.z : a))
}, Vector.prototype.multiply = function(a) {
    var b = a instanceof Vector;
    return new Vector(this.x * (b ? a.x : a), this.y * (b ? a.y : a), this.z * (b ? a.z : a))
}, Vector.prototype.divide = function(a) {
    var b = a instanceof Vector;
    return new Vector(this.x / (b ? a.x : a), this.y / (b ? a.y : a), this.z / (b ? a.z : a))
}, Vector.prototype.dot = function(a) {
    return this.x * a.x + this.y * a.y + this.z * a.z
}, Vector.prototype.cross = function(a) {
    return new Vector(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x)
}, Vector.prototype.length = function() {
    return Math.sqrt(this.dot(this))
}, Vector.prototype.unit = function() {
    return this.divide(this.length())
}, Vector.prototype.min = function() {
    return Math.min(Math.min(this.x, this.y), this.z)
}, Vector.prototype.absmin = function() {
    return Math.min(Math.min(Math.abs(this.x), Math.abs(this.y)), Math.abs(this.z))
}, Vector.prototype.max = function() {
    return Math.max(Math.max(this.x, this.y), this.z)
}, Vector.prototype.absmax = function() {
    return Math.max(Math.max(Math.abs(this.x), Math.abs(this.y)), Math.abs(this.z))
}, Vector.prototype.normalize = function() {
    return this.divide(this.absmax())
}, Vector.prototype.randomize = function() {
    return new Vector(this.x * Math.random(), this.y * Math.random(), this.z * Math.random())
}, Vector.prototype.toAngles = function() {
    return {
        theta: Math.atan2(this.z, this.x),
        phi: Math.asin(this.y / this.length())
    }
}, Vector.prototype.toArray = function(a) {
    return [this.x, this.y, this.z].slice(0, a || 3)
}, Vector.prototype.isZero = function() {
    return 0 == this.x && 0 == this.y && 0 == this.z
}, Vector.distance = function(a, b) {
    if (a instanceof Vector && b instanceof Vector);
    else var a = new Vector(a[0], a[1], a[2]),
        b = new Vector(b[0], b[1], b[2]);
    return b.subtract(a).length()
}, Vector.distanceXZ = function(a, b) {
    if (a instanceof Vector && b instanceof Vector);
    else var a = new Vector(a[0], 0, a[2]),
        b = new Vector(b[0], 0, b[2]);
    return b.subtract(a).length()
}, Vector.distanceXY = function(a, b) {
    if (a instanceof Vector && b instanceof Vector);
    else var a = new Vector(a[0], a[1], 0),
        b = new Vector(b[0], b[1], 0);
    return b.subtract(a).length()
}, Vector.distanceYZ = function(a, b) {
    if (a instanceof Vector && b instanceof Vector);
    else var a = new Vector(0, a[1], a[2]),
        b = new Vector(0, b[1], b[2]);
    return b.subtract(a).length()
}, Vector.fromAngles = function(a, b) {
    return new Vector(Math.cos(a) * Math.cos(b), Math.sin(b), Math.sin(a) * Math.cos(b))
}, Vector.random = function() {
    return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(2 * Math.random() - 1))
}, Vector.min = function(a, b) {
    return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z))
}, Vector.max = function(a, b) {
    return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z))
}, Vector.lerp = function(a, b, c) {
    return a.add(b.subtract(a).multiply(c))
}, Vector.fromArray = function(a) {
    return new Vector(a[0], a[1], a[2])
};
var Vector4 = function(a, b, c, d) {
    this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = d || 1
};
Vector4.prototype.dot = function(a) {
    return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
};
var Matrix3 = function() {
    this.m = Array.prototype.concat.apply([], arguments), this.m.length || this.m - [1, 0, 0, 0, 1, 0, 0, 0, 1]
};
Matrix3.prototype.transpose = function() {
    var a = this.m;
    return new Matrix3(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8])
};
var Matrix = function() {
    this.m = Array.prototype.concat.apply([], arguments), this.m.length || (this.m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
};
Matrix.prototype.inverse = function() {
    var a = this.m,
        b = new Matrix(a[5] * a[10] * a[15] - a[5] * a[14] * a[11] - a[6] * a[9] * a[15] + a[6] * a[13] * a[11] + a[7] * a[9] * a[14] - a[7] * a[13] * a[10], -a[1] * a[10] * a[15] + a[1] * a[14] * a[11] + a[2] * a[9] * a[15] - a[2] * a[13] * a[11] - a[3] * a[9] * a[14] + a[3] * a[13] * a[10], a[1] * a[6] * a[15] - a[1] * a[14] * a[7] - a[2] * a[5] * a[15] + a[2] * a[13] * a[7] + a[3] * a[5] * a[14] - a[3] * a[13] * a[6], -a[1] * a[6] * a[11] + a[1] * a[10] * a[7] + a[2] * a[5] * a[11] - a[2] * a[9] * a[7] - a[3] * a[5] * a[10] + a[3] * a[9] * a[6], -a[4] * a[10] * a[15] + a[4] * a[14] * a[11] + a[6] * a[8] * a[15] - a[6] * a[12] * a[11] - a[7] * a[8] * a[14] + a[7] * a[12] * a[10], a[0] * a[10] * a[15] - a[0] * a[14] * a[11] - a[2] * a[8] * a[15] + a[2] * a[12] * a[11] + a[3] * a[8] * a[14] - a[3] * a[12] * a[10], -a[0] * a[6] * a[15] + a[0] * a[14] * a[7] + a[2] * a[4] * a[15] - a[2] * a[12] * a[7] - a[3] * a[4] * a[14] + a[3] * a[12] * a[6], a[0] * a[6] * a[11] - a[0] * a[10] * a[7] - a[2] * a[4] * a[11] + a[2] * a[8] * a[7] + a[3] * a[4] * a[10] - a[3] * a[8] * a[6], a[4] * a[9] * a[15] - a[4] * a[13] * a[11] - a[5] * a[8] * a[15] + a[5] * a[12] * a[11] + a[7] * a[8] * a[13] - a[7] * a[12] * a[9], -a[0] * a[9] * a[15] + a[0] * a[13] * a[11] + a[1] * a[8] * a[15] - a[1] * a[12] * a[11] - a[3] * a[8] * a[13] + a[3] * a[12] * a[9], a[0] * a[5] * a[15] - a[0] * a[13] * a[7] - a[1] * a[4] * a[15] + a[1] * a[12] * a[7] + a[3] * a[4] * a[13] - a[3] * a[12] * a[5], -a[0] * a[5] * a[11] + a[0] * a[9] * a[7] + a[1] * a[4] * a[11] - a[1] * a[8] * a[7] - a[3] * a[4] * a[9] + a[3] * a[8] * a[5], -a[4] * a[9] * a[14] + a[4] * a[13] * a[10] + a[5] * a[8] * a[14] - a[5] * a[12] * a[10] - a[6] * a[8] * a[13] + a[6] * a[12] * a[9], a[0] * a[9] * a[14] - a[0] * a[13] * a[10] - a[1] * a[8] * a[14] + a[1] * a[12] * a[10] + a[2] * a[8] * a[13] - a[2] * a[12] * a[9], -a[0] * a[5] * a[14] + a[0] * a[13] * a[6] + a[1] * a[4] * a[14] - a[1] * a[12] * a[6] - a[2] * a[4] * a[13] + a[2] * a[12] * a[5], a[0] * a[5] * a[10] - a[0] * a[9] * a[6] - a[1] * a[4] * a[10] + a[1] * a[8] * a[6] + a[2] * a[4] * a[9] - a[2] * a[8] * a[5]),
        c = a[0] * b.m[0] + a[1] * b.m[4] + a[2] * b.m[8] + a[3] * b.m[12];
    if (0 == c) return new Matrix;
    for (var d = 0; 16 > d; d++) b.m[d] /= c;
    return b
}, Matrix.prototype.toInverseMat3 = function() {
    var a, b = this.m,
        c = b[0],
        d = b[1],
        e = b[2],
        f = b[4],
        g = b[5],
        h = b[6],
        i = b[8],
        j = b[9],
        k = b[10],
        l = k * g - h * j,
        m = -k * f + h * i,
        n = j * f - g * i,
        o = c * l + d * m + e * n;
    if (!o) return null;
    a = 1 / o;
    var p = new Matrix3;
    return dest = p.m, dest[0] = l * a, dest[1] = (-k * d + e * j) * a, dest[2] = (h * d - e * g) * a, dest[3] = m * a, dest[4] = (k * c - e * i) * a, dest[5] = (-h * c + e * f) * a, dest[6] = n * a, dest[7] = (-j * c + d * i) * a, dest[8] = (g * c - d * f) * a, p
}, Matrix.prototype.transpose = function() {
    var a = this.m;
    return new Matrix(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
}, Matrix.prototype.multiply = function(a) {
    var b = this.m,
        c = a.m;
    return new Matrix(b[0] * c[0] + b[1] * c[4] + b[2] * c[8] + b[3] * c[12], b[0] * c[1] + b[1] * c[5] + b[2] * c[9] + b[3] * c[13], b[0] * c[2] + b[1] * c[6] + b[2] * c[10] + b[3] * c[14], b[0] * c[3] + b[1] * c[7] + b[2] * c[11] + b[3] * c[15], b[4] * c[0] + b[5] * c[4] + b[6] * c[8] + b[7] * c[12], b[4] * c[1] + b[5] * c[5] + b[6] * c[9] + b[7] * c[13], b[4] * c[2] + b[5] * c[6] + b[6] * c[10] + b[7] * c[14], b[4] * c[3] + b[5] * c[7] + b[6] * c[11] + b[7] * c[15], b[8] * c[0] + b[9] * c[4] + b[10] * c[8] + b[11] * c[12], b[8] * c[1] + b[9] * c[5] + b[10] * c[9] + b[11] * c[13], b[8] * c[2] + b[9] * c[6] + b[10] * c[10] + b[11] * c[14], b[8] * c[3] + b[9] * c[7] + b[10] * c[11] + b[11] * c[15], b[12] * c[0] + b[13] * c[4] + b[14] * c[8] + b[15] * c[12], b[12] * c[1] + b[13] * c[5] + b[14] * c[9] + b[15] * c[13], b[12] * c[2] + b[13] * c[6] + b[14] * c[10] + b[15] * c[14], b[12] * c[3] + b[13] * c[7] + b[14] * c[11] + b[15] * c[15])
}, Matrix.prototype.transformPoint = function(a) {
    var b = this.m;
    return a instanceof Vector ? new Vector(b[0] * a.x + b[1] * a.y + b[2] * a.z + b[3], b[4] * a.x + b[5] * a.y + b[6] * a.z + b[7], b[8] * a.x + b[9] * a.y + b[10] * a.z + b[11]).divide(b[12] * a.x + b[13] * a.y + b[14] * a.z + b[15]) : new Vector(b[0] * a[0] + b[1] * a[1] + b[2] * a[2] + b[3], b[4] * a[0] + b[5] * a[1] + b[6] * a[2] + b[7], b[8] * a[0] + b[9] * a[1] + b[10] * a[2] + b[11]).divide(b[12] * a[0] + b[13] * a[1] + b[14] * a[2] + b[15])
}, Matrix.prototype.transformVector = function(a) {
    var b = this.m;
    return new Vector(b[0] * a.y + b[1] * a.y + b[2] * a.z, b[4] * a.x + b[5] * a.y + b[6] * a.z, b[8] * a.x + b[9] * a.y + b[10] * a.z)
}, Matrix.perspective = function(a, b, c, d) {
    var e = Math.tan(a * Math.PI / 360) * c,
        f = e * b;
    return Matrix.frustum(-f, f, -e, e, c, d)
}, Matrix.frustum = function(a, b, c, d, e, f) {
    return new Matrix(2 * e / (b - a), 0, (b + a) / (b - a), 0, 0, 2 * e / (d - c), (d + c) / (d - c), 0, 0, 0, -(f + e) / (f - e), -2 * f * e / (f - e), 0, 0, -1, 0)
}, Matrix.ortho = function(a, b, c, d, e, f) {
    return new Matrix(2 / (b - a), 0, 0, (b + a) / (b - a), 0, 2 / (d - c), 0, (d + c) / (d - c), 0, 0, -2 / (f - e), (f + e) / (f - e), 0, 0, 0, 1)
}, Matrix.scale = function(a, b, c) {
    return new Matrix(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1)
}, Matrix.translate = function(a, b, c) {
    return new Matrix(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1)
}, Matrix.rotate = function(a, b, c, d) {
    if (a && (b || c || d)) {
        var e = Math.sqrt(b * b + c * c + d * d);
        a *= Math.PI / 180, b /= e, c /= e, d /= e;
        var f = Math.cos(a),
            g = Math.sin(a),
            h = 1 - f;
        return new Matrix(b * b * h + f, b * c * h - d * g, b * d * h + c * g, 0, c * b * h + d * g, c * c * h + f, c * d * h - b * g, 0, d * b * h - c * g, d * c * h + b * g, d * d * h + f, 0, 0, 0, 0, 1)
    }
    return new Matrix
}, Matrix.prototype.rotateVector = function(a, b, c) {
    var d = this;
    return d = d.multiply(Matrix.rotate(a, 1, 0, 0)), d = d.multiply(Matrix.rotate(b, 0, 1, 0)), d = d.multiply(Matrix.rotate(c, 0, 0, 1))
}, Matrix.lookAt = function(a, b, c, d, e, f, g, h, i) {
    var j = new Vector(a, b, c),
        k = new Vector(d, e, f),
        l = new Vector(g, h, i),
        m = j.subtract(k).unit(),
        n = l.cross(m).unit(),
        o = m.cross(n).unit();
    return new Matrix(n.x, n.y, n.z, -n.dot(j), o.x, o.y, o.z, -o.dot(j), m.x, m.y, m.z, -m.dot(j), 0, 0, 0, 1)
}, Quaternion = function(a, b, c, d, e) {
    if (arguments.length > 3) {
        e = e || Number.EPSILON;
        var f = a * a + b * b + c * c + d * d;
        Math.abs(f - 1) > e && (magSqrt = Math.sqrt(f), a /= magSqrt, b /= magSqrt, c /= magSqrt, d /= magSqrt)
    }
    this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = d || 1
}, Quaternion.prototype.getMatrix = function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m = new Matrix;
    return m.m[15] = 1, a = this.x + this.x, b = this.y + this.y, c = this.z + this.z, j = a * this.w, k = b * this.w, l = c * this.z, d = a * this.x, e = b * this.x, f = c * this.x, g = b * this.y, h = c * this.y, i = c * this.z, m[0] = 1 - (g + i), m[4] = e - l, m[8] = f + k, m[1] = e + l, m[5] = 1 - (d + i), m[9] = h - j, m[2] = f - k, m[6] = h + j, m[10] = 1 - (d + g), m
}, Quaternion.prototype.negative = function() {
    return new Quaternion(-this.x, -this.y, -this.z, -this.w)
}, Quaternion.prototype.subtract = function(a) {
    return new Quaternion(this.x - a.x, this.y - a.y, this.z - a.z, this.w - a.w)
}, Quaternion.prototype.add = function(a) {
    return new Quaternion(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w)
}, Quaternion.prototype.multiply = function(a) {
    var b = a instanceof Quaternion;
    return new Quaternion(b ? a.w * this.x + a.x * this.w - a.y * this.z + a.z * this.y : this.x * a, b ? a.w * this.y + a.y * this.w - a.z * this.x + a.x * this.z : this.y * a, b ? a.w * this.z + a.z * this.w - a.x * this.y + a.y * this.x : this.z * a, b ? a.w * this.w - a.x * this.w - a.y * this.y - a.z * this.z : this.w * a)
}, Quaternion.prototype.divide = function(a) {
    var b = a instanceof Quaternion;
    return new Quaternion(b ? a.w * this.x + a.x * this.w - a.y * this.z + a.z * this.y : a, b ? a.w * this.y + a.y * this.w - a.z * this.x + a.x * this.z : a, b ? a.w * this.z + a.z * this.w - a.x * this.y + a.y * this.x : a, b ? a.w * this.w - a.x * this.w - a.y * this.y - a.z * this.z : a)
}, Quaternion.prototype.magnitudeSquared = function() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
}, Quaternion.prototype.magnitude = function() {
    return Math.sqrt(this.magnitudeSquared())
}, Quaternion.prototype.inverse = function() {
    var a = this.magnitudeSquared();
    return new Quaternion(-this.x / a, -this.y / a, -this.z / a, -this.w / a)
}, Quaternion.prototype.rotateVector = function(a) {
    return qVector = new Quaternion(a.x, a.y, a.z, 0), qPrim = this.negative(), mult = this.multiply(qVector).multiply(qPrim), new Vector(mult.x, mult.y, mult.z)
}, Quaternion.getQuaternionFromEulerAnglesRad = function(a, b, c) {
    var d, e, f, g, h, i, j, k, l;
    return e = Math.cos(a / 2), f = Math.sin(a / 2), g = Math.cos(b / 2), h = Math.sin(b / 2), i = Math.cos(c / 2), j = Math.sin(c / 2), k = e * g, l = f * h, d = k * i + l * j, a = f * g * i - e * h * j, b = e * h * i + f * g * j, c = k * j - l * i, new Quaternion(a, b, c, d)
}, Quaternion.getQuaternionFromEulerDeg = function(a, b, c) {
    return Quaternion.getQuaternionFromEulerAnglesRad(Math.degToRad * a, Math.degToRad * b, Math.degToRad * c)
}, Quaternion.getQuaternionFromAxisAngle = function(a, b) {
    var c, d, e, f, g, h, i;
    if (a.isZero) return new Quaternion;
    var j = a.length();
    return Math.abs(j - 1) > Number.EPSILON && (i = a.unit()), g = b / 2, f = Math.cos(g), h = Math.sin(g), c = i.x * h, d = i.y * h, e = i.z * h, new Quaternion(c, d, e, f)
}, Quaternion.getQuaternionFromAxisAngleDeg = function(a, b) {
    return Quaternion.getQuaternionFromAxisAngle(a, Math.degToRad * b)
}, Quaternion.getQuaternionFromMatrix = function(a) {
    var b, c, d, e, f = a.m,
        g = f[0] + f[5] + f[10];
    return g > 0 ? (S = 2 * Math.sqrt(g + 1), b = .25 * S, c = (f[9] - f[6]) / S, d = (f[2] - f[8]) / S, e = (f[4] - f[1]) / S) : f[0] > f[5] & f[0] > f[10] ? (S = 2 * Math.sqrt(1 + f[0] - f[5] - f[10]), b = (f[9] - f[6]) / S, c = .25 * S, d = (f[1] + f[4]) / S, e = (f[2] + f[8]) / S) : f[5] > f[10] ? (S = 2 * Math.sqrt(1 + f[5] - f[0] - f[10]), b = (f[2] - f[8]) / S, c = (f[1] + f[4]) / S, d = .25 * S, e = (f[6] + f[9]) / S) : (S = 2 * Math.sqrt(1 + f[10] - f[0] - f[5]), b = (f[4] - f[1]) / S, c = (f[2] + f[8]) / S, d = (f[6] + f[9]) / S, e = .25 * S), new Quaternion(c, d, e, b)
}, Quaternion.getQuaternionFromSpherical = function(a, b, c) {
    var d, e, f, g, h, i, j, k, l, m;
    return d = Math.sin(c / 2), e = Math.cos(c / 2), f = Math.sin(a), g = Math.cos(a), h = Math.sin(b), i = Math.cos(b), j = d * g * h, k = d * f, l = d * f * i, m = e, new Quaternion(j, k, l, m)
}, Quaternion.getRotationTo = function(a, b) {
    var c = a.cross(b),
        d = a.dot(b);
    return new Quaternion(c.x, c.y, c.z, d + Math.sqrt(a.dot(a) * b.dot(b)))
}, Frustum = function() {
    this.planes = new Array(6), this.corners = new Array(8)
}, Frustum.prototype.fromPerspectiveMatrix = function(a) {
    var b = a.m;
    this.planes[0] = new Vector4(b[8] + b[12], b[9] + b[13], b[10] + b[14], b[11] + b[15]), this.planes[1] = new Vector4(-b[8] + b[12], -b[9] + b[13], -b[10] + b[14], -b[11] + b[15]), this.planes[2] = new Vector4(b[4] + b[12], b[5] + b[13], b[6] + b[14], b[7] + b[15]), this.planes[3] = new Vector4(-b[4] + b[12], -b[5] + b[13], -b[6] + b[14], -b[7] + b[15]), this.planes[4] = new Vector4(b[0] + b[12], b[1] + b[13], b[2] + b[14], b[3] + b[15]), this.planes[5] = new Vector4(-b[0] + b[12], -b[1] + b[13], -b[2] + b[14], -b[3] + b[15])
}, Frustum.prototype.boxInFrustum = function(a) {
    for (var b in this.planes) {
        var c = this.planes[b],
            d = 0;
        if (d += c.dot(new Vector4(a.min.x, a.min.y, a.min.z, 1)) < 0 ? 1 : 0, 0 != d && (d += c.dot(new Vector4(a.max.x, a.min.y, a.min.z, 1)) < 0 ? 1 : 0, 1 != d && (d += c.dot(new Vector4(a.min.x, a.max.y, a.min.z, 1)) < 0 ? 1 : 0, 2 != d && (d += c.dot(new Vector4(a.max.x, a.max.y, a.min.z, 1)) < 0 ? 1 : 0, 3 != d && (d += c.dot(new Vector4(a.min.x, a.min.y, a.max.z, 1)) < 0 ? 1 : 0, 4 != d && (d += c.dot(new Vector4(a.max.x, a.min.y, a.max.z, 1)) < 0 ? 1 : 0, 5 != d && (d += c.dot(new Vector4(a.min.x, a.max.y, a.max.z, 1)) < 0 ? 1 : 0, 6 != d && (d += c.dot(new Vector4(a.max.x, a.max.y, a.max.z, 1)) < 0 ? 1 : 0, 8 == d)))))))) return !1
    }
    return !0
}, Frustum.prototype.sphereInFrustum = function(a) {
    for (var b in this.planes) {
        var c = this.planes[b];
        if (fDistance = c.dot(new Vector4(a.center.x, a.center.y, a.center.z, 1)), fDistance < -a.radius - 2) return !1
    }
    return !0
}, MObject = function(a) {
    this.children = [], a && this.setParent(a)
}, MObject.prototype.addChilds = function(a) {
    -1 == this.children.indexOf(a) && this.children.push(a)
}, MObject.prototype.setParent = function(a) {
    this.parent != a && (null != this.parent && this.parent.removeChild(this), this.parent = a, a.addChilds(this))
}, MObject.prototype.removeChild = function(a) {
    this.children.splice(this.children.indexOf(a), 1)
}, MObject.prototype.remove = function() {
    this.parent.removeChild(this)
}, Aex = function(a) {
    MObject.call(this), this.texture = null, this.wireframe = 0, this.modelView = new Matrix, this.aabb = {}, this._size = new Vector(1, 1, 1), this._rotation = new Vector(0, 0, 0), this._position = new Vector(0, 0, 0), this.uniforms = {
        tiling: [1, 1],
        material: {}
    };
    for (var b in Material._settable) {
        var c = Material._settable[b];
        Object.defineProperty(this.uniforms, c, {
            set: defineDynamicProperty("material", c)
        })
    }
    this.aTextures = {}, this.uniformsDone = 0;
    for (var d in a) {
        var e = a[d];
        this[d] = e
    }
    this.__defineGetter__("aabb", function() {
        var a = this.parent.aabb,
            b = {
                min: a.min.multiply(this.size).add(this.position),
                max: a.max.multiply(this.size).add(this.position)
            };
        return b
    }), this.__defineGetter__("sphere", function() {
        var a = this.parent.sphere,
            b = {
                radius: a.radius * this.size.max(),
                center: a.center.add(this.position)
            };
        return b
    }), this.__defineSetter__("position", function(a) {
        this._position = a
    }), this.__defineGetter__("position", function() {
        return this._position
    }), this.__defineSetter__("x", function(a) {
        this._position.x = a
    }), this.__defineSetter__("y", function(a) {
        this._position.y = a
    }), this.__defineSetter__("z", function(a) {
        this._position.z = a
    }), this.__defineGetter__("x", function() {
        return this._position.x
    }), this.__defineGetter__("y", function() {
        return this._position.y
    }), this.__defineGetter__("z", function() {
        return this._position.z
    }), this.__defineSetter__("rotation", function(a) {
        this._rotation = a
    }), this.__defineGetter__("rotation", function() {
        return this._rotation
    }), this.__defineSetter__("rotX", function(a) {
        this._rotation.x = a
    }), this.__defineSetter__("rotY", function(a) {
        this._rotation.y = a
    }), this.__defineSetter__("rotZ", function(a) {
        this._rotation.z = a
    }), this.__defineGetter__("rotX", function() {
        return this._rotation.x
    }), this.__defineGetter__("rotY", function() {
        return this._rotation.y
    }), this.__defineGetter__("rotZ", function() {
        return this._rotation.z
    }), this.__defineSetter__("size", function(a) {
        this._size = a
    }), this.__defineGetter__("size", function() {
        return this._size
    }), this.__defineSetter__("scaleX", function(a) {
        this._size.x = a
    }), this.__defineSetter__("scaleY", function(a) {
        this._size.y = a
    }), this.__defineSetter__("scaleZ", function(a) {
        this._size.z = a
    }), this.__defineGetter__("scaleX", function() {
        return this._size.x
    }), this.__defineGetter__("scaleY", function() {
        return this._size.y
    }), this.__defineGetter__("scaleZ", function() {
        return this._size.z
    })
}, Aex.prototype = Object.create(MObject.prototype), Aex.prototype.constructor = Aex, Aex.prototype.getAABB = function() {
    return this.parent.getAABB()
}, Aex.prototype.setUniforms = function() {
    1 != gl.gpuNormal && (this.uniforms.NormalMatrix = gl.modelviewMatrix.toInverseMat3().transpose().m), this.uniforms._gl_ModelViewMatrix = gl.modelviewMatrix, gl.currentShader.uniforms(this.uniforms)
}, Aex.prototype.move = function(a, b, c, d) {
    this.position = d ? this.position.add(new Vector(a, b, c)) : new Vector(a, b, c), this.setModelView()
}, Aex.prototype.rotate = function(a, b, c, d) {
    this.rotation = d ? this.rotation.add(new Vector(a, b, c)) : new Vector(a, b, c), this.setModelView()
}, Aex.prototype.scale = function(a, b, c, d) {
    this.size = d ? this.size.add(new Vector(a, b, c)) : new Vector(a, b, c), this.setModelView()
}, Aex.prototype.rotateAroundPoint = function(a, b, c, d, e, f) {
    this.pivotPoint = a;
    var g = new Vector;
    null == this.originPosition && (this.originPosition = this.position);
    var h = this.originPosition.subtract(a),
        i = Math.cos(b * Math.degToRad),
        j = Math.sin(b * Math.degToRad);
    return g.x = (i + (1 - i) * c * c) * h.x, g.x += ((1 - i) * c * d - e * j) * h.y, g.x += ((1 - i) * c * e + d * j) * h.z, g.y = ((1 - i) * c * d + e * j) * h.x, g.y += (i + (1 - i) * d * d) * h.y, g.y += ((1 - i) * d * e - c * j) * h.z, g.z = ((1 - i) * c * e - d * j) * h.x, g.z += ((1 - i) * d * e + c * j) * h.y, g.z += (i + (1 - i) * e * e) * h.z, this.position = a.add(g), f && (this.originPosition = this.position), this.rotate(c * b, d * b, e * b), this.setModelView(), this
}, Aex.prototype.setModelView = function() {
    var a = new Matrix;
    a = a.multiply(Matrix.translate(this.position.x, this.position.y, this.position.z)), a = a.multiply(Matrix.rotate(this.rotation.x, 1, 0, 0)), a = a.multiply(Matrix.rotate(this.rotation.y, 0, 1, 0)), a = a.multiply(Matrix.rotate(this.rotation.z, 0, 0, 1)), a = a.multiply(Matrix.scale(this.size.x, this.size.y, this.size.z)), this.modelView = a
}, Aex.prototype.draw = function(a) {
    if (1 == gl.frustum.sphereInFrustum(this.sphere)) {
        gl.setMatrix(this.modelView), a && gl.currentShader.uniforms(a), this.setUniforms();
        var b = gl.indexBuffers.triangles.buffer.length;
        gl.drawElements(gl.TRIANGLES, b, gl.UNSIGNED_SHORT, 0);
        for (var c in this.children) this.children[c].draw()
    }
}, Scene = function() {
    MObject.call(this), this._globalShaderInit = 0, this._init = !1
}, Scene.prototype = Object.create(MObject.prototype), Scene.prototype.constructor = Scene, Scene.prototype.init = function() {
    canvasInit()
}, Scene.prototype.traverse = function() {
    function a(b) {
        if (b.children.length > 0)
            for (var c in b.children) a(b.children[c])
    }
    a(this)
}, Scene.prototype.draw = function(a) {
    this._init || (this.init(), this._init = !0), gl.viewport(0, 0, gl.canvas.width, gl.canvas.height), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT), a && a.transforms();
    for (var b in this.children) gl.frame += 1, this.children[b].draw()
}, Scene.prototype.drawOverride = function(a, b) {
    function c(a) {
        if (a instanceof Mesh) meshTable.push(a);
        else if (a.children.length > 0)
            for (var b in a.children) c(a.children[b])
    }
    a.useProgram(), a.uniforms(b), a.uniformsSet = {}, meshTable = [], c(this), gl.extradata = meshTable;
    for (var d in meshTable) meshTable[d].draw()
}, Indexer = function() {
    this.unique = [], this.indices = [], this.map = {}
}, Indexer.prototype.add = function(a) {
    var b = JSON.stringify(a);
    return b in this.map || (this.map[b] = this.unique.length, this.unique.push(a)), this.map[b]
}, Buffer = function(a, b) {
    this.buffer = null, this.target = a, this.type = b, this.data = []
}, Buffer.prototype.compile = function(a) {
    for (var b = new Array, c = 0, d = 1e4; c < this.data.length; c += d) b = Array.prototype.concat.apply(b, this.data.slice(c, c + d));
    var e = this.data.length ? b.length / this.data.length : 0;
    if (e != Math.round(e)) throw "buffer elements not of consistent size, average size is " + e;
    this.buffer = this.buffer || gl.createBuffer(), this.buffer.length = b.length, this.buffer.spacing = b.length / this.data.length, gl.bindBuffer(this.target, this.buffer), gl.bufferData(this.target, new this.type(b), a || gl.STATIC_DRAW)
}, Mesh = function(a) {
    return MObject.call(this), a = a || {}, this.transformationStack = [], this.vertexBuffers = {}, this.indexBuffers = {}, this.cameraCoords = [], this._init = !1, this.position = new Vector(0, 0, 0), this.size = new Vector(1, 1, 1), this.tweakers = {}, this.undoStack = [], this.attributes = [], this.scaledUV = 1, mLs = [], this.addVertexBuffer("vertices", "Vertex"), "coords" in a && !a.coords || this.addVertexBuffer("coords", "TexCoord"), "normals" in a && !a.normals || this.addVertexBuffer("normals", "Normal"), this.locations = {
        Vertex: 0,
        Normal: 1,
        TexCoord: 2
    }, this.addIndexBuffer("triangles"), this.addIndexBuffer("lines"), this
}, Mesh.prototype = Object.create(MObject.prototype), Mesh.prototype.constructor = Mesh, Mesh.prototype.draw = function(a) {
    gl.TRIANGLES;
    for (var b in this.vertexBuffers) {
        var c = this.vertexBuffers[b],
            d = this.locations[b];
        null != this.vertexBuffers[b].buffer && (this.attributes[b] = d, gl.bindBuffer(gl.ARRAY_BUFFER, c.buffer), gl.vertexAttribPointer(d, c.buffer.spacing, gl.FLOAT, !1, 0, 0))
    }
    for (var b in this.attributes) b in this.vertexBuffers || gl.disableVertexAttribArray(this.attributes[b]);
    gl.indexBuffers = this.indexBuffers, gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.indexBuffers.triangles.buffer);
    for (var e in this.children) this.children[e].draw(a)
}, Mesh.prototype.addVertexBuffer = function(a, b) {
    var c = this.vertexBuffers[b] = new Buffer(gl.ARRAY_BUFFER, Float32Array);
    c.name = a, this[a] = []
}, Mesh.prototype.addIndexBuffer = function(a) {
    this.indexBuffers[a] = new Buffer(gl.ELEMENT_ARRAY_BUFFER, Uint16Array);
    this[a] = []
}, Mesh.prototype.compile = function() {
    for (var a in this.vertexBuffers) {
        var b = this.vertexBuffers[a];
        b.data = this[b.name], b.compile()
    }
    for (var c in this.indexBuffers) {
        var b = this.indexBuffers[c];
        b.data = this[c], b.compile()
    }
    this.aabb = this.getAABB(), this.sphere = this.getBoundingSphere(this.aabb)
}, Mesh.prototype.transform = function(a, b) {
    for (var c in this.vertices) this.setVertex(c, a.transformPoint(this.vertices[c]).toArray());
    if (this.normals && !b) {
        var d = a.inverse().transpose();
        this.normals = this.normals.map(function(a) {
            return d.transformVector(Vector.fromArray(a)).unit().toArray()
        })
    }
    return this.compile(), this
}, Mesh.prototype._transform = function(a, b) {
    for (var c in this.vertices) this.setVertex(c, a.transformPoint(this.vertices[c]).toArray());
    if (this.normals && !b) {
        var d = a.inverse().transpose();
        this.normals = this.normals.map(function(a) {
            return d.transformVector(Vector.fromArray(a)).unit().toArray()
        })
    }
    return this
}, Mesh.prototype.move = function(a, b, c) {
    return this.transform(Matrix.translate(a, b, c), 1)
}, Mesh.prototype.rotate = function(a, b, c) {
    var d = this.transform(Matrix.rotate(a, 1, 0, 0), 1);
    return d = d.transform(Matrix.rotate(b, 0, 1, 0), 1), d = d.transform(Matrix.rotate(c, 0, 0, 1), 1)
}, Mesh.prototype.scale = function(a, b, c) {
    return this.transform(Matrix.scale(a, b, c), 1)
}, Mesh.prototype.scaleUniform = function(a) {
    return this.transform(Matrix.scale(a, a, a), 1)
}, Mesh.prototype.computeNormals = function() {
    this.normals || this.addVertexBuffer("normals", "Normal");
    for (var a = 0; a < this.vertices.length; a++) this.normals[a] = new Vector;
    for (var a = 0; a < this.triangles.length; a++) {
        var b = this.triangles[a],
            c = Vector.fromArray(this.vertices[b[0]]),
            d = Vector.fromArray(this.vertices[b[1]]),
            e = Vector.fromArray(this.vertices[b[2]]),
            f = d.subtract(c).cross(e.subtract(c)).unit();
        this.normals[b[0]] = this.normals[b[0]].add(f), this.normals[b[1]] = this.normals[b[1]].add(f), this.normals[b[2]] = this.normals[b[2]].add(f)
    }
    for (var a = 0; a < this.vertices.length; a++) this.normals[a] = this.normals[a].unit().toArray();
    return this.compile(), this
}, Mesh.prototype.computeWireframe = function() {
    for (var a = new Indexer, b = 0; b < this.triangles.length; b++)
        for (var c = this.triangles[b], d = 0; d < c.length; d++) {
            var e = c[d],
                f = c[(d + 1) % c.length];
            a.add([Math.min(e, f), Math.max(e, f)])
        }
    return this.lines = a.unique, this.compile(), this
}, Mesh.prototype.getAABB = function() {
    var a = {
        min: new Vector(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE)
    };
    a.max = a.min.negative();
    for (var b = 0; b < this.vertices.length; b++) {
        var c = Vector.fromArray(this.vertices[b]);
        a.min = Vector.min(a.min, c), a.max = Vector.max(a.max, c)
    }
    return a
}, Mesh.prototype.getBoundingSphere = function(a) {
    for (var b = {
            center: a.min.add(a.max).divide(2),
            radius: 0
        }, c = 0; c < this.vertices.length; c++) b.radius = Math.max(b.radius, Vector.fromArray(this.vertices[c]).subtract(b.center).length());
    return b
}, Mesh.prototype.getVertex = function(a) {
    return this.vertices[a]
}, Mesh.prototype.mirrorVertex = function(a) {
    bb = this.getAABB();
    var b = bb.min.x + (bb.max.x - bb.min.x) / 2;
    return xRet = this.vertices[a][0] < b ? b + (b - this.vertices[a][0]) : b - (this.vertices[a][0] - b), this.getClosestVertex(new Vector(xRet, this.vertices[a][1], this.vertices[a][2]), .1)
}, Mesh.prototype.mirrorUV = function(a) {
    return this.getClosestUV([gl.canvas.width * (.5 + (.5 - this.coords[a][0])), gl.canvas.height * this.coords[a][1]], .05)
}, Mesh.prototype.checkRepeat = function() {
    var a = -1;
    for (var b in this.vertices) this.vertices[b] == this.vertices[0] && (a += 1);
    return a
}, Mesh.prototype.getVertexV = function(a) {
    return new Vector(this.vertices[a][0], this.vertices[a][1], this.vertices[a][2])
}, Mesh.prototype.setVertex = function(a, b) {
    this.vertices[a] = b instanceof Vector ? b.toArray() : b
}, Mesh.plane = function(a, b, c) {
    var d = new Mesh(c);
    a = a || 1, b = b || 1;
    for (var e = 0; b >= e; e++)
        for (var f = e / b, g = 0; a >= g; g++) {
            var h = g / a;
            if (d.vertices.push([2 * h - 1, 2 * f - 1, 0]), d.coords && d.coords.push([h, f]), d.normals && d.normals.push([0, 0, 1]), a > g && b > e) {
                var i = g + e * (a + 1);
                d.triangles.push([i, i + 1, i + a + 1]), d.triangles.push([i + a + 1, i + 1, i + a + 2])
            }
        }
    return d.compile(), d
};
var cubeData = [
    [0, 4, 2, 6, -1, 0, 0],
    [1, 3, 5, 7, 1, 0, 0],
    [0, 1, 4, 5, 0, -1, 0],
    [2, 6, 3, 7, 0, 1, 0],
    [0, 2, 1, 3, 0, 0, -1],
    [4, 5, 6, 7, 0, 0, 1]
];
Mesh.cube = function() {
    for (var a = new Mesh, b = 0; b < cubeData.length; b++) {
        for (var c = cubeData[b], d = 4 * b, e = 0; 4 > e; e++) {
            var f = c[e];
            a.vertices.push(pickOctant(f).toArray()), a.coords && a.coords.push([1 & e, (2 & e) / 2]), a.normals && a.normals.push([c[4], c[5], c[6]])
        }
        a.triangles.push([d, d + 1, d + 2]), a.triangles.push([d + 2, d + 1, d + 3])
    }
    return a.compile(), a
}, Mesh.prototype.combine = function(a, b) {
    this.vertices = this.vertices.concat(a.vertices), this.coords && (this.coords = this.coords.concat(a.coords)), this.normals = this.normals.concat(a.normals);
    for (var c in a.triangles) a.triangles[c][0] += 2 * this.triangles.length, a.triangles[c][1] += 2 * this.triangles.length, a.triangles[c][2] += 2 * this.triangles.length;
    return this.triangles = this.triangles.concat(a.triangles), b || this.compile(), this
}, Mesh.sphere = function(a, b) {
    function c(a, b, c) {
        return i ? [a, c, b] : [a, b, c]
    }

    function d(a) {
        return a + (a - a * a) / 2
    }
    var e = new Mesh(b),
        f = new Indexer;
    a = a || 6;
    for (var g = 0; 8 > g; g++)
        for (var h = pickOctant(g), i = h.x * h.y * h.z > 0, j = [], k = 0; a >= k; k++) {
            for (var l = 0; a >= k + l; l++) {
                var m = k / a,
                    n = l / a,
                    o = (a - k - l) / a,
                    p = {
                        vertex: new Vector(d(m), d(n), d(o)).unit().multiply(h).toArray()
                    };
                e.coords && (p.coord = h.y > 0 ? [1 - m, o] : [o, 1 - m]), j.push(f.add(p))
            }
            if (k > 0)
                for (var l = 0; a >= k + l; l++) {
                    var m = (k - 1) * (a + 1) + (k - 1 - (k - 1) * (k - 1)) / 2 + l,
                        n = k * (a + 1) + (k - k * k) / 2 + l;
                    e.triangles.push(c(j[m], j[m + 1], j[n])), a > k + l && e.triangles.push(c(j[n], j[m + 1], j[n + 1]))
                }
        }
    return e.vertices = f.unique.map(function(a) {
        return a.vertex
    }), e.coords && (e.coords = f.unique.map(function(a) {
        return a.coord
    })), e.normals && (e.normals = e.vertices), e.compile(), e
}, Mesh.load = function(a, b) {
    var c = aLoadJSON(a);
    b = b || {}, c.coords || (b.coords = !1), c.normals || (b.normals = !1);
    var d = new Mesh(b);
    return d.vertices = c.vertices, d.coords = c.coords, d.normals = c.normals, d.triangles = c.triangles, d.lines = c.lines || [], d.compile(), d
}, Mesh.loadStatic = function(a, b) {
    var c = a;
    b = b || {
        coords: !0
    }, c.coords || (b.coords = !1), c.normals || (b.normals = !1);
    var d = new Mesh(b);
    return d.vertices = c.vertices, d.coords = c.coords, d.normals = c.normals, d.triangles = c.triangles, d.compile(), d
}, Mesh.obj = function(a, b, c) {
    return K3D.load(a, function(a) {
        var d = K3D.parse.fromOBJ(a),
            e = {},
            f = 0;
        for (var g in d) {
            f += 1;
            var h = d[g];
            options = {
                coords: !0
            }, h.coords || (options.coords = !1), h.normals || (options.normals = !1);
            var i = new Mesh;
            i.vertices = h.vertices, i.coords = h.coords, i.normals = h.normals, i.triangles = h.triangles, i.compile(), e[g] = i
        }
        if (2 > f) {
            var j = "";
            for (var g in e) j = e[g];
            b(j)
        } else if (c)
            if (c.loadAsTable) {
                var k = [];
                for (var g in e) j = e[g], k.push(j);
                b(k)
            } else b(e);
        else b(e)
    })
}, Animation = function(a, b, c) {
    this.parent = a, this.runs = !1, this.to = {}, this.from = {}, this.type = "standard", this.interval = {}, this.settings = {
        onComplete: function() {},
        loops: 1
    }, this.keyOptions = ["loops", "onComplete", "r"];
    for (var d in c)
        if (-1 == this.keyOptions.indexOf(d)) {
            var e = c[d];
            this.time = .06 * b, this.to[d] = e, this.from[d] = Object.byString(this.parent, d), this.interval[d] = 1 / this.time * (e - this.from[d])
        } else this.settings[d] = c[d];
    a.addAnimation(this)
}, Animation.prototype = Object.create(MObject.prototype), Animation.prototype.constructor = Animation, Animation.prototype.execute = function() {
    if (this.runs)
        if (gl.frame < this.end)
            for (var a in this.from) {
                var b = Object.byString(this.parent, a) + this.interval[a];
                setDict(this.parent, a, b)
            } else {
                var c = this.settings.loops; - 1 == c ? this.run() : c > 1 ? (this.settings.loops -= 1, this.run()) : 1 == c && (this.runs = !1, this.settings.onComplete(this.parent))
            }
}, Animation.prototype.run = function() {
    this.runs = !0, this.start = gl.frame, this.end = gl.frame + this.time
}, shframe = -1, Shader = function(a, b, c) {
    MObject.call(this), this.cp = -1, this.uniformsSet = {}, this.construct = {
        varying: [],
        uniforms: [],
        structs: {},
        mainFragment: b,
        mainVertex: a
    }, this.header = "uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;uniform mat3 NormalMatrix;", this.vertexHeader = "precision mediump float; attribute vec3 Vertex;attribute vec2 TexCoord;attribute vec3 Normal;" + this.header, this.fragmentHeader = "precision mediump float;" + this.header, c || this._build()
}, Shader.prototype = Object.create(MObject.prototype), Shader.prototype.constructor = Shader, Shader.prototype.addUniform = function(a, b) {
    this.construct.uniforms.push([a, b])
}, Shader.prototype.addVarying = function(a, b) {
    this.construct.varying.push([a, b])
}, Shader.prototype.addStruct = function(a, b) {
    this.construct.structs[a] = [], b && (this.construct.structs[a] = b)
}, Shader.prototype.addToStruct = function(a, b, c) {
    this.construct.structs[a].push([b, c])
}, Shader.prototype.addVertexSource = function(a) {
    this.construct.mainVertex = a
}, Shader.prototype.addFragmentSource = function(a) {
    this.construct.mainFragment = a
}, Shader.prototype.reconstruct = function() {
    this.vertexLines = "", this.fragmentLines = "";
    for (var a in this.construct.varying) {
        var b = this.construct.varying[a],
            c = "varying " + b[0] + " " + b[1] + ";\n";
        this.vertexLines += c, this.fragmentLines += c
    }
    for (var d in this.construct.structs) {
        var e = this.construct.structs[d],
            c = "struct " + d + "{\n";
        for (var f in e) {
            var g = e[f];
            c += "	" + g[0] + " " + g[1] + ";\n"
        }
        c += "};\n", this.fragmentLines += c, this.vertexLines += c
    }
    for (var h in this.construct.uniforms) {
        var i = this.construct.uniforms[h],
            c = "uniform " + i[0] + " " + i[1] + ";\n";
        this.fragmentLines += c, this.vertexLines += c
    }
    this.vertexLines += this.construct.mainVertex, this.fragmentLines += this.construct.mainFragment
}, Shader.prototype._build = function() {
    function a(a, b) {
        var c = gl.createShader(a);
        return gl.shaderSource(c, b), gl.compileShader(c), gl.getShaderParameter(c, gl.COMPILE_STATUS) || alert("compile error: " + gl.getShaderInfoLog(c)), c
    }
    this.reconstruct();
    var b = fix(this.vertexHeader, this.vertexLines),
        c = fix(this.fragmentHeader, this.fragmentLines);
    this.program = gl.createProgram(), gl.attachShader(this.program, a(gl.VERTEX_SHADER, b)), gl.attachShader(this.program, a(gl.FRAGMENT_SHADER, c)), gl.bindAttribLocation(this.program, 0, "Vertex"), gl.bindAttribLocation(this.program, 1, "Normal"), gl.bindAttribLocation(this.program, 2, "TexCoord"), gl.enableVertexAttribArray(0), gl.enableVertexAttribArray(1), gl.enableVertexAttribArray(2), gl.linkProgram(this.program), gl.getProgramParameter(this.program, gl.LINK_STATUS) || (gl.extradatae = "link error: " + gl.getProgramInfoLog(this.program)), this.attributes = {}, this.uniformLocations = {};
    var d = {};
    regexMap(/uniform\s+sampler(1D|2D|3D|Cube)\s+(\w+)\s*;/g, b + c, function(a) {
        d[a[2]] = 1
    }), this.isSampler = d, this.needsMVP = -1 != (b + c).indexOf("gl_ModelViewProjectionMatrix")
};
var isArray = function(a) {
        return "[object Array]" == Object.prototype.toString.call(a)
    },
    isNumber = function(a) {
        return "[object Number]" == Object.prototype.toString.call(a)
    };
Shader.prototype._checkUniforms = function(a, b, c, d) {
    a instanceof Vector ? a = [a.x, a.y, a.z] : a instanceof Matrix && (a = a.m);
    var e = d;
    if (!compare(this.uniformsSet[e], a))
        if (this.uniformsSet[e] = a, isArray(a)) switch (a.length) {
            case 1:
                gl.uniform1fv(b, new Float32Array(a));
                break;
            case 2:
                gl.uniform2fv(b, new Float32Array(a));
                break;
            case 3:
                gl.uniform3fv(b, new Float32Array(a));
                break;
            case 4:
                gl.uniform4fv(b, new Float32Array(a));
                break;
            case 9:
                gl.uniformMatrix3fv(b, !1, new Float32Array([a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]]));
                break;
            case 16:
                gl.uniformMatrix4fv(b, !1, new Float32Array([a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]]));
                break;
            default:
                __error("don't know how to load uniform \"" + c + '" of length ' + a.length)
        } else isNumber(a) ? (this.isSampler[c] ? gl.uniform1i : gl.uniform1f).call(gl, b, a) : "boolean" == typeof a && gl.uniform1i(b, 1 == a ? 1 : 0)
}, Shader.prototype.useProgram = function() {
    gl.useProgram(this.program), gl.currentShader = this, gl.currentProgram = this.program
}, Shader.prototype.uniforms = function(a) {
    for (var b in a) {
        var c = a[b];
        if (!(c instanceof Object) || isArray(c) || c instanceof Matrix || e instanceof Vector)
            if (isArray(c) && (c[0] instanceof Object || isArray(c[0])))
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    if (!(e instanceof Object) || isArray(e) || e instanceof Matrix || e instanceof Vector) {
                        this.uniformLocations[b] = this.uniformLocations[b] || [];
                        var f = this.uniformLocations[b][d] || gl.getUniformLocation(this.program, b + "[" + d + "]");
                        if (!f) continue;
                        this.uniformLocations[b][d] = f, this._checkUniforms(c, f, b, b + d)
                    } else {
                        this.uniformLocations[b] = this.uniformLocations[b] || [];
                        for (us in e) {
                            this.uniformLocations[b][d] = this.uniformLocations[b][d] || {};
                            var f = this.uniformLocations[b][d][us] || gl.getUniformLocation(this.program, b + "[" + d + "]." + us);
                            if (f) {
                                this.uniformLocations[b][us] = f;
                                var g = e[us];
                                this._checkUniforms(g, f, b, b + us + d)
                            }
                        }
                    }
                } else {
                    var f = this.uniformLocations[b] || gl.getUniformLocation(this.program, b);
                    if (!f) continue;
                    this.uniformLocations[b] = f, this._checkUniforms(c, f, b, b)
                } else {
                    {
                        c.id ? c.id : ""
                    }
                    this.uniformLocations[b] = this.uniformLocations[b] || {};
                    for (us in c)
                        if ("id" != us) {
                            var f = this.uniformLocations[b][us] || gl.getUniformLocation(this.program, b + "." + us);
                            if (f) {
                                this.uniformLocations[b][us] = f;
                                var g = c[us];
                                this._checkUniforms(g, f, b, b + us)
                            } else this.uniformsSet[b + us] = c[us]
                        }
                }
    }
    return this
}, Shader.prototype.draw = function(a) {
    this.useProgram();
    var b = a || {};
    b._gl_ProjectionMatrix = gl.projectionMatrix, this.uniforms(b), this.uniformsSet = {};
    for (var c in this.children) this.children[c].draw()
}, Shader.fromFile = function(a, b, c) {
    var d;
    loadFiles([a, b], function(a) {
        d = new Shader(a[0], a[1]), c(d)
    }, function() {})
};
for (var TXTS = [], t = 0; 32 > t; t++) TXTS.push("empty");
Texture = function(a) {
    this.options = a || {}, this.id = gl.createTexture(), this.binded = !1, this.format = this.options.format || gl.RGBA, this.type = this.options.type || gl.UNSIGNED_BYTE
}, Texture.prototype.handle2DTexture = function() {
    var a = this.options;
    gl.bindTexture(gl.TEXTURE_2D, this.id), gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1), gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, this.image || null), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, a.filter || a.magFilter || gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, a.filter || a.minFilter || gl.LINEAR_MIPMAP_LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, a.wrap || a.wrapS || gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, a.wrap || a.wrapT || gl.CLAMP_TO_EDGE), gl.generateMipmap(gl.TEXTURE_2D), gl.bindTexture(gl.TEXTURE_2D, null)
}, Texture.prototype.handle = function() {
    this.isAtlas ? this.handleAtlas() : this.handle2DTexture()
}, Texture.prototype.handleAtlas = function() {
    var a = this.options;
    gl.bindTexture(gl.TEXTURE_2D, this.id), gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1), gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, this.image || null), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, a.filter || a.magFilter || gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, a.filter || a.minFilter || gl.LINEAR_MIPMAP_LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, a.wrap || a.wrapS || gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, a.wrap || a.wrapT || gl.CLAMP_TO_EDGE), gl.generateMipmap(gl.TEXTURE_2D)
}, Texture.prototype.handleZB = function() {
    var a = this.options;
    gl.bindTexture(gl.TEXTURE_2D, this.id), gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.width, this.height, 0, this.format, this.type, null), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, a.filter || a.magFilter || gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, a.filter || a.minFilter || gl.LINEAR_MIPMAP_NEAREST), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, a.wrap || a.wrapS || gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, a.wrap || a.wrapT || gl.CLAMP_TO_EDGE), gl.generateMipmap(gl.TEXTURE_2D)
}, Texture.prototype.handleZBCube = function() {
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.id), gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.format, this.width, this.height, 0, this.format, this.type, null), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.format, this.width, this.height, 0, this.format, this.type, null), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.format, this.width, this.height, 0, this.format, this.type, null), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.format, this.width, this.height, 0, this.format, this.type, null), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.format, this.width, this.height, 0, this.format, this.type, null), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.format, this.width, this.height, 0, this.format, this.type, null), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
}, Texture.prototype.handleCube = function() {
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.id), gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.format, this.format, this.type, this.cube[0]), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.format, this.format, this.type, this.cube[1]), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.format, this.format, this.type, this.cube[2]), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.format, this.format, this.type, this.cube[3]), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.format, this.format, this.type, this.cube[4]), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.format, this.format, this.type, this.cube[5]), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.bindTexture(gl.TEXTURE_CUBE_MAP, null)
}, Texture.prototype.bind = function() {
    this.binded || (gl.nTexture += 1, this.binder = gl.nTexture, this.binded = !0, gl.activeTexture(gl.TEXTURE0 + this.binder), gl.bindTexture(gl.TEXTURE_2D, this.id))
}, Texture.prototype.bindCube = function() {
    this.binded || (gl.nTexture += 1, this.binder = gl.nTexture, this.binded = !0, gl.activeTexture(gl.TEXTURE0 + this.binder), gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.id))
}, Texture.prototype.unbindCube = function() {
    this.binded && (gl.nTexture -= 1, this.binded = !1, gl.activeTexture(gl.TEXTURE0 + this.binder), gl.bindTexture(gl.TEXTURE_CUBE_MAP, null))
}, Texture.prototype.unbind = function() {
    this.binded && (gl.nTexture -= 1, this.binded = !1, gl.activeTexture(gl.TEXTURE0 + this.binder), gl.bindTexture(gl.TEXTURE_2D, null))
}, Texture.prototype.remove = function() {
    TXTS[this.binder] = "empty"
}, Texture.fromImage = function(a, b) {
    b = b || {};
    var c = new Texture(0, 0, b);
    return c.image = new Image, c.complete = 0, c.options = b, c.image.src = a, c.image.onload = function() {
        c.image = this, c.complete = 1, gl.lTexture += 1
    }, c
}, Texture.fromAtlas = function(a, b, c) {
    c = c || {};
    var d = new Texture(0, 0, c);
    return d.isAtlas = !0, d.name = b, d.atlas = a, d.complete = a.atlas.complete, d
}, Texture.fromCanvas = function(a, b) {
    var c = new Texture(0, 0, b);
    return c.image = a, c.complete = 1, c
}, Texture.fromCube = function(a, b) {
    b = b || {};
    var c = new Texture(0, 0, b);
    c.cube = [], c.complete = 0;
    for (var d in a) c.cube.push(new Image), c.cube[d].src = a[d], c.cube[d].onload = function() {
        c.cube[d] = this, c.complete += 1, gl.lTexture += 1
    };
    return c
}, Texture.Atlas = function(a, b, c) {
    var d = new Texture(0, 0, c);
    return d.image = new Image, d.complete = 0, d.options = c || {}, d.isAtlas = !0, d.image.src = a, d.image.onload = function() {
        d.image = this, d.resolution = {
            w: this.width,
            h: this.height
        }, d.complete = -1, aLoadJSON(b, function(a) {
            d.json = a, d.uvd = {};
            for (var b in d.json) {
                var c = d.json[b],
                    e = c.x / d.resolution.w,
                    f = c.y / d.resolution.h;
                d.uvd[b] = [e, e + c.width / d.resolution.w, f, f + c.height / d.resolution.h]
            }
            d.complete = 1
        }), gl.extradata = d, gl.lTexture += 1
    }, d
};
for (var SHDS = [], t = 0; 500 > t; t++) SHDS.push("empty");
Material = function(a) {
    if (MObject.call(this), this.shaderId = getShNum(), this.compl = 0, this.settings = {
            id: this.shaderId + "",
            color: [1, 1, 1],
            specularWeight: 0,
            mappingType: 1,
            shininess: 15,
            alpha: 1
        }, this._textures = {}, a)
        for (var b in a) "diffuse" == b ? this.setDiffuse(a[b]) : "bump" == b ? this.setBump(a[b]) : "specular" == b ? this.setSpecular(a[b]) : "cube" == b ? this.setCube(a[b]) : this.settings[b] = a[b]
}, Material.prototype = Object.create(MObject.prototype), Material.prototype.constructor = Material, Material.prototype.draw = function() {
    var a = this.completeTextures();
    if (a) {
        gl.nTexture = 1, this.bindAll();
        var b = {};
        b.material = this.settings;
        for (var c in this._textures) {
            var d = this._textures[c];
            d instanceof Texture && (b[c] = d.binder, d.isAtlas && (b.atlas = d.uvd[this.atlasName]))
        }
        for (var e in this.children) this.children[e].draw(b);
        this.unbindAll()
    }
}, Material.prototype.setTexture = function(a, b, c) {
    b instanceof Texture && (this.compl = -1), this._textures[a] = b, b.isAtlas && (this.atlasName = c)
}, Material.prototype.setDiffuse = function(a, b) {
    this.setTexture("diffuse", a, b)
}, Material.prototype.setBump = function(a, b) {
    this.setTexture("bump", a, b)
}, Material.prototype.setSpecular = function(a, b) {
    this.setTexture("specular", a, b)
}, Material.prototype.setCube = function(a, b) {
    this.setTexture("cube", a, b)
}, Material.prototype.bindAll = function() {
    for (var a in this._textures) {
        var b = this._textures[a];
        b instanceof Texture && ("cube" == a ? b.bindCube() : b.bind(), this[a] = b.binder)
    }
}, Material.prototype.unbindAll = function() {
    for (var a in this._textures) {
        var b = this._textures[a];
        b instanceof Texture && ("cube" == a ? b.unbindCube() : b.unbind())
    }
}, Material.prototype.completeTextures = function() {
    var a = 0,
        b = 0;
    for (var c in this._textures) {
        var d = this._textures[c];
        a += 1, d instanceof Texture && ("cube" != c ? 1 == d.complete ? (d.handle(), d.complete = 2) : 2 == d.complete && (b += 1) : 6 == d.complete ? (d.handleCube(), d.complete = 12) : 12 == d.complete && (b += 1))
    }
    return 0 == a ? !0 : b / a == 1 ? !0 : !1
}, Material.prototype.uniforms = function(a) {
    var b = a || {};
    gl.currentShader.uniforms(b)
}, Material._settable = ["color", "specularWeight", "mappingType", "alpha", "shininess"], Light = function(a) {
    if (MObject.call(this), this.lights = [], this.shadows = new Array(32), this.ssse = 0, a instanceof Array)
        for (var b in a) {
            var c = {},
                d = a[b];
            if (c.lightPosition = new Vector, c.attenuation = 20, c.intensity = 1, c.color = [1, 1, .9], c.shadow = !1, c.lightType = 1, d)
                for (var e in d) c[e] = d[e];
            this.lights.push(c)
        } else {
            var c = {};
            if (c.lightPosition = new Vector(0, 1, -10), c.attenuation = 20, c.intensity = 1, c.color = [1, 1, 0], c.shadow = !1, c.lightType = 1, a)
                for (var e in a) c[e] = a[e];
            this.lights.push(c)
        }
}, Light.prototype = Object.create(MObject.prototype), Light.prototype.constructor = Light, Light.prototype.draw = function(a) {
    var b = a || {};
    this.bindAll(b), b.lights = this.lights, b.numlights = this.lights.length;
    for (var c in this.children) this.children[c].draw(b);
    this.unbindAll()
}, Light.prototype.bindAll = function(a) {
    12 == this.shadows.complete && (this.shadows.bindCube(), a.shadows = this.shadows.binder)
}, Light.prototype.unbindAll = function() {
    12 == this.shadows.complete && this.shadows.unbindCube()
}, Light.prototype.setShadow = function(a) {
    this.shadows = a.map.texture
}, Light.fGI = function(a, b) {
    for (var c = [], d = 10, e = 1; 3 > e; e++)
        for (var f = 1; 6 > f; f++) {
            var g = f / 6 * 6.28,
                h = {
                    lightPosition: new Vector(Math.sin(g) * d, 3 * e, Math.cos(g) * d).toArray(),
                    intensity: .3,
                    color: [.7, .7, .9],
                    attenuation: 23.8
                };
            c.push(h)
        }
    if (b) {
        var h = {
            lightPosition: new Vector(100, 20, 100).toArray(),
            intensity: .76,
            color: [1, .7, .2],
            attenuation: 1005.8
        };
        c.push(h)
    }
    return new Light(c)
}, Light.minifGI = function(a, b, c, d) {
    for (var e = [], f = 1; 2 > f; f++)
        for (var g = 1; 3 > g; g++) {
            var h = g / 3 * 6.28,
                i = {
                    lightPosition: new Vector(Math.sin(h) * a, 3 * f, Math.cos(h) * a).toArray(),
                    intensity: c,
                    color: [.7, .7, .9],
                    attenuation: b
                };
            e.push(i)
        }
    if (d)
        for (var j in e) {
            var i = e[j];
            i.lightPosition = Vector.fromArray(i.lightPosition).add(d).toArray()
        }
    return new Light(e)
};
var basicText = function() {
        return new Shader("			varying vec2 vTex;			varying vec4 vPosition;			varying vec3 vNormal;			void main(void) {			vNormal = Normal;			vPosition = gl_ModelViewMatrix * vec4(Vertex, 1.0);			vTex = TexCoord;			gl_Position = gl_ProjectionMatrix * vPosition;			}", "varying vec2 vTex;			varying vec4 vPosition;			varying vec3 vNormal;			struct Material			{				vec3 color;				float shininess;				bool useDiffuse;				bool useSpecular;				bool useLights;				float specularWeight;				bool useBump;				float bumpWeight;				bool useDof;				float mappingType;				float dofWeight;				bool useRefraction;				float refraction;				float alpha;			};			uniform sampler2D diffuse;			uniform Material material;			uniform vec2 tiling;			void main(void) {				vec2 tiler;				if(tiling.x == 0.0){					tiler = vTex;				}				else{					tiler = vec2(vTex.s*tiling.x,vTex.t*tiling.y);				}				vec4 clr = vec4(material.color,1.0);				if(material.useDiffuse){					clr = texture2D(diffuse, tiler);				};				gl_FragColor = vec4(clr.rgb,clr.a*material.alpha);			}")
    },
    basicShaderDepth = function() {
        return new Shader("			varying vec4 vPosition;			void main(void) {			vPosition = gl_ModelViewMatrix * vec4(Vertex, 1.0);			gl_Position = gl_ProjectionMatrix * vPosition;			}", "varying vec4 vPosition;			uniform float zNear;			uniform float zFar;			float LinearDepthConstant = 1.0 / (zFar - zNear);			vec4 pack (float depth)			{				const vec4 bias = vec4(1.0 / 255.0,							1.0 / 255.0,							1.0 / 255.0,							0.0);							float r = depth;				float g = fract(r * 255.0);				float b = fract(g * 255.0);				float a = fract(b * 255.0);				vec4 colour = vec4(r, g, b, a);								return colour - (colour.yzww * bias);			}			float rand(vec2 co){    			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);			}			void main(void) {				float linearDepth = length(vPosition) * LinearDepthConstant;				vec4 clr = vec4(normalize(vPosition.xyz)/10.0,1.0);				gl_FragColor = vec4(linearDepth,linearDepth,linearDepth,1.0);			}")
    },
    basicShader = function(a) {
        var b = {
            useBump: !1,
            useDiffuse: !1,
            useAtlas: !1,
            useSpecular: !1,
            useLights: !1,
            useTiling: !1,
            useReflection: !1,
            useSky: !1
        };
        if (a)
            for (var c in a) b[c] = a[c];
        var d = new Shader("", "", 1);
        d.addVarying("vec2", "vTex"), d.addVarying("float", "nrmY"), d.addVarying("vec3", "dZ"), d.addVarying("vec4", "vPosition"), d.addVarying("vec3", "vNormal"), d.addVarying("mat3", "invgl"), d.addVertexSource("			mat3 nfm(mat4 mat){				float a00 = mat[0][0];				float a01 = mat[0][1];				float a02 = mat[0][2];				float a10 = mat[1][0];				float a11 = mat[1][1];				float a12 = mat[1][2];				float a20 = mat[2][0];				float a21 = mat[2][1];				float a22 = mat[2][2];				float b01 = a22 * a11 - a12 * a21;           	 	float b11 = -a22 * a10 + a12 * a20;            	float b21 = a21 * a10 - a11 * a20;            	float d = a00 * b01 + a01 * b11 + a02 * b21;            	float id = 1.0/d;            	mat3 dest = mat3(0.0);            	dest[0][0] = b01 * id;        		dest[0][1] = b11 * id;				dest[0][2] = b21 * id;				dest[1][0] = (-a22 * a01 + a02 * a21) * id;				dest[1][1] = (a22 * a00 - a02 * a20) * id;				dest[1][2] = (-a21 * a00 + a01 * a20) * id;				dest[2][0] = (a12 * a01 - a02 * a11) * id;				dest[2][1] = (-a12 * a00 + a02 * a10) * id;				dest[2][2] = (a11 * a00 - a01 * a10) * id;				return dest;			}			void main(void) {			    invgl = nfm(gl_ModelViewMatrix);			    vNormal = Normal;			    vPosition = gl_ModelViewMatrix * vec4(Vertex, 1.0);			    dZ = (gl_ProjectionMatrix * vPosition).xyz;			    nrmY = abs(Normal.y);			    vTex = TexCoord;			    gl_Position = gl_ProjectionMatrix * vPosition;			}"), d.addStruct("Material"), d.addToStruct("Material", "vec3", "color"), b.useLights && (d.addStruct("Light"), d.addToStruct("Light", "vec3", "lightPosition"), d.addToStruct("Light", "vec3", "color"), d.addToStruct("Light", "float", "attenuation"), d.addToStruct("Light", "float", "intensity"), d.addToStruct("Light", "float", "lightType"), d.addUniform("float", "numlights"), d.addUniform("Light", "lights[32]"), d.addToStruct("Light", "bool", "shadow"), b.useShadow && d.addUniform("samplerCube", "shadows")), d.addToStruct("Material", "float", "shininess"), d.addToStruct("Material", "float", "mappingType"), d.addToStruct("Material", "float", "alpha"), d.addToStruct("Material", "float", "specularWeight"), d.addUniform("Material", "material"), b.useAtlas && d.addUniform("vec4", "atlas"), b.useTiling && d.addUniform("vec2", "tiling"), b.useDiffuse && d.addUniform("sampler2D", "diffuse"), b.useSpecular && d.addUniform("sampler2D", "specular"), b.useBump && (d.addUniform("sampler2D", "bump"), d.addToStruct("Material", "float", "bumpWeight")), (b.useReflection || b.useSky) && (d.addUniform("samplerCube", "cube"), d.addToStruct("Material", "float", "reflectionWeight")), b.useFog && (d.addStruct("Fog"), d.addToStruct("Fog", "vec2", "zMinMax"), d.addToStruct("Fog", "vec3", "color"), d.addToStruct("Fog", "float", "intensity"), d.addUniform("Fog", "fog"));
        var e = "			float rand(vec2 co){    			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);			}" + (b.useShadow ? "float shadowFac(vec3 ld){			float sd = textureCube(shadows,vec3(-ld.x,ld.y,ld.z)).r;			float distance = length(ld)/100.0;			if(distance<=sd+0.01){			    return 1.0;			}			else{			    return 0.5;			}			}" : "") + (b.useLights ? "float lightPow(vec3 vpos,vec3 ne,Light li,vec2 til){                vec3 lp = li.lightPosition;				vec3 ld2 = lp - vpos;				vec3 lightDirection = normalize(ld2);				float att = length(ld2);			    float atn = li.attenuation-att;			    if(atn < 0.0){			        atn = 0.0;			    }else{			        atn = 1.0-att/li.attenuation;			    }				vec3 eyeDirection = normalize(-vpos.xyz);				float dW = 1.0*max(dot(ne,lightDirection),0.0);        		vec3 reflectionDirection = reflect(lightDirection, ne);        		float shininess = material.shininess;        		" + (b.useBump ? "				vec3 bmpp = texture2D(bump, til).xyz;				bmpp = (bmpp -0.5) * 2.0;				dW = dW*bmpp.x*(material.bumpWeight)+dW*(1.0-material.bumpWeight);" : "") + "                  float specularT = material.specularWeight;" + (b.useSpecular ? "       				specularT = texture2D(specular, til).r * material.specularWeight;" : "") + "        		float specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), shininess);        		" + (b.useShadow ? "        		    if(li.shadow){       				    dW = dW*shadowFac(ld2);       				}" : "") + "dW = dW + specularLightWeighting*0.0;				return dW;			}" : "") + "void main(void) {            vec2 tiler;" + (b.useAtlas ? "            float aU = atlas.y-atlas.x;            float aV = atlas.w-atlas.z;            tiler = vec2(atlas.x+vTex.x*aU,atlas.z+vTex.y*aV);            " : "            tiler = vTex;") + (b.useTiling ? "tiler = vec2(vTex.s*tiling.x,vTex.t*tiling.y);            " : "") + (b.boxMapping ? "					if(abs(vNormal.z)>0.5){						tiler = vec2(vPosition.x*tiling.x,vPosition.y*tiling.y);					}else{						if(abs(vNormal.y)>0.5){							tiler = vec2(vPosition.z*tiling.x,vPosition.x*tiling.x);						}						else{							tiler = vec2(vPosition.z*tiling.x,vPosition.y*tiling.y);						}					}" : "") + "vec3 normalEye = normalize(invgl*vNormal);				vec3 dWei = vec3(0.0,0.0,0.0);				vec4 clr = vec4(material.color,1.0);				" + (b.useDiffuse ? "clr = texture2D(diffuse, tiler);				clr = vec4(clr.rgb*material.color,clr.a);" : "") + (b.useLights ? "            for(int i = 0;i<32;i++){                if( i >= int(numlights)){                break;                };                Light li = lights[i];                if(li.lightType == 1.0){                dWei += li.color*lightPow(vPosition.xyz,normalEye,li,tiler)*li.intensity;                }else{                dWei += li.color*li.intensity;                }            };" : "dWei = vec3(1.0,1.0,1.0);") + (b.useReflection ? "        vec3 thh = reflect(normalize(-dZ.xyz),normalEye);		vec4 txc = textureCube(cube,thh);		clr = vec4(clr.rgb+txc.rgb*material.reflectionWeight,clr.a);        " : "") + (b.useSky ? "        vec3 thh = vPosition.xyz;		vec4 txc = textureCube(cube,thh);		clr = vec4(clr.rgb+txc.rgb*material.reflectionWeight,clr.a);        " : "") + "clr = vec4(clr.rgb*dWei,clr.a);" + (b.useFog ? "        float depth = vPosition.z/fog.zMinMax.y;		clr = vec4(clr.rgb+fog.color*depth*fog.intensity,clr.a);        " : "") + "        gl_FragColor = vec4(clr.rgb,clr.a*material.alpha);    }";
        return d.addFragmentSource(e), d._build(), d
    },
    gizmoShader = function(a) {
        var b = {
            useBump: !1,
            useDiffuse: !1,
            useAtlas: !1,
            useSpecular: !1,
            useLights: !1,
            useTiling: !1,
            useReflection: !1,
            useSky: !1
        };
        if (a)
            for (var c in a) b[c] = a[c];
        var d = new Shader("", "", 1);
        d.addVarying("vec2", "vTex"), d.addVarying("float", "nrmY"), d.addVarying("vec3", "dZ"), d.addVarying("vec4", "vPosition"), d.addVarying("vec3", "vNormal"), d.addVarying("mat3", "invgl"), d.addVertexSource("			mat3 nfm(mat4 mat){				float a00 = mat[0][0];				float a01 = mat[0][1];				float a02 = mat[0][2];				float a10 = mat[1][0];				float a11 = mat[1][1];				float a12 = mat[1][2];				float a20 = mat[2][0];				float a21 = mat[2][1];				float a22 = mat[2][2];				float b01 = a22 * a11 - a12 * a21;           	 	float b11 = -a22 * a10 + a12 * a20;            	float b21 = a21 * a10 - a11 * a20;            	float d = a00 * b01 + a01 * b11 + a02 * b21;            	float id = 1.0/d;            	mat3 dest = mat3(0.0);            	dest[0][0] = b01 * id;        		dest[0][1] = b11 * id;				dest[0][2] = b21 * id;				dest[1][0] = (-a22 * a01 + a02 * a21) * id;				dest[1][1] = (a22 * a00 - a02 * a20) * id;				dest[1][2] = (-a21 * a00 + a01 * a20) * id;				dest[2][0] = (a12 * a01 - a02 * a11) * id;				dest[2][1] = (-a12 * a00 + a02 * a10) * id;				dest[2][2] = (a11 * a00 - a01 * a10) * id;				return dest;			}			void main(void) {			    invgl = nfm(gl_ModelViewMatrix);			    vNormal = Normal;			    vPosition = gl_ModelViewMatrix * vec4(Vertex, 1.0);			    dZ = (gl_ProjectionMatrix * vPosition).xyz;			    nrmY = abs(Normal.y);			    vTex = TexCoord;			    gl_Position = gl_ProjectionMatrix * vPosition;			}"), d.addStruct("Material"), d.addToStruct("Material", "vec3", "color"), b.useLights && (d.addStruct("Light"), d.addToStruct("Light", "vec3", "lightPosition"), d.addToStruct("Light", "vec3", "color"), d.addToStruct("Light", "float", "attenuation"), d.addToStruct("Light", "float", "intensity"), d.addUniform("float", "numlights"), d.addUniform("Light", "lights[32]")), d.addUniform("Material", "material");
        var e = "			float rand(vec2 co){    			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);			}" + (b.useLights ? "float lightPow(vec3 vpos,vec3 ne,vec3 lp,float attenuation,vec2 til){				vec3 lightDirection = normalize(lp - vpos);				float att = length(lp - vpos);			    float atn = attenuation-att;			    if(atn < 0.0){			        atn = 0.0;			    }else{			        atn = 1.0-att/attenuation;			    }				float dW = atn*max(dot(ne,lightDirection),0.0) ;				vec3 eyeDirection = normalize(-dZ.xyz);        		vec3 reflectionDirection = reflect(lightDirection, ne);        		float shininess = material.shininess;        		float specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), shininess);        		dW = dW + specularLightWeighting*specularT;				return dW;			}" : "") + "void main(void) {         vec3 normalEye = normalize(invgl*vNormal);				vec3 dWei = vec3(0.0,0.0,0.0);				vec4 clr = vec4(material.color,1.0);				" + (b.useLights ? "            for(int i = 0;i<32;i++){                if( i >= int(numlights)){                break;                };                dWei += lights[i].color*lightPow(vPosition.xyz,normalEye,lights[i].lightPosition,lights[i].attenuation,tiler)*lights[i].intensity;            };" : "dWei = vec3(1.0,1.0,1.0);") + "clr = vec4(clr.rgb*dWei,clr.a);        gl_FragColor = vec4(clr.rgb,clr.a*material.alpha);    }";
        return d.addFragmentSource(e), d._build(), d
    },
    ZBufferShader = function() {
        return new Shader("						varying vec4 vPos;						void main(){						vPos = gl_ModelViewMatrix * vec4(gl_Vertex, 1.0);						gl_Position = gl_ProjectionMatrix * gl_ModelViewMatrix * vec4(gl_Vertex, 1.0);						}						", "						varying vec4 vPos;						uniform float zNear;						uniform float zFar;						void main(){							float factor;							factor = 1.0-abs(vPos.z-zNear)/abs(zFar-zNear);							if(vPos.z < zFar){								factor=0.0;							}							if(vPos.z > zNear){								factor=1.0;							}							gl_FragColor = vec4(1.0,factor,factor,1.0);						}						")
    },
    ZBuffer = function(a) {
        this.width = 1024, this.height = 1024;
        for (var b in a) this[b] = a[b];
        this.buffer = gl.createFramebuffer(), this.buffer.width = this.width, this.buffer.height = this.height, gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer), this.texture = new Texture, this.texture.width = this.width, this.texture.height = this.height, this.texture.handleZB(), this.renderbuffer = gl.createRenderbuffer(), gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer), gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.id, 0), gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer), gl.bindTexture(gl.TEXTURE_2D, null), gl.bindRenderbuffer(gl.RENDERBUFFER, null), gl.bindFramebuffer(gl.FRAMEBUFFER, null), this.texture.complete = 0
    };
ZBuffer.prototype.bindCube = function(a) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, a, this.texture.id, 0)
}, ZBuffer.prototype.bind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer)
}, ZBuffer.prototype.unbind = function() {
    gl.bindTexture(gl.TEXTURE_2D, this.texture.id), gl.generateMipmap(gl.TEXTURE_2D), gl.bindTexture(gl.TEXTURE_2D, null), gl.bindFramebuffer(gl.FRAMEBUFFER, null)
};
var ZBufferCube = function(a) {
    this.width = 1024, this.height = 1024, this.position = new Vector;
    for (var b in a) this[b] = a[b];
    this.buffers = [], this.texture = new Texture, this.texture.width = this.width, this.texture.height = this.height, this.texture.handleZBCube(), this.renderbuffer = gl.createRenderbuffer(), gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer), gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height), gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    for (var c = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z], b = 0; 6 > b; b++) {
        var d = gl.createFramebuffer();
        d.width = this.width, d.height = this.height, gl.bindFramebuffer(gl.FRAMEBUFFER, d), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, c[b], this.texture.id, 0), gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer), this.buffers.push(d)
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null), this.texture.complete = 0
};
ZBufferCube.prototype.bind = function(a) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffers[a])
}, ZBufferCube.prototype.unbind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
}, ZBufferCube.prototype.draw = function(a) {
    for (var b = [
            [0, 90, 0],
            [0, -90, 0],
            [90, 0, 0],
            [-90, 0, 0],
            [0, 0, 0],
            [0, 180, 0]
        ], c = 0; 6 > c; c++) {
        gl.viewport(0, 0, this.width, this.height), this.bind(c), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var d = Matrix.perspective(90, 1, .01, 100);
        d = d.rotateVector(b[c][0], b[c][1], b[c][2]), d = d.multiply(Matrix.translate(-this.position.x, -this.position.y, -this.position.z)), gl.matrixMode(gl.MODELVIEW), a({
            _gl_ProjectionMatrix: d,
            lightPosition: this.position.toArray()
        }), this.unbind()
    }
};
var shadowShader = function(a) {
    if (a)
        for (var b in a) settings[b] = a[b];
    var c = new Shader("", "", 1);
    c.addVarying("vec4", "vPosition"), c.addVertexSource("			void main(void) {			    vPosition = gl_ModelViewMatrix * vec4(Vertex, 1.0);			    gl_Position = gl_ProjectionMatrix * vPosition;			}"), c.addUniform("vec3", "lightPosition");
    var d = "void main(void) {        vec3 vpos = vec3(vPosition.x,vPosition.y,vPosition.z);        vec3 lpp = lightPosition;        float distance = length(lpp-vpos);        float ndepth = distance/100.0;        gl_FragColor = vec4(ndepth,ndepth,ndepth,1.0);    }";
    return c.addFragmentSource(d), c._build(), c
};
Shadow = function(a, b) {
    this.map = new ZBufferCube, this.scene = a, this.shader = shadowShader(), this.position = b
}, Shadow.prototype.draw = function() {
    for (var a = [
            [0, 90, 0],
            [0, -90, 0],
            [90, 0, 0],
            [-90, 0, 0],
            [0, 0, 0],
            [0, 180, 0]
        ], b = 0; 6 > b; b++) {
        gl.viewport(0, 0, this.map.width, this.map.height), this.map.bind(b), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var c = Matrix.perspective(90, 1, .01, 100);
        c = c.rotateVector(a[b][0], a[b][1], a[b][2]), c = c.multiply(Matrix.translate(-this.position.x, -this.position.y, -this.position.z)), gl.matrixMode(gl.MODELVIEW), this.scene.drawOverride(this.shader, {
            _gl_ProjectionMatrix: c.m,
            lightPosition: this.position.toArray()
        }), this.map.unbind()
    }
}, Fog = function() {
    MObject.call(this), this.settings = {
        zMinMax: [0, 100],
        intensity: 1,
        color: [.1, .3, .9]
    }
}, Fog.prototype = Object.create(MObject.prototype), Fog.prototype.constructor = Fog, Fog.prototype.draw = function(a) {
    var b = a || {};
    b.fog = this.settings;
    for (var c in this.children) this.children[c].draw(b)
}, Camera = function(a) {
    this.position = new Vector(0, 0, 0), this.positionBefore = new Vector, this.rotation = new Vector(0, 0, 0), this.mRotation = new Vector(0, 0, 0), this.mPosition = new Vector(0, 0, 0), this.angle = new Vector(0, 0, 0), this.forwardStep = 0, this.sideStep = 0, this.upStep = 0, this.factor = .09, this.scene = null, this._oobject = null, this._distanceVector = null, this.forwardReduce = 1, this.name = "camera", this.dir = {
        forward: 0,
        side: 0
    }, this.id = 1234, this.sensitivity = .5, this.yawStep = 0, this.pitchStep = 0, this.rollStep = 0, this.mesh = null, this.background = null, this.tempX = null, this.tempY = null, this.eC = a || 0, this.setDisplay()
}, Camera.prototype.setScene = function(a) {
    this.scene = a
}, Camera.prototype.setDisplay = function() {
    var a = [];
    a.height = Math.abs(2 * this.position.z * Math.tan(gl.angle * (Math.PI / 180) / 2)), a.width = Math.abs(a.height * (document.getElementById("agl").width / document.getElementById("agl").height)), a.left = -a.width / 2 - this.position.x, a.right = a.width / 2 - this.position.x, a.top = a.height / 2 - this.position.y, a.bottom = -a.height / 2 - this.position.y, a.centerX = a.left + a.width / 2, a.centerY = a.top - a.height / 2, this.display = a
}, Camera.prototype.setCameraPosition = function(a) {
    this.position.x = a.x, this.position.y = a.y, this.position.z = a.z, this.setDisplay()
}, Camera.prototype.forward = function(a) {
    if (0 == a) return !0;
    var b = -a;
    yRad = this.rotation.y * (Math.PI / 180), xRad = this.rotation.x * (Math.PI / 180), yChange = b * Math.sin(xRad), zChange = b * Math.cos(yRad) * Math.cos(xRad), xChange = -b * Math.sin(yRad), this.position.y += yChange, this.position.z += zChange, this.position.x += xChange
}, Camera.prototype.side = function(a) {
    if (0 == a) return !0;
    var b = -a;
    yRad = this.rotation.y * (Math.PI / 180), zRad = this.rotation.z * (Math.PI / 180), yChange = b * Math.sin(zRad), zChange = b * Math.sin(yRad), xChange = b * Math.cos(yRad) * Math.cos(zRad), this.position.y += yChange, this.position.z += zChange, this.position.x += xChange
}, Camera.prototype.updown = function(a) {
    if (0 == a) return !0;
    var b = a;
    this.position.y += b, this.bounds()
}, Camera.prototype.pitch = function(a) {
    this.rotation.x += this.sensitivity * a
}, Camera.prototype.yaw = function(a) {
    this.rotation.y += this.sensitivity * a
}, Camera.prototype.roll = function(a) {
    this.rotation.z += this.sensitivity * a
}, Camera.prototype.transforms = function() {
    if (this.positionBefore = this.position, this.yaw(this.yawStep), this.pitch(this.pitchStep), null == this._oobject) this.forward(this.forwardStep), this.forwardStep *= this.forwardReduce, this.side(this.sideStep), this.updown(this.upStep);
    else {
        var a = Math.PI * (this.rotation.y / 180),
            b = Math.PI * (this.rotation.x / 180);
        this.position = new Vector(this._oobject.x + this._distanceVector.x * Math.sin(a), this._oobject.y - this._distanceVector.y * Math.sin(b), this._oobject.z - this._distanceVector.z * Math.cos(a))
    }
    this.bounds(), this.yawStep *= .78, this.pitchStep *= .78, gl.matrixMode(gl.PROJECTION), gl.loadIdentity(), gl.perspective(gl.angle, gl.canvas.width / gl.canvas.height, .01, 1e3), gl.rotate(this.rotation.x, 1, 0, 0), gl.rotate(this.rotation.y, 0, 1, 0), gl.rotate(this.rotation.z, 0, 0, 1), gl.translate(-this.position.x, -this.position.y, -this.position.z), gl.frustum.fromPerspectiveMatrix(gl.projectionMatrix), gl.matrixMode(gl.MODELVIEW)
}, Camera.prototype.setBounds = function(a) {
    this.bnds = a
}, Camera.prototype.bounds = function() {
    var a = this.bnds;
    a && (this.position.x > a.max.x ? this.position = this.positionBefore : this.position.x < a.min.x ? this.position = this.positionBefore : this.position.y > a.max.y ? this.position = this.positionBefore : this.position.y < a.min.y ? this.position = this.positionBefore : this.position.z > a.max.z ? this.position = this.positionBefore : this.position.z < a.min.z && (this.position = this.positionBefore))
}, Camera.prototype.on = function(a) {
    var b = this;
    b.md = 0, b.factor = a || b.factor;
    var c = (b.factor, b.sensitivity);
    document.onkeydown = function(a) {
        var c = a || window.event;
        87 == c.keyCode && (b.forwardStep = b.factor, b.forwardReduce = 1), 83 == c.keyCode && (b.forwardStep = -b.factor, b.forwardReduce = 1), 68 == c.keyCode && (b.sideStep = -b.factor), 65 == c.keyCode && (b.sideStep = b.factor), 81 == c.keyCode && (b.upStep = b.factor), 69 == c.keyCode && (b.upStep = -b.factor)
    }, document.onkeyup = function(a) {
        var c = a || window.event;
        87 == c.keyCode && (b.forwardReduce = .78), 83 == c.keyCode && (b.forwardReduce = .78), 68 == c.keyCode && (b.sideStep = 0), 65 == c.keyCode && (b.sideStep = 0), 81 == c.keyCode && (b.upStep = 0), 69 == c.keyCode && (b.upStep = 0)
    }, mouseDown = function(a) {
        var c = a.clientX ? a.clientX : a.x,
            d = a.clientY ? a.clientY : a.y;
        b.tempX = c, b.tempY = d, b.mD = a.button + 1
    }, mouseMove = function(a) {
        if (0 == b.eC || 0 != b.eC && 0 != b.mD) {
            null == b.tempX && null == b.tempY && (b.tempX = a.clientX, b.tempY = a.clientY);
            var c = a.clientX,
                d = a.clientY,
                e = (b.tempX - c) * b.sensitivity,
                f = (b.tempY - d) * b.sensitivity;
            b.tempX = c, b.tempY = d, 1 == b.mD ? null == b.mesh ? (b.yawStep = -e, b.pitchStep = -f) : b.mYaw(-e) : 2 == b.mD && (null == b.mesh ? (b.side(.05 * e), b.updown(.05 * f)) : (b.mSide(.01 * -e), b.mForward(.01 * f)))
        }
    }, mouseUp = function() {
        b.mD = 0
    }, gl.canvas.addEventListener("mousedown", mouseDown, !1), gl.canvas.addEventListener("mousemove", mouseMove, !1), gl.canvas.addEventListener("mouseup", mouseUp, !1), null != this.mesh && (this.sensitivity = c / 100, this.mesh.rotate(b.mRotation.x, b.mRotation.y, b.mRotation.z), this.mesh.move(b.mPosition.x, b.mPosition.y, b.mPosition.z))
}, aexolGL = function() {
    this.settings = {}, this.programInfo = null, this.prefix = "aexol_";
    var a = 305397760;
    gl.MODELVIEW = 1 | a, gl.PROJECTION = 2 | a, gl.modelviewMatrix = new Matrix, gl.projectionMatrix = new Matrix, gl.normalMatrix = new Matrix3, gl.modelviewStack = [], gl.uniformsSet = {}, gl.projectionStack = [], gl.frustum = new Frustum, gl.gpuNormal = !0, gl.GLT = "", gl.GLTD = "", gl.vars = {}, gl.angle = 45, gl.pause = !1, this.matrix = null, gl.stack = null, gl.matrixMode = function(a) {
        switch (a) {
            case gl.MODELVIEW:
                this.matrix = "modelviewMatrix", gl.stack = gl.modelviewStack;
                break;
            case gl.PROJECTION:
                this.matrix = "projectionMatrix", gl.stack = gl.projectionStack;
                break;
            default:
                b("invalid matrix mode " + a)
        }
    }, gl.loadIdentity = function() {
        gl[this.matrix].m = (new Matrix).m
    }, gl.loadMatrix = function(a) {
        gl[this.matrix].m = a.m.slice()
    }, gl.multMatrix = function(a) {
        gl[this.matrix].m = gl[this.matrix].multiply(a).m
    }, gl.perspective = function(a, b, c, d) {
        var e = Matrix.perspective(a, b, c, d);
        gl.multMatrix(e)
    }, gl.ortho = function(a, b, c, d, e, f) {
        gl.multMatrix(Matrix.ortho(a, b, c, d, e, f))
    }, gl.scale = function(a, b, c) {
        gl.multMatrix(Matrix.scale(a, b, c))
    }, gl.translate = function(a, b, c) {
        gl.multMatrix(Matrix.translate(a, b, c))
    }, gl.rotate = function(a, b, c, d) {
        gl.multMatrix(Matrix.rotate(a, b, c, d))
    }, gl.setMatrix = function(a) {
        gl[this.matrix] = a
    }, gl.lookAt = function(a, b, c, d, e, f, g, h, i) {
        gl.multMatrix(Matrix.lookAt(a, b, c, d, e, f, g, h, i))
    }, gl.pushMatrix = function() {
        gl.stack.push(gl[this.matrix].m.slice())
    }, gl.popMatrix = function() {
        gl[this.matrix].m = gl.stack.pop()
    }, gl.project = function(a, b, c, d, e, f) {
        d = d || gl.modelviewMatrix, e = e || gl.projectionMatrix, f = f || gl.getParameter(gl.VIEWPORT);
        var g = e.transformPoint(d.transformPoint(new Vector(a, b, c)));
        return new Vector(f[0] + f[2] * (.5 * g.x + .5), f[1] + f[3] * (.5 * g.y + .5), .5 * g.z + .5)
    }, gl.unProject = function(a, b, c, d, e, f) {
        d = d || gl.modelviewMatrix, e = e || gl.projectionMatrix, f = f || gl.getParameter(gl.VIEWPORT);
        var g = new Vector((a - f[0]) / f[2] * 2 - 1, (b - f[1]) / f[3] * 2 - 1, 2 * c - 1);
        return e.multiply(d).inverse().transformPoint(g)
    }, gl.matrixMode(gl.MODELVIEW), gl.eventListener = null, gl.activeMeshes = [], gl.ZBuffer = null, gl.lights = [], gl.aexScene = [], gl.nTexture = 0, gl.nShader = 1, gl.tweakSize = .4, gl.tweakStrength = 1.4, gl.lTexture = 1, gl.frame = 0, gl.mD = 0, gl.castRay = function(a, b, c, d) {
        if (gl.canvas.width > gl.canvas.height) var e = d * (gl.canvas.width / gl.canvas.height),
            f = d;
        else var f = d * (gl.canvas.height / gl.canvas.width),
            e = d;
        var g = Math.tan((gl.canvas.width / 2 - a) / (gl.canvas.width / 2) * (e / 2 / 180) * Math.PI) * c,
            h = Math.tan((gl.canvas.height / 2 - b) / (gl.canvas.height / 2) * (f / 2 / 180) * Math.PI) * c;
        return new Vector(g, h, c)
    };
    var b = function(a) {
        throw window.handleError && window.handleError(a), a
    }
}, aexolGL.prototype = {
    initGL: function() {
        gl.pixelStorei(gl.PACK_ALIGNMENT, 1), gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1), gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, !0), gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE), gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    },
    init: function() {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
            var c = Date.now(),
                d = Math.max(0, 16 - (c - a)),
                e = window.setTimeout(function() {
                    b(c + d)
                }, d);
            return a = c + d, e
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        });
        var d = function() {
            gl.viewport(0, 0, 800, 800)
        };
        gl.enable(gl.DEPTH_TEST), window.renderMaps && window.renderMaps(), window.draw ? (gl.animframe && window.cancelAnimationFrame(gl.animframe), function e() {
            gl.GLTD = "", gl.GLTD = gl.GLTD + gl.GLT, gl.GLT = "", 0 == gl.pause && (window.logic && window.logic(), window.animations(), window.draw(), gl.frame += 1), gl.animframe = window.requestAnimationFrame(e, gl.canvas)
        }()) : d()
    }
}, Physics = function(a) {
    MObject.call(this, a)
}, Physics.prototype = Object.create(MObject.prototype), Physics.prototype.constructor = Physics, Body = function(a) {
    MObject.call(this, a)
}, Body.prototype = Object.create(MObject.prototype), Body.prototype.constructor = Body, window.animations = function() {
    for (var a in GO) {
        var b = GO[a];
        if (b)
            for (var c in b.animations) {
                var d = b.animations[c];
                d.execute()
            }
    }
}, GO = [], GameObject = function(a, b) {
    this.__defineSetter__("aex", function(a) {
        if (!this._mesh) throw "Specify mesh for your GameObject before connecting aex";
        this._aex && this._mesh.removeChild(this._aex), this._aex = a, this._aex.setParent(this._mesh)
    }), this.__defineGetter__("aex", function() {
        return this._aex
    }), this.__defineSetter__("mesh", function(a) {
        if (!this._material) throw "Specify material for your GameObject before connecting mesh";
        this._mesh && this._material.removeChild(this._mesh), this._mesh = a, this._mesh.setParent(this._material), this._aex = this._aex || new Aex, this._aex.setParent(this._mesh)
    }), this.__defineGetter__("mesh", function() {
        return this._mesh
    }), this.__defineSetter__("material", function(a) {
        if (!this._shader) throw "Specify shader for your GameObject before connecting material";
        this._material && (this._light ? this._light.removeChild(this._material) : this._shader.removeChild(this._material)), this._material = a, this._material.setParent(this._shader), this._mesh && this._mesh.setParent(this._material)
    }), this.__defineGetter__("material", function() {
        return this._material
    }), this.__defineSetter__("shader", function(a) {
        this._shader && (this._light ? this._light.removeChild(this._shader) : this.scene.removeChild(this._shader)), this._shader = a, this._shader.setParent(this._light ? this._light : this.scene), this._material && this._material.setParent(this._shader)
    }), this.__defineGetter__("shader", function() {
        return this._shader
    }), this.__defineSetter__("light", function(a) {
        this._light && this.scene.removeChild(this._light), this._light = a, this._light.setParent(this.scene), this._shader && this._shader.setParent(this._light)
    }), this.__defineGetter__("light", function() {
        return this._light
    }), this.__defineSetter__("uniforms", function(a) {
        this._aex.uniforms = a
    }), this.__defineGetter__("uniforms", function() {
        return this._aex.uniforms
    }), this.__defineSetter__("position", function(a) {
        this._aex.position = a, this.setModelView()
    }), this.__defineGetter__("position", function() {
        return this.aex._position
    }), this.__defineSetter__("x", function(a) {
        this._aex.position.x = a, this.setModelView()
    }), this.__defineSetter__("y", function(a) {
        this._aex.position.y = a, this.setModelView()
    }), this.__defineSetter__("z", function(a) {
        this._aex.position.z = a, this.setModelView()
    }), this.__defineGetter__("x", function() {
        return this.aex._position.x
    }), this.__defineGetter__("y", function() {
        return this.aex._position.y
    }), this.__defineGetter__("z", function() {
        return this.aex._position.z
    }), this.__defineSetter__("rotation", function(a) {
        this._aex.rotation = a, this.setModelView()
    }), this.__defineGetter__("rotation", function() {
        return this.aex._rotation
    }), this.__defineSetter__("rotX", function(a) {
        this._aex.rotation.x = a, this.setModelView()
    }), this.__defineSetter__("rotY", function(a) {
        this._aex.rotation.y = a, this.setModelView()
    }), this.__defineSetter__("rotZ", function(a) {
        this._aex.rotation.z = a, this.setModelView()
    }), this.__defineGetter__("rotX", function() {
        return this.aex._rotation.x
    }), this.__defineGetter__("rotY", function() {
        return this.aex._rotation.y
    }), this.__defineGetter__("rotZ", function() {
        return this.aex._rotation.z
    }), this.__defineSetter__("size", function(a) {
        this._aex.size = a, this.setModelView()
    }), this.__defineGetter__("size", function() {
        return this.aex._size
    }), this.__defineSetter__("scaleX", function(a) {
        this._aex.size.x = a, this.setModelView()
    }), this.__defineSetter__("scaleY", function(a) {
        this._aex.size.y = a, this.setModelView()
    }), this.__defineSetter__("scaleZ", function(a) {
        this._aex.size.z = a, this.setModelView()
    }), this.__defineGetter__("scaleX", function() {
        return this.aex._size.x
    }), this.__defineGetter__("scaleY", function() {
        return this.aex._size.y
    }), this.__defineGetter__("scaleZ", function() {
        return this.aex._size.z
    }), this.scene = a, b.light && (this.light = b.light), b.shader && (this.shader = b.shader), b.material && (this.material = b.material), b.mesh && (this.mesh = b.mesh, this.aex = b.aex || new Aex, this._size = new Vector(1, 1, 1), this._rotation = new Vector(0, 0, 0), this._position = new Vector(0, 0, 0), this.setModelView()), this.animations = [], -1 == GO.indexOf(this) && GO.push(this)
}, GameObject.prototype.setModelView = function() {
    this.aex.setModelView()
}, GameObject.prototype.scale = function(a, b, c, d) {
    return this.size = d ? this.aex._size.add(new Vector(a, b, c)) : new Vector(a, b, c), this
}, GameObject.prototype.scaleUniform = function(a, b) {
    return this.size = b ? this.size.add(new Vector(a, a, a)) : new Vector(a, a, a), this
}, GameObject.prototype.move = function(a, b, c, d) {
    return this.position = d ? this.position.add(new Vector(a, b, c)) : new Vector(a, b, c), this
}, GameObject.prototype.rotate = function(a, b, c, d) {
    return this.rotation = d ? this.rotation.add(new Vector(a, b, c)) : new Vector(a, b, c), this
}, GameObject.prototype.addAnimation = function(a) {
    return this.animations.push(a), this
}, GameObject.prototype.remove = function() {
    this.aex && this.aex.remove(), GO.splice(GO.indexOf(this), 1)
}, Group = function() {
    this.items = [], this.position = new Vector(0, 0, 0), this.pivot = new Vector(0, 0, 0), this.rotation = new Vector(0, 0, 0), this.size = new Vector(1, 1, 1)
}, Group.prototype = {
    add: function(a) {
        return this.items.push(a), this
    },
    move: function(a, b) {
        var c = a.subtract(this.position);
        if (c != new Vector(0, 0, 0))
            for (var d = 0; d < this.items.length; d++) {
                var e = this.items[d];
                if (null != e) {
                    var f = e.position;
                    b ? e.move(a.x, a.y, a.z, b) : e.move(f.x + c.x, f.y + c.y, f.z + c.z)
                }
            }
        return this.position = b ? this.position.add(a) : a, this
    },
    scaleLocal: function() {
        for (var a = toVector(arguments), b = 0; b < this.items.length; b++) {
            var c = this.items[b];
            c.scale(c.size.x * a.x, c.size.y * a.y, c.size.z * a.z)
        }
        return this.size = a, this
    },
    rotateLocal: function() {
        for (var a = toVector(arguments), b = a.subtract(this.rotation), c = 0; c < this.items.length; c++) {
            var d = this.items[c],
                e = d.rotation;
            d.rotate(e.x + b.x, e.y + b.y, e.z + b.z)
        }
        return this.rotation = a, this
    },
    rotate: function(a, b, c, d) {
        for (var e in this.items) {
            var f = this.items[e];
            f.rotateAroundPoint(this.pivot, a, b, c, d)
        }
    }
}, Label = function(a, b, c, d) {
    this._text = b, this._size = d, this._font = c, this._color = "rgba(255,255,255,1)", this.generateCanvas(), GameObject.call(this, a, {
        shader: new basicShader({
            useDiffuse: !0
        }),
        material: new Material({
            color: [1, 1, 1],
            diffuse: Texture.fromCanvas(this.canvas)
        }),
        mesh: Mesh.plane()
    }), this.__defineSetter__("color", function(a) {
        this._color = a, this.changeText(), this.changeTexture()
    }), this.__defineSetter__("size", function(a) {
        this._size = a, this.changeText(), this.changeTexture()
    }), this.__defineSetter__("text", function(a) {
        this._text = a, this.changeText(), this.changeTexture()
    }), this.__defineSetter__("font", function(a) {
        this._font = a, this.changeText(), this.changeTexture()
    })
}, Label.prototype = Object.create(GameObject.prototype), Label.prototype.constructor = Label, Label.prototype.generateCanvas = function() {
    this.canvas = document.createElement("canvas"), this.canvas.width = 1024, this.canvas.height = 1024, this.ctx = this.canvas.getContext("2d"), this.ctx.textAlign = "center", this.ctx.textBaseline = "middle", this.changeText()
}, Label.prototype.changeText = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.font = this._size + "px " + this._font, this.ctx.fillStyle = this._color, this.ctx.fillText(this._text, this.canvas.width / 2, this.canvas.height / 2)
}, Label.prototype.changeTexture = function() {
    this.material.setDiffuse(Texture.fromCanvas(this.canvas))
}, Label.loadFont = function(a, b) {
    var c = document.createElement("style"),
        d = b.split("."),
        e = d[d.length];
    c.appendChild(document.createTextNode("@font-face {    font-family: '" + a + "';    src: url('" + b + "') format(" + e + ");}")), document.head.appendChild(c)
}, BasicTextMaterial = function(a) {
    var b = new Material(a);
    return b
};
var K3D = {};
K3D.load = function(a, b) {
    var c = new XMLHttpRequest;
    c.open("GET", a, !0), c.responseType = "arraybuffer", c.onload = function(a) {
        b(a.target.response)
    }, c.send()
}, K3D.save = function(a) {
    var b = "data:application/octet-stream;base64," + btoa(K3D.parse._buffToStr(a));
    window.location.href = b
}, K3D.clone = function(a) {
    return JSON.parse(JSON.stringify(a))
}, K3D.bin = {}, K3D.bin.f = new Float32Array(1), K3D.bin.fb = new Uint8Array(K3D.bin.f.buffer), K3D.bin.rf = function(a, b) {
    for (var c = K3D.bin.f, d = K3D.bin.fb, e = 0; 4 > e; e++) d[e] = a[b + e];
    return c[0]
}, K3D.bin.rsl = function(a, b) {
    return a[b] | a[b + 1] << 8
}, K3D.bin.ril = function(a, b) {
    return a[b] | a[b + 1] << 8 | a[b + 2] << 16 | a[b + 3] << 24
}, K3D.bin.rASCII0 = function(a, b) {
    for (var c = ""; 0 != a[b];) c += String.fromCharCode(a[b++]);
    return c
}, K3D.bin.wf = function(a, b, c) {
    var d = new Float32Array(a.buffer, b, 1);
    d[0] = c
}, K3D.bin.wsl = function(a, b, c) {
    a[b] = c, a[b + 1] = c >> 8
}, K3D.bin.wil = function(a, b, c) {
    a[b] = c, a[b + 1] = c >> 8, a[b + 2] = c >> 16, a[b + 3] >> 24
}, K3D.parse = {}, K3D.parse._buffToStr = function(a) {
    for (var b = new Uint8Array(a), c = "", d = 0; d < b.length; d++) c = c.concat(String.fromCharCode(b[d]));
    return c
}, K3D.parse._strToBuff = function(a) {
    for (var b = new ArrayBuffer(a.length), c = new Uint8Array(b), d = 0; d < a.length; d++) c[d] = a.charCodeAt(d);
    return b
}, K3D.parse._readLine = function(a, b) {
    for (var c = ""; 10 != a[b];) c += String.fromCharCode(a[b++]);
    return c
}, K3D.parse.fromJSON = function(a) {
    var b = JSON.parse(K3D.parse._buffToStr(a));
    return b
}, K3D.parse.toJSON = function(a) {
    var b = JSON.stringify(a);
    return K3D.parse._strToBuff(b)
}, K3D.parse.fromOBJ = function(a) {
    groups = {};
    for (var b = {
            from: 0,
            to: 0,
            triangles: []
        }, c = 0, d = 0, e = new Uint8Array(a), f = [], g = [], h = []; d < e.length;) {
        var i = K3D.parse._readLine(e, d);
        d += i.length + 1;
        var j = i.trim().split(" ");
        if (trimWhitespace(j), "g" == j[0] && (b = {
                from: c,
                to: f.length,
                triangles: []
            }, c = f.length, null == groups[j[1]] && (groups[j[1]] = b)), "v" == j[0]) {
            var k = parseFloat(j[1]),
                l = parseFloat(j[2]),
                m = parseFloat(j[3]);
            f.push([k, l, m])
        }
        if ("vt" == j[0]) {
            var k = parseFloat(j[1]),
                l = 1 - parseFloat(j[2]);
            h.push([k, l])
        }
        if ("vn" == j[0]) {
            var k = parseFloat(j[1]),
                l = parseFloat(j[2]),
                m = parseFloat(j[3]);
            g.push([k, l, m])
        }
        if ("f" == j[0]) {
            indices = [];
            for (var n = 1; n < j.length; n++) indices.push(_ind(j[n]));
            for (var n = 2; n < indices.length; n++) b.triangles.push([indices[0], indices[n - 1], indices[n]])
        }
    }
    var o = {};
    for (var p in groups) {
        var q = groups[p],
            r = {},
            s = [],
            t = [],
            u = [],
            v = [],
            w = q.triangles;
        for (var x in w) {
            for (var y = [0, 0, 0], z = w[x], n = 0; 3 > n; n++) {
                var A = z[n][0],
                    B = z[n][1],
                    C = z[n][2];
                vmap = [f[A], C >= 0 && C < g.length ? g[C] : [0, 0, 0], B >= 0 && B < h.length ? h[B] : [0, 0]], vmap in r || (r[vmap] = s.length, s.push(vmap[0]), u.push(vmap[1]), t.push(vmap[2])), y[n] = r[vmap]
            }
            v.push(y)
        }
        o[p] = {
            vertices: s,
            coords: t,
            normals: u,
            triangles: v
        }
    }
    return o
}, K3D.parse.fromMD2 = function(a) {
    a = new Uint8Array(a);
    var b = {},
        c = {};
    c.ident = K3D.bin.ril(a, 0), c.version = K3D.bin.ril(a, 4), c.skinwidth = K3D.bin.ril(a, 8), c.skinheight = K3D.bin.ril(a, 12), c.framesize = K3D.bin.ril(a, 16), c.num_skins = K3D.bin.ril(a, 20), c.num_vertices = K3D.bin.ril(a, 24), c.num_st = K3D.bin.ril(a, 28), c.num_tris = K3D.bin.ril(a, 32), c.num_glcmds = K3D.bin.ril(a, 36), c.num_frames = K3D.bin.ril(a, 40), c.offset_skins = K3D.bin.ril(a, 44), c.offset_st = K3D.bin.ril(a, 48), c.offset_tris = K3D.bin.ril(a, 52), c.offset_frames = K3D.bin.ril(a, 56), c.offset_glcmds = K3D.bin.ril(a, 60), c.offset_end = K3D.bin.ril(a, 64);
    var d = c.offset_st;
    b.c_uvt = [];
    for (var e = 0; e < c.num_st; e++) {
        var f = K3D.bin.rsl(a, d) / c.skinwidth,
            g = K3D.bin.rsl(a, d + 2) / c.skinheight;
        b.c_uvt.push(f, g), d += 4
    }
    var d = c.offset_tris,
        h = [],
        i = [];
    b.i_verts = h, b.i_uvt = i;
    for (var e = 0; e < c.num_tris; e++) h.push(K3D.bin.rsl(a, d), K3D.bin.rsl(a, d + 2), K3D.bin.rsl(a, d + 4)), i.push(K3D.bin.rsl(a, d + 6), K3D.bin.rsl(a, d + 8), K3D.bin.rsl(a, d + 10)), d += 12;
    var d = c.offset_skins;
    b.skins = [];
    for (var e = 0; e < c.num_skins; e++) b.skins.push(K3D.bin.rASCII0(a, d)), d += 64;
    var d = c.offset_frames;
    b.frames = [];
    for (var j = K3D.parse.fromMD2._normals, e = 0; e < c.num_frames; e++) {
        var k = {},
            l = K3D.bin.rf(a, d),
            m = K3D.bin.rf(a, d + 4),
            n = K3D.bin.rf(a, d + 8);
        d += 12;
        var o = K3D.bin.rf(a, d),
            p = K3D.bin.rf(a, d + 4),
            q = K3D.bin.rf(a, d + 8);
        d += 12, k.name = K3D.bin.rASCII0(a, d), d += 16, k.verts = [], k.norms = [];
        for (var r = 0; r < c.num_vertices; r++) k.verts.push(a[d] * l + o, a[d + 1] * m + p, a[d + 2] * n + q), k.norms.push(j[3 * a[d + 3]], j[3 * a[d + 3] + 1], j[3 * a[d + 3] + 2]), d += 4;
        b.frames.push(k)
    }
    return b
}, K3D.parse.fromMD2._normals = [-.525731, 0, .850651, -.442863, .238856, .864188, -.295242, 0, .955423, -.309017, .5, .809017, -.16246, .262866, .951056, 0, 0, 1, 0, .850651, .525731, -.147621, .716567, .681718, .147621, .716567, .681718, 0, .525731, .850651, .309017, .5, .809017, .525731, 0, .850651, .295242, 0, .955423, .442863, .238856, .864188, .16246, .262866, .951056, -.681718, .147621, .716567, -.809017, .309017, .5, -.587785, .425325, .688191, -.850651, .525731, 0, -.864188, .442863, .238856, -.716567, .681718, .147621, -.688191, .587785, .425325, -.5, .809017, .309017, -.238856, .864188, .442863, -.425325, .688191, .587785, -.716567, .681718, -.147621, -.5, .809017, -.309017, -.525731, .850651, 0, 0, .850651, -.525731, -.238856, .864188, -.442863, 0, .955423, -.295242, -.262866, .951056, -.16246, 0, 1, 0, 0, .955423, .295242, -.262866, .951056, .16246, .238856, .864188, .442863, .262866, .951056, .16246, .5, .809017, .309017, .238856, .864188, -.442863, .262866, .951056, -.16246, .5, .809017, -.309017, .850651, .525731, 0, .716567, .681718, .147621, .716567, .681718, -.147621, .525731, .850651, 0, .425325, .688191, .587785, .864188, .442863, .238856, .688191, .587785, .425325, .809017, .309017, .5, .681718, .147621, .716567, .587785, .425325, .688191, .955423, .295242, 0, 1, 0, 0, .951056, .16246, .262866, .850651, -.525731, 0, .955423, -.295242, 0, .864188, -.442863, .238856, .951056, -.16246, .262866, .809017, -.309017, .5, .681718, -.147621, .716567, .850651, 0, .525731, .864188, .442863, -.238856, .809017, .309017, -.5, .951056, .16246, -.262866, .525731, 0, -.850651, .681718, .147621, -.716567, .681718, -.147621, -.716567, .850651, 0, -.525731, .809017, -.309017, -.5, .864188, -.442863, -.238856, .951056, -.16246, -.262866, .147621, .716567, -.681718, .309017, .5, -.809017, .425325, .688191, -.587785, .442863, .238856, -.864188, .587785, .425325, -.688191, .688191, .587785, -.425325, -.147621, .716567, -.681718, -.309017, .5, -.809017, 0, .525731, -.850651, -.525731, 0, -.850651, -.442863, .238856, -.864188, -.295242, 0, -.955423, -.16246, .262866, -.951056, 0, 0, -1, .295242, 0, -.955423, .16246, .262866, -.951056, -.442863, -.238856, -.864188, -.309017, -.5, -.809017, -.16246, -.262866, -.951056, 0, -.850651, -.525731, -.147621, -.716567, -.681718, .147621, -.716567, -.681718, 0, -.525731, -.850651, .309017, -.5, -.809017, .442863, -.238856, -.864188, .16246, -.262866, -.951056, .238856, -.864188, -.442863, .5, -.809017, -.309017, .425325, -.688191, -.587785, .716567, -.681718, -.147621, .688191, -.587785, -.425325, .587785, -.425325, -.688191, 0, -.955423, -.295242, 0, -1, 0, .262866, -.951056, -.16246, 0, -.850651, .525731, 0, -.955423, .295242, .238856, -.864188, .442863, .262866, -.951056, .16246, .5, -.809017, .309017, .716567, -.681718, .147621, .525731, -.850651, 0, -.238856, -.864188, -.442863, -.5, -.809017, -.309017, -.262866, -.951056, -.16246, -.850651, -.525731, 0, -.716567, -.681718, -.147621, -.716567, -.681718, .147621, -.525731, -.850651, 0, -.5, -.809017, .309017, -.238856, -.864188, .442863, -.262866, -.951056, .16246, -.864188, -.442863, .238856, -.809017, -.309017, .5, -.688191, -.587785, .425325, -.681718, -.147621, .716567, -.442863, -.238856, .864188, -.587785, -.425325, .688191, -.309017, -.5, .809017, -.147621, -.716567, .681718, -.425325, -.688191, .587785, -.16246, -.262866, .951056, .442863, -.238856, .864188, .16246, -.262866, .951056, .309017, -.5, .809017, .147621, -.716567, .681718, 0, -.525731, .850651, .425325, -.688191, .587785, .587785, -.425325, .688191, .688191, -.587785, .425325, -.955423, .295242, 0, -.951056, .16246, .262866, -1, 0, 0, -.850651, 0, .525731, -.955423, -.295242, 0, -.951056, -.16246, .262866, -.864188, .442863, -.238856, -.951056, .16246, -.262866, -.809017, .309017, -.5, -.864188, -.442863, -.238856, -.951056, -.16246, -.262866, -.809017, -.309017, -.5, -.681718, .147621, -.716567, -.681718, -.147621, -.716567, -.850651, 0, -.525731, -.688191, .587785, -.425325, -.587785, .425325, -.688191, -.425325, .688191, -.587785, -.425325, -.688191, -.587785, -.587785, -.425325, -.688191, -.688191, -.587785, -.425325], K3D.parse.fromCollada = function(a) {
    var b = K3D.parse._buffToStr(a),
        c = (new DOMParser).parseFromString(b, "text/xml");
    c = c.childNodes[0];
    var d = {},
        e = c.getElementsByTagName("asset")[0],
        f = c.getElementsByTagName("library_geometries")[0],
        g = c.getElementsByTagName("library_images")[0],
        h = c.getElementsByTagName("library_materials")[0],
        i = c.getElementsByTagName("library_effects")[0];
    return e && (d.asset = K3D.parse.fromCollada._asset(e)), f && (d.geometries = K3D.parse.fromCollada._libGeometries(f)), g && (d.images = K3D.parse.fromCollada._libImages(g)), h && (d.materials = K3D.parse.fromCollada._libMaterials(h)), i && (d.effects = K3D.parse.fromCollada._libEffects(i)), d
}, K3D.parse.fromCollada._asset = function(a) {
    return {
        created: a.getElementsByTagName("created")[0].textContent,
        modified: a.getElementsByTagName("modified")[0].textContent,
        up_axis: a.getElementsByTagName("up_axis")[0].textContent
    }
}, K3D.parse.fromCollada._libGeometries = function(a) {
    a = a.getElementsByTagName("geometry");
    for (var b = [], c = 0; c < a.length; c++) {
        var d = a[c],
            e = K3D.parse.fromCollada._getMesh(d.getElementsByTagName("mesh")[0]);
        b.push(e)
    }
    return b
}, K3D.parse.fromCollada._getMesh = function(a) {
    for (var b = {}, c = a.getElementsByTagName("source"), d = b.sources = {}, e = 0; e < c.length; e++) {
        for (var f = c[e].getElementsByTagName("float_array")[0].textContent.split(" "), g = f.length - ("" == f[f.length - 1] ? 1 : 0), h = new Array(g), i = 0; g > i; i++) h[i] = parseFloat(f[i]);
        d[c[e].getAttribute("id")] = h
    }
    b.triangles = [];
    var j = a.getElementsByTagName("triangles");
    if (null == j) return b;
    for (var e = 0; e < j.length; e++) {
        var k = {},
            l = j[e];
        k.material = l.getAttribute("material");
        for (var m = l.getElementsByTagName("input"), n = [], i = 0; i < m.length; i++) {
            var o = m[i],
                h = [];
            n[parseInt(o.getAttribute("offset"))] = h;
            var p = o.getAttribute("semantic");
            k["s_" + p] = "VERTEX" == p ? a.getElementsByTagName("vertices")[0].getElementsByTagName("input")[0].getAttribute("source").substring(1) : o.getAttribute("source").substring(1), k["i_" + p] = h; {
                d[k["s_" + p]]
            }
        }
        for (var q = l.getElementsByTagName("p")[0].textContent.split(" "), r = 3 * Math.floor(q.length / 3), i = 0; r > i; i++) n[i % m.length].push(parseInt(q[i]));
        b.triangles.push(k)
    }
    return b
}, K3D.parse.fromCollada._libImages = function(a) {
    a = a.getElementsByTagName("image");
    for (var b = {}, c = 0; c < a.length; c++) b[a[c].getAttribute("id")] = a[c].getElementsByTagName("init_from")[0].textContent;
    return b
}, K3D.parse.fromCollada._libMaterials = function(a) {
    a = a.getElementsByTagName("material");
    for (var b = {}, c = 0; c < a.length; c++) b[a[c].getAttribute("name")] = a[c].getElementsByTagName("instance_effect")[0].getAttribute("url").substring(1);
    return b
}, K3D.parse.fromCollada._libEffects = function(a) {
    a = a.getElementsByTagName("effect");
    for (var b = {}, c = 0; c < a.length; c++) {
        for (var d = {}, e = a[c].getElementsByTagName("newparam"), f = 0; f < e.length; f++) {
            var g = e[f].getElementsByTagName("surface")[0];
            g && (d.surface = g.getElementsByTagName("init_from")[0].textContent)
        }
        b[a[c].getAttribute("id")] = d
    }
    return b
}, K3D.parse.from3DS = function(a) {
    a = new Uint8Array(a);
    var b = {};
    if (19789 != K3D.bin.rsl(a, 0)) return null;
    for (var c = K3D.bin.ril(a, 2), d = 6; c > d;) {
        var e = K3D.bin.rsl(a, d),
            f = K3D.bin.ril(a, d + 2);
        15677 == e && (b.edit = K3D.parse.from3DS._edit3ds(a, d, f)), 45056 == e && (b.keyf = K3D.parse.from3DS._keyf3ds(a, d, f)), d += f
    }
    return b
}, K3D.parse.from3DS._edit3ds = function(a, b, c) {
    for (var d = {}, e = b + 6; b + c > e;) {
        var f = K3D.bin.rsl(a, e),
            g = K3D.bin.ril(a, e + 2);
        16384 == f && (null == d.objects && (d.objects = []), d.objects.push(K3D.parse.from3DS._edit_object(a, e, g))), e += g
    }
    return d
}, K3D.parse.from3DS._keyf3ds = function(a, b, c) {
    for (var d = {}, e = b + 6; b + c > e;) {
        var f = K3D.bin.rsl(a, e),
            g = K3D.bin.ril(a, e + 2);
        45058 == f && (null == d.desc && (d.desc = []), d.desc.push(K3D.parse.from3DS._keyf_objdes(a, e, g))), e += g
    }
    return d
}, K3D.parse.from3DS._keyf_objdes = function(a, b, c) {
    for (var d = {}, e = b + 6; b + c > e;) {
        var f = K3D.bin.rsl(a, e),
            g = K3D.bin.ril(a, e + 2);
        45072 == f && (d.hierarchy = K3D.parse.from3DS._keyf_objhierarch(a, e, g)), 45073 == f && (d.dummy_name = K3D.bin.rASCII0(a, e + 6)), e += g
    }
    return d
}, K3D.parse.from3DS._keyf_objhierarch = function(a, b) {
    var c = {},
        d = b + 6;
    return c.name = K3D.bin.rASCII0(a, d), d += c.name.length + 1, c.hierarchy = K3D.bin.rsl(a, d + 4), c
}, K3D.parse.from3DS._edit_object = function(a, b, c) {
    var d = {},
        e = b + 6;
    for (d.name = K3D.bin.rASCII0(a, e), e += d.name.length + 1; b + c > e;) {
        var f = K3D.bin.rsl(a, e),
            g = K3D.bin.ril(a, e + 2);
        16640 == f && (d.mesh = K3D.parse.from3DS._obj_trimesh(a, e, g)), e += g
    }
    return d
}, K3D.parse.from3DS._obj_trimesh = function(a, b, c) {
    for (var d = {}, e = b + 6; b + c > e;) {
        var f = K3D.bin.rsl(a, e),
            g = K3D.bin.ril(a, e + 2);
        16656 == f && (d.vertices = K3D.parse.from3DS._tri_vertexl(a, e, g)), 16672 == f && (d.indices = K3D.parse.from3DS._tri_facel1(a, e, g)), 16704 == f && (d.uvt = K3D.parse.from3DS._tri_mappingcoors(a, e, g)), 16736 == f && (d.local = K3D.parse.from3DS._tri_local(a, e, g)), e += g
    }
    return d
}, K3D.parse.from3DS._tri_vertexl = function(a, b) {
    var c = [],
        d = b + 6,
        e = K3D.bin.rsl(a, d);
    d += 2;
    for (var f = 0; e > f; f++) c.push(K3D.bin.rf(a, d)), c.push(K3D.bin.rf(a, d + 4)), c.push(K3D.bin.rf(a, d + 8)), d += 12;
    return c
}, K3D.parse.from3DS._tri_facel1 = function(a, b) {
    var c = [],
        d = b + 6,
        e = K3D.bin.rsl(a, d);
    d += 2;
    for (var f = 0; e > f; f++) c.push(K3D.bin.rsl(a, d)), c.push(K3D.bin.rsl(a, d + 2)), c.push(K3D.bin.rsl(a, d + 4)), d += 8;
    return c
}, K3D.parse.from3DS._tri_mappingcoors = function(a, b) {
    var c = [],
        d = b + 6,
        e = K3D.bin.rsl(a, d);
    d += 2;
    for (var f = 0; e > f; f++) c.push(K3D.bin.rf(a, d)), c.push(1 - K3D.bin.rf(a, d + 4)), d += 8;
    return c
}, K3D.parse.from3DS._tri_local = function(a, b) {
    var c = {},
        d = b + 6;
    return c.X = [K3D.bin.rf(a, d), K3D.bin.rf(a, d + 4), K3D.bin.rf(a, d + 8)], d += 12, c.Y = [K3D.bin.rf(a, d), K3D.bin.rf(a, d + 4), K3D.bin.rf(a, d + 8)], d += 12, c.Z = [K3D.bin.rf(a, d), K3D.bin.rf(a, d + 4), K3D.bin.rf(a, d + 8)], d += 12, c.C = [K3D.bin.rf(a, d), K3D.bin.rf(a, d + 4), K3D.bin.rf(a, d + 8)], d += 12, c
}, K3D.parse.fromBIV = function(a) {
    a = new Uint8Array(a);
    var b = {},
        c = {};
    return c.id = K3D.bin.ril(a, 0), c.verS = K3D.bin.ril(a, 4), c.texS = K3D.bin.ril(a, 8), c.indS = K3D.bin.ril(a, 12), c.verO = K3D.bin.ril(a, 16), c.verL = K3D.bin.ril(a, 20), c.texO = K3D.bin.ril(a, 24), c.texL = K3D.bin.ril(a, 28), c.indO = K3D.bin.ril(a, 32), c.indL = K3D.bin.ril(a, 36), 0 != c.verO && (b.vertices = K3D.parse.fromBIV._readFloats(a, c.verO, c.verL)), 0 != c.texO && (b.uvt = K3D.parse.fromBIV._readFloats(a, c.texO, c.texL)), 0 != c.indO && (b.indices = K3D.parse.fromBIV._readInts(a, c.indO, c.indL, c.indS)), b
}, K3D.parse.toBIV = function(a) {
    for (var b = 0, c = 0; c < a.indices.length; c++) b = Math.max(b, a.indices[c]);
    var d = 32;
    65535 >= b && (d = 16);
    var e = 40;
    a.vertices && (e += 4 * a.vertices.length), a.uvt && (e += 4 * a.uvt.length), a.indices && (e += a.indices.length * d / 8);
    var f = new Uint8Array(e);
    K3D.bin.wil(f, 0, 1769365870), K3D.bin.wil(f, 4, 32), K3D.bin.wil(f, 8, 32), K3D.bin.wil(f, 12, d);
    var g = 40;
    return a.vertices && (K3D.bin.wil(f, 16, g), K3D.bin.wil(f, 20, 4 * a.vertices.length), K3D.parse.fromBIV._writeFloats(f, g, a.vertices), g += 4 * a.vertices.length), a.uvt && (K3D.bin.wil(f, 24, g), K3D.bin.wil(f, 28, 4 * a.uvt.length), K3D.parse.fromBIV._writeFloats(f, g, a.uvt), g += 4 * a.uvt.length), a.indices && (K3D.bin.wil(f, 32, g), K3D.bin.wil(f, 36, 4 * a.indices.length), K3D.parse.fromBIV._writeInts(f, g, a.indices, d)), f.buffer
}, K3D.parse.fromBIV._readFloats = function(a, b, c) {
    for (var d = [], e = 0; c / 4 > e; e++) d.push(K3D.bin.rf(a, b + 4 * e));
    return d
}, K3D.parse.fromBIV._writeFloats = function(a, b, c) {
    for (var d = 0; d < c.length; d++) K3D.bin.wf(a, b + 4 * d, c[d])
}, K3D.parse.fromBIV._readInts = function(a, b, c, d) {
    for (var e = [], f = 0; c / 4 > f; f++) 16 == d && e.push(K3D.bin.rsl(a, b + 2 * f)), 32 == d && e.push(K3D.bin.ril(a, b + 4 * f));
    return e
}, K3D.parse.fromBIV._writeInts = function(a, b, c, d) {
    for (var e = 0; e < c.length; e++) 16 == d && K3D.bin.wsl(a, b + 2 * e, c[e]), 32 == d && K3D.bin.wil(a, b + 4 * e, c[e])
};
