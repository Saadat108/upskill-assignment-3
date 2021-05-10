function getTemplate_t1(){
    template_1 = 
            `
               
                    <div class="option1">
                        <img src="./assets/quesstion1.png" alt="options">
                    </div>
                    <div class="option2">
                        <img src="./assets/question2.png" alt="options">
                    </div>
                    <div class="option3">
                        <img src="./assets/quesstion3.png" alt="options">
                    </div>
                
            `
    return template_1
}

function getTemplate_t2(ques, ans, img_link){
    var template_2 = `
                

                    <div class="answers-option-2-img">
                        <img src="./assets/img/ques-2.png" alt="options">
                    </div>
                    <div class="answers-option-2-choices">
                        <button class="btn-choice" id=" q1-choice1">${ans[0]}</button>
                        <button class="btn-choice" id=" q1-choice2">${ans[1]}</button>
                        <button class="btn-choice" id=" q1-choice3">${ans[2]}</button>
                    </div>

                

            `
    return template_2
}

function getTemplate_t2_v2(data){
    var template_2 = `
                

                    <div class="answers-option-2-img">
                        <img src="./assets/img/ques-2.png" alt="options">
                    </div>
                    <div class="answers-option-2-choices">
                        <button class="btn-choice" id=" q1-choice1">${data['answer-opts'][0]}</button>
                        <button class="btn-choice" id=" q1-choice2">${data['answer-opts'][1]}</button>
                        <button class="btn-choice" id=" q1-choice3">${data['answer-opts'][2]}</button>
                    </div>

                

            `
    return template_2
}

function getTemplate_t3(ans){
    var template_3 = `
                

                    
                    <div class="answers-option-2-choices">
                        <button class="btn-choice" id=" q1-choice1">${ans[0]}</button>
                        <button class="btn-choice" id=" q1-choice2">${ans[1]}</button>
                        <button class="btn-choice" id=" q1-choice3">${ans[2]}</button>
                    </div>

                

            `
    return template_3;
}
var questionIndx=0;

correctAnswerList=[];
answerState=[];

currentAnswerSelected = null;
// nextQuestion() //gets first question

startQuix();

// these are for type 1 questions with image options
var imgChoice1; 
var imgChoice2;
var imgChoice3;
function setType1Events(){
    choice1, choice2, choice3 = null;
    imgChoice1 = document.getElementsByClassName('option1')[0];
    imgChoice1.addEventListener('click', e=>{
        console.log('chosen img-1');
        activateSelectedImg(imgChoice1);

    })

    imgChoice2 = document.getElementsByClassName('option2')[0];
    imgChoice2.addEventListener('click', e=>{
        console.log('chosen img-2');
        activateSelectedImg(imgChoice2);
    })

    imgChoice3 = document.getElementsByClassName('option3')[0];
    imgChoice3.addEventListener('click', e=>{
        console.log('chosen img-3');
        activateSelectedImg(imgChoice3);
    })
    
}


// these are for type 2 and 3 questions with button options
var choice1;
var choice2;
var choice3;
function setType2n3Events(){
    imgChoice1, imgChoice2, imgChoice3 = null;
    choice1, choice2, choice3 = null;
    choice1 = document.getElementById(" q1-choice1")

    choice1.addEventListener("click", e=>{
        removeAllActiveChoices(choice1);
        // choice1.classList.add("btn-choice-active");

    })

    choice2 = document.getElementById(" q1-choice2")
    choice2.addEventListener("click", e=>{
        removeAllActiveChoices(choice2);
        // choice2.classList.add("btn-choice-active");

    })

    choice3 = document.getElementById(" q1-choice3")
    choice3.addEventListener("click", e=>{
        removeAllActiveChoices(choice3);
        // choice3.classList.add("btn-choice-active");

    })
}


function removeAllActiveChoices(chosenBtn){
    choice1.classList.remove("btn-choice-active");
    choice2.classList.remove("btn-choice-active");
    choice3.classList.remove("btn-choice-active");
    
    chosenBtn.classList.add("btn-choice-active");
}

function activateSelectedImg(chosenImg){
    // imgChoice1
    imgChoice1.firstElementChild.classList.remove("img-option-active");
    imgChoice2.firstElementChild.classList.remove("img-option-active");
    imgChoice3.firstElementChild.classList.remove("img-option-active");

    chosenImg.firstElementChild.classList.add("img-option-active");
}

function removeAllOptions(){
    console.log('removing all options');
}
// type 2 and 3 questions with button options LOGIC ENDS



// QUIZ LOGIC STARTS HERE
// question_tag = `<p>${ques}</p>`
// document.getElementsByClassName("quiz-questions").innerHTML = ""
// console.log(myDiv)



// SUBMIT BTN LOGIC
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", e =>{ 
    console.log("submit clicked");
    // take and save the answer given
    var childrenImg = document.getElementsByClassName("answer-options")[0].children;
    console.log(`length of img children: ${childrenImg.length}`);
    // var childrenImg =[];
    var childrenOption = document.getElementsByClassName("btn-choice")

    if(childrenImg.length>0){
        console.log('type-1 submitted')
        for( var i=0; i<childrenImg.length; i++){
            if(childrenImg[i].firstElementChild.classList.contains("img-option-active")){
                console.log(`submitted image: ${i}`);
                console.log("remove options now");
                document.getElementsByClassName("answer-options")[0].innerHTML="";
                
                answerState.push(i);
                
            }
        }
    }
    else if(childrenOption.length>0){
        console.log("buttons exist");
        for(var i=0; i<childrenOption.length; i++){
            if(childrenOption[i].classList.contains("btn-choice-active")){
                console.log(`submitted btn: ${i}`);
                console.log("remove options now");
                document.getElementsByClassName("answers-option-2-choices")[0].innerHTML="";
                document.getElementsByClassName("answers-option-2")[0].innerHTML="";
                answerState.push(i);
            }
        }
    }
    // nextQuestion();
});

