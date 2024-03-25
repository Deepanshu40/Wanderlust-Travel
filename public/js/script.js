let listings = document.querySelectorAll(".tax-toggle");
let categoryItems = document.querySelectorAll('.listing-category-item');
let prevCategory = document.querySelector('.category-list .fa-arrow-left');
let nextCategory = document.querySelector('.category-list .fa-arrow-right');
let taxToggle = document.querySelector('#togglebtn');
let count = 1;

if (prevCategory && nextCategory) {
prevCategory.addEventListener('click', () => {
 if (count === 1) {
    
 } else {
    for (let i=((count-2)*5); i<((count-1)*5); i++) {
        categoryItems[i].style.display = '';
    }
    count--;
 }
 
});


nextCategory.addEventListener('click', () => {

if (count >= 1 && count < (Math.floor(categoryItems.length/5))) {
    for (let i = 0; i<(count*5); i++) {
        categoryItems[i].style.display = 'none';
    }
    count++;
    console.log(count);
 }

});

taxToggle.addEventListener("change", () => {
  for (listing of listings) {
    if (taxToggle.checked) {
      listing.style.display = "inline";
      console.log("checked")
    } else {
      listing.style.display = "none";
      console.log('unchecked')
    }
} 
})

}
   


// message warning and success
let element = document.querySelector('.msg-close');

if (element) {
  element.addEventListener('click', () => {
  element.parentElement.style.display = 'none';
})
};



// form validations

let requiredInput = document.querySelectorAll('form input[required]');
let requiredTextarea = document.querySelectorAll('form textarea[required]');
let submitButtons = document.querySelectorAll('button[type="submit"]');
let result = [];
requiredArr = [...requiredInput, ...requiredTextarea];



if (submitButtons) {
submitButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
  event.preventDefault();  // Prevent default action of form submission
  

  if (requiredArr) {
      result = requiredArr.map((element) => {
      return checkInput(element);
    })}
 
  if (result) {
      result = result.filter((el) => {
      return el === 'Error';
    })}


  if (!result.length) {
    event.target.closest('form').submit();
  }
  })
})  
}


//checking Input length

function checkInput(element, len = 0, field = 'null') {
  let existingMessage = document.querySelector(`.${element.id}-message`);

        if (!existingMessage) {
        if (!element.value) {
        let message = document.createElement('p');
        message.innerText = `Please enter a valid value`;
        message.style.color = 'red';
        message.style.fontSize = '0.8rem'
        message.classList.add(`${element.id}-message`); // Add a class to identify the message
        element.insertAdjacentElement('afterend', message);
        return 'Error';
      } else if (element.value.length < length) {
        let message = document.createElement('p');
        message.innerText = `Please enter ${field} of atleast ${len} characters`;
        message.style.color = 'red';
        message.style.fontSize = '0.8rem'
        message.classList.add(`${element.placeholder}-message`); // Add a class to identify the message
        element.insertAdjacentElement('afterend', message);
        return 'Error';
      } else {
        return '';
      }
    } else if (existingMessage) {
      if (!element.value) {
        existingMessage.innerText = `Please enter a valid value`;
        return 'Error';
      } else if (element.value.length < length) {
        existingMessage.innerText = `Please enter ${field} of atleast ${len} characters`;
        return 'Error';
      } else {
        existingMessage.innerText = '';
        return '';
      }
    }
}



