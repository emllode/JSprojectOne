
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

    
});

/*
Klick event som sätter igång edit knappen.
Därefter säger jag åt den att komma åt klassen text som är <p> taggen. därefter säga "okej"
du kan nu redigera texten. Inuti denna skapade jag ytterligare ett klick event för att avsluta
detta. genom att säga "false".

TODO: Måste fixa så man kan redigera varje enskild card, just nu funkar nedast id, som jagt lagt över hela
TODO: över hela blogposts_items.....
*/

 let editBtn = document.querySelector(".editBtn");
  editBtn.addEventListener('click', function(){
      span = document.getElementById("text");
      span.contentEditable = "true";

    
      editBtn.addEventListener('click', function(){
         span = document.getElementById("text");
         span.contentEditable = "false";
     })
    
  })



/*  //Kod som jag försöker få fungera, att varje enskild inlägg kan redigeras genom dens egna knapp
 function editMore(blog) {   
    let btnEdit = document.querySelector(`.card[data-blog="${blog}"] .editBtn`);
    //span = document.getElementById("text");
    span = document.querySelector(`.card[data-blog="${blog}"] .text`);
    
    if(true){
        btnEdit.addEventListener('click', function(){
            span = document.getElementById("text");
            span.contentEditable = "true";
        })
    
    }
    else {
            span.contentEditable = "false";
        }

}
*/
