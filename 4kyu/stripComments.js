function solution(input, markers){
  var curIndex = 0, startingIndex = 0, markerFound = false;
  while (curIndex < input.length) {
    if (markers.indexOf(input[curIndex]) !== -1) {
      markerFound = true;
      startingIndex = curIndex;
    }
    if ((input[curIndex] === '\n' || curIndex === input.length - 1) && markerFound) {
      if (curIndex === input.length - 1)
        curIndex++;
      var strToRemove = input.slice(startingIndex, curIndex);
      input = input.replace(strToRemove, '');
      curIndex = startingIndex;
      markerFound = false;
    }
    curIndex++;
  }
  // remove whitespace
  var arrInput = input.split('\n');
  arrInput = arrInput.map(function(line) {
    var i;
    for (i = line.length - 1; i >= 0; i--) {
      if (line[i] != ' ')
        break;
    }
    i++;
    line = line.slice(0,i);
    return line;
  });
  input = arrInput.join('\n');
  return input;
}