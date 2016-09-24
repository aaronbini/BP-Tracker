
function solveIt (array) {
  var sumLow = 0;
  var sumHigh = 0;
  var foundIt = false;
  array.forEach(function(element, index) {
    for (var i = 0; i < index; i++) {
      sumLow += array[i];
    }
    for (var j = array.length - 1; j > index; j--) {
      sumHigh += array[j];
    }
    console.log(sumLow, ' vs ', sumHigh);

    if (sumLow === sumHigh) {
      foundIt = true;
    }
    sumLow = 0;
    sumHigh = 0;
  });
  if (foundIt) {
    console.log('YES');
  } else {
    console.log('NO');
  }
}

var array1 = [1,2,3];
var array2 = [1,2,3,3];
var array3 = [1,1,7,6,4,2,9,1,3,5,7,5];
var array4 = [1,7,6,4,2,9,1,3,5,7,5];


solveIt(array1);
solveIt(array2);
solveIt(array3);
solveIt(array4);
