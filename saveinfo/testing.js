let student_info = {
    person_1: {
      id: 1,
      name: "Mary",
      age: 24,
      gender: "Female",
      job: "Final Year Student",
      description : " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo nisi repellendus impedit in optio, perferendis laudantium, vero ab nam incidunt quasi laboriosam ullam laborum veniam inventore quas animi deleniti ratione."
    },
    person_2: {
      id: 2,
      name: "James",
      age: 20,
      gender: "Male",
      job: "College Student",
      description : " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo nisi repellendus impedit in optio, perferendis laudantium, vero ab nam incidunt quasi laboriosam ullam laborum veniam inventore quas animi deleniti ratione."
    },
    person_3: {
      id: 3,
      name: "Jack",
      age: 21,
      gender: "Male",
      job: "Foundation Year",
      description : " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo nisi repellendus impedit in optio, perferendis laudantium, vero ab nam incidunt quasi laboriosam ullam laborum veniam inventore quas animi deleniti ratione."
    },
    person_4: {
      id: 4,
      name: "Laura",
      age: 22,
      gender: "Female",
      job: "Year 1 Student",
      description : " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo nisi repellendus impedit in optio, perferendis laudantium, vero ab nam incidunt quasi laboriosam ullam laborum veniam inventore quas animi deleniti ratione."
    },
  };

  loadNames(student_info);

  function loadNames(obj) {
    document.getElementById("root").innerHTML = "";
    let root = document.getElementById("root");
    for (const property in obj) {
      root.innerHTML += generate_info(
        obj[property].id,
        obj[property].name,
        obj[property].age,
        obj[property].gender,
        obj[property].job
      );
    }
  }

  function generate_info(id, name, age, gender,job) {
    return `
                <div id="root">
                     <div id="person_details">
                            <h2>Person-${id}</h2>
                            
                             <h2>${name}</h2>
                            <h3>${age}</h3>
                            <h4>${gender}</h4>
                            <h5>${job}</h5>
                            <button onclick="view_details(${id})">View Details</button>
                            
                    </div>
                  
                </div>
              `;
  }


  function getStudentDetailsById(id){
    for(const property in student_info){
        if(student_info[property].id === id){
            return student_info[property];
        }
    }
  }

  function view_details(id){
    let data = getStudentDetailsById(id);
    document.getElementById("root").innerHTML = "";
    let root = document.getElementById("root");
    root.innerHTML = generateStudentInfoDetails(
        data.id,
        data.name,
        data.age,
        data.gender,
        data.job,
        data.description
    );
  }


  function generateStudentInfoDetails(id,name,age,gender,job,description){
    return `
    <div id="root">
    <div id="person_details">
           <h2>Person-${id}</h2>
           
            <h2>${name}</h2>
           <h3>${age}</h3>
           <h4>${gender}</h4>
           <h5>${job}</h5>
           <p>${description}</p>
           <button onclick="home()">Back to Home</button>
           
   </div>
 
</div>
    `
  }

  function home() {
    loadNames(student_info);
  }

  function search_info() {
    let keyword = document.getElementById("search_text").value;
    const searched_obj = {};
    for (const person in student_info) {
      if (
        student_info[person].name
          .toLowerCase()
          .includes(keyword.toLowerCase())
        // || student_info[person].gender
        //   .toLowerCase()
        //   .includes(keyword.toLowerCase()) ||
        // student_info[person].age.includes(keyword)
      ) {
        searched_obj[person] = student_info[person];
      }
      document.getElementById("search_text").value = "";
      loadNames(searched_obj);
    }
  }

  function save_info() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let job = document.getElementById("job").value;
    let description = document.getElementById("description").value;
    let id = Object.keys(student_info).length + 1;
    let person_obj = {
      id,
      name,
      age,
      gender,
      job,
      description
    };

    student_info["person_" + (Object.keys(student_info).length + 1)] =
      person_obj;

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("job").value = "";
    document.getElementById("description").value = "";
    loadNames(student_info);
  }

