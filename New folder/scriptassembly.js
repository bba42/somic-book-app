// Drag and drop functionality for panels
let draggedItem = null;

function handleDragStart(e) {
  draggedItem = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDragEnter(e) {
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (draggedItem !== this) {
    draggedItem.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

function handleDragEnd(e) {
  this.classList.remove("over");
}

let panels = document.querySelectorAll(".panel");

panels.forEach(function(panel) {
  panel.addEventListener("dragstart", handleDragStart, false);
  panel.addEventListener("dragover", handleDragOver, false);
  panel.addEventListener("dragenter", handleDragEnter, false);
  panel.addEventListener("dragleave", handleDragLeave, false);
  panel.addEventListener("drop", handleDrop, false);
  panel.addEventListener("dragend", handleDragEnd, false);
});