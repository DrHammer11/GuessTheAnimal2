function loadData(datakey) {
    if (localStorage.getItem(datakey) === null) {
        dataArray = [trueArray, questions];
    }
    else {
        dataArray = JSON.parse(localStorage.getItem(datakey));
    }
    return dataArray;
}
function UpdateData(newdata, datakey) {
    localStorage.setItem(datakey, JSON.stringify(newdata));
}

function doNothing() {
    void(0)
}
document.getElementById("Couch").style.width = window.screen.width+"px";
document.getElementById("Couch").style.height = window.screen.height+"px";
document.getElementById("Peppy").style.left = window.screen.width/10+"px";
document.getElementById("SpeechBubble").style.left = window.screen.width/10+530+"px";
document.getElementById("container").style.left = window.screen.width/10+555+"px";
var trueArray = ["cat", true, false, true, false, false, true, null, false, "robin", false, false, false, true, true, false, null, null, "snake", false, false, false, false, false, true, true, null, "racoon", true, false, true, false, false, false, null, null, "baleen whale", false, true, true, false, false, false, false, null, "goldfish", false, true, false, false, false, true, null, null, "mosquito", false, false, false, true, false, false, null, null, "dolphin", false, true, true, false, false, false, true, null, "dog", true, false, true, false, false, true, true, true];
var questions = ["Does it have fur?","Does it live in the water?","Is it a mammal?","Does it fly?","Does it have feathers?","Do people keep it as a pet?"];
var safeArray = loadData("animalsAndQuestions");
//var safeArray = [trueArray, questions];
var questionsanswered = [];
var questionstoadd = [];
trueArray = safeArray[0];
questions = safeArray[1];
safeArray = trueArray.slice()
var factoidCounter = 1
var a = 0;
var q = 0;
function setText(text) {
    document.getElementById("question-box").innerHTML = text;
    PeppyBlinkAnimation();
}

function randomint(start, end) {
    end = end + 0.5
    start = start - 0.5
    var randomnum = (Math.random() * end);
    while (randomnum < start) {
        var randomnum = (Math.random() * end);  
    }
    return Math.round(randomnum);
}

function contains(array, item) {
    success = false
    for (t = 0; t < array.length; t++) {
        if (array[t] === item) {
            success = true
        }
    }
    return success
}

function containsTwo(array, item) {
    sucess = false
    for (t = 0; t < array.length; t++) {
        if (array[t][0] === item) {
            sucess = true
        }
    }
    return sucess
}

function insert(array, index, item) {
    firstpart = array.splice(0, index)
    secondpart = array
    firstpart.push(item)
    firstpart = firstpart.concat(secondpart)
    return firstpart;
}

function getmultiplemins(numlist) {
    record = trueArray.length;
    multmins = [];
    for (n = 0; n < numlist.length; n++) {
        if (numlist[n][0] < record) {
            record = numlist[n][0];
            multmins = [];
        }
        if (numlist[n][0] === record) {
            multmins.push(numlist[n]);
        }  
    } 
    return multmins;
}

function PeppyBlinkAnimation() {
    blinks = [];
    blinks.push("PeppyEyesClosed.png");
    blinks.push("Peppy.png");
    if (Math.random() > 0.5) {
        blinks.push("Peppy.png");
        blinks.push("PeppyEyesClosed.png");
        blinks.push("Peppy.png");
    }
    i = 0;
    var Blink = setInterval(function() {
        document.getElementById("Peppy").src=blinks[i];
        if (i === blinks.length - 1) {
            document.getElementById("Peppy").src="Peppy.png";
            clearInterval(Blink);
        }
        else {
            i = i + 1;
        }
    }, 200);
}

function myKeyPress(e){
    var keynum;
    if(window.event) { // IE                    
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera                   
      keynum = e.which;
    }
    if (keynum === 13) {
        document.getElementById("submit-button").click();
    }
}

function fixQuestionGrammar(question) {
    question = question.toLowerCase();
    question = question[0].toUpperCase() + question.slice(1, question.length) + "?";
    if (question[question.length-1] === "?" && question[question.length-2] === "?") {
        question = question.slice(0, question.length-1);
    }
    return question;
}

