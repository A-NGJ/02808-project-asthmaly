// Colors for different observations -- black and white
// const colors = [
//     "#252525",
//     "#525252",
//     "#737373",
//     "#969696",
//     "#bdbdbd",
//     "#d9d9d9",
//     "#f0f0f0",
//   ];

// Colors for different observations -- blues
const colors = [
    "#3182bd",
    "#6baed6",
    "#9ecae1",
    "#ffffff",
  ];
  
  const charcoal = "#9e9e9e";  // Axis and text color
  const grey = "#969696";  // Not sure what this does
  
  // Typography
  const sansSerif = "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif";
  const letterSpacing = "normal";
  const fontSize = 14;
  
  // Layout
  const baseProps = {
    padding: 8,
    colorScale: colors
  };
  
  // Labels
  const baseLabelStyles = {
    fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding: 10,
    fill: charcoal,
    stroke: "transparent"
  };
  
  const centeredLabelStyles = Object.assign({ textAnchor: "middle" }, baseLabelStyles);
  
  // Strokes
  const strokeDasharray = "10, 5";
  const strokeLinecap = "round";
  const strokeLinejoin = "round";
  
  // Put it all together...
  export var darkAndBlack = {
    area: Object.assign(
      {
        style: {
          data: {
            fill: charcoal
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    axis: Object.assign(
      {
        style: {
          axis: {
            fill: "transparent",
            stroke: charcoal,
            strokeWidth: 1,
            strokeLinecap,
            strokeLinejoin
          },
          axisLabel: Object.assign({}, centeredLabelStyles, {
            padding: 25
          }),
          grid: {
            fill: "none",
            stroke: "none",
            pointerEvents: "painted"
          },
          ticks: {
            fill: "transparent",
            size: 1,
            stroke: "transparent"
          },
          tickLabels: baseLabelStyles
        }
      },
      baseProps
    ),
    bar: Object.assign(
      {
        style: {
          data: {
            fill: charcoal,
            padding: 8,
            strokeWidth: 0,
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    legend: {
      colorScale: colors,
      gutter: 10,
      orientation: "vertical",
      titleOrientation: "top",
      style: {
        data: {
          type: "circle"
        },
        labels: baseLabelStyles,
        title: Object.assign({}, baseLabelStyles, { padding: 5 })
      }
    },
    line: Object.assign(
      {
        style: {
          data: {
            fill: "transparent",
            stroke: charcoal,
            strokeWidth: 2
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    stack: Object.assign(
      {
        colorScale: colors
      },
      baseProps
    ),
    tooltip: {
      style: Object.assign({}, baseLabelStyles, { padding: 0, pointerEvents: "none" }),
      flyoutStyle: {
        stroke: charcoal,
        strokeWidth: 1,
        fill: "#f0f0f0",
        pointerEvents: "none"
      },
      flyoutPadding: 5,
      cornerRadius: 5,
      pointerLength: 10
    }
  };