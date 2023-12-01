const userWrapper = document.querySelector(".user__item-wrapper"),
  userArray = [],
  userQuantity = document.querySelector(".input");

async function getData() {
  try {
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/users?limit=${userQuantity.value}`
    );
    const data = await res.json();
    data.forEach((el) => {
      userArray.push(el);
    });
    console.log(userArray);
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

async function showData() {
  await getData();
  let html = "";
  userArray.forEach((el) => {
    html += ` 
  <div class="user__item">
            <div class="user__item_img-wrapper">
              <img src="${el.avatar}" alt="avatar" class="user__item_img" />
            </div>
            <div class="user__item_top-info">
              <span>
                <p>Email:</p>
                <p> ${el.email}</p>
              </span>
              <span>
                <p>Name:</p>
                <p> ${el.name}</p>
              </span>
            </div>
          <div class="user__item_main">
            <p>Role: ${el.role}</p>
            <p>Password:  ${el.password}</p>
            <p>Creation:  ${el.creationAt}</p>
            <p>Update: ${el.updatedAt}</p>
          </div>
        </div>
        `;
    userWrapper.innerHTML = html;
  });
}
showData();

userQuantity.addEventListener("change", async () => {
  userArray.length = 0;
  userWrapper.innerHTML = "";
  await showData();
});
