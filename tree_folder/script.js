const folderStructure = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 3.txt", type: "file" }],
    },
  ],
};

// ฟังก์ชันสำหรับเพิ่มโฟลเดอร์ใหม่
function addFolder() {
  const folderNameInput = document.getElementById("folderNameInput");
  const folderName = folderNameInput.value.trim();
  if (folderName !== "") {
    const newFolder = {
      name: folderName,
      type: "folder",
      children: [],
    };
    const selectedFolder = document.querySelector(".selected");
    const targetElement = selectedFolder ? selectedFolder : document.getElementById("folderTree");
    if (selectedFolder && selectedFolder.classList.contains("folder")) {
      const treeElement = createTreeElement(newFolder);
      const childrenContainer = selectedFolder.querySelector(".children");
      if (childrenContainer) {
        childrenContainer.appendChild(treeElement);
      } else {
        const childrenContainer = document.createElement("div");
        childrenContainer.classList.add("children");
        childrenContainer.appendChild(treeElement);
        selectedFolder.appendChild(childrenContainer);
      }
    } else {
      const treeElement = createTreeElement(newFolder);
      targetElement.appendChild(treeElement);
    }
    folderNameInput.value = ""; // เคลียร์ช่องข้อมูลหลังจากเพิ่มโฟลเดอร์
  } else {
    alert("Please enter a folder name.");
  }
}

// ฟังก์ชันสำหรับเพิ่มไฟล์ใหม่
function addFile() {
  const fileNameInput = document.getElementById("fileNameInput");
  const fileName = fileNameInput.value.trim();
  if (fileName !== "") {
    const targetElement = document.querySelector(".selected") || document.getElementById("folderTree");
    const newFile = {
      name: fileName,
      type: "file",
    };
    const treeElement = createTreeElement(newFile);
    targetElement.appendChild(treeElement);
    fileNameInput.value = "";
  } else {
    alert("Please enter a file name.");
  }
}

// ฟังก์ชันสำหรับลบองค์ประกอบ
function deleteElement(element) {
  element.parentNode.removeChild(element);
}

// ฟังก์ชันสำหรับสร้างโครงสร้างต้นไม้สำหรับโฟลเดอร์หรือไฟล์
function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;

  // เพิ่มปุ่มลบหลังชื่อของทุกๆ องค์ประกอบ
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function() {
    deleteElement(element);
  });
  element.appendChild(deleteButton);

  element.classList.add(item.type);
  if (item.type === "folder" && item.children) {
    element.addEventListener("click", function () {
      const previouslySelected = document.querySelector(".selected");
      if (previouslySelected) {
        previouslySelected.classList.remove("selected");
      }
      element.classList.add("selected");
    });
    const childrenContainer = document.createElement("div");
    childrenContainer.classList.add("children");
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      childrenContainer.appendChild(childElement);
    });
    element.appendChild(childrenContainer);
  }
  return element;
}

const folderTree = document.getElementById("folderTree");
const treeElement = createTreeElement(folderStructure);
folderTree.appendChild(treeElement);

const addFolderBtn = document.getElementById("addFolderBtn");
addFolderBtn.addEventListener("click", addFolder);

const addFileBtn = document.getElementById("addFileBtn");
addFileBtn.addEventListener("click", addFile);

