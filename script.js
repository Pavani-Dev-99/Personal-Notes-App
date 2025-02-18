const mainContainer = document.querySelector('.container');
const headingAndButton = document.querySelector('.heading-and-button');
const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');
let notes = document.querySelectorAll('.input-box');
const colorDivs = document.querySelectorAll('.color-divs');
const heading = document.querySelector('h1');

const inputEl = document.querySelector('.input');
const bodyEl = document.querySelector('body');


// #ffadad
// #ffd6a5
// #fdffb6
// #caffbf
// #9bf6ff
// #a0c4ff
// #bdb2ff
// #ffc6ff
// #fffffc

const colors = [
  {
    divBgColor: '#ffadad',
    toolbarbgcolor: '#ffd2d2'
  },
  {
    divBgColor: '#ffd6a5',
    toolbarbgcolor: '#ffc782'
  },
  {
    divBgColor: '#fdffb6',
    toolbarbgcolor: '#fbff79'
  },
  {
    divBgColor: '#caffbf',
    toolbarbgcolor: '#98c290'
  },
  {
    divBgColor: '#9bf6ff',
    toolbarbgcolor: '#39cdda'
  },
  {
    divBgColor: '#a0c4ff',
    toolbarbgcolor: '#e1ebfa'
  },
  {
    divBgColor: '#bdb2ff',
    toolbarbgcolor: '#ebe8ff'
  },
  {
    divBgColor: '#ffc6ff',
    toolbarbgcolor: '#ff98ff'
  },
  {
    divBgColor: '#fffffc',
    toolbarbgcolor: '#c4c487'
  }
]

let selectedColor = '#fff';
let selectedToolbarColor = '#ddd';


// Set up event listeners for color selection
colorDivs.forEach((div, index) => {
  div.addEventListener('click', () => {
    selectedColor = colors[index].divBgColor;
    selectedToolbarColor = colors[index].toolbarbgcolor;
    createNote();
    update();
  });
});




function show(){
  notesContainer.innerHTML = localStorage.getItem('notes');
  attachEventListeners();
  updateLocalStorage();
  update();
}


show();

function update(){
  localStorage.setItem('notes', notesContainer.innerHTML);
  // attachEventListeners();
  updateLocalStorage();
  // show();
}


function createNote(e){
  let insideDiv = document.createElement('div');
  insideDiv.className = 'inside-div select-div';
  insideDiv.style.backgroundColor = selectedColor;


  let toolbarDiv = document.createElement('div');
  toolbarDiv.className = 'tool-bar';
  toolbarDiv.style.backgroundColor = selectedToolbarColor;

  
  let deleteIcon = document.createElement('i');
  deleteIcon.setAttribute('class', 'fa-solid fa-trash');
  deleteIcon.setAttribute('title', 'delete');

toolbarDiv.appendChild(deleteIcon);
insideDiv.appendChild(toolbarDiv);

const para = document.createElement('p');
para.setAttribute('contenteditable', 'true');
// para.addEventListener('input', update);

para.addEventListener('input', () => {
  if (para.textContent.trim()) {
    update();
  }
});

// update();

deleteIcon.addEventListener('click', ()=>{
  insideDiv.remove();
  update();
})


insideDiv.appendChild(para);
notesContainer.appendChild(insideDiv);

// localStorage.setItem('notes', JSON.stringify(notesData));

update();
// attachEventListeners();
// e.preventDefault();

updateLocalStorage();


}

// Function to attach delete listeners to preloaded notes
function attachEventListeners() {
  const deleteIcons = document.querySelectorAll('.fa-trash');
  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', (event) => {
      const note = event.target.closest('.inside-div');
      note.remove();
      update();
    });
  });
}

createBtn.addEventListener('click', ()=>{
  createNote();
  // attachEventListeners();
  update();
  updateLocalStorage();
})


// 
// =======================      MODE     ====


// const inputEl = document.querySelectorAll('.input');
// const bodyEl = document.querySelector('body');

console.log(inputEl.checked);

// inputEl.checked = false;
// inputEl.checked = localStorage.getItem("mode");
inputEl.checked = JSON.parse(localStorage.getItem('mode')); 
// updateBody();

// update();
updateBody();
// updateLocalStorage();
// update();

function updateBody(){
  if(inputEl.checked){
    bodyEl.style.background = 'black';
    // heading.style.color = '#aa631d';
    headingAndButton.style.background = 'rgb(50, 50, 50)';
    heading.style.color = 'white';
  }
  else{
    bodyEl.style.background = 'white';
    headingAndButton.style.background = ' #d4a37378';
    heading.style.color = '#aa631d';
  }
  updateLocalStorage();
}

inputEl.addEventListener('input', ()=>{
  // update();
  updateBody();
  updateLocalStorage();
})

function updateLocalStorage(){
  localStorage.setItem('mode', JSON.stringify(inputEl.checked));
}
show();