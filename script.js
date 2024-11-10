//Get referwncea to the foem and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link-container");
var shareableLinkButton = document.getElementById("shareable-link-container");
//Handle form submission 
form.addEventListener('submit', function (event) {
    event.preventDefault(); //prevent page reload
    //collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experiance = document.getElementById('experiance').value;
    var skills = document.getElementById('skills').value;
    //save form data in localstorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experiance: experiance,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally
    // generate the resume content dynamically
    var resumeHTML = "\n     <h2><b> Editable Resume</b></h2>\n     <h3>Personal Information</h3>\n     <p><b>Name</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n      <p><b>Email</b><span contenteditable=\"true\">").concat(email, "</span></p>\n       <p><b>Phone</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n\n       <h3>Education</h3>\n       <p contenteditable=\"true\">").concat(education, "</p>\n\n       <h3>Experiance</h3>\n       <p contenteditable=\"true\">").concat(experiance, "</p>\n\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>\n                 \n        ");
    //Display the genrated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    //generte the shareableData URl with the username only
    var shareableURL = "".concat(window.location.origin, "? username-").concat(encodeURIComponent(username));
    //display the shareable link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkButton.textContent = shareableURL;
});
//handel pdf download
downloadPdfButton.addEventListener("click", function () {
    window.print(); //this will open the print dialoge and allow the user to save as pdf
});
//prefill the form based on the username in the url
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        //Auto fill form if data is found in localstorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("username").value = username;
            document.getElementById("name").value = resumeData.name;
            document.getElementById("email").value = resumeData.email;
            document.getElementById("phone").value = resumeData.phone;
            document.getElementById("education").value = resumeData.education;
            document.getElementById("experiance").value = resumeData.experiance;
            document.getElementById("skills").value = resumeData.skills;
        }
    }
});
