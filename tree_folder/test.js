function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);
  if (item.type === "folder" && item.children) {
    element.addEventListener("click", function (event) {
      const previouslySelected = document.querySelector(".selected");
      if (previouslySelected) {
        previouslySelected.classList.remove("selected");
      }

      // เพิ่มคลาส 'selected' สำหรับโฟลเดอร์ที่ถูกคลิก
      element.classList.add("selected");

      // หยุดการ传播เหตุการณ์เพื่อป้องกันการเลือกพื้นที่ว่างทั้งหมด
      event.stopPropagation();
    });
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      element.appendChild(childElement);
    });
  }
  return element;
}

// ...

// ให้เพิ่ม event listener ในส่วนที่ไม่ใช่ folder
folderTree.addEventListener("click", function () {
  const previouslySelected = document.querySelector(".selected");
  if (previouslySelected) {
    previouslySelected.classList.remove("selected");
  }
});