const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", e =>{ 
    console.log("clicked on next button");
    //remove the options
    nextQuestion();
});


function nextQuestion(){
    if(questionIndx<=data.length-1){
        //
        console.log(`answer question number ${questionIndx+1}`); // print out question number in console

        correctAnswerList.push(data[questionIndx]["correct-indx"])

        quesNumTag = `<span>Question ${questionIndx+1}</span><span>/10</span>`;
        document.getElementsByClassName("question-number")[0].innerHTML = quesNumTag; // update question number

        question = `<p>${data[questionIndx]["ques"]}</p>`;
        document.getElementsByClassName("question")[0].innerHTML = question; //setting new question

        // document.getElementsByClassName("quiz-questions")[0].innerHTML += template_1; // 
        var template;
        if(data[questionIndx]['type']==1){
            console.log("type 1");
            document.getElementsByClassName("answer-options")[0].innerHTML = getTemplate_t1();
            setType1Events();
        }
        else if(data[questionIndx]['type'] == 2){
            console.log("type 2");
            document.getElementsByClassName("answers-option-2")[0].innerHTML = getTemplate_t2( data[questionIndx]['ques'], data[questionIndx]["answer-opts"], data[questionIndx]["img"]);
            // setTimeout(setType2n3Events(), 1000);
            setType2n3Events();
        }
        else{
            console.log("type 3");
            document.getElementsByClassName("answers-option-2")[0].innerHTML = getTemplate_t3(data[questionIndx]['answer-opts']);
            // setTimeout(setType2n3Events(), 1000);
            setType2n3Events();
        }

        t1 = document.getElementsByClassName("answer-options")
        t2n3 = document.getElementsByClassName("answer-options")
        


        
        questionIndx++;
    }
    else if(questionIndx>=data.length){
        document.getElementsByClassName("quiz-questions")[0].innerHTML += `<h1>All Questions solved<h1>`;
        endQuiz();
    }
    
}

function startQuix(){
    nextQuestion();
}

function getQuestionTemp(ques, quesNo){
    var baseTemp = 
                    `
                    <div class="quiz-questions">

                    <div class="question-number"><span>Question ${quesNo+1}</span><span>/10</span></div>
                    <div class="question"><p>${ques[quesNo]["ques"]}</p></div>

                    <div class="answer-options">
                    </div>
                    
                    <br>
                    <div class="answers-option-2">
                    </div>

                    
                    
                    <br>
                    <br>
                    <br>
                    <br>
                </div>
                    `
    return baseTemp;
}

function endQuiz(){
    var baseTemp = 
                    `
                    <div class="quiz-questions">

                    <div class="question-number"><span>Question 3</span><span>/10</span></div>
                    <div class="question"><p>This is the default selection setting on the toolbar. With this you can make a selection of any rectangular size and shape.</p></div>

                    <div class="answer-options"></div>
                    
                    <br>
                    <div class="answers-option-2"></div>

                    <div class="submit-btn">
                        <button>SUBMIT</button>
                    </div>
                    <div class="next-btn">
                        <button>Next <i class="fas fa-arrow-right"></i></button>
                    </div>
                    <h1>All Questions solved</h1><h1></h1>
                </div>
                    `
    console.log("ending everything");
    document.getElementsByClassName("main-content")[0].innerHTML ="";
    for(var i=0; i<=data.length; i++){
        // document.getElementsByClassName("main-content")[0].innerHTML ="";
        console.log("###### i:")
        console.log(i);
        document.getElementsByClassName("main-content")[0].innerHTML += getQuestionTemp(data, i);
        
        answerChosen = answerState[i];
        if (data[i]['type'] == 1){
            
            document.getElementsByClassName("main-content")[0].lastElementChild.children[2].innerHTML = getTemplate_t1();
            
            // sets the correct img of type 1 question to green 
            document.getElementsByClassName("main-content")[0].lastElementChild.children[2].children[correctAnswerList[i]].children[0].classList.add("correct-img")

            // sets the incorrect img chosen of type 1 question to red
            if(answerChosen != correctAnswerList){
                document.getElementsByClassName("main-content")[0].lastElementChild.children[2].children[answerChosen].children[0].classList.add("wrong-img")
            }
        }
        else if (data[i]['type'] == 2){
            document.getElementsByClassName("main-content")[0].lastElementChild.children[4].innerHTML = getTemplate_t2_v2(data[i]);
            
            document.getElementsByClassName("main-content")[0].lastElementChild.children[4].children[1].children[correctAnswerList[i]].classList.add("correct-btn");
            if(answerChosen != correctAnswerList){
                document.getElementsByClassName("main-content")[0].lastElementChild.children[4].children[1].children[answerChosen].classList.add("wrong-btn");
            }
        }
        else {
            document.getElementsByClassName("main-content")[0].lastElementChild.children[4].innerHTML = getTemplate_t3(data[i]);

            document.getElementsByClassName("main-content")[0].lastElementChild.children[4].children[0].children[correctAnswerList[i]].classList.add("correct-btn");
            if(answerChosen != correctAnswerList){
                document.getElementsByClassName("main-content")[0].lastElementChild.children[4].children[0].children[answerChosen].classList.add("wrong-btn");

               
            }
        }
        // var myData = data[i]
        // console.log(myData['type']);
    }
}
