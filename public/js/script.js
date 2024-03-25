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

console.log(originalUrl);

// form validations

let requiredInput = document.querySelectorAll('form input[required]');
let requiredTextarea = document.querySelectorAll('form textarea[required]');
let selectList = document.querySelectorAll('form select[required');
let submitButtons = document.querySelectorAll('button[type="submit"]');
let result = [];
requiredArr = [...requiredInput, ...requiredTextarea];


if (defaultCategory) {
let markSelected = Array.from(selectList[0].options).filter((option) => option.innerText === defaultCategory);
markSelected[0].defaultSelected = true;
};


if (submitButtons) {
submitButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
  event.preventDefault();  // Prevent default action of form submission
  
  if (requiredArr) {
      result = requiredArr.map((element) => {
        // console.dir(element);    
        let {minLength, maxlength, min, max, value} = element;      
        let arr = [minLength, maxlength, min, max, value];
        arr = arr.map((el) => parseInt(el));
        minLength = arr[0];
        maxLength = arr[1];
        min = arr[2];
        max = arr[3];
        value = arr[4];
        
        // let markSelected = Array.from(selectList[0].options).filter((option) => option.defaultCategory === true);
        // if (markSelected.length === 0) {
        //     populateMessage(element, 'Please select the category from the below list');          
        // } else {
          
        // } 
        

        return checkInput (element, minLength, maxLength, min, max, value)      

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


// function to populate a message for form validation
function populateMessage(element, message)  {
  let newMessage = document.createElement('p');
  newMessage.innerText = message;
  newMessage.style.color = 'red';
  newMessage.style.fontSize = '0.8rem'
  newMessage.classList.add(`${element.id}-message`); // Add a class to identify the message
  element.insertAdjacentElement('afterend', newMessage);
};

//checking Input length

function checkInput(element, minLength, maxLength, min, max, value) {
  let existingMessage = document.querySelector(`.${element.id}-message`);

        if (!existingMessage) {
        if (!element.value) {
  
        let message = `Please enter a valid value`;
        populateMessage(element, message); 
        return 'Error';
      } else if (value < minLength) {
        let message = `The length of input should not be lower than ${minLength} characters`
        populateMessage(element, message); 
        return 'Error';
      } else if (value > maxLength) {
        let message = `The length of input should be more than ${maxLength} characters`
        populateMessage(element, message); 
        return 'Error';
      } else if (value < min) {
        let message = `The value of input should not be less than ${min}`
        populateMessage(element, message); 
        return 'Error';
      } else if (value > max) {
        let message = `The value of input should not be more than ${max}`
        populateMessage(element, message); 
        return 'Error';
      }
      else {
        return '';
      }
    } else if (existingMessage) {
      if (!element.value) {
        existingMessage.innerText = `Please enter a valid value`;
        return 'Error';
      } else if (value < minLength) {
        existingMessage.innerText = `The length of input should not be lower than ${minLength} characters`;
        return 'Error';
      } else if (value > maxLength) {
        existingMessage.innerText = `The length of input should be more than ${maxLength} characters`
        return 'Error';
      } else if (value < min) {
        existingMessage.innerText = `The value of input should not be less than ${min}`
        return 'Error';
      } else if (value > max) {
        existingMessage.innerText = `The value of input should not be more than ${max}`
        return 'Error';
      } else {
        existingMessage.innerText = '';
        return '';
      }
    }
};



