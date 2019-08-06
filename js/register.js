window.onload = function () {
    //Get Register Data
    let reg_name = document.querySelector("#reg_name");
    let reg_email = document.querySelector("#reg_email");
    let reg_password = document.querySelector("#reg_password");
    let reg_confirmPassword = document.querySelector("#reg_confirmPassword");
    let registerSubmitBtn = document.querySelector("#registerSubmitBtn");
    // let displayErrorMsg = document.querySelector("#displayErrorMsg");
    let displayErrorMsg = document.getElementById("test");
    
    function validateName(name) {
        var nameRE = /^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$/;
        return nameRE.test(String(name).toLowerCase());
    }
    function validateEmail(email) {
        var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRE.test(String(email).toLowerCase());
    }
    function validatePassword(password) {
        var passwordRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRE.test(String(password).toLowerCase());
    }
    //Register 
    function checkRegisterData(name, email, password, c_password) {
        var msg;
        let checkValidName = validateName(name);
        let checkValidEmail = validateEmail(email);
        let checkValidPassword = validatePassword(password);
        let checkValidConfirmPassword = validatePassword(c_password);
        text = localStorage.getItem(email);
        obj = JSON.parse(text);
        if (!checkValidName) {
            msg = "Please fill your name";
            displayErrorMsg.innerHTML = msg;
            return -1;
        }
        else if (!checkValidEmail) {
            msg = "Please fill your email";
            displayErrorMsg.innerHTML = msg;
            return -1;
        }
        else if (obj == null){
            return 0;
        }
        else if(obj.email == email){
            msg = "This email exist";
            displayErrorMsg.innerHTML = msg;
            return -1;
        }
        // !checkValidPassword || !checkValidConfirmPassword
        else if (password == "" || c_password == "") {
            msg = "Please fill your password";
            displayErrorMsg.innerHTML = msg;
            return -1;
        }
        else if (password != c_password) {
            msg = "Your password not match";
            displayErrorMsg.innerHTML = msg;
            return -1;
        }
        else if (password.length < 6 || c_password.length < 6) {
            msg = "Password must be at least 6";
            displayErrorMsg.innerHTML = msg;
            return -1;
        }
        else {
            msg = "";
            displayErrorMsg.innerHTML = msg;
            return 0;
        }
    }
    function resetRgisterForm() {
        reg_name.value = "";
        reg_email.value = "";
        reg_password.value = "";
        reg_confirmPassword.value = "";
    }

    // function createAccount(name, email, password) {
    //     this.name = name;
    //     this.email = email;
    //     this.password = password;
    // }

    // function register() {
    //     this.accounts = [];
    //     this.addAccount = function (account) {
    //         this.accounts.push(account);
    //     };
    //     // this.retriveAccount = function (email) {
    //     //     for (let i in this.accounts) {
    //     //         if (this.accounts[i].email == email)
    //     //             return this.accounts[i];
    //     //     }
    //     // };
    // }

    // function createRegisterObj() {
    //     let registerObj = new register();
    //     return registerObj;
    // }

    // var globalRegisterObj;

    registerSubmitBtn.addEventListener("click", function () {
        // let registerObj = createRegisterObj();
        // let registerObj = new register();
        // let checkAccountObj = registerObj.retriveAccount(reg_email.value);
        // if (checkAccountObj.email == null || checkAccountObj.email == reg_email.value)
        // {
        //     displayErrorMsg.innerHTML =  "This email exist";
        // }
        // else
        // {
        //     let accountObj = new createAccount(reg_name.value, reg_email.value, reg_password.value);
        //     registerObj.addAccount(accountObj);
        //     globalRegisterObj = registerObj;
        // }
        // let registerObj = new register();
        // let accountObj = new createAccount(reg_name.value, reg_email.value, reg_password.value);
        // registerObj.addAccount(accountObj);
        // globalRegisterObj = registerObj;

        let check = checkRegisterData(reg_name.value, reg_email.value, reg_password.value, reg_confirmPassword.value);
        if (check == 0) {
            myObj = {
                "name": reg_name.value,
                "email": reg_email.value,
                "password": reg_password.value
            };
            myJSON = JSON.stringify(myObj);
            localStorage.setItem(reg_email.value, myJSON);
            resetRgisterForm();
        }
        console.log("register data status " + check);
        
    });
    console.log(localStorage);

};