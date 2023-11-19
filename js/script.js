let form = document.querySelector("form");
let booklist = document.querySelector("#book-list");





// Book Class
class Book{
    constructor(title,author,isbn,cover){
        this.title = title;
        this. author = author;
        this.isbn = isbn;
        this.cover = cover;
    }
}



class UI{

    static update(book){
        let div = document.querySelector('#book-list');    
        let row = document.createElement('tr');
        row.innerHTML = `
        <td><div id="cover-img"><img src="${book.cover}" alt=""><div>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        div.appendChild(row);

        }

    static showAlert(message,className){
        let container = document.querySelector('.container');
        let form = document.querySelector('form')
        let div = document.createElement('div');
        div.setAttribute('class', className)
        div.innerHTML = `<p>${message}</p>`
        container.insertBefore(div,form)

        
        setTimeout(()=>{
            let parent = div.parentElement;
            parent.removeChild(div)
        },3000)

    }
    static deleteFromBook(target){
        if(target.hasAttribute('href')){
            let parent = target.parentElement.parentElement
            parent.remove()
            UI.showAlert('Book Removed', "success")            
        }        
    }
}


// Class Store for local storage
class Store{
 static getBooks(){
    let books;
    if(localStorage.getItem("books") === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem("books"))
    }
    return books;
 }

static addBook(book){
    let books = Store.getBooks();
    console.log(typeof(books));
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books))
}
static displayLS(){
    let books = Store.getBooks();

    books.forEach(book=>{

        UI.update(book)
    })
}

static removeSl(isbn){
let books = Store.getBooks();
books.forEach((book, index)=>{
    if(book.isbn === isbn){
        books.splice(index,1);
    }
}) 
localStorage.setItem("books",JSON.stringify(books))   
}

}




// Event listener
form.addEventListener('submit', addBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded',Store.displayLS)


// defining a function

//Add book 
function addBook(e) {
    e.preventDefault();
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value,
    cover = document.querySelector('#cover').value
    let book = new Book(title,author,isbn,cover);

    if(title===""|| author === "" || isbn === ""||cover ===""){
        if(document.querySelector('.error')=== null){

            UI.showAlert("Add all the fileds","error")
        }
    }else{
        UI.update(book);
        
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
        document.querySelector('#cover').value = '';
        
        
        document.querySelector('#title').focus();
        
        if(document.querySelector('.error')=== null){
            
            UI.showAlert("Book Added","success")
            
            Store.addBook(book);
            
        }
    }  
  
        
}

function removeBook(e){
   e.preventDefault()
    
   if(confirm("Are you confirm?")){
    UI.deleteFromBook(e.target);   
    Store.removeSl(e.target.parentElement.previousElementSibling.textContent)
   }
       
        
}