function SubmitAnswer() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";         
    if (answer.toLowerCase()[0] === "y") {
        questionsanswered[questionsanswered.length-1].push(true)   
        trueArray = getNewTrueList(bestquestion, true, trueArray)
        askNextQuestion(trueArray, questions);
    }
    else if (answer.toLowerCase()[0] === "n") {
        questionsanswered[questionsanswered.length-1].push(false)   
        trueArray = getNewTrueList(bestquestion, false, trueArray)  
        askNextQuestion(trueArray, questions);
    }
}

function SubmitAnswerFinalAnswer() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";
    if (answer.toLowerCase()[0] === "y") {
        guessCorrect();
    }
    else if (answer.toLowerCase()[0] === "n") {
        guessIncorrect();
    }
}

function SubmitAnswerPlayAgain() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";
    if (answer.toLowerCase()[0] === "y") {
        document.getElementById("submit-button").onclick = SubmitAnswer;
        guessAnimal();
    }
    else if (answer.toLowerCase()[0] === "n") {
        document.getElementById("submit-button").onclick = doNothing;
        setText("Okay then! I'll be here...");
    }
}

function SubmitAnswerGetAnimal() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";
    newanimal = answer;
    newanimal = newanimal.toLowerCase();
    safeArray.push(newanimal);
    for (q = 1; q < questions.length+1; q++) {
        if (containsTwo(questionsanswered, questions[q-1])) {
            safeArray.push(safeArray[safeArray.indexOf(trueArray[0])+q]);
        }
        else {
            safeArray.push(null);
        }
    }
    for (q = 0; q < questionstoadd.length; q++) {
        q.push(null);
    }
    setText("What's a question I can use to tell a "+newanimal+" from a "+trueArray[0]+"?")
    document.getElementById("submit-button").onclick = SubmitAnswerGetQuestion;
}

function SubmitAnswerGetQuestion() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";
    question = answer;
    question = fixQuestionGrammar(question);
    questionstoadd.push([question]);
    special = Math.floor(safeArray.length/(questions.length+1))
    for (a = 0; a < special; a++) {
        questionstoadd[questionstoadd.length-1].push(null);
    }
    if (contains(['a','i','e','o','u'], trueArray[0].slice(0, 1))) {
        setText("An "+trueArray[0]+": "+question)
    }
    else {
        setText("A "+trueArray[0]+": "+question)
    }
    document.getElementById("submit-button").onclick = SubmitAnswerNewData;
}

function SubmitAnswerNewData() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";  
    sindex = questionstoadd.length-1     
    if (answer.toLowerCase()[0] === "y") {
        questionstoadd[sindex][Math.floor(safeArray.indexOf(trueArray[0])/(questions.length+1))+1] = true;
        questionstoadd[sindex][questionstoadd[sindex].length-1] = false;
    }
    else if (answer.toLowerCase()[0] === "n") {
        questionstoadd[sindex][Math.floor(safeArray.indexOf(trueArray[0])/(questions.length+1))+1] = false;
        questionstoadd[sindex][questionstoadd[sindex].length-1] = true;
    }
    freeTheQuestions();
    UpdateData([safeArray, questions], "animalsAndQuestions");
    setText("Play again?");
    document.getElementById("submit-button").onclick = SubmitAnswerPlayAgain;
}

function SubmitAnswerFactoids() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";
    if (answer.toLowerCase()[0] === "y") {
        safeArray[safeArray.indexOf(trueArray[0])+factoidCounter] = true;
        trueArray[factoidCounter] = true;
    }
    else if (answer.toLowerCase()[0] === "n") {
        safeArray[safeArray.indexOf(trueArray[0])+factoidCounter] = false;
        trueArray[factoidCounter] = false;
    }
    askFactoids();
}

