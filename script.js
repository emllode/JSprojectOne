/* 
Jag använde debuggern genom chrome där jag skrev console.log(X) i consolen som man får upp genom inspektera
sidan detta var för att se ifall document.querySelector funkade för varje identifier när problem uppstod, 
använde Console.log som en check så allt faktiskt kommunicera korrekt.

Använde även breakpoints för att lösa problem som uppstod, genom att kolla rad för rad vad som hände, var
på detta sätt jag löste mitt edit knapp problem som kan läsas nedan och hitta problemet.

Använde även sources - > javaScript för att se ifall eventListener funkade, då man kan se i realtid när man 
trycke på ett event att man faktikst ser en förändring. I Detta fall så kollade jag på contentEditable
faktiskt förändrades när jag tryckte på edit knappen.

Utöver detta så har jag börjat använda "watch"-funktionen i andra program för att t.ex ta reda på positionering
i fjärils-projektet som vi hade i föregående föreläsning och anpassa lösningen utefter vad värdet ges.


--
DEBUG PROBLEM MED EDIT KNAPP
Suttit flera timmar nu med lösa så edit-knappen kan upprepas, och inte bara fungera en gång. Än så länge har
jag lagt breakpoints i den delen av koden och det fick mig tyda att någonstans i den andra eventListener
(när jag skall återgå till normal-läge) så verkar inte inte upppfatta att den ska lämna funktionen.

Valde att lösa dett genom skapa ytterligare en funktion för när contentEditable="true" och således dyker en 
ny knapp upp som är "save", detta var då jag tänkte att problemet låg i att jag hadde flera inclick events
i en if/else samt functions. Bröt ner problemet och tog isär problemet i två delar istället, och jag tog
isär problemet där breakpointen började att loopa av sig själv.

--


/* Skapat en funktion som förlänger texten genom att btnText trycks.
 Detta sker genom att moreText syns då. Löste detta genom ett if/else statement.
 Själva statement tittar och ser ifall display: none är aktiv, om det är det så kommer endast "..." synas
 samt read-more knappen med "more" texten som är osynlig. Ifall man då trycker på knappen sätts else-statemtn
 igång. Där dots försvinner, texten syns genom "inline" samt ny knapp.

 DEBUGGING:
Jag har även fixat så varje "card" har sin egen data-blog id och detta är för kringå så inte alla
 cards öppnas samtidigt vilket jag fick innan då jag endast sa att ifall man trycker read-more knappen 
 så skall card klassen öppnas. Detta ledde till att alla korten i raden öppnades även om jag bara tryckte
 på ena kortet.

 problemeet här är att jag behöver skriva ut en loop som kostar ut ett nytt "id" till varje nytt inlägg.

 


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




/* Här har jag skapat ett event som skapar ett nytt blogginlägg. Detta gjordes genom att funktionen tar info
från input-boxarna och genererar ny kod som är en kopia av mina befintliga blogginlägg,
 så får det samma SASS-struktur då .scss koden är detsamma då den går efter class-namnen.

har även löst så att ett nytt genererad attribut "data-blog" skapas samt att edit/save 
knapparna funkar genom detta. Idéen först var att skapa en slags loop som hostar ut
en ny siffra men bara lättare att de namn som ett nummer tagit ur getTime, och kör med
en halv sekund då en användare inte bör kunna skapa ett nytt inlägg fortare än så.

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
    let saveButton = document.createElement('button');
    let readMore = document.createElement('button');
    

    //nytt genererat data blog id
    let newPost =  ((new Date()).getTime()/500);

    /* Har lagt in contentEidtable = true så varje nytt inlägg kan redigeras, tills jag löst med edit knappen
     så får detta var mina lösning. */
    newCard.contentEditable ="false";

    //Gjorde så den input som användaren skrev i inputen hamnar i newcardContent.
    let newCardHeader = document.createTextNode(addHeader.value);
    let newCardContent = document.createTextNode(addText.value);
    let newEditBtnContent = document.createTextNode("edit");
    let newSaveButton = document.createTextNode("save");
  


    //lägga in input diverse inputs både från användare + egna
    newCard.appendChild(newCardContent);
    newHeader.appendChild(newCardHeader); 
    newEditBtn.appendChild(newEditBtnContent);
    saveButton.appendChild(newSaveButton);


    //skapar klassnamn
    newCard.className = "text";
    newEditBtn.className ="editBtn";
    saveButton.className ="saveBtn"


    //Skapar onclick eventet för edit/save. 
   newEditBtn.onclick = function() { editMore(newPost)};
   saveButton.onclick = function() { saveMore(newPost)};

  
    

    //appendar in varje element in i div taggen.
    newDiv.appendChild(newHeader);
    newDiv.appendChild(newCard);
    newDiv.appendChild(newEditBtn);
    newDiv.appendChild(saveButton);

    //Skapar class namn till min div som skapas, detta för den skall ärva all SASS info.
    newDiv.className = "card";   
    newDiv.setAttribute('data-blog' , newPost);

    /*lägga till denna tag som har all info ovan inuti sig i hemsidan efter att man
     trycker på post knappen. */
     blogPosts.prepend(newDiv); 

});


/* Skapat 2 funktioner som togglar 2 knappar edit/save. - > Detta möjligggör att jag sätter igång/av 
contentEditable, som möjliggör redigering av texten. Utöver detta så sköter även koden så att rätt knapp
dyker upp.

Försökte först skapa en function med samma struktur som nedan men jag hade ytterligare en eventListener
inuti if statement, problemet som uppstod då var att jag endast kunde redigera 1 gång, försökte lösa detta
genom att bryta ut den i else statement istället men då funka det inte alls. Valde då att bara skapa 
två funktioner, och en till knapp som skulle "togglas" beroende på eventet. 

Tankar/förbättrningar: känns sjukt onödigt att ha två funktioner, måste hitta lösning runt det. Känns 
som att en bool if/else bör räcka, men har misslyckats än så länge med göra någon slags if/else eller bool.
*/



function editMore(blog) {
     
    let btnEdit = document.querySelector(`.card[data-blog="${blog}"] .editBtn`);
    let span = document.querySelector(`.card[data-blog="${blog}"] p`);
    let btnSave = document.querySelector(`.card[data-blog="${blog}"] .saveBtn`);
    
 
      
        btnEdit.addEventListener('click', function(){

            if(text.contentEditable = "false"){
            span.contentEditable = "true";
            btnSave.style.display ="inline";
            btnEdit.style.display ="none";
            }

            else {
                return;
            }
       
    })

}


function saveMore(blog) {
     
    let btnSave = document.querySelector(`.card[data-blog="${blog}"] .saveBtn`);
    let span = document.querySelector(`.card[data-blog="${blog}"] p`);
    let btnEdit = document.querySelector(`.card[data-blog="${blog}"] .editBtn`);

      
        btnSave.addEventListener('click', function(){
         if(text.contentEditable = "true"){
            span.contentEditable = "false";
            btnSave.style.display="none";
            btnEdit.style.display ="inline";      
        } 
        else { 
            return;
                
        }   
    })
 
}




