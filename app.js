const loginBtn = document.querySelector("#input_submit");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginWindow = document.querySelector(".loginWindow");
const wrong = document.querySelector("#wrong");
const weather = document.querySelector(".weather");
const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input_part"),
infoTxt = document.querySelector(".info_txt"),
inputField = document.querySelector("#city_name"),
location_btn = document.querySelector("#location_btn"),
wIcon = document.querySelector(".weather-part img"),
backIcon = document.querySelector("#backIcon");

loginBtn.addEventListener("click",()=>{
    if(username.value == "arifcan_gunes" && password.value == "12345"){

        loginWindow.classList.add("hide");
        weather.classList.remove("hide");
        let api;
        inputField.addEventListener("keyup",(e)=>{
            if(e.key == "Enter" && inputField.value != ""){
                requestApi(inputField.value);
            }
        })


        location_btn.addEventListener("click",()=>{
            if(navigator.geolocation){
                infoTxt.innerText = "Weather results are preparing...";
                infoTxt.classList.add("pending");
                navigator.geolocation.getCurrentPosition(onSuccess, onError)
            }
            else{
                console.log("Tarayıcınız konumu desteklemiyor.")
            }
        })

        function onSuccess(poisition){
            const lon = poisition.coords.longitude;
            const lat = poisition.coords.latitude;

            api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=93e8fe0cf20cd98d3ffb5b8c4c35d4d2`;

            fetchData();
        }

        function onError(err){
            infoTxt.innerText = err.message;;
            infoTxt.classList.add("error");
        }

        function requestApi(city){
            api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=93e8fe0cf20cd98d3ffb5b8c4c35d4d2`;

            fetchData();
        }

        function fetchData(){
            infoTxt.innerText = "Weather results are preparing...";
            infoTxt.classList.add("pending");

            fetch(api)
                .then((response) =>{
                    return response.json()
                })
                .then((data)=>{
                    weatherDetails(data);
                })
        }

        function weatherDetails(info){
            if(info.cod == "404"){
                infoTxt.innerText = `${inputField.value.toUpperCase()} city is not found.`;
                infoTxt.classList.replace("pending","error");
            }
            else{
                const city = info.name;
                const country = info.sys.country
                const desription = info.weather[0].main;
                const id = info.weather[0].id;
                const {feels_like, humidity, temp} = info.main ;

                wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
                wrapper.querySelector(".weather-details").innerText = desription ;
                wrapper.querySelector(".location").innerText = `${city} , ${country}` ;
                wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
                wrapper.querySelector(".humidity span").innerText = `${humidity}% ` ;

                if(id == 800){
                    wIcon.src = "/images:icons/clear.svg";
                }
                else if(id >= 200 && id <= 232){
                    wIcon.src = "/images:icons/storm.svg";
                }
                else if(id >= 600 && id <= 622){
                    wIcon.src = "/images:icons/snow.svg";
                }
                else if(id >= 701 && id <= 781){
                    wIcon.src = "/images:icons/haze.svg";
                }
                else if(id >= 801 && id <= 804){
                    wIcon.src = "/images:icons/cloud.svg";
                }
                else if(id >= 300 && id <= 321 || (id >= 500 && id <= 531) ){
                    wIcon.src = "/images:icons/rain.svg";
                }
                console.log(id);

                console.log(info);

                infoTxt.classList.remove("pending","error");
                wrapper.classList.add("active");
            }
        }

        backIcon.addEventListener("click",()=>{
            wrapper.classList.remove("active");
        })

    }

    else{
        wrong.innerText = "Username or password is wrong."
    }
})




