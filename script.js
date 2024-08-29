const diaryWrapper = document.getElementById("diary-wrapper");
let deleteBtn = document.createElement("button");
let keys = Object.keys(localStorage);
let lsLength = localStorage.length;
let lsArr = [];

function updateValues() {
    keys = Object.keys(localStorage);
    getDateObject();
    lsLength = localStorage.length;

    
    console.log(keys)
    console.log(lsLength)
    console.log(lsArr)
}

function rerenderContent(lsLength) {
    for(let i = 0; i < lsLength; i++) {
       let element = diaryWrapper.getElementsByClassName("diary-content")[0];

       if (element) {
        element.remove();
       }
    }
}

function showContent(lsLength) {
    updateValues();
    rerenderContent(lsLength);
    for(let i = 0; i < localStorage.length; i++) {
        const diary = localStorage.getItem(keys[i]);
        const parsedDiary = JSON.parse(diary);
        const a = parsedDiary.untilDate;

        const dContent = document.createElement("div");
        const p = document.createElement("p");
        const h2 = document.createElement("h2");
        const time = document.createElement("span");
        const buttonWrapper = document.createElement("div");
        const buttons = deleteBtn.cloneNode(true);
        const diaryText = document.createElement("div");

        dContent.classList.add("diary-content")
        const result = countTime(a);
        if (result <= 1) {
            time.style.color = "red";
        }
        console.log(result);

        buttons.textContent = "Delete";
        buttons.classList.add("delete-btn");
        buttons.setAttribute(`id`, keys[i]);
        buttons.addEventListener("click", function() {
            const lsLength = localStorage.length;
            const keyId = buttons.getAttribute("id");
            localStorage.removeItem(keyId);
            //deleteItems(lsLength);  
            showContent(lsLength);
        });

        diaryWrapper.append(dContent)
        dContent.append(diaryText);
        dContent.append(buttonWrapper);
        diaryText.append(h2);
        diaryText.append(p);
        diaryText.append(time);
        h2.innerText = parsedDiary.title;
        p.innerText = parsedDiary.description;
        time.innerText = parsedDiary.untilDate;
        buttonWrapper.append(buttons);
    }
    console.log(localStorage)
}

function countTime(a) {
    const date = new Date;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    const currentDate = `${year}${month}${day}`;
    const finalDate = a.replace(/-/g, "")
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
    const finalDates = lsArr.filter(obj => parseInt(obj.untilDate) > 1  ).map(obj => obj.untilDate);
    const uniqueFinalDates = [...new Set(finalDates)]
    console.log(uniqueFinalDates)
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("titleInput");
    const description = document.getElementById("descInput");
    const inputDate = document.getElementById("dateInput");
    const diary = {
        title: title.value,
        description: description.value,
        untilDate: inputDate.value
    }
    //const lsLength = localStorage.length;
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

    localStorage.setItem(dateKey, JSON.stringify(diary));
    title.value = "";
    description.value = "";
    inputDate.value = "";
    //deleteItems(lsLength);
    showContent(lsLength);
});



document.addEventListener('DOMContentLoaded', function() {
    //updateValues();
    showContent();
});

/**
 for(let i = 0; i < localStorage.length; i++) {
        const diary = localStorage.getItem(keys[i]);
        const parsedDiary = JSON.parse(diary);
        const a = parsedDiary.untilDate;

        const dContent = document.createElement("div");
        const p = document.createElement("p");
        const h2 = document.createElement("h2");
        const time = document.createElement("span");
        const buttonWrapper = document.createElement("div");
        const buttons = deleteBtn.cloneNode(true);
        const diaryText = document.createElement("div");

        dContent.classList.add("diary-content")
        const result = countTime(a);
        if (result <= 1) {
            time.style.color = "red";
        }
        console.log(result);

        buttons.textContent = "Delete";
        buttons.classList.add("delete-btn");
        buttons.setAttribute(`id`, keys[i]);
        buttons.addEventListener("click", function() {
            const lsLength = localStorage.length;
            const keyId = buttons.getAttribute("id");
            localStorage.removeItem(keyId);
            //deleteItems(lsLength);  
            showItems(lsLength);
        });

        diaryWrapper.append(dContent)
        dContent.append(diaryText);
        dContent.append(buttonWrapper);
        diaryText.append(h2);
        diaryText.append(p);
        diaryText.append(time);
        h2.innerText = parsedDiary.title;
        p.innerText = parsedDiary.description;
        time.innerText = parsedDiary.untilDate;
        buttonWrapper.append(buttons);
    }
    console.log(localStorage)
 */