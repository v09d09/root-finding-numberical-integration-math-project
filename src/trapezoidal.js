export default function trapezoidal(eq, n, a, b) {
  let h = (b - a) / n;
  let s = math.evaluate(eq, { x: a }) + math.evaluate(eq, { x: b });

  console.log(eq, n, a, b, h, s);
  for (let i = 1; i < n; i++) {
    s += 2 * math.evaluate(eq, { x: a + i * h });
  }

  return (h / 2) * s;
}
