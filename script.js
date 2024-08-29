const diaryWrapper = document.getElementById("diary-wrapper");
let deleteBtn = document.createElement("button");
let keys = Object.keys(localStorage);
let lsLength = localStorage.length;
let uniqueFinalDates = [];
let lsArr = [];

function updateValues() {
    console.log(keys)
    keys = Object.keys(localStorage);
    getDateObject();
    lsLength = localStorage.length;

    
    console.log(keys)
    console.log(lsLength)
    console.log(lsArr)
}

function rerenderContent(lsLength) {
    for(let i = 0; i < lsLength; i++) {
       let element = diaryWrapper.getElementsByClassName("unique-diary-wrapper")[0];

       if (element) {
        element.remove();
       }
    }
}

function showContent(lsLength) {
    updateValues();
    rerenderContent(lsLength);
    for(let i = 0; i < uniqueFinalDates.length; i++) {
        const uniqueDate = uniqueFinalDates[i];
        console.log(uniqueFinalDates)
        let diaryEntries = lsArr.filter(obj => obj.untilDate === uniqueDate);
        console.log(diaryEntries);
        const uniqueDateWrapper = document.createElement("div");
        const uniqueDateTxt = uniqueDate;

        uniqueDateWrapper.setAttribute("id", uniqueDate);
        uniqueDateWrapper.classList.add("unique-diary-wrapper");

        diaryWrapper.append(uniqueDateWrapper); 
        uniqueDateWrapper.append(uniqueDateTxt);     
        
        for(let x = 0; x < diaryEntries.length; x++) {
            const diaryEntry = diaryEntries[x];
            console.log(diaryEntry)
            const dContent = document.createElement("div");
            const diaryText = document.createElement("div");
            const p = document.createElement("p");
            const h2 = document.createElement("h2");
            const time = document.createElement("span");
            const buttonWrapper = document.createElement("div");
            const buttons = deleteBtn.cloneNode(true);

            dContent.classList.add("diary-content")
            const result = countTime(uniqueDate);
            console.log(result)
            if (result <= 1) {
                time.style.color = "red";
            } 
            if (result < 0) {
                const entriesToDlt = lsArr.filter(obj => obj.untilDate === uniqueDate);
                for(let y = 0; y < entriesToDlt.length; y++) {
                    const key = entriesToDlt[y].key;
                    localStorage.removeItem(key);
                    showContent();
                }
            } 

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
            buttonWrapper.append(buttons);
        }
    }
    console.log(localStorage)
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
    uniqueFinalDates.length = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const ls = localStorage.getItem(keys[i]);
        const parsedLs = JSON.parse(ls);
        lsArr.push(parsedLs)
    }
    const finalDates = lsArr.filter(obj => parseInt(obj.untilDate) > 1  ).map(obj => obj.untilDate);
    uniqueFinalDates = [...new Set(finalDates)]
    console.log(uniqueFinalDates)
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    keys.length = 0;
    const title = document.getElementById("titleInput");
    const description = document.getElementById("descInput");
    const inputDate = document.getElementById("dateInput");
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

    const diary = {
        title: title.value,
        description: description.value,
        untilDate: inputDate.value,
        key: dateKey
    }

    if(diary.untilDate.replace(/-/g, "") - parseInt(`${date.year}${date.month}${date.day}`) < 0) {
        title.value = "";
        description.value = "";
        inputDate.value = "";
        
    } else {
        localStorage.setItem(dateKey, JSON.stringify(diary));
    } 

    title.value = "";
    description.value = "";
    inputDate.value = "";
    showContent(lsLength);
});

document.addEventListener('DOMContentLoaded', function() {
    showContent();
});