
 //parse stored data
const myStoredDataHandle = localStorage.getItem('myDataHandle');
const myDataHandle = JSON.parse(myStoredDataHandle);

const myStoredStepCounter = localStorage.getItem('myStepCounter');
let myStepCounter = JSON.parse(myStoredStepCounter);
const resultCircleDiameter = "10px";
const resultDiagramWidth = 600;
let resultDiagramHeight = resultDiagramWidth * window.innerHeight/window.innerWidth; //change to = resultDiagramWidth for a square diagram
let buttonToShow;

function showButton(){
  if (myStepCounter >= 5) {
    document.getElementById("goToEndInstructions").style.display = "block";
  } else {
    buttonToShow = 'goToCalibration' + myStepCounter.toString();
    document.getElementById(buttonToShow).style.display = "block";
  }
}

function adjustCaliReminder(a) {
  const cali1 = 'resizing a card on screen, distance measured with A4 paper';
  const cali2 = 'distance measured with a rope';
  const cali3 = 'indicating when the red dot disappears';
  const cali4 = 'back and forth head movement';

  switch(a) {
    case 1:
      document.getElementById('reminder').textContent = `Please assign a score to the previous distance calibration method (${cali1}) based on ease of use:`
      break;
    case 2:
      document.getElementById('reminder').textContent = `Please assign a score to the previous distance calibration method (${cali2}) based on ease of use:`
      break;
    case 3:
      document.getElementById('reminder').textContent = `Please assign a score to the previous distance calibration method (${cali3}) based on ease of use:`
      break;
    case 4:
      document.getElementById('reminder').textContent = `Please assign a score to the previous distance calibration method (${cali4}) based on ease of use:`
      break;
    default:
      document.getElementById('reminder').textContent = `Please assign a score to the previous distance calibration method based on ease of use:`
      break;
  }
}

if (myStepCounter == 1) {
  document.getElementById('userScoreContainer').style.display = 'none';
}


if (myStoredDataHandle) {
  myParsedMatrix = myDataHandle[myStepCounter-1][1];
  numRows = myDataHandle[0][3];
  numColumns = myDataHandle[0][4];
  console.log(myParsedMatrix); 
} else {
  console.log("No GVO data found. You need to do the GVO first. See /gvo.html"); 
}

//devide the result diagram, then color the sections
const resultDiagram = document.getElementById('resultDiagram');
resultDiagram.style.width = resultDiagramWidth + 'px';
resultDiagram.style.height = resultDiagramHeight + 'px';

function showResults(numRows, numColumns) {
  //const sectionWidth = resultDiagram.offsetWidth / numColumns; 
  //const sectionHeight = resultDiagram.offsetHeight / numRows;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      if (myParsedMatrix[i][j][0] === -1) {
        continue;
      }
      const section = document.createElement('div');
      section.classList.add('section');
      section.style.width = resultCircleDiameter; //sectionWidth - 1 + 'px';
      section.style.height = resultCircleDiameter; //sectionHeight - 1 + 'px';
      section.style.borderRadius = "50%";
      //section.style.left = (j + 0.5) * sectionWidth - 2 + 'px';
      //section.style.top = (i + 0.5) * sectionHeight - 2 + 'px';
      section.style.top = myParsedMatrix[i][j][1];
      section.style.left = myParsedMatrix[i][j][2];
      section.style.transform = "translate(-50%, -50%)";
      
      //color missed section black
      if (myParsedMatrix[i][j][0] === 0) {
          section.style.backgroundColor = 'black';
      }
      //overwrite center section with yellow color
      if ((numRows % 2 == 1 && numColumns % 2 == 1) && (i == Math.floor(numRows/2) && j == Math.floor(numColumns/2))){
          section.style.backgroundColor = 'yellow';
      }
      //bundle
      resultDiagram.appendChild(section);
    }
  }

  if (myStepCounter != 1) {
    for (let i = 0; i < 9; i++) {
      const section = document.createElement('div');
      section.classList.add('section');
      section.style.width = resultCircleDiameter; //sectionWidth - 1 + 'px';
      section.style.height = resultCircleDiameter; //sectionHeight - 1 + 'px';
      section.style.borderRadius = "50%";
      section.style.top = myParsedMatrix[numRows][i][1];
      section.style.left = myParsedMatrix[numRows][i][2];
      section.style.transform = "translate(-50%, -50%)";
      
      //color missed section black
      if (myParsedMatrix[numRows][i][0] === 0) {
          section.style.backgroundColor = 'black';
      }
      //bundle
      resultDiagram.appendChild(section);
    }
  }

  //add a center section with yellow color if even by even grid
  if (numRows % 2 == 0 || numColumns % 2 == 0) {
    const midPoint = document.createElement('div');
    midPoint.classList.add('section');
    midPoint.style.width = resultCircleDiameter; //sectionWidth - 1 + 'px';
    midPoint.style.height = resultCircleDiameter; //sectionHeight - 1 + 'px';
    midPoint.style.borderRadius = "50%";
    midPoint.style.left = resultDiagram.offsetWidth / 2 + 'px';
    midPoint.style.top = resultDiagram.offsetHeight / 2 + 'px';
    midPoint.style.transform = "translate(-50%, -50%)";
    midPoint.style.backgroundColor = 'yellow';
    resultDiagram.appendChild(midPoint);
  }

  let buttonToEnable;
  if (myStepCounter >= 5) {
    buttonToEnable = 'goToEndInstructions';
  } else {
    buttonToEnable = 'goToCalibration' + myStepCounter.toString();
  }

  const toNextCalibration = document.getElementById(buttonToEnable);
  let userScoreRad = document.querySelectorAll("input[name='userScore']");
  let userScore;

  userScoreRad.forEach(rb => rb.addEventListener("change", function(){
      toNextCalibration.disabled = false;
      userScore = document.querySelector("input[name='userScore']:checked").value;
      console.log('userScore = ' + userScore);
      myDataHandle[myStepCounter-1][2] = parseInt(userScore);
      console.log(myDataHandle);
      localStorage.setItem('myDataHandle', JSON.stringify(myDataHandle));
  }));

  adjustCaliReminder(myStepCounter-1);
  showButton();
}
showResults(numRows,numColumns);


localStorage.removeItem('myGvoMatrix');