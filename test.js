
var test = require('tape')
var concentrate = require('concentrate')
var bufferParser = require('./')


test('basic parsing works', function (t) {
  var smallbuf = Buffer([1,2,3,4])
  var data = concentrate()
      .uint8(1)
      .uint32le(555)
      .floatle(3)
      .buffer(smallbuf)
      .buffer(smallbuf)
      .doublebe(1000)
      .result()

  t.plan(1)

  var parser = bufferParser(data)
  var parsed = [
    parser.uint8(),
    parser.uint32le(),
    parser.floatle(),
    parser.buffer(4),
    parser.buffer(4),
    parser.doublebe(),
  ]

  t.deepEqual(parsed, [1, 555, 3, smallbuf, smallbuf, 1000])
})
