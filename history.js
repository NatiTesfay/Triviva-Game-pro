let position = 0;        
let dataQuestion = [];   
let score = 0;   
let timerCountDown=0.5;       
let timeMin = timerCountDown *60;
const timeHolder = document.getElementById('countDown');
const container = document.getElementById("container-question");   
const finishSection = document.getElementById("finish-section");  


                                                    
  const totalQuestions = document.getElementById("n-questions").value;       
//   const categoryQuestions = document.getElementById("category").value;       
  const difficultyQuestions = document.getElementById("difficulty").value;  
  const typeQuestions = document.getElementById("type").value;              
  const historyApi = `https://opentdb.com/api.php?amount=6&category=23`; 
  
  function getQuestion() { 
    fetch(historyApi)                               
      .then((response) => response.json())    
      .then((data) => {                       
        dataQuestion = data;                  
  
        if (typeQuestions === "multiple") {                                      
          container.innerHTML = renderQuestionsTemplate(dataQuestion.results);  
        } else {                                                                 
          container.innerHTML = renderQuestionsBoolean(dataQuestion.results);    
        }
      });  setInterval(countDown,1000)  
  }
  

  
  function desorderPositionArray(array, item) {               
    let random = []                                          
  
    while (random.length < item) {                            
  
      let positionArray = Math.floor(Math.random() * item)    
  
      if (!random.includes(array[positionArray])) {           
        random.push(array[positionArray])                     
      }
    }
    return random                                             
  }
  
  
  function hiddeForm() {                                     
    document.getElementById("form-cont").classList.add("dp-none");
  }
  
  
  
  
  function changeQuestion() {                                 
  
    getInputsValue()                                          
  
    if (position === dataQuestion.results.length - 1) {       
      container.style.display = "none"                              
      finishSection.innerHTML = `<div class = "finish" style="width: 100%; padding: 100px 0px; text-align: center; font-size: 1.3rem;"><h1 class = "mb">Test finished<br> Score = ${score}</h1><a href="../pages/select.html">Play Again</a></div>`
      return
    }
    position++;                                                             
    const typeQuestions = document.getElementById("type").value;            
    if (typeQuestions === "multiple") {                                     
      container.innerHTML = renderQuestionsTemplate(dataQuestion.results);  
    } else {                                                                
      container.innerHTML = renderQuestionsBoolean(dataQuestion.results);   
    }
    
    return;
  
  }
  
  
  function renderQuestionsTemplate(question) {                 
    var array = question[position].incorrect_answers           
    array.push(question[position].correct_answer)              
    let newOrderQuestion = desorderPositionArray(array, 4) 
        
    return `<form class="form-test" onsubmit="event.preventDefault(), changeQuestion()">   
      <div class="question-form">
        <h2>${question[position].question}</h2>
      </div>
      <div class="answer-form">
        <label>
          <input type="radio" name="answer" value="${newOrderQuestion[0]}" required>
          ${newOrderQuestion[0]}
        </label>
        <label>
          <input type="radio" name="answer" value="${newOrderQuestion[1]}">
          ${newOrderQuestion[1]}
        </label>
        <label>
          <input type="radio" name="answer" value="${newOrderQuestion[2]}">
          ${newOrderQuestion[2]}
        </label>
        <label>
          <input type="radio" name="answer" value="${newOrderQuestion[3]}" >
          ${newOrderQuestion[3]}
        </label>
        <button type="submit">
          NEXT
        </button>
      </div>
    </form>`;
  }
  
  
  function countDown() {
      const minutes = Math.floor(timerCountDown)
      let second = timeMin % 60;
      if (second == '0' + second) {
          timeHolder.innerHTML = `${minutes}:${second}`
          timeMin -- ;
      }
      if (second == 0) {
        alert('you lost looser');
      }
      
  } 
                           
  function getInputsValue() {                                   
    let answerInput = document.getElementsByTagName("input");   
    answerInput = Array.from(answerInput);                     
    answerInput.map(element => {                                
      if (element.checked) {                                   
        if (element.value === dataQuestion.results[position].correct_answer) {  
          score = score + 10;                                  
        }
      }
    })
  }