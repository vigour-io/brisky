'use strict'

// need to add sort on subscriptions / operators
module.exports = function quickSort (array, left, right, sorter, moved) {
  if (left < right) {
    var p = partition(array, left, right, sorter, moved)
    quickSort(array, left, p, sorter, moved)
    quickSort(array, p + 1, right, sorter, moved)
  }
  return moved
}

function partition (array, left, right, sorter, moved) {
  var cmp = array[right - 1]
  var minEnd = left
  var maxEnd
  for (maxEnd = left; maxEnd < right - 1; maxEnd += 1) {
    if (sorter(array[maxEnd], cmp) <= 0) {
      swap(array, maxEnd, minEnd, moved)
      minEnd += 1
    }
  }
  swap(array, minEnd, right - 1, moved)
  return minEnd
}

function swap (array, i, j, moved) {
  if (i === j) {
    return
  }
  var temp = array[i]
  array[i] = array[j]
  array[j] = temp

  if (moved[i] === void 0) {
    var jval = moved[j]
    moved[i] = jval === void 0 ? j : jval
    moved[j] = i
  } else if (moved[j] === void 0) {
    var ival = moved[i]
    moved[j] = ival === void 0 ? i : ival
    moved[i] = j
  } else {
    temp = moved[i]
    moved[i] = moved[j]
    moved[j] = temp
  }
}
