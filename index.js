let myStepCounter = 0;
let blindSpotX = window.innerWidth/4;

/*
const myStoredDataHandle = localStorage.getItem('myDataHandle');
if (myStoredDataHandle) {
    const myDataHandle = JSON.parse(myStoredDataHandle);

}else{
    const myDataHandle = Array.from({length: 5}, () => Array.from({ length: 4}, () => []));
}
*/

const myDataHandle = Array.from({length: 5}, () => Array.from({ length: 6}, () => []));
console.log('myStepCounter = ' + myStepCounter);
console.log('myDataHandle = ' + myDataHandle);

document.addEventListener('DOMContentLoaded', function() {
    const questionnaireForm = document.getElementById('questionnaireContainer');
    const submitButton = document.getElementById('questionnaireSubmit');
    const questions = questionnaireForm.querySelectorAll('input[type="radio"]');
    
    function checkCompletion() {
        const isComplete = Array.from({ length: 5 }, (_, i) => 
            questionnaireForm.querySelector(`input[name="question${i+1}"]:checked`)
        ).every(input => input !== null);
        submitButton.disabled = !isComplete;
    }
    
    questions.forEach(question => {
        question.addEventListener('change', checkCompletion);
    });

    questionnaireForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const firstChoicesPicked = Array.from({ length: 5 }, (_, i) => 
            questionnaireForm.querySelector(`input[name="question${i+1}"]:checked`).value === '1'
        );

        if (firstChoicesPicked.some(isFirstChoice => isFirstChoice)) {
            document.getElementById('questionnaireContainer').style.display = 'none';
            document.getElementById('exclusionMessage').style.display = 'block';
        } else {
            document.getElementById('questionnaireContainer').style.display = 'none';
            document.getElementById('demographicForm').style.display = 'block';
        }

    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ageInput = document.getElementById('age');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const ethnicityInputs = document.querySelectorAll('input[name="ethnicity"]');
    const demoSubmit = document.getElementById('demoSubmit');
    const demographicForm = document.getElementById('demographicForm');
    const errorAge = document.getElementById('errorAge');
    
    function checkInputs() {
        const age = ageInput.value;
        const isGenderSelected = Array.from(genderInputs).some(input => input.checked);
        const isEthnicitySelected = Array.from(ethnicityInputs).some(input => input.checked);

        const isAgeValid = age && age >= 0 && age <= 120;
        demoSubmit.disabled = !(isAgeValid && isGenderSelected && isEthnicitySelected);
        
        if (!isAgeValid && age !== "") {
            errorAge.textContent = "Please enter a valid age.";
        } else {
            errorAge.textContent = "";
        }
    }
    
    ageInput.addEventListener('input', checkInputs);
    genderInputs.forEach(input => input.addEventListener('change', checkInputs));
    ethnicityInputs.forEach(input => input.addEventListener('change', checkInputs));
    
    demographicForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const age = ageInput.value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const ethnicity = document.querySelector('input[name="ethnicity"]:checked').value;

        if (age < 18) {
            document.getElementById('demographicForm').style.display = 'none';
            document.getElementById('ageExclusionMessage').style.display = 'block';
        } else {
            myDataHandle[0][5] = [gender, age, ethnicity];
            console.log(myDataHandle[0][5]);
            document.getElementById('demographicForm').style.display = 'none';
            document.getElementById('instructionContainer').style.display = 'block';
            
        }
    });
});




const practiceRoundButton = document.getElementById("practiceRoundButton");
let testEyeRad = document.querySelectorAll("input[name='testEye']");
let testEye;

testEyeRad.forEach(rb => rb.addEventListener("change", function(){
    practiceRoundButton.disabled = false;
    testEye = document.querySelector("input[name='testEye']:checked").value;
    console.log('testEye = ' + testEye);
}));

function registerTestEye(){
    myDataHandle[0][0] = blindSpotX;
    myDataHandle[0][2] = parseInt(testEye);
    console.log(myDataHandle);
    localStorage.setItem('myStepCounter', JSON.stringify(myStepCounter));
    localStorage.setItem('blindSpotX', JSON.stringify(blindSpotX));
    localStorage.setItem('myDataHandle', JSON.stringify(myDataHandle));
}
