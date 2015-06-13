
module.exports = BufferParser

function BufferParser(buf) {
  if (!(this instanceof BufferParser))
    return new BufferParser(buf)
  this.buf = buf;
  this.offset = 0;
}

BufferParser.prototype.skip = function (n) {
  this.offset += n
}

BufferParser.prototype.buffer = function (n) {
  var buf = this.buf.slice(this.offset, this.offset + n)
  this.offset += n
  return buf
}

// generate reader methods
!function thefuk() {
  Object.keys(Buffer.prototype).forEach(function(key) {
    if (key.indexOf("read") === 0) {
      var size = determineSize(key)
      var nicerKey = key.slice(4).toLowerCase()
      BufferParser.prototype[nicerKey] = function () {
        var val = Buffer.prototype[key].call(this.buf, this.offset)
        this.offset += size
        return val
      }
    }
  })
}()

function determineSize(str) {
  if (/8/.test(str)) return 1
  if (/32/.test(str)) return 4
  if (/16/.test(str)) return 2
  if (/double/i.test(str)) return 8
  if (/float/i.test(str)) return 4
  if (/int/i.test(str)) return 4
}
