// logic to display current year
document.querySelector(".year").innerHTML = new Date().getFullYear()


// logic to slide in nav
const menu_btn = document.querySelector(".menu-btn")
const nav_bar = document.querySelector("nav")

menu_btn.addEventListener("click", show_nav)
function show_nav(){
         nav_bar.classList.toggle("slide-nav")
}

// logic to display questions from database
let counter = 0
const question_display = document.querySelector(".question")
const option_a_btn = document.querySelector("#a")
const option_b_btn = document.querySelector("#b")
const option_c_btn = document.querySelector("#c")
const option_d_btn = document.querySelector("#d")

const all_option_btns = document.querySelectorAll(".option-btn")
const next_btn = document.querySelector(".next-btn")


display_current_question()

function display_current_question(){
    
    all_option_btns.forEach(function(btn){
        btn.classList.remove("wrong-answer")
        btn.classList.remove("correct-answer")
  })

    let selected_option = ""
    let current_question = questions[counter]
    question_display.innerHTML = current_question.question // set the question

    // display option
    option_a_btn.innerHTML = current_question.a
    option_b_btn.innerHTML = current_question.b
    option_c_btn.innerHTML = current_question.c
    option_d_btn.innerHTML = current_question.d



    all_option_btns.forEach(function(btn){

             btn.addEventListener("click", function(){
                   selected_option = btn.id
                   if(selected_option === current_question.correct){
                           document.querySelector(`#${selected_option}`).classList.add("correct-answer")
                       
                   }else{
                     document.querySelector(`#${selected_option}`).classList.add("wrong-answer")

                        document.querySelector(`#${current_question.correct}`).classList.add("correct-answer")
                   }
             })
    })

  

}

next_btn.addEventListener("click", show_next_question)

function show_next_question(){
  
      if(counter < questions.length - 1){
           counter ++
      }else{
           counter = counter
      }

      display_current_question()
}

