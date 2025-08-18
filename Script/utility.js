function setBackgroundColorById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('bg-[#1DD100]');
}

function removeBackgroundColorById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove('bg-[#1DD100]');
}

let clickedButtons = [];
function storeButton(id) {
    let text = document.getElementById(id).innerText;
    let index = clickedButtons.indexOf(text);
    let clickedButtonsLength = clickedButtons.length;

    if (!clickedButtons.includes(text)) {
        if (clickedButtonsLength <= 3) {
            clickedButtons.push(text);
            setBackgroundColorById(text);
            // console.log(clickedButtons);

            let initialSeatNumber = getTextValueById('seat-number');
            let updatedSeatNumber = initialSeatNumber + 1;
            //console.log(updatedSeatNumber);
            setTextValueById('seat-number', updatedSeatNumber);

            let initialTotalSeat = getTextValueById('left-seat');
            // console.log(initialTotalSeat);
            let updatedLeftSeat = initialTotalSeat - 1;
            setTextValueById('left-seat', updatedLeftSeat);

            addRow(id);

            let calculatePrice = updatedSeatNumber;
            //console.log(calculatePrice);
            let totalPrice = calculatePrice * 550;
            setTextValueById('total-price', totalPrice);

            setTextValueById('grand-total', totalPrice);

            if (clickedButtonsLength === 3) {
                showElementById('discount');
                setTextValueById('grand-total', '0');
                actionApply(id);
            }
        }
    }

    else {
        if (clickedButtons.includes(text)) {
            clickedButtons.splice(index, 1);
            removeBackgroundColorById(text);
            // console.log(clickedButtons);

            let initialSeatNumber = getTextValueById('seat-number');
            let updatedSeatNumber = initialSeatNumber - 1;
            //console.log(updatedSeatNumber);
            setTextValueById('seat-number', updatedSeatNumber);

            if (updatedSeatNumber < 4) {
                hideElementById('discount');
            }

            let initialTotalSeat = getTextValueById('left-seat');
            // console.log(initialTotalSeat);
            let updatedLeftSeat = initialTotalSeat + 1;
            setTextValueById('left-seat', updatedLeftSeat);

            let btn = document.getElementById(id);
            let seatText = btn.innerText;
            let container = document.getElementById("ticketContainer");
            const existingRow = container.querySelector(`[data-seat="${seatText}"]`);
            if (existingRow) {
                container.removeChild(existingRow);
                clickedButtons = clickedButtons.filter(seat => seat !== seatText);
            }

            let calculatePrice = updatedSeatNumber;
            //console.log(calculatePrice);
            let totalPrice = calculatePrice * 550;
            setTextValueById('total-price', totalPrice);

            setTextValueById('grand-total', totalPrice);
        }
    }
}

function actionApply(id) {
    const couponElementTextValue = document.getElementById('discount-coupon').value;
    //console.log(couponElementTextValue);
    const couponInputed = couponElementTextValue.toUpperCase();
    //console.log(couponInputed);
    const couponCode = "New15";
    const couponText = couponCode.toUpperCase();
    //console.log(couponText);
    if (couponText === couponInputed) {
        const totalPrice = document.getElementById('total-price').innerText;
        const discountprice = totalPrice - (totalPrice * .15);
        const discountedPrice = parseInt(discountprice);
        setTextValueById('grand-total', discountedPrice);
    }

}

function addRow(id) {
    let btn = document.getElementById(id);
    let seatText = btn.innerText; // get inner text of button

    let container = document.getElementById("ticketContainer");

    // Create new row div
    let row = document.createElement("div");
    row.className = "flex items-center justify-between py-2";
    row.setAttribute("data-seat", seatText);


    // Example: random class + fare (you can fetch dynamically)
    let seatClass = "Economy";
    let fare = "550";

    row.innerHTML = `
      <span>${seatText}</span>
      <span>${seatClass}</span>
      <span>${fare}</span>
    `;

    // Append row to container
    container.appendChild(row);
}


function getTextValueById(elementId) {
    const element = document.getElementById(elementId);
    const elementValueText = element.innerText;
    const elementValue = parseInt(elementValueText);
    return elementValue;
}


function setTextValueById(elementId, value) {
    const element = document.getElementById(elementId);
    element.innerText = value;
}

function showElementById(id) {
    const element = document.getElementById(id);
    element.classList.remove('hidden');
}

function hideElementById(id) {
    const element = document.getElementById(id);
    element.classList.add('hidden');
}