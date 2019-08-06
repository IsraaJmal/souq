window.onload = function () {
    let togglerAnchor = document.querySelector("#togglerAnchor");
    let infoName = document.querySelector("#info h3");
    let infoEmail = document.querySelector("#info p");
    let leftSideMenu = document.querySelector("#leftSideMenu");
    let exitDiv = document.querySelector("#exitDiv");
    let content = document.querySelector("#content");
    let loginLink = document.querySelector("#loginLink");
    let logoutLink = document.querySelector("#logoutLink");
    let profile = document.querySelector("#profile");
    let searchBtn = document.querySelector("#searchBtn");
    let searchInput = document.querySelector("#searchInput");
    let viewProfileBtn = document.querySelector("#viewProfileBtn");
    let exitDiv2 = document.querySelector("#exitDiv2");
    let profilePopupSaveBtn = document.querySelector("#profilePopupSaveBtn");
    let profilePopupCanselBtn = document.querySelector("#profilePopupCanselBtn");
    let displayProfileErrorMsg = document.getElementById("displayProfileErrorMsg");
    let productList = document.querySelectorAll(".product");
    let addToCartBtn = document.querySelectorAll(".addToCartBtn");
    let checkoutBtn = document.querySelectorAll(".checkoutBtn");
    let charNumber = document.querySelector("#charNumber");
    let viewProductDetailsBtn = document.querySelectorAll(".viewProductDetailsBtn");
    let productDetailsBox = document.querySelector("#productDetailsBox");
    let close = document.querySelector("#close");

    text = localStorage.getItem(localStorage.getItem('email'));
    obj = JSON.parse(text);
    if (obj != null) {
        infoName.innerText = obj.name;
        infoEmail.innerText = obj.email;
        profile.style = "display: flex";
        logoutLink.style = "display: block";
        loginLink.style = "display: none";
    }

    viewProfileBtn.onclick = function () {
        profilePopupDiv.style = "display: block";
        exitDiv2.className = "is-visible exitClass2";
        exitDiv2.style.height = document.querySelector("#container").clientHeight + "px";
        let profilePopupName = document.querySelector("#profilePopupName");
        let profilePopupEmail = document.querySelector("#profilePopupEmail");
        let profilePopupPassword = document.querySelector("#profilePopupPassword");
        let profilePopupConfirmPassword = document.querySelector("#profilePopupConfirmPassword");
        profilePopupName.value = obj.name;
        profilePopupEmail.value = obj.email;
        profilePopupPassword.value = obj.password;
        profilePopupConfirmPassword.value = obj.password;
    }
    exitDiv2.addEventListener("click", function () {
        profilePopupDiv.style = "display: none";
        exitDiv2.className = "";
        productDetailsBox.style = "display: none";
    });

    function validateName(name) {
        var nameRE = /^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$/;
        return nameRE.test(String(name).toLowerCase());
    }
    function checkProfileData(name, password, c_password) {
        var msg;
        let checkValidName = validateName(name);
        if (!checkValidName) {
            msg = "Please fill your name";
            displayProfileErrorMsg.innerHTML = msg;
            return -1;
        }
        else if (password == "" || c_password == "") {
            msg = "Please fill your password";
            displayProfileErrorMsg.innerHTML = msg;
            return -1;
        }
        else if (password != c_password) {
            msg = "Your password not match";
            displayProfileErrorMsg.innerHTML = msg;
            return -1;
        }
        else if (password.length < 6 || c_password.length < 6) {
            msg = "Password must be at least 6";
            displayProfileErrorMsg.innerHTML = msg;
            return -1;
        }
        else {
            msg = "";
            displayProfileErrorMsg.innerHTML = msg;
            return 0;
        }
    }
    profilePopupSaveBtn.onclick = function () {
        let check = checkProfileData(profilePopupName.value, profilePopupPassword.value, profilePopupConfirmPassword.value);
        if (check == 0) {
            myObj = {
                "name": profilePopupName.value,
                "email": profilePopupEmail.value,
                "password": profilePopupPassword.value
            };
            myJSON = JSON.stringify(myObj);
            localStorage.setItem(profilePopupEmail.value, myJSON);
        }
    }
    profilePopupCanselBtn.onclick = function () {
        profilePopupDiv.style = "display: none";
        exitDiv2.className = "";
    }

    logoutLink.addEventListener('click', function () {
        localStorage.removeItem('email');
        profile.style = "display: none";
        logoutLink.style = "display: none";
        loginLink.style = "display: block";
    })

    togglerAnchor.addEventListener("click", function () {
        leftSideMenu.style = "left: 0 !important;";
        exitDiv.className = "is-visible exitClass";
        exitDiv.style.height = document.querySelector("#container").clientHeight + "px";

    });
    exitDiv.addEventListener("click", function () {
        leftSideMenu.style = "left: -260px !important;";
        exitDiv.className = "";
    });

    // search 
    searchBtn.addEventListener('click', function () {
        alert("you are searching for " + searchInput.value);
    });
    searchInput.onkeyup = function (e) {
        if (e.keyCode === 13) {
            searchBtn.click();
        }
    }

    // user rating stars 
    // productList = document.querySelectorAll(".upRightProduct");
    // console.log(productList);

    // Add to cart 

    checkoutBtn.forEach(function (item) {
        item.style = "display: none";
    });

    var counter = 0;
    charNumber.innerText = counter;

    // productList.forEach(function(productItem){

    // })
    let flag = 0;

    productList.forEach(function (productItem) {
        productItem.onclick = function () {
            // console.log(this.children[3].innerText);

            let starItem = this.childNodes[9].children;
            for (let i in starItem) {
                starItem[i].onclick = function () {
                    if (starItem[i].className == 'starItem') {
                        this.className = "starItem checked";
                    }
                    else {
                        this.className = "starItem";
                    }
                    if (starItem[i].className == "starItem checked") {
                        if (i >= 0) {
                            for (j = 0; j < i; j++) {
                                starItem[j].className = "starItem checked"
                            }
                        }
                    }
                    else {
                        let x = i;
                        if (x < starItem.length) {
                            for (j = x; j < starItem.length; j++) {
                                starItem[j].className = "starItem"
                            }
                        }
                    }
                }
            }

            viewProductDetailsBtn.forEach(function (item) {
                productDetailsBox.childNodes[1].innerText = productItem.childNodes[3].innerText;
                productDetailsBox.childNodes[3].innerHTML = productItem.childNodes[9].innerHTML;
                productDetailsBox.childNodes[5].childNodes[1].childNodes[1].src = productItem.childNodes[1].childNodes[3].src;
                productDetailsBox.childNodes[5].childNodes[3].childNodes[11].innerHTML = productItem.childNodes[11].innerHTML;

                let productDetailsBoxAddToCart = document.querySelector("#productDetailsBox .addToCartBtn");

                productDetailsBoxAddToCart.addEventListener('click', function () {
                    flag = 1;
                    charNumber.innerText = ++counter;
                    this.style = "display: none";
                    this.nextElementSibling.style = "display: block";
                    if (flag == 1){
                        productItem.childNodes[11].childNodes[1].style = "display: none";
                        productItem.childNodes[11].childNodes[1].nextElementSibling.style = "display: block";
                        flag = 0;
                    }
                })

                item.onclick = function () {
                    productDetailsBox.style.display = "block";
                    productDetailsBox.style.left = window.innerWidth / 2 - 800 / 2 + 'px'
                    productDetailsBox.style.top = "50px";
                    exitDiv2.className = "is-visible exitClass2";
                    exitDiv2.style.height = document.querySelector("#container").clientHeight + "px";
                }
            });
            
            addToCartBtn.forEach(function (item) {
                item.onclick = function () {
                    charNumber.innerText = ++counter;
                    this.style = "display: none";
                    this.nextElementSibling.style = "display: block";
                }
            });
        }

        productItem.onmouseover = function () {
            this.childNodes[1].childNodes[3].style = "opacity: 0.5";
            this.childNodes[1].childNodes[1].style = "display: block;";
        }
        productItem.onmouseleave = function () {
            this.childNodes[1].childNodes[1].style = "display: none";
            this.childNodes[1].childNodes[3].style = "opacity: 1";
        }
    });

    close.onclick = function () {
        exitDiv2.click();
    }


    // starItem.forEach(function (item) {
    //     item.onclick = function (e) {
    //         if (item.className == 'starItem') {
    //             item.className = "starItem checked";
    //             // if (item.className == "starItem checked") {
    //             //     console.log(item);
    //             // }
    //         console.log(item.innerText);


    //         }
    //         else {
    //             this.className = "starItem";
    //         }
    //         // console.log(this);
    //         // console.log(item);

    //     }
    // });



    // // percentage rating stars 
    // const ratings = {
    //     star1: 2.8,
    //     star2: 3.3,
    //     star3: 1.9,
    //     star4: 4.3,
    //     star5: 4.74
    // };

    // const starTotal = Object.keys(ratings).length;
    // let outerStarDiv =  document.querySelector(".outerStarDiv");
    // let innerStarDiv =  document.querySelector(".innerStarDiv");
    // // let 

    // for (const rating in ratings) {
    //     const starPercentage = (ratings[rating] / starTotal) * 100;
    //     const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    //     // console.log(starPercentageRounded);

    //     // document.querySelector(`.${rating} .${innerStarDiv}`).style.width = starPercentageRounded;
    //     // const starPercentageRounded  = (Math.round(starPercentage / 10) * 10);
    //     // document.querySelector(`.${innerStarDiv}`).style.width = starPercentageRounded;
    //     // console.log(starPercentage);
    //     // console.log(starPercentageRounded);
    //     // console.log();
    //     innerStarDiv.style.width = starPercentageRounded;

    //     // const starPercentageRounded = '${(Math.round(starPercentage / 10) * 10)}%';
    //     // document.querySelector('.${rating} #innerStarDiv').style.width = starPercentageRounded;
    // }


    // section 1 slider 
    let productsSliderObject = [
        { image: "images/products/slider/slider1.jpg" },
        { image: "images/products/slider/slider2.jpg" },
        { image: "images/products/slider/slider3.png" },
        { image: "images/products/slider/slider4.png" },
        { image: "images/products/slider/slider5.jpg" },
        { image: "images/products/slider/slider6.jpg" }
    ];

    let productsSlider = document.querySelector(".productsSlider .upProducts .slider .image img");
    setInterval(function () {
        let randomSlider = Math.floor(Math.random() * productsSliderObject.length);
        productsSlider.src = productsSliderObject[randomSlider].image;
    }, 2000);

    // section 1 upRightProduct
    let upDownProductObject = [
        { image: "images/categories/new fitness goals.jpg", desc: "Fitness Goals", salary: 250 + "$", productId: 60 },
        { image: "images/categories/laptops & camera.jpg", desc: "Laptops & Camera", salary: 300 + "$", productId: 70 },
        { image: "images/categories/new closet.jpg", desc: "New Clothes", salary: 350 + "$", productId: 80 },
        { image: "images/categories/refresh your home.jpg", desc: "Refresh Your Home", salary: 400 + "$", productId: 90 },
        { image: "images/categories/refreshing scents.jpg", desc: "Refreshing Scents", salary: 450 + "$", productId: 100 }
    ];

    let upRightProduct = document.querySelector(".productsSlider .upProducts .upRightProduct");
    let randomUpRight = Math.floor(Math.random() * upDownProductObject.length);
    let image = upRightProduct.getElementsByTagName('img');
    let desc = upRightProduct.getElementsByTagName('p');
    let salary = upRightProduct.getElementsByTagName('h4');
    // let productId = upRightProduct.getElementsByTagName('span');
    image[0].src = upDownProductObject[randomUpRight].image;
    desc[0].innerText = upDownProductObject[randomUpRight].desc;
    salary[0].innerText = upDownProductObject[randomUpRight].salary;
    // productId[0].innerText = upDownProductObject[randomUpRight].productId;

    // down products
    let downProduct = document.querySelectorAll(".productsSlider .downProducts .product");
    downProduct.forEach(function (item) {
        let randomDownProduct = Math.floor(Math.random() * upDownProductObject.length);
        let image = item.getElementsByTagName('img');
        let desc = item.getElementsByTagName('p');
        let salary = item.getElementsByTagName('h4');
        // let productId = item.getElementsByTagName('span');
        image[0].src = upDownProductObject[randomDownProduct].image;
        desc[0].innerText = upDownProductObject[randomDownProduct].desc;
        salary[0].innerText = upDownProductObject[randomDownProduct].salary;
        // productId[0].innerText = upDownProductObject[randomDownProduct].productId;
    });


    // section 2 furniture 

    let furnitureObject = [
        { image: "images/furniture/beddings-en.png", desc: "Beddings", salary: 250 + "$", productId: 10 },
        { image: "images/furniture/bedroom-en.png", desc: "Bedroom", salary: 300 + "$", productId: 20 },
        { image: "images/furniture/chairs-recliners-en.png", desc: "Chairs & Recliners", salary: 350 + "$", productId: 30 },
        { image: "images/furniture/dining-room-en.png", desc: "Dining Room", salary: 400 + "$", productId: 40 },
        { image: "images/furniture/home-decor-en.png", desc: "Home Decor", salary: 450 + "$", productId: 50 },
        { image: "images/furniture/living-room-en.png", desc: "Living Room", salary: 450 + "$", productId: 50 },
        { image: "images/furniture/office-study-en.png", desc: "Office Study", salary: 450 + "$", productId: 50 }];

    let furnitureProducts = document.querySelectorAll(".furniture .product");

    furnitureProducts.forEach(function (item) {
        let random = Math.floor(Math.random() * furnitureObject.length);
        let image = item.getElementsByTagName('img');
        let desc = item.getElementsByTagName('p');
        let salary = item.getElementsByTagName('h4');
        // let productId = item.getElementsByTagName('span');
        image[0].src = furnitureObject[random].image;
        desc[0].innerText = furnitureObject[random].desc;
        salary[0].innerText = furnitureObject[random].salary;
        // productId[0].innerText = furnitureObject[random].productId;

    });

    let babyObject = [
        { image: "images/baby/baby toys.jpg", desc: "Baby Toys", salary: 250 + "$", productId: 10 },
        { image: "images/baby/baby toys2.jpg", desc: "Baby Toys", salary: 250 + "$", productId: 20 },
        { image: "images/baby/bath & skin care.jpg", desc: "Bath & Skin Care", salary: 300 + "$", productId: 30 },
        { image: "images/baby/disney.jpg", desc: "Disney", salary: 350 + "$", productId: 40 },
        { image: "images/baby/nursery.jpg", desc: "Nursery", salary: 400 + "$", productId: 50 },
        { image: "images/baby/special.jpg", desc: "Special", salary: 450 + "$", productId: 60 },
        { image: "images/baby/baby gears.jpg", desc: "Baby Gears", salary: 250 + "$", productId: 70 },
        { image: "images/baby/bath and skin care.jpg", desc: "Bath & Skin Care", salary: 250 + "$", productId: 80 },
        { image: "images/baby/diapering.jpg", desc: "Diapering", salary: 250 + "$", productId: 90 },
        { image: "images/baby/feeding.jpg", desc: "Feeding", salary: 250 + "$", productId: 100 },
        { image: "images/baby/clothing.jpg", desc: "Clothing", salary: 250 + "$", productId: 110 }
    ];

    let babyProducts = document.querySelectorAll(".productsThirdStyle .product");

    babyProducts.forEach(function (item) {
        let random = Math.floor(Math.random() * babyObject.length);
        let image = item.getElementsByTagName('img');
        let desc = item.getElementsByTagName('p');
        let salary = item.getElementsByTagName('h4');
        // let productId = item.getElementsByTagName('span');
        image[0].src = babyObject[random].image;
        desc[0].innerText = babyObject[random].desc;
        salary[0].innerText = babyObject[random].salary;
        // productId[0].innerText = babyObject[random].productId;

    });

    let electronicsObject = [
        { image: "images/electronics/audio.jpg", desc: "Audio", salary: 250 + "$", productId: 10 },
        { image: "images/electronics/camera.jpg", desc: "Camera", salary: 300 + "$", productId: 20 },
        { image: "images/electronics/computer accessories.jpg", desc: "Computer Accessories", salary: 350 + "$", productId: 30 },
        { image: "images/electronics/gaming.jpg", desc: "Gaming", salary: 400 + "$", productId: 40 },
        { image: "images/electronics/laptops.jpg", desc: "Laptops", salary: 450 + "$", productId: 50 },
        { image: "images/electronics/mobile accesories.jpg", desc: "Mobile Accesories", salary: 450 + "$", productId: 50 },
        { image: "images/electronics/mobiles & tablets.jpg", desc: "Mobiles & Tablets", salary: 450 + "$", productId: 50 },
        { image: "images/electronics/televesion.jpg", desc: "Televesion", salary: 450 + "$", productId: 50 }
    ];

    let electronicsProducts = document.querySelectorAll(".electronics .product");

    electronicsProducts.forEach(function (item) {
        let random = Math.floor(Math.random() * electronicsObject.length);
        let image = item.getElementsByTagName('img');
        let desc = item.getElementsByTagName('p');
        let salary = item.getElementsByTagName('h4');
        // let productId = item.getElementsByTagName('span');
        image[0].src = electronicsObject[random].image;
        desc[0].innerText = electronicsObject[random].desc;
        salary[0].innerText = electronicsObject[random].salary;
        // productId[0].innerText = electronicsObject[random].productId;

    });

    let perfumObject = [
        { image: "images/perfum/body splash.jpg", desc: "Body Splash", salary: 250 + "$", productId: 10 },
        { image: "images/perfum/budjet perfumes.jpg", desc: "Budjet Perfumes", salary: 300 + "$", productId: 20 },
        { image: "images/perfum/for her.jpg", desc: "For Her", salary: 350 + "$", productId: 30 },
        { image: "images/perfum/for him.jpg", desc: "For Him", salary: 400 + "$", productId: 40 },
        { image: "images/perfum/gift sets.jpg", desc: "Gift Sets", salary: 450 + "$", productId: 50 },
        { image: "images/perfum/unisex.jpg", desc: "Unisex", salary: 450 + "$", productId: 50 }
    ];

    let perfumProducts = document.querySelectorAll(".perfum .product");

    perfumProducts.forEach(function (item) {
        let random = Math.floor(Math.random() * perfumObject.length);
        let image = item.getElementsByTagName('img');
        let desc = item.getElementsByTagName('p');
        let salary = item.getElementsByTagName('h4');
        // let productId = item.getElementsByTagName('span');
        image[0].src = perfumObject[random].image;
        desc[0].innerText = perfumObject[random].desc;
        salary[0].innerText = perfumObject[random].salary;
        // productId[0].innerText = perfumObject[random].productId;

    });

    let kitchenObject = [
        { image: "images/kitchen/baking-delights-en.png", desc: "Baking Delights", salary: 250 + "$", productId: 10 },
        { image: "images/kitchen/breakfast-essentials-en.png", desc: "Breakfast Essentials", salary: 300 + "$", productId: 20 },
        { image: "images/kitchen/cooking-essentials-en.png", desc: "Cooking Essentials", salary: 350 + "$", productId: 30 },
        { image: "images/kitchen/dinnerware-en.png", desc: "Dinnerware", salary: 400 + "$", productId: 40 },
        { image: "images/kitchen/food-prep-en.png", desc: "Food Prep", salary: 450 + "$", productId: 50 },
        { image: "images/kitchen/juicers-blenders-en.png", desc: "Juicers Blenders", salary: 450 + "$", productId: 50 },
        { image: "images/kitchen/kitchen-gadgets-en.png", desc: "Kitchen Gadgets", salary: 450 + "$", productId: 50 },
        { image: "images/kitchen/pressure-cooker-en.png", desc: "Pressure Cooker", salary: 450 + "$", productId: 50 },
        { image: "images/kitchen/serveware-en.png", desc: "Serveware", salary: 450 + "$", productId: 50 }
    ];

    let kitchenProducts = document.querySelectorAll(".kitchen .product");

    kitchenProducts.forEach(function (item) {
        let random = Math.floor(Math.random() * kitchenObject.length);
        let image = item.getElementsByTagName('img');
        let desc = item.getElementsByTagName('p');
        let salary = item.getElementsByTagName('h4');
        // let productId = item.getElementsByTagName('span');
        image[0].src = kitchenObject[random].image;
        desc[0].innerText = kitchenObject[random].desc;
        salary[0].innerText = kitchenObject[random].salary;
        // productId[0].innerText = kitchenObject[random].productId;

    });
}
// window.onbeforeunload = function () {
//     localStorage.removeItem('email');
//     return '';
// };