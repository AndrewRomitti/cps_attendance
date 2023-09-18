const baseURL = "https://docs.google.com/forms/u/2/d/e/1FAIpQLSerIwdzyctdghqGKloAbt9pkhE4CnxEh8Pdf-zJfkBVz7rtEg/formResponse"
var school = "CPS"
const formEntryNumbers = {
    "school": "entry.690000814",
    "name": "entry.1286908513"
}

function setSchool(school_arg) {
    school = school_arg
    var textInput = document.getElementById('name');
    textInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        submitAttendance();
        // Perform desired actions here
      }
    });
}

function redirectUser(){
    var school_name = document.getElementsByName('school');

    for(i=0; i<school_name.length; i++){
        if(school_name[i].checked){
            if(school_name[i].value == "RockBridge"){
                redirectRockBridge();
            }
            else if(school_name[i].value == "Hickman"){
                redirectHickman();
            }
            else if(school_name[i].value == "Battle"){
                redirectBattle();
            }
        }
    }
}

function redirectHickman(){
    window.location.href = "/cps_attendance/hhs.html";
}

function redirectRockBridge(){
    window.location.href = "/cps_attendance/rbhs.html";
}

function redirectBattle(){
    window.location.href = "/cps_attendance/bhs.html";
}

async function submitAttendance() {
    var name = document.getElementById("name").value
    url_formed = baseURL
    var formData = new FormData();
    formData.append("entry.690000814", school);
    formData.append("entry.1286908513", name);

    response = await fetch(url_formed, {
        method: "POST",
        body: formData,
        mode: 'no-cors' 
      })
        .then((response) => {
            swal("Thank you for your response", "We got it!", "success", {
                button: "Continue",
           
              });
            document.getElementById("name").value = "";
          if (response.ok) {
            alert("Sent!")
            console.log("Response submitted successfully");
          } else {
            console.error("Failed to submit response");
          }
        })
        .catch((error) => {
            swal("Here's a title", "Here's some text", "success", {
                button: "I am new button",
           
              });
          console.error("Error:", error);
        });
}
