window.onload = function () {
    //Get Login Data 
    let log_email = document.querySelector("#log_email");
    let log_password = document.querySelector("#log_password");
    let loginSubmitBtn = document.querySelector("#loginSubmitBtn");
    // let displayLoginErrorMsg = document.querySelector("#displayLoginErrorMsg");
    let displayLoginErrorMsg = document.getElementById("test");

    function validateEmail(email) {
        var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRE.test(String(email).toLowerCase());
    }
    function validatePassword(password) {
        var passwordRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRE.test(String(password).toLowerCase());
    }

    //Login
    function checkLoginData(email, password) {
        var msg;
        text = localStorage.getItem(log_email.value);
        obj = JSON.parse(text);
        let checkValidEmail = validateEmail(email);
        // let checkValidPassword = validatePassword(password);
        if (obj == null){
            msg = "Please enter valid email";
            displayLoginErrorMsg.innerHTML = msg;
            return -1;
        }
        else if(!checkValidEmail || log_email.value != obj.email){
            msg = "Please enter valid email";
            displayLoginErrorMsg.innerHTML = msg;
            return -1;
        }
        else if (password == "") {
            msg = "Please fill your password";
            displayLoginErrorMsg.innerHTML = msg;
            return -1;
        }
        else if (password.length < 6) {
            msg = "Less password length";
            displayLoginErrorMsg.innerHTML = msg;
            return -1;
        }
        else {
            msg = "";
            displayLoginErrorMsg.innerHTML = msg;
            return 0;
        }
    }
    function resetLoginForm() {
        log_email.value = "";
        log_password.value = "";
    }
    loginSubmitBtn.addEventListener("click", function () {
        let check = checkLoginData(log_email.value, log_password.value);
        if (check == 0){
            if (obj.password == log_password.value)
            {
                localStorage.setItem('email', obj.email);
                resetLoginForm();
            }
            else 
            {
                msg = "Enter valid password";
                displayLoginErrorMsg.innerHTML = msg;
            }
        }
    });

    console.log(localStorage);

}