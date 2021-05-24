export default function draw(eq, plotDiv) {
  try {
    const expression = eq;
    const expr = math.compile(expression);

    const xValues = math.range(-10, 10, 0.5).toArray();
    const yValues = xValues.map(function (x) {
      return expr.evaluate({ x: x });
    });
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
        margin: { t: 60, r: 60, b: 60, l: 50 },
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
