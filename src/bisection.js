export default function bisection(eq, range, eps) {
  let table = [];
  let counter = 0;
  let guessTest =
    math.evaluate(eq, { x: range.a }) * math.evaluate(eq, { x: range.b }) >= 0;
  if (guessTest) throw new Error("You have not assumed a right range!");

  if (isNaN(eps) || eps == null) eps = 0.000001;

  while (Math.max(range.a, range.b) - Math.min(range.a, range.b) >= eps) {
    
    let iter = {};
    iter["counter"] = counter;
    iter["a"] = range.a;
    iter["b"] = range.b;
    iter["c"] = (range.a + range.b) / 2;
    iter["fc"] = math.evaluate(eq, { x: iter.c });

    if (iter.fc == 0) break;

    else if (iter.fc * math.evaluate(eq, { x: range.a }) < 0) range.b = iter.c;
    else range.a = iter.c;
    
    counter++;
    table.push(iter);
  }
  return table;
}
