const dateFilterInput = document.getElementById("dateSelectInput");
const diaryWrapper = document.getElementById("diary-wrapper");
let currentDate = (new Date).toISOString().split('T')[0];
let titleInput = document.getElementById("titleInput");
let descriptionInput = document.getElementById("descInput");
let dateInput = document.getElementById("dateInput");
let deleteBtn = document.createElement("button");
let keys = Object.keys(localStorage);
let lsLength = localStorage.length;
let filterDate = currentDate;
let updateKey = "";
let lsArr = [];
let diaryEntries = lsArr.filter(obj => obj.untilDate === filterDate);

function updateValues() {
    keys = Object.keys(localStorage);
    getDateObject();
    lsLength = localStorage.length;
}

function changeDate(increment) {
    let prevValue = new Date(dateFilterInput.value);
    if (increment) {
        prevValue.setDate(prevValue.getDate() + 1);
        filterDate = prevValue.toISOString().split('T')[0];
        dateFilterInput.value = filterDate;
        showContent();
    } else {
        prevValue.setDate(prevValue.getDate() - 1);
        filterDate = prevValue.toISOString().split('T')[0];
        dateFilterInput.value = filterDate
        showContent();
    }
}

function rerenderContent(diaryEntries) {
    for(let i = 0; i < diaryEntries.length; i++) {
       let element = diaryWrapper.getElementsByClassName("unique-diary-wrapper")[0];

       if (element) {
        element.remove();
       }
    }
}

function showContent() {
    updateValues();
    const uniqueDate = filterDate;
    const uniqueDateWrapper = document.createElement("div");

    uniqueDateWrapper.setAttribute("id", uniqueDate);
    uniqueDateWrapper.classList.add("unique-diary-wrapper");
    const prevEntries = diaryEntries;
    diaryEntries = lsArr.filter(obj => obj.untilDate === uniqueDate);
    
    if (diaryEntries.length === 0) {
        diaryEntries = prevEntries;
        rerenderContent(diaryEntries);
        diaryWrapper.append(uniqueDateWrapper);
        uniqueDateWrapper.innerText = "No tasks added yet"
    } else {
        rerenderContent(diaryEntries);
        diaryWrapper.append(uniqueDateWrapper);
        
        for(let x = 0; x < diaryEntries.length; x++) {
            const diaryEntry = diaryEntries[x];
            const dContent = document.createElement("div");
            const diaryText = document.createElement("div");
            const p = document.createElement("p");
            const h2 = document.createElement("h2");
            const time = document.createElement("span");
            const buttonWrapper = document.createElement("div");
            const updateBtn = document.createElement("button");
            const buttons = deleteBtn.cloneNode(true);

            dContent.classList.add("diary-content")
            const result = countTime(uniqueDate);
            if (result == 1) {
                time.style.color = "red";
            } else if (result == 0) {
                time.style.color = "#8B0000";
            } else if (result < 0) {
                time.style.color = "#8B0000";
                dContent.style.backgroundColor = "rgb(217, 105, 98)";
            }

            updateBtn.classList.add("update-btn");
            updateBtn.textContent = "Update";
            updateBtn.setAttribute("id", diaryEntry.key);
            updateBtn.addEventListener("click", function() {
                const keyId = updateBtn.getAttribute("id");
                const updateEntry = JSON.parse(localStorage.getItem(keyId));
                console.log(updateEntry)
                titleInput.value = updateEntry.title;
                descriptionInput.value = updateEntry.description;
                dateInput.value = updateEntry.untilDate;
                updateKey = updateEntry.key;
            });
            buttons.textContent = "Delete";
            buttons.classList.add("delete-btn");
            buttons.setAttribute(`id`, diaryEntry.key);
            buttons.addEventListener("click", function() {
                const lsLength = localStorage.length;
                const keyId = buttons.getAttribute("id");
                localStorage.removeItem(keyId);
                showContent(lsLength);
            });

            uniqueDateWrapper.append(dContent)
            dContent.append(diaryText);
            dContent.append(buttonWrapper);
            diaryText.append(h2);
            diaryText.append(p);
            diaryText.append(time);
            h2.innerText = diaryEntry.title;
            p.innerText = diaryEntry.description;
            time.innerText = diaryEntry.untilDate;
            buttonWrapper.append(updateBtn);
            buttonWrapper.append(buttons);
        }
    }
}

function countTime(uniqueDate) {
    const date = new Date;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    const currentDate = `${year}${month}${day}`;
    const finalDate = uniqueDate.replace(/-/g, "")
    const result = parseInt(finalDate) - parseInt(currentDate);
    return result;
}

function getDateObject() {
    lsArr.length = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const ls = localStorage.getItem(keys[i]);
        const parsedLs = JSON.parse(ls);
        lsArr.push(parsedLs)
    }
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    keys.length = 0;
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
    let dateKey = "";
    if (updateKey === "") {
        dateKey = `${date.year}${date.month}${date.day}${date.hours}${date.minutes}${date.seconds}${date.milSeconds}`;
    } else {
        dateKey = updateKey;
    }
    const diary = {
        title: titleInput.value,
        description: descriptionInput.value,
        untilDate: dateInput.value,
        key: dateKey
    }
    
    localStorage.setItem(dateKey, JSON.stringify(diary));
    dateFilterInput.value = diary.untilDate;
    filterDate = diary.untilDate;
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    updateKey = "";
    console.log(updateKey)
    showContent();
});

dateFilterInput.addEventListener("change", function filterDates() {
    filterDate = this.value;    
    console.log(filterDate)
    showContent();
});

document.addEventListener('DOMContentLoaded', function() {
    dateFilterInput.value = currentDate;
    showContent();
});