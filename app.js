console.log("Hello from Jeff");
let viz;

// select the HTML elements
const hideButton = document.getElementById("hideButton");
const showButton = document.getElementById("showButton");
const vizContainer = document.getElementById("vizContainer");
const exportPDF = document.getElementById("exportPDF");
const exportPPT = document.getElementById("exportPPT");
const applyFilter = document.getElementById("applyFilter");

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

const options = {
  device: "desktop",
};

function initviz() {
  console.log("My viz is loading...");
  viz = new tableau.Viz(vizContainer, url, options);
}

function hidetheViz() {
  console.log("Going to hide the viz...");
  viz.hide();
}

function showtheViz() {
  console.log("Going to show the viz...");
  viz.show();
}

function exportPDFfn() {
  console.log("generating PDF export");
  viz.showExportPDFDialog();
}

function exportPPTfn() {
  console.log("generating PPT export");
  viz.showExportPowerPointDialog();
}

function getRangeValues() {
  // 1. get the min and max value
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  // console.log(
  //  `Your min value is ${minValue} and your max value is ${maxValue}`
  // );
  // 2. get workbook, get active sheet (dashboard), get all the sheets, get the sheet with the sales bar chart
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Your filter was applied"));
  // 3. apply the range filter from 1 to the bar chart
}

hideButton.addEventListener("click", hidetheViz);
showButton.addEventListener("click", showtheViz);
exportPDF.addEventListener("click", exportPDFfn);
exportPPT.addEventListener("click", exportPPTfn);
applyFilter.addEventListener("click", getRangeValues);
document.addEventListener("DOMContentLoaded", initviz);
