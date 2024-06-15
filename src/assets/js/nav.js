let open = false;
function handleButton() {
  const button = document.getElementById("humberger-nav-container");

  if (!open) {
    button.style.display = "flex";
    open = true;
  } else {
    button.style.display = "none";
    open = false;
  }
}
