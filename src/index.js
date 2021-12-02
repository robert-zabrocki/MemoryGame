/**********************************************************************************************************************
 * 
 *      autor: Robert Zabrocki
 *      data: listopad 2021
 * 
 *      opis: zadaniem skryptu jest realizacja gry Memory Game.
 * 
 *            gra polega na kolejnym odkrywaniu dwóch kart w poszukiwaniu pasującej do siebie pary.
 *            jeżeli wytypowana para kart kryje ten sam obrazek, wówczas zwiększana jest liczba punktów,
 *            a karty są usuwane z planszy. jeżeli wytypowana para kart kryje pod sobą różne obrazki,
 *            wówczas gracz zostaje powiadomiony o braku sukcesu, a karty zostają na powrót odwrócone
 *            "tyłem" do góry.
 * 
 *            zadaniem gracza jest całkowite opróżnienie planszy z kart.
 * 
***********************************************************************************************************************/

        let cardsChosen = [];       // tablica przechowująca nazwy wybranych kart 
        let cardsChosenIds = [];    // tablica przechowująca identyfikatory wybranych kart
        let cardsWon = [];          // tablica przechowująca nazwy par dobrze wybranych kart

        // tablica przechowująca karty używane w grze. w momencie rozpoczęcia rozgrywki zostaną one
        // poukładane na planszy w losowym porządku.
        const cards = [{name: 'fries',        img: 'src/images/fries.png'},   
                       {name: 'cheeseburger', img: 'src/images/cheeseburger.png'},
                       {name: 'ice-cream',    img: 'src/images/ice-cream.png'},
                       {name: 'pizza',        img: 'src/images/pizza.png'},
                       {name: 'milkshake',    img: 'src/images/milkshake.png'},
                       {name: 'hotdog',       img: 'src/images/hotdog.png'},
                       {name: 'fries',        img: 'src/images/fries.png'},   
                       {name: 'cheeseburger', img: 'src/images/cheeseburger.png'},
                       {name: 'ice-cream',    img: 'src/images/ice-cream.png'},
                       {name: 'pizza',        img: 'src/images/pizza.png'},
                       {name: 'milkshake',    img: 'src/images/milkshake.png'},
                       {name: 'hotdog',       img: 'src/images/hotdog.png'}]

        const grid = document.querySelector('.grid');           // uchwyt do pola przechowująceglo planszę
        const resDisplay = document.querySelector('.result');   // uchwyt do pola przechowującego wynik rozgrywki
        


        /**************************************************************************************************************
         * 
         *      autor: Robert Zabrocki
         *      data: listopad 2021
         * 
         *      opis: zadaniem funkcji jest przygotowanie planszy do gry. w tym celu należy:
         *            1. wytworzyć dwanaście elementów <img> reprezentujących pola gry
         *            2. nadać im początkowy atrybut 'src' wyglądający jak "tył" odwróconej karty
         *            3. nadać im atrybut 'data-id' pełniący funkcję identyfikatora karty
         *            4. dodać obsługę zdarzenia 'click' zapewniając reakcję na kliknięcie przyciskiem myszy
         * 
        ***************************************************************************************************************/

                function createBoard() {

                    for (let i = 0; i < cards.length; i++) {

                        const card = document.createElement('img');         // wytworzenie nowego elementu <img>

                        card.setAttribute('src', 'src/images/blank.png');   // określenie atrybutu 'src'
                        card.setAttribute('data-id', i);                    // nadanie identyfikatora
                        card.addEventListener('click', flipCard)            // dodanie obsługi zdarzenia 'click'

                        grid.appendChild(card);                             // dodanie elementu <img> do planszy
                    }
                }



        /**************************************************************************************************************
         * 
         *      autor: Robert Zabrocki
         *      data: listopad 2021
         * 
         *      opis: procedura obsługi zdarzenia 'click' poszczególnych kart. w zdarzeniu:
         *            1. do tablicy przechowującej nazwy wybranych kart wprowadzana jest nazwa właśnie
         *               wybranej karty
         *            2. do tablicy przechowującej identyfikatory wybranych kart wprowadzany jest identyfikator
         *               właśnie wybranej karty
         *            3. atrybut 'src' klikniętego elementu zmieniany jest na obraz z tablicy "cards". w ten sposób
         *               uzyskiwany jest efekt odwrócenia katy właściwą stroną do góry
         *            4. jeżeli do tablicy nazw wytypowanych kart dodany został drugi element, wówczas (z opóźnieniem
         *               500ms) uruchamiana jest procedura sprawdzenia czy karty są identyczne  
         * 
        ***************************************************************************************************************/

                function flipCard() {

                    let cardId = this.getAttribute('data-id');      // pobranie identyfikatora wybranej karty

                    cardsChosen.push(cards[cardId].name);           // zapamiętanie nazwy wybranej karty
                    cardsChosenIds.push(cardId);                    // zapamiętanie identyfikatora wybranej karty
                    this.setAttribute('src', cards[cardId].img);    // wprowadzenie właściwego obrazka 

                    if (cardsChosen.length === 2) {
                        // wybrano dwie karty. po 500ms uruchomiona zostanie procedura sprawdzenia dopasowania
                        setTimeout(checkForMatch, 500)
                    }
                }



        /**************************************************************************************************************
         * 
         *      autor: Robert Zabrocki
         *      data: listopad 2021
         * 
         *      opis: procedura sprawdzenia dopasowania dwóch wybranych kart. 
         *            1. jeżeli identyfikatory obu kart są takie same, wówczas do gracza wysyłana jest informacja o
         *               kliknięciu dwa razy w tę samą kartę. jednocześnie obie karty odwracane są "tyłem" do góry
         *            2. jeżeli nazwy obu kart są takie same, wówczas do gracza wysyłana jest informacja o poprawnym
         *               dopasowaniu. jednocześnie obie karty usuwane są z planszy. tablica przechowująca nazwy
         *               dobrze dopasowanych par rozszerzana jest o nazwy wybranych kart, a licznik punktów
         *               powiększany jest o jeden
         *            3. jeżeli nie zachodzi sytuacja 1. ani 2. wówczas do gracza wysyłana jest informacja o błędnym
         *               dopasowaniu. jednocześnie obie karty odwracane są "tyłem" do góry
         *            4. jeżeli tablica dobrze dopasowanych par zawiera sześć elementów do gracza wysyłana jest
         *               informacja o pomyślnym zakończeniu gry
        ***************************************************************************************************************/

                function checkForMatch() {

                    const cardss = document.querySelectorAll('img');    // pobranie zbioru wszystkich kart
                    const optionOneId = cardsChosenIds[0];              // identyfikator karty wybranej jako piewrsza
                    const optionTwoId = cardsChosenIds[1];              // identyfikator karty wybranej jako druga

                    if (optionOneId === optionTwoId) {
                        // identyfikatory kart są takie same => dwa razy kliknięto w tę samą kartę
                        alert('You have clicked the same image !');                         // wysłanie informacji do gracza
                        cardss[optionOneId].setAttribute('src', 'src/images/blank.png');    // odwrócenie karty "tyłem" do góry
                        cardss[optionTwoId].setAttribute('src', 'src/images/blank.png');    // odwrócenie karty "tyłem" do góry

                    } else if (cardsChosen[0] === cardsChosen[1]) {
                        // nazwy kart są takie same => jest poprawne dopasowanie
                        alert('You have found a match !');                                  // wysłanie informacji do gracza
                        cardss[optionOneId].setAttribute('src', 'src/images/white.png');    // usunięcie karty z planszy
                        cardss[optionTwoId].setAttribute('src', 'src/images/white.png');    // usunięcie karty z planszy
                        cardss[optionOneId].removeEventListener('click', flipCard);         // usunięcie obsługi zdarzenia 'click'
                        cardss[optionTwoId].removeEventListener('click', flipCard);         // usunięcie obsługi zdarzenia 'click'

                        cardsWon.push(cardsChosen);

                    } else {
                        // ani identyfikatory, ani nazwy kart nie są takie same => brak dopasowania
                        alert('Sorry, try again.');                                         // wysłanie informacji do gracza
                        cardss[optionOneId].setAttribute('src', 'src/images/blank.png');    // odwrócenie karty "tyłem" do góry
                        cardss[optionTwoId].setAttribute('src', 'src/images/blank.png');    // odwrócenie karty "tyłem" do góry
                    }

                    cardsChosen = [];
                    cardsChosenIds = [];

                    resDisplay.textContent = ' ' + cardsWon.length;           // uaktualnienie punktacji
                    if (cardsWon.length === 6) {
                        // wytypowano poprawnie sześć par => zwycięstwo !!!
                        resDisplay.textContent = ' You have won !'; 
                    }

                }



/**********************************************************************************************************************
 * 
 *      autor: Robert Zabrocki
 *      data: listopad 2021
 * 
 *      opis: rozpoczęcie działania programu. w pierwszej kolejności następuje losowe rozmieszczenie kart
 *            na planszy. następnie wywoływana jest procedura inicjująca wszystkie elementy niezbędne
 *            do gry.
 * 
***********************************************************************************************************************/

        cards.sort(() => 0.5 - Math.random());
        createBoard();