function askFactoids() {
    if (contains(trueArray, null)) {
        for (factoidCounter=1; factoidCounter < trueArray.length; factoidCounter++) {
            console.log(trueArray)
            console.log(factoidCounter)
            if (trueArray[factoidCounter] === null) {
                if (contains(['a','i','e','o','u'], trueArray[0].slice(0, 1))) {
                    setText("An "+trueArray[0]+": "+questions[factoidCounter-1].toLowerCase());
                    break;
                }
                else {
                    setText("A "+trueArray[0]+": "+questions[factoidCounter-1].toLowerCase());
                    break;
                }
            }
        }
    }
    else {
        UpdateData([safeArray, questions], "animalsAndQuestions");
        setText("Play again?");
        document.getElementById("submit-button").onclick = SubmitAnswerPlayAgain;
    }
}

function freeTheQuestions() {
    difference = 0;
    for (q = 0; q < questionstoadd.length; q++) {
        q = questionstoadd[q - difference];
        questions.push(q[0]);
        for (a = 0; a < Math.floor(safeArray.length/(questions.length+1)); a++) {
            if (a === Math.floor(safeArray.length/(questions.length+1))-1) {
                safeArray.push(q[q.length-1]);
                safeArray = insert(safeArray, (a*(questions.length+1))+questions.length, q[a+1]);
                break
            }
            safeArray = insert(safeArray, (a*(questions.length+1))+questions.length, q[a+1]);
        }
        questionstoadd.splice(questionstoadd.indexOf(q), 1);
        difference = difference + 1;
    }
}

function guessCorrect() {
    setText("I knew it! I'm so smart!");
    if (contains(trueArray, null)) {
        setTimeout(function() {
            setText("But I actually don't know everything about the animal "+trueArray[0]+".");
            setTimeout(function() {
                for (factoidCounter=1; factoidCounter < trueArray.length; factoidCounter++) {
                    for (q = 0; q < questionsanswered.length; q++) {
                        if (questionsanswered[q][0] === questions[factoidCounter-1]) {
                            trueArray[factoidCounter] = questionsanswered[q][1]
                            safeArray[safeArray.indexOf(trueArray[0])+factoidCounter] = questionsanswered[q][1]
                        }
                    }
                }
                askFactoids();
                document.getElementById("submit-button").onclick = SubmitAnswerFactoids;
            }, 2500);
        }, 2500);        
    }
    else {
        setTimeout(function() {
            setText("Play again?");
            document.getElementById("submit-button").onclick = SubmitAnswerPlayAgain;
        }, 2500);
    }
}

function guessIncorrect() {
    setText("I give up. What's the animal?")
    document.getElementById("submit-button").onclick = SubmitAnswerGetAnimal;
}

function getBestQuestion(trueArray, questions) {
    saveit = [0, 0, 0];
    entries = [];
    bestquestion = "";
    for (q = 1; q < questions.length+1; q++) {
        for (a = 0; a < Math.floor(trueArray.length/(questions.length+1)); a++) {
            if (trueArray[(a*(questions.length+1))+q] === true) {
                saveit[0] = saveit[0] + 1;
            }
            else if (trueArray[(a*(questions.length+1))+q] === false) {
                saveit[1] = saveit[1] + 1;
            }
            else if (trueArray[(a*(questions.length+1))+q] === null) {
                saveit[2] = saveit[2] + 1;
            }
        }
        console.log(saveit)
        if (saveit[2] > 0) {
            diff = Math.max(...saveit) - Math.min(...saveit);
        }
        else {
            diff = Math.abs(saveit[0] - saveit[1]);
        }
        entries.push([diff, q-1]);
        saveit = [0, 0, 0];
    }
    bestquestions = getmultiplemins(entries);
    console.log(bestquestions)
    bestquestion = questions[bestquestions[randomint(0, bestquestions.length-1)][1]]; 
    while (containsTwo(questionsanswered, bestquestion)) {
        bestquestion = questions[bestquestions[randomint(0, bestquestions.length-1)][1]]; 
    }
    return bestquestion;
}

