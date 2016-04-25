var calc = function (expression) {
  // evaluate `expression` and return result
  function parse() {
    removeWhitespace(expression);
    return expr();
  }
  
  function removeWhitespace() {
    while (nextChar().match(/\s/)) {
      consumeChar();
    }
  }
  
  function nextChar() {
    return expression[0];
  }
  
  function consumeChar() {
    expression = expression.slice(1);
  }
  
  function number() {
    removeWhitespace();
    var result = '';
    while (nextChar().match(/[0-9.]/)) {
      result += nextChar();
      consumeChar();
      if (!nextChar())
        break;
    }
    return +result;
  }
  
  function factor() {
    removeWhitespace();
    var result;
    if (nextChar() === '(') {
      consumeChar();
      result = expr();
      // consume ')'
      consumeChar();
    }
    else if (nextChar() === '-') {
      consumeChar();
      result = -factor();
    }
    else {
      result = number();
    }
    return result;
  }
  
  function term() {
    removeWhitespace();
    var result = factor();
    while (nextChar()) {
      removeWhitespace();
      if (nextChar() === '*') {
        consumeChar();
        result *= factor();
      }
      else if (nextChar() === '/') {
        consumeChar();
        result /= factor();
      }
      else
        break;
    }
    return result;
  }
  
  function expr() {
    removeWhitespace();
    while (expression.match(/\s/))
      expression = expression.replace(" ", "");
    var result = term();
    while (nextChar()) {
      removeWhitespace();
      if (nextChar() === '+') {
        consumeChar();
        result += term();
      }
      else if (nextChar() === '-') {
        consumeChar();
        result -= term();
      }
      else
        break;
    }
    return result;
  }
  return parse();
};
// 2 + 2 + 2
// 2 + term()
// 2 + 2
// var tests = [
//   ['1+1', 2],
//   ['1 - 1', 0],
//   ['1* 1', 1],
//   ['1 /1', 1],
//   ['-123', -123],
//   ['123', 123],
//   ['12* 123', 1476],
//   ['2 / (2 + 3) * 4.33 - -6', 7.732],
//   ['2 /2+3 * 4.75- -6', 21.25],
//   ['12* 123/-(-5 + 2)', 492]
// ];

// tests.forEach(function (m) {
//   console.log(calc(m[0]));
//   console.assert(calc(m[0]) === m[1]);
//   console.log("done with test:", m);
// });