
/* Skapat en funktion som förlänger texten genom att btnText trycks.
 Detta sker genom att moretext syns då, genom .X.style.display = "inline".
 Det är inline som styr vad som syns och inte syns, t.ex. försvinner dots där man visar mer text
 och viceversa.

 Jag har även fixat så varje "card" har sin egen data-blog och detta är för kringå så inte alla
 cards öppnas samtidigt vilket jag fick innan, då de tillhörde samma div.
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


/*  TODO:
    Ska skapa edit-tool som möjliggör så usern kan ta in egen input och spara i varje inlägg.
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
    

    //appendar in varje element in i div taggen.
    newDiv.appendChild(newHeader);
    newDiv.appendChild(newCard);
    newDiv.appendChild(newEditBtn);

    //Skapar class namn till min div som skapas. 
    newDiv.className = "card";
    

    /*lägga till denna tag som har all info ovan inuti sig i hemsidan efter att man
     trycker på post knappen. */
     blogPosts.prepend(newDiv);

     
    
    //TODO: Behöver nu göra så den skapar samma design som mina inlägg med rubrik + paragraf
    //TODO: samt samma layout som de har. 
    
});

/* TODO: Löst så att man kan redigera texten när man trycker på edit knappen, dock kan man då
hela tiden redigera utan att trycka på nytt så behöver skapa ett sätt där den "avslutas/sparas"
när man trycker på edit knappen eller en ny knapp som är "done editing" */


 let editBtn = document.querySelector(".editBtn");


 editBtn.addEventListener('click', function(){
     span = document.getElementById("text");
     span.contentEditable = "true";
    
 })


 

