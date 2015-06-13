
var test = require('tape')
var concentrate = require('concentrate')
var bufferParser = require('./')


test('basic parsing', function (t) {
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


test('eof', function (t) {
  t.plan(3)

  var empty = bufferParser(Buffer([]))
  var one = bufferParser(Buffer([1]))
  var two = bufferParser(Buffer([1,2]))

  t.ok(empty.eof(), 'empty buffer should be eof')
  t.notOk(one.eof(), 'untouched one buffer should not be eof')

  one.int8()

  t.ok(one.eof(), 'touched one buffer should be eof')
})
