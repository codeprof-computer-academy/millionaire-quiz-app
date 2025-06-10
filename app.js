
// logic to display current year
document.querySelector(".year").innerHTML = new Date().getFullYear()

// logic to take -off welcome screen
setTimeout(function(){
         document.querySelector(".welcome-screen").style.display = "none"
}, 5000)

// logic to slide in nav
const menu_btn = document.querySelector(".menu-btn")
const nav_bar = document.querySelector("nav")

menu_btn.addEventListener("click", show_nav)
function show_nav(){
         nav_bar.classList.toggle("slide-nav")
}

// logic to display questions from database
let counter = 0
let take_home = 0
let question_attempted = 0
const question_area = document.querySelector(".question-area")
const next_btn = document.querySelector(".next-btn")
const total_questions = document.querySelector(".total-questions")
const take_home_prize = document.querySelector(".take-home-balance")
const attempted_questions = document.querySelector(".attempted-questions")
const finish_modal = document.querySelector(".finish-modal")
const correct_sound = document.querySelector(".correct-sound")
const wrong_sound = document.querySelector(".wrong-sound")
const start_sound = document.querySelector(".start-sound")
const welcome_sound = document.querySelector(".welcome-sound")
const start_btn  = document.querySelector(".start-btn")
const correct_answers = document.querySelector(".correct-answers")
const wrong_answers = document.querySelector(".wrong-answers")

let total_wrong_answers = 0
let total_correct_answers = 0

total_questions.innerHTML = questions.length
attempted_questions.innerHTML = question_attempted





function load_question(){
      // start_btn.style.display = "none"
      next_btn.style.display = "flex"
      start_sound.play()
      let current_question = questions[counter]
         let question = `<section class="question-container">
                        <h4 class="question">${current_question.question}?</h4>
                     </section>
          
                     <section class="options-container">
                            
                           <div>
                                  <button class="option-btn" id="a">${current_question.a}</button>
                            
                                   <button class="option-btn" id="b">${current_question.b}</button>
                            
                           </div>
                           <div>
                                  
                                      <button class="option-btn" id="c">${current_question.c}</button>
                           
                                     <button class="option-btn" id="d">${current_question.d}</button>
                           </div>
            
                     </section>`   

                  question_area.innerHTML = question

                  check_correct_answer()

            

}

start_btn.addEventListener("click", load_question)

function load_next_question(){
      //    check if questions are not exceeded
      if(counter < questions.length - 1){
               counter++
               load_question()
      }else{

            //   finish
               question_area.innerHTML = ""
              counter = counter // you are at the last question
              next_btn.innerHTML = "Finish"
              next_btn.classList.add("bring-to-center")
              
              next_btn.addEventListener("click", function(){
                      finish_modal.style.display = "flex"
                      document.querySelector(".total-money").innerHTML = "₦" + take_home.toLocaleString()

                  //     play agian
                  document.querySelector(".play-again-btn").addEventListener("click", function(){
                          document.location.reload()
                  })

                  
              })

              wrong_answers.innerHTML = total_wrong_answers
              correct_answers.innerHTML = total_correct_answers
      }

   
    
}


next_btn.addEventListener("click", load_next_question)

// function to check correct answer
function check_correct_answer(){
      let current_question = questions[counter]
      const all_option_btns = document.querySelectorAll(".option-btn")
      all_option_btns.forEach(function(option_btn){

              option_btn.addEventListener("click", function(){
                       let selected_option = option_btn.id
                       if(selected_option === current_question.correct){
                               option_btn.classList.add("correct-answer")
                               take_home += 100000 // adding price
                               take_home_prize.innerHTML = take_home
                               question_attempted++  // increase the no of questions answered
                               attempted_questions.innerHTML = question_attempted
                              //  play correct sound
                               correct_sound.play();
                               setTimeout(function(){
                                    correct_sound.pause()
                               }, 2000)
                               total_correct_answers++
                       }else{
                            option_btn.classList.add("wrong-answer")
                        //     play wrong sound
                        wrong_sound.play()
                        setTimeout(function(){
                              wrong_sound.pause()
                         }, 2000)

                           
                        //     find the correct answer automatically
                            all_option_btns.forEach(function(opt_btn){
                                 if(opt_btn.id === current_question.correct){
                                    opt_btn.classList.add("correct-answer")

                                 }
                            })

                        //     disable all the buttons
                        all_option_btns.forEach(function(btn){
                               btn.disabled = true
                        })

                            question_attempted++  // increase the no of questions answered
                            attempted_questions.innerHTML = question_attempted
                            
                         total_wrong_answers++
                       }
              })
      })
}
