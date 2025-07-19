document.addEventListener("DOMContentLoaded", function() {
  // Query for button with an id "theme-button"
  let themeButton = document.getElementById("theme-button");
  // Define toggleDarkMode function
  const toggleDarkMode = () => {
    // Toggle dark-mode class on the body
    document.body.classList.toggle("dark-mode");
  }
  // Register a 'click' event listener for the theme button
  themeButton.addEventListener("click", toggleDarkMode);


  let revealableContainers = document.querySelectorAll('.revealable');
  // Define the animation object
  let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
  };

  function reveal() {
    for (let i = 0; i < revealableContainers.length; i++) {
      // Save the height of the window
      let windowHeight = window.innerHeight;

      // Find the top of the revealable container
      let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

      // Check if the topOfRevealableContainer should be loaded in
      if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
        revealableContainers[i].classList.add('active');
      } else {
        revealableContainers[i].classList.remove('active');
      }
    }
  }

  window.addEventListener('scroll', reveal);

  //modals
  function toggleModal(nameValue, hometownValue) {
    // Select modal and modalContent elements
    const modal = document.getElementById('thanks-modal');
    const modalContent = document.getElementById("thanks-modal-content");

    // Set the display style property of the entire modal to flex
    modal.style.display = "flex";

    // Set the thank you message using the input values
    const message = `${nameValue} from ${hometownValue} supports this!`;
    modalContent.textContent = message;

    // Hide the modal after a few seconds
    setTimeout(() => {
      modal.style.display = "none";
    }, 4000); 
  }

  document.getElementById("sign-now-button").addEventListener("click", function(event) {
    // Reset previous errors
    document.getElementById("name").classList.remove("error");
    document.getElementById("hometown").classList.remove("error");
    document.getElementById("email").classList.remove("error");

    let isValid = true;

    // Validate email
    var emailInput = document.getElementById("email");
    var emailValue = emailInput.value.trim();
    if (emailValue === "" || !emailValue.includes("@")) {
      emailInput.classList.add("error");
      isValid = false;
    }

    // Validate name
    var nameInput = document.getElementById("name");
    var nameValue = nameInput.value.trim();
    if (nameValue === "") {
      nameInput.classList.add("error");
      isValid = false;
    }

    // Validate hometown
    var hometownInput = document.getElementById("hometown");
    var hometownValue = hometownInput.value.trim();
    if (hometownValue === "") {
      hometownInput.classList.add("error");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Append the signature to the list without refreshing the page
    var signatureList = document.getElementById("signature-list");
    var signature = document.createElement("p");
    signature.textContent = "🖊️ " + nameValue + " from " + hometownValue + " supports this.";
    signatureList.appendChild(signature);

    // Call the toggleModal function after signing the petition
    toggleModal(nameValue, hometownValue);
    // Increment signature count
    updateSignatureCount();

    // Reset input fields after signing
    document.getElementById("name").value = "";
    document.getElementById("hometown").value = "";
    document.getElementById("email").value = "";
  });
});

// Get the signature list container
const signatureList = document.getElementById('signature-list');

// Function to add a new signature to the list
function addSignature(signature) {
  const signatureItem = document.createElement('div');
  signatureItem.textContent = signature;
  signatureList.appendChild(signatureItem);

  // Update the signature count
  updateSignatureCount();
}

// Function to update the signature count
function updateSignatureCount() {
  const count = document.getElementById('signature-list').children.length;
  document.getElementById('signature-count').textContent = `Total Signatures: ${count}`;
}

document.addEventListener("DOMContentLoaded", function() {
  // Select the modal button
  const modalButton = document.getElementById("modal-button");

  // Add event listener to the modal button
  modalButton.addEventListener("click", function() {
    // Close the modal when the button is clicked
    const modal = document.getElementById("thanks-modal");
    modal.style.display = "none";
  });
});