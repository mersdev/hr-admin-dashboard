window.onload = () => {
  var retrievedObject = localStorage.getItem("masterlist");
  let side_event = document.getElementsByClassName("side-event")[0];
  side_event.className += " active py-3";

  const searchParams = new URLSearchParams(window.location.search);
  let eventId = searchParams.get("event-id");

  if (eventId === null) {
    window.location = "/event";
  }

  if (retrievedObject === null) {
    window.location = "/event";
    alert("Please upload the Excel file!");
  } else {
    let data = JSON.parse(retrievedObject);
    console.log(data);
    const trainingTitle = data.find((emp) => emp["File Code"] === eventId)?.[
      "Training Title"
    ];
    document.getElementById("title").innerHTML =
      "[" + eventId + "]" + " Attendance List";
    document.getElementsByClassName("content-main-title")[0].innerHTML =
      "[" + eventId + "]" + " Attendance List";
    document.getElementsByClassName("content-sub-title")[0].innerHTML =
      trainingTitle;
    let processData = createEmployeeListData(data, eventId);
    let processDataByEmployeeGroup = createAnalysisData(
      processData,
      "Employee Category"
    );
    let processDataByEmployeeCategory = createAnalysisData(
      processData,
      "Group"
    );
    createTable(processData);
    createAnalysisTable(processDataByEmployeeGroup, "emp-group-table");
    createAnalysisTable(processDataByEmployeeCategory, "emp-cat-table");
  }
};

function createEmployeeListData(data, eventId) {
  const attendanceList = data.reduce((acc, emp) => {
    if (emp["File Code"] === eventId) {
      acc.push(emp);
    }
    return acc;
  }, []);
  console.log(attendanceList);
  return attendanceList;
}

function createAnalysisData(data, attributes) {
  const employeeCategoryFrequencies = {};
  data.forEach((employee) => {
    const category = employee[attributes];
    employeeCategoryFrequencies[category] =
      (employeeCategoryFrequencies[category] || 0) + 1;
  });

  console.log(employeeCategoryFrequencies);
  return employeeCategoryFrequencies;
}

function createAnalysisTable(data, className) {
  let table = document.getElementsByClassName(className)[0];
  table.innerHTML = "";
  let total = 0;
  for (const key in data) {
    let row = document.createElement("tr");

    let cat = document.createElement("td");
    cat.innerHTML = key;
    row.appendChild(cat);

    let value = document.createElement("td");
    value.innerHTML = data[key];
    row.appendChild(value);

    table.appendChild(row);
    total += data[key];
  }
  let total_row = document.createElement("tr");
  let total_cell = document.createElement("td");
  total_cell.style.textAlign = "right";
  total_cell.innerHTML = "Total: " + total + " Participant(s)";
  total_cell.colSpan = 2;
  total_row.appendChild(total_cell);
  table.appendChild(total_row);
}

function createTable(data) {
  let table = document.getElementsByClassName("data-table")[0];
  table.innerHTML = "";

  let total = 0;
  if (data.length !== 0) {
    data.forEach((record) => {
      let row = document.createElement("tr");

      let emp_no = document.createElement("td");
      emp_no.innerHTML = record["Emp No"];
      row.appendChild(emp_no);

      let training_title = document.createElement("td");
      training_title.innerHTML = record["Employee's Name"];
      training_title.className = "text-wrap";
      row.appendChild(training_title);

      let group = document.createElement("td");
      group.innerHTML = record["Group"];
      row.appendChild(group);

      let emp_category = document.createElement("td");
      emp_category.innerHTML = record["Employee Category"];
      row.appendChild(emp_category);

      let total_hours = document.createElement("td");
      total_hours.innerHTML = record["Total Hours"];
      total_hours.style.textAlign = "center";
      row.appendChild(total_hours);

      total += 1;

      table.appendChild(row);
    });
  }

  let total_row = document.createElement("tr");
  let total_cell = document.createElement("td");
  total_cell.style.textAlign = "right";
  total_cell.innerHTML = "Total: " + total + " Participant(s)";
  total_cell.colSpan = 5;
  total_row.appendChild(total_cell);
  table.appendChild(total_row);
}
