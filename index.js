import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase , 
         ref ,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
    databaseURL : "https://leads-tracker-app-851d3-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

console.log(app)
console.log(database)


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


deleteBtn.addEventListener("dblclick", function () {
    remove(referenceInDB)
    ulEl.innerHTML=""
})

onValue(referenceInDB ,  function(snapshot){
   if(snapshot.exists()){
    const values = snapshot.val() // objet (key : value)
    const leads = Object.values(values) 
    renderLeads(leads)// avoir les valeurs dans un tableau
   }
})


inputBtn.addEventListener('click', function () {
    push( referenceInDB, inputEl.value)
    inputEl.value = ''
})

function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
             <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
                  `

        /*const li = document.createElement("li")
          li.textContent = myLeads[i]
          ulEl.append(li)*/
    }
    ulEl.innerHTML = listItems
}
