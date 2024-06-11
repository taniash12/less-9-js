let divElement = document.getElementById("api-users");
let prevBtn = document.getElementById("loadprev");
let nextBtn = document.getElementById("loadnext");
let currentPage = 1;
let ul = document.getElementById("ul-element");
let totalPages;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responseinfo) {
      console.log(responseinfo);
      if (!responseinfo.ok) {
        throw responseinfo.status;
      }
      return responseinfo.json();
    })
    .then(function (responseData) {
      const fragment = new DocumentFragment();

      responseData.data.forEach((item) => {
        let li = document.createElement("li");
        li.classList.add("ul-li");
        let img = document.createElement("img");
        img.classList.add("img-size");
        let span = document.createElement("span");
        img.src = item.avatar;
        li.innerText = `${item.first_name} ${item.last_name}`;
        fragment.appendChild(li);
        span.appendChild(img);
        li.appendChild(span);

      });

      ul.innerHTML = " ";
      ul.appendChild(fragment);

      totalPages = responseData.total_pages;
    })
    .catch(function (error) {
      if (error === 404) {
        let perrornew = document.createElement("p");
        perrornew.textContent = "Page not found";
        divElement.appendChild(perrornew);
      } else {
        let perrornew = document.createElement("p");
        perrornew.textContent = "Server Error";
        divElement.appendChild(perrornew);
      }
    });
}

prevBtn.addEventListener("click", function () {
  if (currentPage === 1) {
    prevBtn.disabled = true;
    return;
  }
  else{
    nextBtn.disabled = false;
  }
  currentPage--;
  getUsers(currentPage);
});

nextBtn.addEventListener("click", function () {
  if (currentPage === totalPages) {
    nextBtn.disabled = true;
    return;
  }
  else{
    prevBtn.disabled = false;
  }
  currentPage++;
  getUsers(currentPage);
});

getUsers(currentPage);