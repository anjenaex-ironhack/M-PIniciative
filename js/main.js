class Participante {

    constructor(nombre, hab, agi) {

        this.nombre = nombre;
        this.hab = hab;
        this.agi = agi;

    }


}


class Turno {

    static _estres = 0;

    participantes = [
        // new Participante('El gran Samir ', 8, 1),
        // new Participante('Santiago Bahamonte ', 9, 2),
        // new Participante('Ignacio ', 7, 1),
        // new Participante('Gonzalo ', 8, 1),
        // new Participante('El judio ', 8, 1),
        // new Participante('enemigo 2 ', 7, 1),
        // new Participante('enemigo 3 ', 7, 1),
        // new Participante('enemigo 4 ', 7, 1),
        // new Participante('enemigo 5 ', 7, 1),
        // new Participante('jefe final ', 10, 2)
    ];
    numeroDeAcciones = [];
    iniciativa = [];


    constructor() {



        this.obtenerParticipaciones();
        this.getIniciativa();


    }

    obtenerParticipaciones() {

        for (let i = 0; i < this.participantes.length; i++) {

            if (this.participantes[i].hab <= 6) {
                this.numeroDeAcciones.push(this.participantes[i].nombre);
            } else if (this.participantes[i].hab == 7 || this.participantes[i].hab == 8) {
                this.numeroDeAcciones.push(this.participantes[i].nombre);
                this.numeroDeAcciones.push(this.participantes[i].nombre);
            } else if (this.participantes[i].hab == 9 || this.participantes[i].hab == 10) {
                this.numeroDeAcciones.push(this.participantes[i].nombre);
                this.numeroDeAcciones.push(this.participantes[i].nombre);
                this.numeroDeAcciones.push(this.participantes[i].nombre);
            } else {
                console.log('hubo un error')
            }
        };

    }

    getIniciativa() {

        function barajar(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        barajar(this.numeroDeAcciones);

        for (let i = 0; i < this.numeroDeAcciones.length - 1; i++) {
            if (this.numeroDeAcciones[i].hab == this.numeroDeAcciones[i + 1].hab && this.numeroDeAcciones[i].agi < this.numeroDeAcciones[i + 1].agi) {
                let memoria = this.numeroDeAcciones[i];
                this.numeroDeAcciones[i] = this.numeroDeAcciones[i + 1];
                this.numeroDeAcciones[i + 1] = memoria;
            };
        }


    }

    deleteCharacter(participante) {
        this.participantes.splice(participante, 1);
        this.numeroDeAcciones = [];
        this.obtenerParticipaciones();
        this.getIniciativa();
    }

    render() {

        let playerList = document.querySelector('#playerList');
        playerList.innerHTML = "";

        this.participantes.forEach(participante => {

            playerList.insertAdjacentHTML('beforeend', `<li><span>${participante.nombre}</span>
                                                        <span>${participante.hab}</span>
                                                        <span>${participante.agi}</span>
                                                        <button class="delete">X</button></li>`);
        });
    }
}

let contadorTurnos = -1;
let turno = new Turno();


$(document).ready(function () {

    const form = document.querySelector("#creationForm");
    let playerList = document.querySelector("#playerList");
    let deleteCharacterList = document.querySelectorAll(".delete");

    turno.render();

    form.addEventListener("submit", event => {
        event.preventDefault();
        let name = document.querySelector("#formName").value;
        let hability = document.querySelector("#formHability").value;
        let agility = document.querySelector("#formAgility").value;
        let character = new Participante(name, hability, agility);
        turno.participantes.push(character);
        turno.numeroDeAcciones = [];
        turno.obtenerParticipaciones();
        playerList.insertAdjacentHTML('beforeend', `<li><span>${name}</span>
                                                        <span>${hability}</span>
                                                        <span>${agility}</span>
                                                        <button class="delete">X</button></li>`);
        
        
    });

    playerList.addEventListener("click", event => {

            deleteCharacterList = document.querySelectorAll(".delete");
            for (let i = 0; i < deleteCharacterList.length; i++) {
                if(event.target.closest("li") == deleteCharacterList[i].closest("li")){
                    turno.deleteCharacter(i);
                }
                // console.log(deleteCharacterList[i].closest("li"))
                // turno.deleteCharacter(i);
            }
            $(event.target).parent('li').remove();
        
    })

    $('#aumentarEstres').click(function () {

        contadorTurnos++;
        document.querySelector("#display").innerHTML = contadorTurnos;

    });

    $('#botonIniciativa').click(function () {

        contadorTurnos++;
        document.querySelector("#display").innerHTML = contadorTurnos;
        //turno = new Turno();
        turno.getIniciativa();

        let iniciativa = document.querySelector('#iniciativa');
        iniciativa.innerHTML = "";
        turno.numeroDeAcciones.forEach(player => {
            iniciativa.insertAdjacentHTML('beforeend', `<li>${player}</li>`);
        })

    });

});
