import {lde} from './lde.js';
import {randomEmoji} from './random-emoji.js';

const inputList = document.querySelectorAll("input");
const particularX = document.querySelector("#particular-x");
const particularY = document.querySelector("#particular-y");
const generalX = document.querySelector("#general-x");
const generalY = document.querySelector("#general-y");

inputList.forEach(
   item => (item.addEventListener('blur', isFilled))
);

// Change name of this function (TO-DO)
function isFilled() {
   let a, b, c;
   a = b = c = 0;
   let counter = 0;
   inputList.forEach((item, index) => {
         let tag = document.querySelector(`.${item.id}-tag`);
         if (item.value != '') {
            counter++;
            // Change Value
            if (index == 0) {
               a = item.value;
               tag.style.color = '#F2FF49';
            } else if (index == 1) {
               b = item.value;
               tag.style.color = '#FF4242';
            } else {
               c = item.value;
               tag.style.color = '#FB62F6';
            }
         } else {
            tag.style.color = '#fff';
         }
      }
   );

   // Get solution from lde
   if (counter == 3) {
      let answer = lde(a,b,c);
      if (answer[0]) {
         // console.log(answer[1]);
         let x0 = answer[3];
         let y0 = answer[4];
         let d = answer[1];
         particularX.innerText = `$$ ${x0} $$`;
         particularY.innerText = `$$ ${y0} $$`;
         
         // Make separate function for this (TO-DO)
         if (b % d == 0) {
            let temp = b / d;
            generalX.innerText = `$$ ${x0} + ${temp}n $$`;
         } else {
            generalX.innerText = `$$ ${x0} + \\frac{ ${b} }{ ${d} }n $$`;
         }

         if (a % d == 0) {
            let temp = a / d;
            generalY.innerText = `$$ ${y0} - ${temp}n $$`;
         } else {
            generalY.innerText = `$$ ${y0} - \\frac{ ${a} }{ ${d} }n $$`;
         }

         MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      } else {
         particularX.innerText = randomEmoji();
         particularY.innerText = randomEmoji();
         generalX.innerText = randomEmoji();
         generalY.innerText = randomEmoji();
      }
   }
}