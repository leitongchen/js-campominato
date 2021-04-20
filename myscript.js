/* Il computer deve generare 16 numeri casuali tra 1 e 100.
I numeri non possono essere duplicati.
In seguito deve chiedere all’utente (100 - 16) volte di inserire
un numero alla volta, sempre compreso tra 1 e 100.
L’utente non può inserire più volte lo stesso numero.
Se il numero è presente nella lista dei numeri generati, la partita termina, 
altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” 
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha inserito un numero consentito.
*/

//Immediately invoked function Expression 
//per non avere var globali
(function () {

    //variabili globali
    var minNumber = 1;
    var maxNumber = 100;
    var aiNumbersLength = 16;

    var arrayNumbers = [];
    var userArrayNumbers = [];
    // chiedere i numeri all'utente tramite prompt
    // x volte - x è la differenza tra valore "maxNumber" e "aiNumbersLength"
    // Cntrollare che il numero inserito sia un numero valido e che non sia stato ancora usato. 
    // non deve essere min di "minNumber" o maggiore di "maxNumber"
    // Deve anche controllare che il numero non esista all'interno dell'array "arrayNumbers"
    function askUserNumbers() {
        var userLengthMax = (maxNumber - minNumber) - aiNumbersLength;

        var gameOver = false;
        // Finché la length dei num inseriti è minore della length max di numeri che l'utente può inserire, continuo a chiedere all'utente di inserire un numero tramite prompt
        while (userArrayNumbers.length <= userLengthMax && !gameOver) {
            var userNumber = prompt("Inserisci un numero tra " + minNumber + " e " + maxNumber + " . (" + userArrayNumbers.length + ")");

            if (userNumber === null) {
                gameOver = true;
            }

            if (userArrayNumbers.length === userLengthMax) {

                gameOver = true;

                alert("Hai vinto!")
            }

            /* 
            - Se il valore è valido ritorna TRUE 
            - Se il valore non è valido bisogna reinserire
            - Se il valore non è valido perché è mina, ritorna "game over"
            */
            var inputIsValid = checkUserInput(userNumber);


            if (!inputIsValid && inputIsValid !== "game over") {

                alert("Numero inserito non valido")
            } else if (inputIsValid === "game over") {

                gameOver = true;

                alert("Hai perso. Hai giocato " + userArrayNumbers.length + " numeri.");

                console.log("Ultimo numero inserito " + userNumber);
            } else {
                userArrayNumbers.push(parseInt(userNumber));

                console.log(userArrayNumbers)
            }


        }
    }

    /* deve controllare se :
    - il valore è un numero reale
    - il num NON è minore di minNum
    - il num NON è maggiore di maxNum
    - il num non sia già stato usato dall'utente
    */
    function checkUserInput(userInputHere) {
        var result = true;
        var numberToCheck = parseInt(userInputHere);

        if (Number.isNaN(numberToCheck)) {
            return false;
        }
        if (numberToCheck < minNumber || numberToCheck > maxNumber) {
            return false;
        }
        if (userArrayNumbers.indexOf(numberToCheck) > -1) {
            return false;
        }
        if (arrayNumbers.indexOf(numberToCheck) > -1) {
            return "game over";
        }
        return result;
    }

    //funzione che salva num random di AI
    function createAiNumbers() {

        while (arrayNumbers.length < aiNumbersLength) {

            var randomNumber = randomNumGen(minNumber, maxNumber);

            if (arrayNumbers.indexOf(randomNumber === -1)) {

                arrayNumbers.push(randomNumber);
            }
        }

        /* do {
            var randomNumber = randomNumGen(minNumber, maxNumber);

            if (arrayNumbers.indexOf(randomNumber === -1)) {

                arrayNumbers.push(randomNumber);
            }
        } while (arrayNumbers.length < aiNumbersLength); */

        console.log(arrayNumbers);
    }

    // num min 1 - num max 100
    function randomNumGen(min, max) {

        return Math.floor(Math.random() * (max - min)) + min;
    }



    createAiNumbers();
    askUserNumbers();
})();


