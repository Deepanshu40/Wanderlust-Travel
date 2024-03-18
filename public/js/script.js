(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// let categoryHide = document.querySelectorAll(".listing-category-item-hide");
// let categoryHideButton = document.querySelector(".category-hiding-effect");

// categoryHideButton.addEventListener("click", () => {
//   for (let listing of categoryHide) {
//     listing.style.display = "none";
//   }
//   console.log("Hi");
// });

let listings = document.querySelectorAll(".card-text-show-all-listings");
let taxToggle = document.querySelector(".tax-toggle-section-switch");

taxToggle.addEventListener("change", () => {
  for (listing of listings) {
    if (taxToggle.checked) {
      listing.style.display = "inline";
      // console.log("checked")
    } else {
      listing.style.display = "none";
    }
    // console.log("unchecked");
}
  console.log("checked");
})

  