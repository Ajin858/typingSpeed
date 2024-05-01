const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

let timer = 0;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "He swore he just saw his sushi move.",
    "The white water rafting trip was suddenly halted by the unexpected brick wall.",
    "I always dreamed about being stranded on a desert island until it actually happened.",
    "She felt that chill that makes the hairs on the back of your neck when he walked into the room.",
    "He decided that the time had come to be stronger than any of the excuses he'd used until then.",
    "He was an introvert that extroverts seemed to love.",
    "The sunblock was handed to the girl before practice, but the burned skin was proof she did not apply it.",
    "The balloons floated away along with all my hopes and dreams."
  ];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML = '';
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener("click",()=>{input.focus()});
}


function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }
        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex -mistake
    }
    else{
        clearInterval(timer)
        input.value =' '
    }
}

function initTime(){
    if(timeLeft >0){
        timeLeft--;
        time.innerHTML = timeLeft
        const wpmVal = Math.round(((charIndex - mistake) / 5) /(maxTime - timeLeft) * 60)
        wpm.innerText = wpmVal 
    }
    else{
        clearInterval(timer)
    }
}

function reset(){
    loadParagraph()
    clearInterval(timer)
    timeLeft = maxTime;
    time.innerText= timeLeft
    input.value = ''
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0
    cpm.innerText = 0
    mistakes.innerText = 0;
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset)
loadParagraph();