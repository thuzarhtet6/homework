const company_data = [
  {
    id: 1,
    name: "Alfreds Futterkiste",
    contact: "Maria Anders",
    country: "Germany",
  },

  {
    id: 2,
    name: "Berglunds snabbköp",
    contact: "Christina Berglund",
    country: "Sweden",
  },
  {
    id: 3,
    name: "Centro comercial Moctezuma",
    contact: "Francisco Chang",
    country: "Mexico",
  },
];

loadData(company_data);

function loadData() {
  document.getElementById("customers").innerHTML = "";
  let customers = document.getElementById("customers");
  customers.innerHTML += tableHeader();

  for (const company of company_data) {
    customers.innerHTML += generate_data(
      company.id,
      company.name,
      company.contact,
      company.country
    );
  }
  console.log(company_data);
}

function tableHeader() {
  return `
          <tr>
          <th style="text-align: center;">Company</th>
          <th style="text-align: center;">Contact</th>
          <th style="text-align: center;">Country</th>
          <th style="text-align: center;">Operation</th>
        </tr>
          `;
}

function generate_data(id, name, contact, country) {
  return `
          <tr >

          <td>${name}</td>
          <td>${contact}</td>
          <td>${country}</td>
          <td><button  onclick="deleteRow(${id})">Delete this Row</button>
          <button  onclick="updateRowBind(${id})">Update Details</button>
          <button  onclick="viewDetails(${id})">View Details</button>
          </td>
        </tr>
          `;
}

function generate_company_details(name, contact, country, id) {
  return `
        <tr >

        <td>${name}</td>
        <td>${contact}</td>
        <td>${country}</td>
        <td>
        <button  onclick="updateRowBind(${id})">Update Details</button>
        <button  onclick="home()">Back to Home</button></td>
      </tr>

        `;
}

function home() {
  loadData(company_data);
}

function getCompanyDetailsById(id) {
  return company_data.find((item) => item.id === id);
}

function viewDetails(id) {
  let data = getCompanyDetailsById(id);
  document.getElementById("customers").innerHTML = "";
  let customers = document.getElementById("customers");
  customers.innerHTML += tableHeader();

  customers.innerHTML += generate_company_details(
    data.name,
    data.contact,
    data.country,
    data.id
  );
}

function updateRow() {
  let updateId = document.getElementById("updateId").value;
  let updateCompanyName = document.getElementById("updateCompanyName").value;
  let updateContactPerson = document.getElementById(
    "updateContactPerson"
  ).value;
  let updateCountryName = document.getElementById("updateCountryName").value;

  if (
    updateId !== "" &&
    updateCompanyName !== "" &&
    updateContactPerson !== "" &&
    updateCountryName !== ""
  ) {
    for (const company of company_data) {
      if (company.id === updateId) {
        company.name = updateCompanyName;
        company.contact = updateContactPerson;
        company.country = updateCountryName;
      }
    }
    updateId = "";
    updateCompanyName = "";
    updateContactPerson = "";
    updateCountryName = "";

    loadData(company_data);
  }

  document.getElementById("myModal").style.display = "none";
}

function updateRowBind(id) {
  let updateId = document.getElementById("updateId");
  let updateCompanyName = document.getElementById("updateCompanyName");
  let updateContactPerson = document.getElementById("updateContactPerson");
  let updateCountryName = document.getElementById("updateCountryName");
  let modal = document.getElementById("myModal");
  let data = getCompanyDetailsById(id, company_data);
  if (data) {
    updateId.value = data.id;
    updateCompanyName.value = data.name;
    updateContactPerson.value = data.contact;
    updateCountryName.value = data.country;
    modal.style.display = "block";
  }
}
function addNewRow() {
  let myModal1 = document.getElementById("myModal1");
  document.getElementById("companyName").value = "";
  document.getElementById("contactPersonName").value = "";
  document.getElementById("countryName").value = "";

  myModal1.style.display = "block";
}

document.getElementsByClassName("close")[0].onclick = function () {
  document.getElementById("myModal").style.display = "none";
};

document.getElementsByClassName("close")[1].onclick = function () {
  document.getElementById("myModal1").style.display = "none";
};

function addNewRowDataToTable() {
  let myModal1 = document.getElementById("myModal1");
  let companyName = document.getElementById("companyName").value;
  let contactPersonName = document.getElementById("contactPersonName").value;
  let countryName = document.getElementById("countryName").value;
  let nextId = Math.max(...company_data.map((row) => row.id), 0) + 1;

  let newCompany = {
    id: nextId,
    name: companyName,
    contact: contactPersonName,
    country: countryName,
  };
  document.getElementById("customers").innerHTML += generate_data(
    newCompany.id,
    newCompany.name,
    newCompany.contact,
    newCompany.country
  );

  company_data.push(newCompany);
  document.getElementById("companyName").value = "";
  document.getElementById("contactPersonName").value = "";
  document.getElementById("countryName").value = "";

  myModal1.style.display = "none";

  loadData(company_data);
}

function deleteRow(id) {
  if (confirm("Are you sure to delete this?")) {
    const rowIndex = company_data.findIndex((row) => row.id === id);

    if (rowIndex !== -1) {
      company_data.splice(rowIndex, 1);
      loadData(company_data);
    }
  }
}

function search_info() {
  let keyword = document.getElementById("search_text").value.toLowerCase();
  return company_data.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword) ||
      item.contact.toLowerCase().includes(keyword) ||
      item.country.toLowerCase().includes(keyword)
  );
}

function searchData() {
  let filteredData = search_info();

  let customers = document.getElementById("customers");
  customers.innerHTML = tableHeader();

  if (filteredData.length > 0) {
    for (const company of filteredData) {
      customers.innerHTML += generate_data(
        company.id,
        company.name,
        company.contact,
        company.country
      );
    }
  } else {
    customers.innerHTML += `
          <tr>
            <td colspan="3">No matching items found</td>
            <td><button onclick="home()">Back to Home</button></td>
          </tr>`;
  }

  document.getElementById("search_text").value = "";
}
