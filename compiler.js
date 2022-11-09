const fs = require("fs")

console.log("Welcome to JSFuck Compiler")

const zero = "+![]"
const one = "+!![]"
const false_ = "![]"
const true_ = "!![]"
const nan = "+[![]]"
const map = {}

function num(n) {
    if (n == 0) { return zero }
    if (n == 1) { return one }
    return Array.from({length: n}, i => one).join(" + ")
}

function str(s, db=false) {
    return s.split("").map(c => {
        var m = "'#'"
        if (c in map) {
            m = map[c]
        } else {
            console.warn(`didn't encode ${c}`)
        }
        if (db) {
            m += "    {"+c+"}"
        }
        return m
    }).join(db ? " + \n" : " + ")
}

function esc(s) {
    var f = fun(str("return escape"))
    return `${f}()(${s})`
}

function unesc(s) {
    var f = fun(str("return unescape"))
    return `${f}()(${s})`
}

const target = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\n!<>()[]{}\\/?\"'+-*&|.,;^~%= :_`$"

map["0"] = `(${zero}+[])`
map["1"] = `(${one}+[])`
map["2"] = `(${num(2)}+[])`
map["3"] = `(${num(3)}+[])`
map["4"] = `(${num(4)}+[])`
map["5"] = `(${num(5)}+[])`
map["6"] = `(${num(6)}+[])`
map["7"] = `(${num(7)}+[])`
map["8"] = `(${num(8)}+[])`
map["9"] = `(${num(9)}+[])`

map.f = `(![]+[])[${zero}]`
map.a = `(![]+[])[${one}]`
map.l = `(![]+[])[${num(2)}]`
map.s = `(![]+[])[${num(3)}]`
map.e = `(![]+[])[${num(4)}]`

map.t = `(!![]+[])[${zero}]`
map.r = `(!![]+[])[${one}]`

map.u = `([][[]]+[])[${zero}]`
map.n = `([][[]]+[])[${one}]`
map.d = `([][[]]+[])[${num(2)}]`
map.i = `([][[]]+[])[${num(5)}]`

map.c = `([][${str("flat")}]+[])[${num(3)}]`
map.t = `([][${str("flat")}]+[])[${num(4)}]`
map.o = `([][${str("flat")}]+[])[${num(6)}]`
map.v = `([][${str("flat")}]+[])[${num(23)}]`

map.b = `([][${str("entries")}]()+[])[${num(2)}]`
map.j = `([][${str("entries")}]()+[])[${num(3)}]`

map.S = `(([]+[])[${str("constructor")}]+[])[${num(9)}]`
map.g = `(([]+[])[${str("constructor")}]+[])[${num(14)}]`

map.h = `(+([] + ${one} + ${zero} + ${one}))[${str("toString")}](+((${num(2)} + []) + ${one}))[${one}]`
map.p = `(+([] + (${num(2)}) + ${one} + ${one}))[${str("toString")}](+((${num(3)} + []) + ${one}))[${one}]`
map.k = `(+([] + (${num(2)}) + ${zero}))[${str("toString")}](+((${num(2)} + []) + ${one}))[${zero}]`
map.m = `((${zero})[${str("constructor")}]+[])[[] + ${one} + ${one}]`

map["<"] = `([]+[])[${str("italics")}]()[${num(0)}]`
map[">"] = `([]+[])[${str("italics")}]()[${num(2)}]`
map["/"] = `([]+[])[${str("italics")}]()[${num(4)}]`

const constructor = `[][${str("filter")}][${str("constructor")}]`

function fun(code) {
    return `${constructor}(${code})`
}

map.x = `(+([] + ${one} + ${zero} + ${one}))[${str("toString")}](+((${num(3)} + []) + (${num(4)} + [])))[${one}]`
map.p = `(+([] + (${num(2)}) + ${one} + ${one}))[${str("toString")}](+((${num(3)} + []) + ${one}))[${one}]`
map.w = `(+([] + (${num(3)}) + (${num(2)})))[${str("toString")}](+((${num(3)} + []) + (${num(3)} + [])))[${zero}]`
map.y = `(+(${str("1e1000")})+[])[${7}]`

map[" "] = `([][${str("flat")}]+[])[${num(8)}]`

map["."] = `(+([] + ${one} + ${one} + ${map.e} + ${num(2)} + ${one})+[])[${one}]`
map[","] = `([[]][${str("concat", false)}]([[]])+[])`

map['"'] = `([]+[])[${str("fontcolor")}]()[${num(12)}]`

map["("] = `([][${str("flat")}]+[])[${num(13)}]`
map[")"] = `([][${str("flat")}]+[])[${num(14)}]`
map["["] = `([][${str("flat")}]+[])[${num(18)}]`
map["]"] = `([][${str("flat")}]+[])[${num(30)}]`
map["{"] = `([][${str("flat")}]+[])[${num(16)}]`
map["}"] = `([][${str("flat")}]+[])[${num(32)}]`

