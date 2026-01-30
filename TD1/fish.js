var A_fish = {} ; 
var I_val_min = -10;
var I_val_max = 40;
for (let I_index = 0 ; I_index < 20 ; I_index++){
	A_fish[I_index] = Math.floor(Math.random() * (I_val_max - I_val_min) + I_val_min);
}

function check_color(){
    let I_value = A_fish[I_caramel];
    if (I_value <= 0){
        O_element.setAttribute("class", "un");
        O_element2.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
    }
    else if (I_value <= 20){
        O_element.setAttribute("class", "deux");
        O_element2.textContent = "ㅤ";
    }
    else if (I_value <= 30){
        O_element.setAttribute("class", "tres");
        O_element2.textContent = "ㅤ";
    }
    else if (I_value <= 40){
        O_element.setAttribute("class", "four");
        O_element2.textContent = "Caliente ! Vamos a la playa, ho hoho hoho !!";
    }
}

let O_element = document.getElementById("case");
var I_caramel = 0;
let O_element2 = document.getElementById("funny_sentence");

function change_value(){
    O_element.textContent = A_fish[I_caramel];
    check_color();
    I_caramel = (I_caramel + 1) % 20;
}

setInterval(change_value, 2000);