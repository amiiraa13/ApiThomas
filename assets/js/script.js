const promosContainer = document.querySelector("#promosContainer");
async function getPromos() {
  const response = await fetch("http://146.59.242.125:3004/promos", {
    headers: {
      Authorization: "Bearer 2388473d-c293-474b-9d67-7489aa68016b",
    },
  });

  const data = await response.json();
  return data;
}

async function displayPromos() {
  const promos = await getPromos();
  promosContainer.innerHTML = "";
  promos.forEach((promo) => {
    let promoBox = document.createElement("div");
    promoBox.classList.add("promo");
    promosContainer.appendChild(promoBox);
    let title = document.createElement("h2");
    promoBox.classList.add("titre");
    title.textContent = promo.name;
    promoBox.appendChild(title);
    let boutonContainer = document.createElement("div");
    boutonContainer.classList.add("boutonContainer");
    promoBox.appendChild(boutonContainer);
    let supp = document.createElement("button");
    supp.classList.add("supp");
    boutonContainer.appendChild(supp);
    supp.textContent = "Supprimer";
    let details = document.createElement("a");
    details.href = "./student.html?id="+promo._id
    details.classList.add("details");
    boutonContainer.appendChild(details);
    details.textContent = "Détails";
    supp.addEventListener("click", () => {
      deletPromo(promo._id);
    });
  });
}

async function deletPromo(promoId) {
  const response = await fetch("http://146.59.242.125:3004/promos/" + promoId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer 2388473d-c293-474b-9d67-7489aa68016b",
    },
  });

  const data = await response.json();
  displayPromos();
}

async function addPromo() {
  const body = {
    name: document.querySelector("#name").value,
    startDate: document.querySelector("#startDate").value,
    endDate: document.querySelector("#endDate").value,
  };
  const response = await fetch("http://146.59.242.125:3004/promos", {
    method: "POST",
    headers: {
      Authorization: "Bearer 2388473d-c293-474b-9d67-7489aa68016b",
      "Content-type": "Application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  displayPromos();
}

displayPromos();
