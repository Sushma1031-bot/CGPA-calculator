// ===============================
// GPA & CGPA Calculator
// ===============================

const gradePoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "P": 4,
    "F": 0
};

const addSubjectBtn = document.getElementById("addSubject");
const calculateGPABtn = document.getElementById("calculateGPA");
const calculateCGPABtn = document.getElementById("calculateCGPA");
const predictCGPABtn = document.getElementById("predictCGPA");

const subjectContainer = document.getElementById("subjectContainer");

// ===============================
// Add Subject
// ===============================

addSubjectBtn.addEventListener("click", () => {

    const row = document.createElement("div");
    row.className = "subject-row";

    row.innerHTML = `
        <input type="text" class="subject" placeholder="Subject Name">

        <input type="number" class="credit" min="1" placeholder="Credits">

        <select class="grade">
            <option value="">Grade</option>
            <option value="10">O</option>
            <option value="9">A+</option>
            <option value="8">A</option>
            <option value="7">B+</option>
            <option value="6">B</option>
            <option value="5">C</option>
            <option value="4">P</option>
            <option value="0">F</option>
        </select>

        <button class="delete-btn">🗑</button>
    `;

    subjectContainer.appendChild(row);

});

// ===============================
// Delete Subject
// ===============================

subjectContainer.addEventListener("click", function(e){

    if(e.target.classList.contains("delete-btn")){

        const rows = document.querySelectorAll(".subject-row");

        if(rows.length>1){
            e.target.parentElement.remove();
        }else{
            alert("At least one subject is required.");
        }

    }

});

// ===============================
// Calculate GPA
// ===============================

calculateGPABtn.addEventListener("click", ()=>{

    const credits=document.querySelectorAll(".credit");
    const grades=document.querySelectorAll(".grade");

    let totalCredits=0;
    let totalPoints=0;

    for(let i=0;i<credits.length;i++){

        const credit=parseFloat(credits[i].value);
        const grade=parseFloat(grades[i].value);

        if(isNaN(credit) || isNaN(grade)){

            alert("Please enter all subject details.");

            return;

        }

        totalCredits+=credit;
        totalPoints+=credit*grade;

    }

    const gpa=(totalPoints/totalCredits).toFixed(2);

    document.getElementById("gpaResult").innerText=gpa;

    document.getElementById("currentSemesterGPA").value=gpa;

});

// ===============================
// Running CGPA
// ===============================

calculateCGPABtn.addEventListener("click",()=>{

    const currentCGPA=parseFloat(document.getElementById("currentCGPA").value);

    const completed=parseInt(document.getElementById("completedSemesters").value);

    const semesterGPA=parseFloat(document.getElementById("currentSemesterGPA").value);

    if(
        isNaN(currentCGPA) ||
        isNaN(completed) ||
        isNaN(semesterGPA)
    ){

        alert("Please fill all CGPA details.");

        return;

    }

    const newCGPA=((currentCGPA*completed)+semesterGPA)/(completed+1);

    document.getElementById("cgpaResult").innerText=newCGPA.toFixed(2);

});

// ===============================
// What If Predictor
// ===============================

predictCGPABtn.addEventListener("click",()=>{

    const current=parseFloat(document.getElementById("predictCurrentCGPA").value);

    const completed=parseInt(document.getElementById("predictCompleted").value);

    const total=parseInt(document.getElementById("totalSemesters").value);

    const expected=parseFloat(document.getElementById("futureGPA").value);

    if(
        isNaN(current) ||
        isNaN(completed) ||
        isNaN(total) ||
        isNaN(expected)
    ){

        alert("Please complete all prediction details.");

        return;

    }

    if(completed>=total){

        alert("Completed semesters must be less than Total semesters.");

        return;

    }

    const remaining=total-completed;

    const predicted=((current*completed)+(expected*remaining))/total;

    document.getElementById("predictionResult").innerText=predicted.toFixed(2);

});

// ===============================
// Enter Key Support
// ===============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        calculateGPABtn.click();

    }

});