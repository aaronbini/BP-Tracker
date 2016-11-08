// var obj = {};
// var p = new Proxy(target, {
//   set: function(target, property, value, receiver) {
//     console.log('called: ' + prop + '= ' + value);
//     return true;
//   }
// });



//asynchronous
function getFile(bmp, cb) {
  fs.readFile(bmp, (err, buffer) => {
    cb(err, buffer);
  });
}

//synchronous
function readHeader(buffer) {
  let num = buffer.readUInt32LE(0);
  return num;
}

//synchronous
function transformFile(num, buf) {
  for(let i = num; i < buf.length; i++){
    buf[i] = 255 - buf[i];
  }
  return buf;
}

//asynchronous
function writeFile(path, buf) {
  fs.writeFile('modifiedBMP.bmp', buf, (err) => {
    cb(err);
  });
}

getFile('/path-to-bmp.bmp', (err, buffer) => {
  //set buffer equal to variable to be used in testing
  let oldBMP = buffer;
  let offset = readHeader(buffer);
  let transformed = transformFile(offset, buffer);
  writeFile('/path-to-new-bmp.bmp', transformed, (err) => {
    if (err) throw {err: 'error writing file'};
    //now you have called all functions in sequence, and you should have a transformed image
    fs.readFile('/path-to-new-bmp.bmp', (err, newBuff) => {
      //run assertions
      assert.deepEqual(oldBMP, newBuff);
    });
  });
});
