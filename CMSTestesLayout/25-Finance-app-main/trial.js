function combinations(number) {
  var n = number;
  for (var i = number; i > 0; i--) {
    n += n * (i - 1);
  }
  var splits = (2545)
    .toString()
    .split('')
    .map(Number)
    .reduce(function(a, b) {
      a + b;
    }, 0);
  console.log(splits);
}

combinations(10);
