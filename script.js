
/* Skapat en funktion som förlänger texten genom att mybtn trycks.
 Detta sker genom att moretext syns då, genom moretext.style.display = "inline".
 Det är inline som styr vad som syns och inte syns, t.ex. försvinner "..." där man visar mer text.
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