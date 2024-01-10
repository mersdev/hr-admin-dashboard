window.onload = () => {
  var retrievedObject = localStorage.getItem("masterlist");
  var sheetName = localStorage.getItem("sheet-name");
  var sheetUpdateTime = localStorage.getItem("sheet-update-time");
  let side_event = document.getElementsByClassName("side-event")[0];
  side_event.className += " active py-3";
  if (retrievedObject === null) {
    alert("Please upload the Excel file!");
  } else {
    let data = JSON.parse(retrievedObject);
    console.log(data);
    document.getElementsByClassName("sheet-name")[0].innerHTML =
      "Source: " + sheetName;
    document.getElementsByClassName("sheet-update-time")[0].innerHTML =
      "Updated At " + sheetUpdateTime;
    let processData = createEventMasterListData(data);
    createTable(processData);
  }
};

document.getElementById("file_upload").onchange = () => {
  let file = document.getElementById("file_upload").files;
  if (file.length == 0) {
    alert("No file is found!");
    return;
  }
  let filename = file[0].name;
  var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
  if (extension == ".XLS" || extension == ".XLSX") {
    //Here calling another method to read excel file into json
    excelFileToJSON(file[0]);
  } else {
    alert("Please select a valid excel file.");
  }
};

function excelFileToJSON(file) {
  try {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      var result = {};
      var firstSheetName = workbook.SheetNames[0];
      document.getElementsByClassName("sheet-name")[0].innerHTML =
        "Source: " + firstSheetName;
      document.getElementsByClassName("sheet-update-time")[0].innerHTML =
        "Updated At " + new Date();
      localStorage.setItem("sheet-name", firstSheetName);
      localStorage.setItem("sheet-update-time", new Date());
      //reading only first sheet data
      var data = XLSX.utils
        .sheet_to_json(workbook.Sheets[firstSheetName])
        .slice(1);
      localStorage.setItem("masterlist", JSON.stringify(data));
      let processData = createEventMasterListData(data);
      createTable(processData);
    };
  } catch (e) {
    console.log(e);
  }
}

function createEventMasterListData(data) {
  let uniqueData = [...new Set(data.map((item) => item["File Code"]))].map(
    (fileCode) => data.find((item) => item["File Code"] === fileCode)
  );

  const uniqueTitleCounts = data.reduce((acc, item) => {
    const title = item["Training Title"]; // Extract Training Title
    acc[title] = (acc[title] || 0) + 1; // Count occurrences
    return acc;
  }, {});

  let processDataList = [];

  uniqueData.forEach((unique) => {
    let processData = {};
    processData["Training Title"] = unique["Training Title"];
    processData["File Code"] = unique["File Code"];
    processData["Start Date"] = unique["Start Date"];
    processData["End Date"] = unique["End Date"];
    processData["freq"] = uniqueTitleCounts[unique["Training Title"]];
    processDataList.push(processData);
  });

  //console.log(processDataList);
  return processDataList;
}

function createTable(data) {
  let table = document.getElementsByClassName("data-table")[0];
  table.innerHTML = "";
  let map = new Map();
  let total = 0;
  data.forEach((record) => {
    let row = document.createElement("tr");

    let file_code = document.createElement("td");
    file_code.innerHTML = record["File Code"];
    row.appendChild(file_code);

    let training_title = document.createElement("td");
    training_title.innerHTML = record["Training Title"];
    training_title.className = "text-wrap";
    row.appendChild(training_title);

    let start_date = document.createElement("td");
    start_date.style.width = "120px";
    start_date.innerHTML = convertDateFromDays(record["Start Date"]);
    row.appendChild(start_date);

    let end_date = document.createElement("td");
    end_date.style.width = "120px";
    end_date.innerHTML = convertDateFromDays(record["End Date"]);
    row.appendChild(end_date);

    let freq = document.createElement("td");
    freq.innerHTML = record["freq"];
    freq.style.textAlign = "center";
    row.appendChild(freq);

    let action = document.createElement("td");
    let anchor = document.createElement("a");
    anchor.href = "/view/index.html?event-id=" + record["File Code"];
    anchor.innerHTML = "<ion-icon name='terminal-outline'></ion-icon> View";
    anchor.style.textDecoration = "none";
    anchor.style.color = "#2e2e2e";
    action.appendChild(anchor);
    row.appendChild(action);

    total += record["freq"];

    table.appendChild(row);
  });
  let total_row = document.createElement("tr");
  let total_cell = document.createElement("td");
  total_cell.style.textAlign = "right";
  total_cell.innerHTML = "Total: " + total + " Participant(s)";
  total_cell.colSpan = 6;
  total_row.appendChild(total_cell);
  table.appendChild(total_row);
}

function convertDateFromDays(daysSince1900) {
  // Create a Date object representing 1/1/1900
  const baseDate = new Date(1900, 0, 1);

  // Add the specified number of days to the base date
  const targetDate = new Date(baseDate.getTime() + daysSince1900 * 86400000); // 86400000 milliseconds in a day

  // Format the date as '10 Oct 2023'
  const formattedDate = targetDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
}
