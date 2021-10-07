const library = document.querySelector(".library");
const bookIn = document.querySelector(".book");
const authorIn = document.querySelector(".author");


let myLibrary = [];


function Book(name, author) {   
    this.name = name;
    this.author = author;
    this.status = 'incomplete';
    this.id = 0;
    this.assignId = function() {
        const arrayId = myLibrary.map(a => a.id);
        randomId = getRandomInt(1000);
        if (arrayId.includes(randomId)) {
            this.assignId();
        }
        else {
            this.id = randomId;
        }
    }
}

function addBookToLibrary(){
    let book1 = new Book(bookIn.value, authorIn.value);
    book1.assignId();
    myLibrary.push(book1);
    updateLibrary();
    console.table (myLibrary);   
    // return false;
}

function updateLibrary() {
    library.innerHTML = '';


    for (i=0; i<myLibrary.length; i++) {
        let libraryItem = document.createElement('div');
        let targetId = myLibrary[i].id;

        libraryItem.className = "libraryItem";
        libraryItem.innerHTML = `<p>${myLibrary[i].name} <p>${myLibrary[i].author}`;
        addToggleRead(libraryItem, targetId);
        addDelete(libraryItem, targetId);
        library.appendChild(libraryItem);  
    }
 
     
}


function addToggleRead(parent, targetId) {
    let toggleRead = document.createElement('div');
    let indexId = myLibrary.findIndex (o => o.id === targetId);
    
    if (myLibrary[indexId].status == 'incomplete') {
        toggleRead.className = "incomplete";
        toggleRead.textContent = "not read";
    }
    else {
        toggleRead.className = "complete";
        toggleRead.textContent = "complete";
    }

    toggleRead.onclick = function() {
        
        if (myLibrary[indexId].status == 'incomplete') {
            myLibrary[indexId].status = 'complete';
        }
        else {
            myLibrary[indexId].status = 'incomplete';
        }
        console.table (myLibrary);
        this.classList.toggle ('complete');
        this.textContent == 'not read' ? this.textContent = 'complete' : this.textContent ='not read';        
    };
    parent.appendChild(toggleRead);
}


function addDelete(parent, targetId) {
    let deleteButton = document.createElement('div');
    deleteButton.className = "delete";
    deleteButton.textContent = 'X';
    deleteButton.onclick = function () {
        let indexId = myLibrary.findIndex (o => o.id === targetId);
        myLibrary.splice( indexId, 1 );
        updateLibrary();
    };
    parent.appendChild(deleteButton);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
