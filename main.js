let boxes = document.querySelector(".boxes");
let toDown = document.querySelector(".to-down");
let main = document.querySelector("main");
let postTitle = document.querySelector(".post-title");
let postDescription = document.querySelector(".post-description");
let postCheck = document.querySelector(".post-check");
let postCancel = document.querySelector(".post-cancel");
let addBox = document.querySelector(".add-box");
let box = ``;
let obj = {
  title: "",
  body: "",
  userId: Math.round(Math.random() * 10000),
};
const callApi = async (method, url) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.send();
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        reject(Error("went wrong"));
      }
    };
  });
};
boxes.innerHTML = "Loading...";
callApi("GET", "https://jsonplaceholder.typicode.com/posts")
  .then((data) => {
    data.forEach((item) => {
      box += `
        <div class="box">
        <h4 class="box-title">${item.title}</h4>
        <p class="box-desc">${item.body}</p>
        <div class="box-spans">
          <span class="span-one">P1</span>
          <span class="span-two">Heath</span>
        </div>
      </div>
        `;
    });
    boxes.innerHTML = box;
  })
  .catch((error) => (boxes.innerHTML = error));

toDown.addEventListener("click", () => {
  addBox.style.display = "block";
  toDown.style.display = "none";
  window.scrollTo(0, document.body.scrollHeight);
});
postCancel.addEventListener("click", () => {
  addBox.style.display = "none";
  toDown.style.display = "block";
});

const postFunction = (data) => {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      singlePost = `
      <div class="box">
      <h4 class="box-title">${data.title}</h4>
      <p class="box-desc">${data.body}</p>
      <div class="box-spans">
        <span class="span-one">P1</span>
        <span class="span-two">Heath</span>
      </div>
    </div>
      `;
      boxes.innerHTML += singlePost;
    });
};

postCheck.addEventListener("click", () => {
  obj.title = postTitle.value;
  obj.body = postDescription.value;
  if (obj.title.length > 0) {
    postTitle.value = "";
    postDescription.value = "";
    postFunction(obj);
  }
});
