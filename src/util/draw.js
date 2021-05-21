export default function draw(eq, plotDiv) {
  try {
    const expression = eq;
    const expr = math.compile(expression);

    const xValues = math.range(-30, 30, 0.5).toArray();
    const yValues = xValues.map(function (x) {
      return expr.evaluate({ x: x });
    });
    console.log(xValues, yValues);
    const trace1 = {
      x: xValues,
      y: yValues,
      type: "scatter",
    };

    const data = [trace1];
    Plotly.newPlot(
      plotDiv,
      data,
      {
        showlegend: false,
        margin: { t: 35, r: 55, b: 35, l: 45 },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        colorway: ["#e02f6b"],
      },
      { scrollZoom: true, displayModeBar: false }
    );
  } catch (err) {
    showError(err, plotDiv);
  }
}
