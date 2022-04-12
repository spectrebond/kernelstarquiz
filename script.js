
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const check = document.getElementById('check');
 const submitbtn = document.getElementById('submit'); const answerEls = document.querySelectorAll(".answer");
 const quiz = document.getElementById("quiz");
 const subject = document.getElementById("subject");
 const start = document.getElementById('start');
 const chooseSubject = document.querySelector('.chooseSubject');
 document.addEventListener('contextmenu', event => event.preventDefault());
 document.addEventListener('keydown',(e)=>{
     if(e.keyCode==123){
         return false;
     }
 })

let cans = "";
let l = 0;
let currentQuiz = 0;
let score = 0;
let n = 0;
quiz.style.display='none';
let x=0;
let fstatus = false;
document.addEventListener('fullscreenchange',()=>{
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement && fstatus==false){
        quiz.innerHTML='<h1>Your Exam has been Cancelled</h1>'
    }
},false);
// document.onkeydown = function(e) {
//     if(event.keyCode == 123) {
//        return false;
//     }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//        return false;
//     }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//        return false;
//     }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//        return false;
//     }
//     if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//        return false;
//     }
//   }
start.style.display = 'none'

check.addEventListener('change',()=>{
    if(check.checked===false){
        start.style.display = 'none'
    }
    else{
        start.style.display = 'block'
    }
})

async function quizfetch(jsonfile){
    quiz.style.display='block'
    chooseSubject.style.display='none'
    deselect();
    const resp = await fetch(jsonfile);
    const respData = await resp.json();
    console.log(respData.data.length);

    const currentQuizData = respData.data[n];
    questionEl.innerText = respData.data[n].question;
    a_text.innerText = respData.data[n].a;
    b_text.innerText = respData.data[n].b;
    c_text.innerText = respData.data[n].c;
    d_text.innerText = respData.data[n].d;
    cans=respData.data[n].correct;
    l = respData.data.length;
}



start.addEventListener('click',(e)=>{
    e.preventDefault();
    document.body.requestFullscreen()
      
    
    if(subject.value==='C'){
        quizfetch('c.json')
    }
    else if(subject.value=='CF'){
        quizfetch('cf.json')
    }
    else{
        quizfetch('ga.json')
    }
})
function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselect() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitbtn.addEventListener('click', () => {


    const answer = getSelected();
    console.log(answer);
    if (answer) {

        if (answer == cans) {
            score++;
        }
        n++;
        if (n < l) {
            if(subject.value==='C'){
                quizfetch('c.json')
            }
            else if(subject.value=='CF'){
                quizfetch('cf.json')
            }
            else{
                quizfetch('ga.json')
            }
        }
        else {
            quiz.innerHTML = `
            <h2>Your Score ${score*10}/${l*10}.</h2>
            <h2>You can now safely close the window.</h2>
            <button onclick="finish()">Finish</button>
        `;
        }
    }

});


function finish(){
    fstatus=true;
    document.exitFullscreen();
}