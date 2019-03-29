(async function() {
  const width = 420;
  const barHeight = 20;
  const yOffset = 0;
  const scale = d3.scaleLinear()
    .range([0, width]);

  let chart = d3.select(".d3svgchart")
    .attr("width", width);

  await d3.csv("data.csv")
    .then(function(data) {
      scale.domain([0, d3.max(data, function(d) { return parseInt(d.value); })]);

      chart.attr("height", (barHeight * data.length));

      let bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
          .attr("transform", function(d, i) {
            return "translate(0," + (yOffset + (i * barHeight)) + ")";
          });

      bar.append("rect")
        .attr("width", function(d) { return scale(d.value); })
        .attr("height", barHeight - 1);

      bar.append("text")
        .attr("x", function(d) { return scale(d.value) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });
    })
    .catch(function(error) { console.error(error); }
  );
})();

