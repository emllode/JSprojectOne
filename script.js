
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



let blogPosts =  document.querySelector(".blogPosts");
let addText = document.querySelector(".addText");
let addPostBtn = document.querySelector(".addPostBtn");


addPostBtn.addEventListener('click', function() {
    //skapade ett nytt "kort" som tar in elementet paragraf. 
    let newCard = document.createElement('p');
    //Gjorde så den input som användaren skrev i inputen hamnar i newcardContent.
    let newCardContent = document.createTextNode(addText.value);

    //lägga in input från användaren i taggen jag skapat ovan.
    newCard.appendChild(newCardContent);

    /*lägga till denna tag som har all info ovan inuti sig i hemsidan efter att man
     trycker på knappen */
    blogPosts.appendChild(newCard);

    //TODO: Behöver nu göra så den skapar samma design som mina inlägg med rubrik + paragraf
    //TODO: samt samma layout som de har. 
    
});

