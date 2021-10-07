const d = document,
  $input = d.getElementById("create-todo"),
  $checkBoxCreate = d.querySelector(".new-todo  .check-box"),
  $listItems = d.querySelector(".list-items"),
  $itemTemplate = d.getElementById("item-template").content,
  $itemCount = d.querySelector(".items-count");

let html = "";
let numItems = 0;

function addItem(e) {
  if ((e.key === "Enter" && e.target === $input && $input.value.length != 0) || (e.target === $checkBoxCreate && $input.value.length != 0)) {
    //console.log($input.value);
    numItems++;
    $itemTemplate.querySelector(".item").dataset.itemNum = numItems;
    $itemTemplate.querySelector(".item-text").textContent = `${$input.value}`;
    $itemTemplate.querySelector(".delete").setAttribute("src", "/images/icon-cross.svg");
    $itemTemplate.querySelector(".delete").setAttribute("data-item-num", `${numItems}`);
    let $clone = d.importNode($itemTemplate, true);
    $listItems.appendChild($clone);
    $input.value = "";

    //console.log($listItems.children.length);
    $itemCount.innerHTML = `${$listItems.children.length} items left`;
  }
}

d.addEventListener("keydown", (e) => {
  addItem(e);
});
d.addEventListener("click", (e) => {
  addItem(e);
  checkItem(e);
  deleteItem(e);
  clearCompleted(e);
  filters(e);
  swapMode(e);
});

function checkItem(e) {
  let $itemCheckBox = d.querySelectorAll(".item .check-box");
  $itemCheckBox.forEach((el) => {
    if (e.target === el) {
      //console.log(el);
      el.classList.add("item-check");
      el.querySelector("img").setAttribute("src", "/images/icon-check.svg");
      el.querySelector("img").setAttribute("alt", "icon check");

      el.parentNode.classList.remove("active");
      el.parentNode.classList.add("complete");
      let completes = d.querySelectorAll(".complete");
      //console.log(completes);
      $itemCount.innerHTML = `${$listItems.children.length - completes.length} items left`;
    } else if (e.target === el.querySelector("img")) {
      el.classList.remove("item-check");
      el.querySelector("img").removeAttribute("src");
      el.querySelector("img").removeAttribute("alt");

      el.parentNode.classList.add("active");
      el.parentNode.classList.remove("complete");
      completes = d.querySelectorAll(".complete");
      $itemCount.innerHTML = `${$listItems.children.length - completes.length} items left`;
    }
  });
}

function deleteItem(e) {
  if (e.target.matches(".delete")) {
    let iconDelete = e.target.dataset.itemNum;
    let itemsChilds = $listItems.children;
    //console.log(itemsChilds);
    for (let child of itemsChilds) {
      //console.log(iconDelete);
      //console.log(child.getAttribute("data-item-num"));
      if (iconDelete === child.getAttribute("data-item-num")) {
        child.classList.add("delete-animation");
        setTimeout(() => {
          child.parentNode.removeChild(child);
        }, 1000);
      }
    }
    setTimeout(() => {
      //console.log($listItems.children);
      $itemCount.innerHTML = `${$listItems.children.length} items left`;
    }, 1000);
  }
}

function clearCompleted(e) {
  if (e.target.matches(".clear-completed")) {
    let completes = d.querySelectorAll(".complete");
    completes.forEach((el) => {
      el.classList.add("delete-animation");
      setTimeout(() => {
        el.parentNode.removeChild(el);
      }, 1000);
    });
  }
}

function showAlls() {
  let allItems = Array.from($listItems.children);
  //console.log(allItems);
  allItems.forEach((el) => {
    el.style.display = "flex";
  });
}

function filters(e) {
  const $allButton = d.querySelector(".all"),
    $activeButton = d.querySelector(".actived"),
    $completedButton = d.querySelector(".completed");
  if (e.target.matches(".all")) {
    showAlls();
    $activeButton.classList.remove("button-activated");
    $completedButton.classList.remove("button-activated");
    e.target.classList.add("button-activated");
  }
  if (e.target.matches(".actived")) {
    showAlls();
    $allButton.classList.remove("button-activated");
    $completedButton.classList.remove("button-activated");
    e.target.classList.add("button-activated");
    let completes = d.querySelectorAll(".complete");
    completes.forEach((el) => {
      el.style.display = "none";
    });
  }
  if (e.target.matches(".completed")) {
    showAlls();
    $activeButton.classList.remove("button-activated");
    $allButton.classList.remove("button-activated");
    e.target.classList.add("button-activated");
    let actives = d.querySelectorAll(".active");
    actives.forEach((el) => {
      el.style.display = "none";
    });
  }
}

function swapMode(e) {
  let $icon = d.querySelector(".icon-mode"),
    $body = d.querySelector("body"),
    $header = d.querySelector(".header"),
    w = window,
    desktop = "url('/images/bg-desktop-",
    mobile = "url('/images/bg-mobile-";
  if (e.target.matches(".fas")) {
    $body.classList.toggle("light-theme");
    if (e.target.matches(".fa-sun")) {
      $icon.classList.remove("fa-sun");
      $icon.classList.add("fa-moon");
      if (w.innerWidth > 600) {
        $header.style.backgroundImage = `${desktop}light.jpg')`;
      } else {
        $header.style.backgroundImage = `${mobile}light.jpg')`;
      }
    } else {
      $icon.classList.remove("fa-moon");
      $icon.classList.add("fa-sun");
      if (w.innerWidth > 600) {
        $header.style.backgroundImage = `${desktop}dark.jpg')`;
      } else {
        $header.style.backgroundImage = `${mobile}dark.jpg')`;
      }
    }
  }
}
