//FUNCTIONALITIES

//Default checkIn and checkOut
(function checkIn() {
  let checkin = document.getElementById('checkin')
  let today = new Date();
  if(checkin.value === "") {
    checkin.value = today.getDate() + "/" + (today.getMonth() +1) + "/" + today.getFullYear();
  }
})();


(function checkOut() {
  let today = new Date();
  let checkout = document.getElementById('checkout')
  if(checkout.value === "") {
    checkout.value = today.getDate()+ 1 + "/" + (today.getMonth() +1) + "/" + today.getFullYear()
  }
})();


//Defualt number of adults and children
(function adultOption() {
  let adult = document.getElementById("adults")
  for(let i, j= 0; i = adults.options[j]; j++){
    if(i.value == "") {
      adult.selectedIndex = "1";
      break;
    }
  }
})();

(function childrenOption() {
  let children = document.getElementById("children")
  for(let i, j= 0; i = children.options[j]; j++){
    if(i.value == "") {
      children.selectedIndex = "1";
      break;
    }
  }
})();


//Show rooms that fits with the requirements when you modify the room search
function availableRoom() {
  let peopleInfo = document.getElementsByClassName('people')
  let children = document.getElementById("children").selectedIndex
  let adults = document.getElementById("adults").selectedIndex
  let all = children + adults
  for(let people, j= 0; people = peopleInfo[j]; j++){
    let peopleNum = people.innerHTML.replace("People: ", "")
    if(peopleNum >= all) {
      document.getElementsByClassName('pointer')[j].style.display = "inherit"
    } else {
      document.getElementsByClassName('pointer')[j].style.display = "none"
    }
  }
};


//UPDATE SUMMARY

//Update summary Dates
function updateDates() {
  let checkInSummary = document.getElementById("checkin-summary")
  let checkOutSummary = document.getElementById("checkout-summary")
  checkInSummary.innerHTML = document.getElementById("checkin").value
  checkOutSummary.innerHTML = document.getElementById("checkout").value
};


//Updates summary number of adult and children
function updatePeople() {
  let adultsSummary = document.getElementById("adults-summary")
  let childrenSummary = document.getElementById("children-summary")
  adultsSummary.innerHTML = document.getElementById("adults").value + " Adults"
  childrenSummary.innerHTML = document.getElementById("children").value + " Children"
};


//Updates room name and price in summary
function updateSummary() {
  let roomsName = document.getElementsByClassName("room-name")
  let rooms = document.getElementsByClassName("pointer")
  let prices = document.getElementsByClassName("room-price")
  let available = []
  let allprices = []
  for(let room, j=0; room = rooms[j]; j++){
    if(room.style.display === "inherit"){
      available.push(room.innerText)
    }
  }
  for(let price, i = 0; price = prices[i]; i++){
    allprices.push(Number(price.innerHTML))
  }
  let filteredPrices = []
  for (let i = 0; i < allprices.length; i++) {
    let roomName = roomsName[i].innerHTML
    document.getElementById("summary-name").innerHTML = "No room selected"
    if (available.length === 0) {
    } else if(available.length <= 1){
        if(available[0].indexOf(allprices[i])>-1 && available[0].includes(roomName)){
          filteredPrices.push(allprices[i])
          document.getElementById("summary-name").innerHTML = roomName
        }
      } else if (available[i].indexOf(allprices[i])>-1 && available[i].includes(roomName)) {
        filteredPrices.push(allprices[i])
        document.getElementById("summary-name").innerHTML = roomName
      }
    }
    cheapest = Math.min(...filteredPrices)
    document.getElementById('total-price').innerHTML = cheapest
    updateDates();
    updatePeople();
};

(updateDates());
(updatePeople());


//CREATE AND CHECK PROMO CODE

let thn = "THN"
let randomNum = Math.floor(Math.random()* 100)
let promo_code = thn + randomNum;
console.log(promo_code)
let price = document.getElementById('total-price').innerHTML
let discount = price * randomNum/100
let originalPrice = document.getElementById("original-price")
let finalprice = price - discount
let validationText = document.getElementById("validationText")
let codeInput = document.getElementById("promo_code").value

function checkPromoCode(){
  let codeInput = document.getElementById("promo_code").value
  if(codeInput === promo_code){
    originalPrice.innerHTML = "€" + price
    originalPrice.style.color = "red"
    document.getElementById("total-price").innerHTML = finalprice
    validationText.innerHTML = "Discount applied!"
    validationText.style.color = "green"
    document.getElementById("detailedTotalPrice").innerHTML = "Final price: €" + finalprice
    document.getElementById("detailedDiscount").innerHTML = "Discount applied: " + randomNum + "%"
    document.getElementById("detailedOriginalPrice").innerHTML = "Original price: €" + price
  } else {
    validationText.innerHTML = "Wrong code :("
    validationText.style.color = "red"
  }
}


//PRICE DETAILS
(function alertOcult(){
  document.getElementById("alert").style.display = "none"
})();

function getDetail(){
  document.getElementById('alert').style.display='inherit';
  document.getElementById("detailedTotalPrice").innerHTML = "Total price: €" + price
  document.getElementById("detailedDiscount").innerHTML = "This is your final price. No discount applied."
}


//SAVE DATA

//Save data and send it to XHR
let bookings = new Array();
let summaryName = document.getElementById("summary-name").innerHTML
let checkInSummary = document.getElementById("checkin-summary").innerHTML
let checkOutSummary = document.getElementById("checkout-summary").innerHTML
let adultsSummary = document.getElementById("adults-summary").innerHTML
let childrenSummary = document.getElementById("children-summary").innerHTML
let summaryPrice = document.getElementById('total-price').innerHTML

let data = "name: " + summaryName + ", checkIn: " + checkInSummary + ", checkOut: " + checkOutSummary + ", Adults: " + adultsSummary + ", Children: " + childrenSummary + ", total: " + summaryPrice
bookings.push(data)
const xhr = new XMLHttpRequest();

xhr.open("POST", "data.php");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(data)


//create payment simulation with the data
document.getElementById("payment-section").style.display = "none"
document.getElementById("payment-section2").style.display = "none"

function simulateBooking(){
  document.getElementById("payment-section").style.display = ""
  document.getElementById("payment-section2").style.display = ""
  document.getElementById("room-and-rates").style.display = "none"
}


function addRoom(){
  console.log("This functionality is not available yet")
}

//DATA BASE SOLUTION
/* En relación a la implementación de una base de datos desarrollaría un modelo para guardar las reservas con un método
POST para poder manejar bien la información e imprimirla por ejemplo en la landing de pago final o en el sumario. 
También se podría generar un modelo para las habitaciones y un formulario para añadir habitaciones y que se vieran 
reflejadas en la página principal. Para ello sería necesario dos modelos diferentes que cubran los dos pefiles básicos,
el cliente y el priveedor del hospedaje. La base de datos también permitiría almacenar todos los diferentes perfiles con 
los datos correspondientes y ofrecer un servicio de seguimiento mediante login. Además de tener una arreglo en la base de
datos con los códigos promocionales válidos. Utilizar una base de datos implicaría hacer peticiones al backend y para pasar
la información se requerirían servicios que conectaran el frontend con el backend. 
*/