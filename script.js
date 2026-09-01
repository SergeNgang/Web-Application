const myButton = document.getElementById("my-button");
const heading = document.querySelector("h1");
const addDataButton = document.getElementById("add-data");
const myList = document.getElementById("my-list");
const myTextarea = document.getElementById("my-textarea");
myButton.addEventListener("click", () => {
    console.log("hello world");
    heading.textContent = "Moi maailma";
});
addDataButton.addEventListener("click", () => {
    const textValue = myTextarea.value.trim();
    if (textValue !== "") {
        const newItem = document.createElement("li");
        newItem.textContent = textValue;
        myList.appendChild(newItem);
        myTextarea.value = "";
    }
});