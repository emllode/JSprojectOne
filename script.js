



/* Skapat en funktion som förlänger texten genom att btnText trycks.
 Detta sker genom att moreText syns då. Löste detta genom ett if/else statement.
 Själva statement tittar och ser ifall display: none är aktiv, om det är det så kommer endast "..." synas
 samt read-more knappen med "more" texten som är osynlig. Ifall man då trycker på knappen sätts else-statemtn
 igång. Där dots försvinner, texten syns genom "inline" samt ny knapp.

 DEBUGGING:
Jag har även fixat så varje "card" har sin egen data-blog och detta är för kringå så inte alla
 cards öppnas samtidigt vilket jag fick innan då jag endast sa att ifall man trycker read-more knappen 
 så skall card klassen öppnas. Detta ledde till att alla korten i raden öppnades även om jag bara tryckte
 på ena kortet.

 
 - > TODO: vill lösa så varje nytt inlägg genererar en egen "data-blog" kod som då knappen kan hänvisas till.
 Troligtvis behöver jag skapa någon loop som hostar ut en ny siffra eller något till varje data-blog + 
 onclick-event.


*/

function readMore(blog) {
    let dots = document.querySelector(`.card[data-blog="${blog}"] .dots`);
    let moreText = document.querySelector(`.card[data-blog="${blog}"] .more`);
    let btnText = document.querySelector(`.card[data-blog="${blog}"] .myBtn`);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.textContent = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.textContent = "Read less";
        moreText.style.display = "inline";

    }
}




/* Här har jag skapat ett event som skapar ett nyt blogginlägg. Detta gjordes genom att funktionen tar info
från input-boxarna och genererar ny kod som är en kopia av mina befintliga blogginlägg,
 så får samma SASS-struktur.
 */

let blogPosts =  document.querySelector(".blogPosts__items");
let addHeader = document.querySelector(".addHeader");
let addText = document.querySelector(".addText");
let addPostBtn = document.querySelector(".addPostBtn");

addPostBtn.addEventListener('click', function() {
    //skapade ett nytt "kort" som tar in elementet paragraf.
    let newDiv = document.createElement('div');
    let newHeader = document.createElement('h2');
    let newCard = document.createElement('p');
    let newEditBtn = document.createElement('button');

    //Gjorde så den input som användaren skrev i inputen hamnar i newcardContent.
    let newCardHeader = document.createTextNode(addHeader.value);
    let newCardContent = document.createTextNode(addText.value);
    let newEditBtnContent = document.createTextNode("Edit");

    //lägga in input från användaren i kort-taggen.
    newCard.appendChild(newCardContent);
    newHeader.appendChild(newCardHeader);
    newEditBtn.appendChild(newEditBtnContent);

    newCard.className = "text";


    //appendar in varje element in i div taggen.
    newDiv.appendChild(newHeader);
    newDiv.appendChild(newCard);
    newDiv.appendChild(newEditBtn);

    //Skapar class namn till min div som skapas, detta för den skall ärva all SASS info.
    newDiv.className = "card";


    /*lägga till denna tag som har all info ovan inuti sig i hemsidan efter att man
     trycker på post knappen. */
     blogPosts.prepend(newDiv);

});




 //Löste en if/esle med eventlistener som invänar edit-knappen och således kan man edit sitt inlägg.
 // DOCK endast en gång och sedan vill det inte upprepas. 
 function editMore(blog) {
     
    let btnEdit = document.querySelector(`.card[data-blog="${blog}"] .editBtn`);
    let span = document.querySelector(`.card[data-blog="${blog}"] p`);

    if(text.contentEditable = "false"){
      
        btnEdit.addEventListener('click', function(){
            btnEdit.textContent = "Save Changes";
            //span = document.getElementById("text");
            span.contentEditable = "true";

            btnEdit.addEventListener('click', function(){
                btnEdit.textContent = "edit";
                span.contentEditable = "false";
            })
    
        })

    }

    else {

        btnEdit.addEventListener('click', function(){
            btnEdit.textContent = "edit";
            //span = document.getElementById("text");
            span.contentEditable = "false";

            btnEdit.addEventListener('click', function(){
                btnEdit.textContent = "save changes";
                span.contentEditable = "true";
            })
    
        })

    }



 }