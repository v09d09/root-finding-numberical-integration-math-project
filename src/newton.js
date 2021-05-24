export default function newtonRaphson(eq, x, eps) {
  let table = [];
  let counter = 0;

  let eqDer = math.derivative(eq, "x").toString();
  let eqDerDer = math.derivative(eqDer, "x").toString();

  if (
    math.abs(
      (math.evaluate(eq, { x }) * math.evaluate(eqDerDer, { x })) /
        math.square(math.evaluate(eqDer, { x }))
    ) >= 1
  ) {
    throw new Error(
      "Your guess does not statisfy the condition for convergence."
    );
  }
  if (isNaN(eps) || eps == null) eps = 0.000001;

  let h = math.evaluate(eq, { x }) / math.evaluate(eqDer, { x });

  while (Math.abs(h) >= eps) {
    
    let iter = {};
    iter["counter"] = counter;
    iter["x"] = x;
    iter["fx"] = math.evaluate(eq, { x });
    iter["fDerx"] = math.evaluate(eqDer, { x });

    x = x - h;
    h = math.evaluate(eq, { x }) / math.evaluate(eqDer, { x });

    iter["xi"] = x - h;

    counter++;
    table.push(iter);
  }

  return table;
}
