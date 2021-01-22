/* 
Jag använde debuggern genom chrome där jag skrev console.log(X) i consolen som man får upp genom inspektera
sidan detta var för att se ifall document.querySelector funkade för varje identifier när problem uppstod, 
använde Console.log som en check så allt faktiskt kommunicera korrekt.

Använde även breakpoints för att lösa problem som uppstod, genom att kolla rad för rad vad som hände, var
på detta sätt jag löste mitt edit knapp problem som kan läsas nedan och hitta problemet.

Använde även sources - > javaScript för att se ifall eventListener funkade, då man kan se i realtid när man 
trycke på ett event att man faktikst ser en förändring. I Detta fall så kollade jag på contentEditable
faktiskt förändrades när jag tryckte på edit knappen.


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
Jag har även fixat så varje "card" har sin egen data-blog och detta är för kringå så inte alla
 cards öppnas samtidigt vilket jag fick innan då jag endast sa att ifall man trycker read-more knappen 
 så skall card klassen öppnas. Detta ledde till att alla korten i raden öppnades även om jag bara tryckte
 på ena kortet.

 


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

  - > TODO: vill lösa så varje nytt inlägg genererar en egen "data-blog" kod som då knappen kan hänvisas till.
 Troligtvis behöver jag skapa någon loop som hostar ut en ny siffra eller något till varje data-blog + 
 onclick-event, så att varje nytt inlägg får en edit/save knapp.

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

    /* Har lagt in contentEidtable = true så varje nytt inlägg kan redigeras, tills jag löst med edit knappen
     så får detta var mina lösning. */
    newCard.contentEditable ="true";

    //Gjorde så den input som användaren skrev i inputen hamnar i newcardContent.
    let newCardHeader = document.createTextNode(addHeader.value);
    let newCardContent = document.createTextNode(addText.value);
    let newEditBtnContent = document.createTextNode("du kan redigera utan knappen..");

    //lägga in input från användaren i kort-taggen.
    newCard.appendChild(newCardContent);
    newHeader.appendChild(newCardHeader);
    newEditBtn.appendChild(newEditBtnContent);

    //skapar klassnamn
    newCard.className = "text";
    newEditBtn.className ="editBtn";

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


/* Skapat 2 funktioner som togglar 2 knappar edit/save. */



function editMore(blog) {
     
    let btnEdit = document.querySelector(`.card[data-blog="${blog}"] .editBtn`);
    let span = document.querySelector(`.card[data-blog="${blog}"] p`);
    let btnSave = document.querySelector(`.card[data-blog="${blog}"] .saveBtn`);
    
    if(text.contentEditable = "false"){
      
        btnEdit.addEventListener('click', function(){
            span.contentEditable = "true";
            btnSave.style.display ="inline";
            btnEdit.style.display ="none";
 
        })     
    }
    else { 
        return;
    }
}


    function saveMore(blog) {
     
    let btnSave = document.querySelector(`.card[data-blog="${blog}"] .saveBtn`);
    let span = document.querySelector(`.card[data-blog="${blog}"] p`);
    let btnEdit = document.querySelector(`.card[data-blog="${blog}"] .editBtn`);
    
    if(text.contentEditable = "true"){
      
        btnSave.addEventListener('click', function(){;
            span.contentEditable = "false";
            btnSave.style.display="none";
            btnEdit.style.display ="inline";
            
        })     
    }
    else { 
        return;
        
    }
}




