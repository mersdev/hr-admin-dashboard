window.onload = () => {
  var retrievedObject = localStorage.getItem("masterlist");
  var sheetName = localStorage.getItem("sheet-name");
  var sheetUpdateTime = localStorage.getItem("sheet-update-time");
  let side_employee = document.getElementsByClassName("side-employee")[0];
  side_employee.className += " active py-3";

  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  if (retrievedObject === null) {
    alert("Please upload the Excel file!");
  } else {
    //console.log(retrievedObject);
    let data = JSON.parse(retrievedObject);
    //console.log(data);
    document.getElementsByClassName("sheet-name")[0].innerHTML =
      "Source: " + sheetName;
    document.getElementsByClassName("sheet-update-time")[0].innerHTML =
      "Updated At " + sheetUpdateTime;
    let processData = createTrainingRecordListData(data);
    createTable(data);
  }
};

function createTrainingRecordListData(data) {
  let uniqueEmployee = [...new Set(data.map((item) => item["Emp No"]))].map(
    (fileCode) => data.find((item) => item["Emp No"] === fileCode)
  );
  let uniqueEvent = [...new Set(data.map((item) => item["File Code"]))].map(
    (fileCode) => data.find((item) => item["File Code"] === fileCode)
  );
}

function createTable(data) {
  let uniqueEvent = [...new Set(data.map((item) => item["File Code"]))].map(
    (fileCode) => data.find((item) => item["File Code"] === fileCode)
  );
  let tableHeader = document.getElementsByClassName("data-table-head")[0];
  tableHeader.innerHTML = "";
  let tableHeader_row = document.createElement("tr");

  let tableHeader_EmpNo_cell = document.createElement("th");
  tableHeader_EmpNo_cell.innerHTML = "Emp No";
  tableHeader_row.appendChild(tableHeader_EmpNo_cell);

  let tableHeader_EmpName_cell = document.createElement("th");
  tableHeader_EmpName_cell.innerHTML = "Employee's Name";
  tableHeader_row.appendChild(tableHeader_EmpName_cell);

  let tableHeader_EmpCat_cell = document.createElement("th");
  tableHeader_EmpCat_cell.innerHTML = "Employee Category";
  tableHeader_row.appendChild(tableHeader_EmpCat_cell);

  let tableHeader_EmpGroup_cell = document.createElement("th");
  tableHeader_EmpGroup_cell.innerHTML = "Group";
  tableHeader_row.appendChild(tableHeader_EmpGroup_cell);

  uniqueEvent.forEach((event) => {
    let tableHeader_Event_cell = document.createElement("th");

    let tableHeader_Event_cell_anchor = document.createElement("a");
    tableHeader_Event_cell_anchor.title = event["Training Title"];
    tableHeader_Event_cell_anchor.title.className = "text-decoration-none";
    tableHeader_Event_cell_anchor.style.color = "#fefefe";
    tableHeader_Event_cell_anchor.innerHTML = event["File Code"];

    tableHeader_Event_cell.appendChild(tableHeader_Event_cell_anchor);

    tableHeader_Event_cell.setAttribute("title", event["Training Title"]);
    tableHeader_row.appendChild(tableHeader_Event_cell);
  });

  tableHeader.appendChild(tableHeader_row);
}