function getNewTrueList(question, boolean, trueArray) {
    difference = 0;
    ops = true;
    if (boolean === true) {
        ops = false;
    }
    seval = Math.floor(trueArray.length/(questions.length+1));
    for (a = 0; a < seval; a++) {
        if (!(trueArray[(a*(questions.length+1))+questions.indexOf(question)+1-difference] === boolean)) {
            if (trueArray[(a*(questions.length+1))+questions.indexOf(question)+1-difference] === ops) {
                for (d = 0; d < questions.length+1; d++) {
                    trueArray.splice((a*(questions.length+1))-difference+d, 1);
                    difference = difference + 1;
                }
            }
        }
    }
    return trueArray;
}

function askNextQuestion(trueArray, questions) {
    if (trueArray.length == questions.length+1) {
        finalAnswer(trueArray)
    }
    else {
        bestquestion = getBestQuestion(trueArray, questions);
        setText(bestquestion);
        console.log(trueArray)
        questionsanswered.push([bestquestion]);
    }
}

function finalAnswer(trueArray) {
    if (contains(['a','i','e','o','u'], trueArray[0].slice(0, 1))) {
        setText("Is it an "+trueArray[0]+"?");
    }
    else {
        setText("Is it a "+trueArray[0]+"?");
    }
    document.getElementById("submit-button").onclick = SubmitAnswerFinalAnswer;
}

function guessAnimal() {
    setText("Think of an animal.");
    trueArray = safeArray.slice()
    questionsanswered = [];
    setTimeout(function() {
        askNextQuestion(trueArray, questions);
    }, 3000);
}

function addAnimal() {
    setText("What's an animal I should learn?")
    document.getElementById("submit-button").onclick = GiveAnimal;
}

function GiveAnimal() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";
    newanimal = answer;
    newanimal = newanimal.toLowerCase();
    safeArray.push(newanimal);
    for (q = 1; q < questions.length+1; q++) {
        safeArray.push(null);
    }
    UpdateData([safeArray, questions], "animalsAndQuestions");
    console.log(safeArray)
    setText("I'll remember that animal.")
}

function addQuestion() {
    setText("What's a question I should learn?")
    document.getElementById("submit-button").onclick = GiveQuestion;
}

function GiveQuestion() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";
    question = answer;
    question = fixQuestionGrammar(question)
    questionstoadd.push([question]);
    special = Math.floor(safeArray.length/(questions.length+1))
    for (a = 0; a < special; a++) {
        questionstoadd[questionstoadd.length-1].push(null);
    }
    freeTheQuestions();
    UpdateData([safeArray, questions], "animalsAndQuestions");
    console.log(questions)
    setText("I'll remember that question.")
}

function DevEdit() {
    console.log(trueArray);
    setText("Paste here what I send you.");
    document.getElementById("submit-button").onclick = SubmitDevEdit;
}
function SubmitDevEdit() {
    answer = document.getElementById("answer-box").value;
    answer = JSON.parse(answer);
    UpdateData([answer, questions], "animalsAndQuestions");
    setText("Restart the page to use the updated code.");
}

function FillWithFacts() {
    if (contains(trueArray, null)) {
        document.getElementById("submit-button").onclick = SubmitAnswerFacts;
        for (q = 0; q < questions.length; q++) {
            question = questions[q];
            for (a = 0; a < Math.floor(trueArray.length/(questions.length+1)); a++) {
                if (trueArray[(a*(questions.length+1))+q+1] === null) {
                    setText("A "+trueArray[(a*(questions.length+1))]+": "+question)
                    break;
                }
            }
            if (trueArray[(a*(questions.length+1))+q+1] === null) {
                break;
            }
        }
    }
    else {
        freeTheQuestions()
        setText("Rrestart")
        UpdateData([trueArray, questions], "animalsAndQuestions");
    }
    console.log(trueArray)
}

function SubmitAnswerFacts() {
    answer = document.getElementById("answer-box").value;
    document.getElementById("answer-box").value = "";         
    if (answer.toLowerCase()[0] === "y") {
        trueArray[(a*(questions.length+1))+q+1] = true;
        FillWithFacts();
    }
    else if (answer.toLowerCase()[0] === "n") {
        trueArray[(a*(questions.length+1))+q+1] = false;
        FillWithFacts();
    }
}

//addAnimal();
//addQuestion();
//DevEdit();
//FillWithFacts();
guessAnimal();
