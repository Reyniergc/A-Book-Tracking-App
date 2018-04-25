# A-Book-Tracking-App
Project realized during the Udacity Front-End Nano Degree course.


**__Requeriments to run the aplication:__**
- Download and install node.js
- Open the command line in the folder of your project and execute the followings commands:
  - **npm install**. That will install the node dependencies
  - Now start the server -> **npm start**
  - Install node router if is necessary use the following command -> npm install --save react-router-dom
- To run the aplication use the link http://localhost:3000 

**React Official Documentation:**

https://reactjs.org


**__Main goal of the project Book Tracking.__**

The main goal of this project is to create a book tracking aplication. For this purpose we are using React.js a Facebook JavaScript framework.
The aplication is composed by two pages. The inital page shows a list of three types of books (Currently Reading, Want To Read, Read, none) the user
can change the status of a book on the shelf for one of the three types mentioned above or to **none** in this case the book is not in any shelves.

In the search page the user can type into the input to find books and add it to on of the three possibles shelves.

**__Javascript files explanation:__**

- BooksApi.js

This is one of the most important files of the aplication. The aplication uses this file to fetch the books that are displayed in the search page. In this
case the APi to use is the **search APi** that returns a list of books.

The **update APi** is used to add a book and persist information. So that the next time we run the aplication we can see again the books
that was added to the list.

The **getAll APi** is used by the main page to fetch all books availables on the sever and display it on the list.


- SearchBooks.js

A page to search books by title or author.

- App.js

The inital page that shows a list of three types of books (Currently Reading, Want To Read, Read).
