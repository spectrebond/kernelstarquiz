
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
 const submitbtn = document.getElementById('submit'); const answerEls = document.querySelectorAll(".answer");
 const quiz = document.getElementById("quiz");
 const subject = document.getElementById("subject");
 const start = document.getElementById('start');
 const chooseSubject = document.querySelector('.chooseSubject');


let cans = "";
let l = 0;
let currentQuiz = 0;
let score = 0;
let n = 0;
quiz.style.display='none';
let x=0;
document.addEventListener('fullscreenchange',()=>{
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement){
        window.close();
    }
},false);


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
            <h4>You answered correctly at ${score}/${l} questions.</h4>
            
            <button onclick="location.reload()">Reload</button>
        `;
        }
    }

});