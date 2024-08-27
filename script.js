const table = document.getElementById("infoTable");
const keys = Object.keys(localStorage);

function showItems() {
    const keys = Object.keys(localStorage);
    for(i = 0; i < localStorage.length; i++) {
        const tr = document.createElement("tr");
        const nameTd = document.createElement("td");
        const buttonTd = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.setAttribute(`id`, keys[i]);
        deleteBtn.addEventListener("click", function() {
            const keyId = deleteBtn.getAttribute("id");
            localStorage.removeItem(keyId);
        })

        table.append(tr);
        tr.append(nameTd);
        tr.append(buttonTd);
        nameTd.innerText = localStorage.getItem(keys[i]);
        buttonTd.append(deleteBtn);
    }
    console.log(localStorage)
}

function deleteItems(lsLength) {
    for(i = 0; i < lsLength; i++) {
        table.getElementsByTagName("tr")[0].remove();
    }
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const lsLength = localStorage.length;
    const time = new Date;
    const date = {
        year: time.getFullYear(),
        month: String(time.getMonth() + 1).padStart(2, '0'),
        day: String(time.getDate()).padStart(2, '0'),
        hours: String(time.getHours()).padStart(2, '0'),
        minutes: String(time.getMinutes()).padStart(2, '0'),
        seconds: String(time.getSeconds()).padStart(2, '0'),
        milSeconds: String(time.getMilliseconds()).padStart(2, '0')
    };
    const dateKey = `${date.year}${date.month}${date.day}${date.hours}${date.minutes}${date.seconds}${date.milSeconds}`;

    localStorage.setItem(dateKey, name);
    deleteItems(lsLength);
    showItems();
});

document.addEventListener('DOMContentLoaded', function() {
    showItems();
});