map[" "] = `([][${str("flat")}]+[])[${num(8)}]`
map["%"] = `${esc(map["("])}[${zero}]`

map.q = unesc(str("%71"))
map.z = unesc(str("%7a"))

map["!"] = unesc(str("%21"))
map["\\"] = unesc(str("%5c"))
map["'"] = unesc(str("%27"))
//map["+"] = unesc(str("%2b"))
map["+"] = `(+([] + ${one} + ${map.e} + ${one} + ${zero} + ${zero})+[])[${num(2)}]`
map["*"] = unesc(str("%2a"))
//map[","] = unesc(str("%2c"))
map["-"] = unesc(str("%2d"))
map["="] = unesc(str("%3d"))
map["^"] = unesc(str("%5e"))
map["_"] = unesc(str("%5f"))
map["\n"] = unesc(str("%0a"))
map["|"] = unesc(str("%7c"))
map["~"] = unesc(str("%7e"))

map["?"] = "("+fun(str("return /0/"))+`()[${str("constructor")}]()+[])[${num(2)}]`
map[":"] = "("+fun(str("return /0/"))+`()[${str("constructor")}]()+[])[${num(3)}]`
map[";"] = `([]+[])[${str("fontcolor")}](${map['"']})[${num(18)}]`
map["&"] = `([]+[])[${str("fontcolor")}](${map['"']})[${num(13)}]`

map["`"] = unesc(str("%60"))
map["$"] = unesc(str("%24"))

map.A = `([][${str("entries")}]()+[])[${num(8)}]`
map.B = `((${false_})[${str("constructor")}]+[])[${num(9)}]`
map.C = `${esc(str("<"))}[${num(2)}]`
map.D = `${esc(str("]"))}[${num(2)}]`
map.E = "("+fun(str("return /0/"))+`()[${str("constructor")}]+[])[${num(12)}]`
map.F = `([][${str("flat")}][${str("constructor")}]+[])[${num(9)}]`
map.G = unesc(str("%47"))
map.H = unesc(str("%48"))
map.I = `(+(${str("1e1000")})+[])[${zero}]`
map.J = unesc(str("%4a"))
map.K = unesc(str("%4b"))
map.L = unesc(str("%4c"))
map.M = unesc(str("%4d"))
map.N = `(+[![]]+[])[${zero}]`
map.O = `([][${str("entries")}]()[${str("constructor")}]+[])[${num(9)}]`
map.P = unesc(str("%50"))
map.Q = unesc(str("%51"))
map.R = "("+fun(str("return /0/"))+`()[${str("constructor")}]+[])[${num(9)}]`
map.S = `(([]+[])[${str("constructor")}]+[])[${num(9)}]`
map.T = unesc(str("%54"))
map.U = unesc(str("%55"))
map.V = unesc(str("%56"))
map.W = unesc(str("%57"))
map.X = unesc(str("%58"))
map.Y = unesc(str("%59"))
map.Z = unesc(str("%5a"))

var missing = ""
var done = ""
var wrong = ""
target.split("").forEach(c => {
    if (c in map) {
        done += c
        try {
            var m = eval(map[c])
            if (m != c) {
                wrong += c //+m+" "
            }
        } catch {
            wrong += c
        }
    } else {
        missing += c
    }

})

var entries = Object.keys(map).map(k => [k, map[k].length])
entries.sort((a,b) => a[1] - b[1])
console.table(entries)

if (wrong.length > 0) { console.log(`Wrong: ${wrong} (${Math.floor(wrong.length/target.length*10000)/100}%)`) }
if (missing.length > 0) { console.log(`Missing: ${missing} (${Math.floor(missing.length/target.length*10000)/100}%)`) }
if (done.length > 0) { console.log(`Done: ${done} (${Math.floor(done.length/target.length*10000)/100}%)`) }

//qwyz
//CDEFGHIJKLMNOPQRTUVWXYZ


/*var f = fun(`${str("console")}[${str("log")}]()`)
console.log(eval(`${fun()}()`))*/

/**
 * 
 * @param {String} src 
 */
function compile(src) {
    var result = fun(str(src))
    return result+"()"
}

module.exports = {
    compile
}

const file = "tj_birthday"
const srcPath = `js/${file}.js`
const outPath = `jsfuck/${file}.js`
//const outPath = "/tmp/test.js"

var src = fs.readFileSync(srcPath).toString()
var compiled = compile(src)

console.log(`compiled/source size ratio: ${Math.floor(compiled.length/src.length*10000)/100}%`)

fs.writeFileSync(outPath, compiled)