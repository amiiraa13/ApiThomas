function getPromoId() {
    let url = window.location.href //recupere l'url en chaine de caractere
    let objUrl = new URL(url)// converti l'url en objet
    const id = objUrl.searchParams.get("id")// recupere le parametre de requete "id"
    return id
}
async function getStudentByPromo() {
    const response = await fetch("http://146.59.242.125:3004/promos/" + getPromoId(),{
        headers: {
            "Authorization": "Bearer 2388473d-c293-474b-9d67-7489aa68016b",
          },
    })
    const data = await response.json()
    const students = data.students
    return students
    
}

getStudentByPromo()

async function displayStudent() {
    const eleves = await getStudentByPromo();
    studentContainer.innerHTML = "";
    eleves.forEach((eleve) => {
      let elevesBox = document.createElement("div");
      elevesBox.classList.add("eleves");
      studentContainer.appendChild(elevesBox);
      let title = document.createElement("h2");
      elevesBox.classList.add("titre");
      title.textContent = eleve.firstName + " "+ eleve.lastName;
      elevesBox.appendChild(title);
      let boutonContainer = document.createElement("div");
      boutonContainer.classList.add("boutonContainer");
      elevesBox.appendChild(boutonContainer);
      let supp = document.createElement("button");
      supp.classList.add("supp");
      boutonContainer.appendChild(supp);
      supp.textContent = "Supprimer";
     
      supp.addEventListener("click", () => {
        deletStudent(eleve._id);
      });
    });
  }
  displayStudent()

  async function deletStudent(eleveId) {
    const response = await fetch("http://146.59.242.125:3004/promos/" + getPromoId() + "/students/"+ eleveId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer 2388473d-c293-474b-9d67-7489aa68016b",
      },
    });
  
    const data = await response.json();
    displayStudent();
  }

async function addStudents() {
    console.log("blabla");
    const body = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        age: document.querySelector("#age").value
    };
    const response = await fetch("http://146.59.242.125:3004/promos/" + getPromoId() + "/students/", {
      method: "POST",
      headers: {
        Authorization: "Bearer 2388473d-c293-474b-9d67-7489aa68016b",
        "Content-type": "Application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    displayStudent()
}
addStudents()
displayStudent

