const express = require('express');
const route = express.Router();

const database = require('../database');

//adding book details
route.post('/addbookInfo',(req,res)=>{

    const {bookname,bookAuthor,bookGenre}= req.body;
    if(!bookname||!bookAuthor||!bookGenre){

      return  res.status(400).send("All fields are required and must be entered");
    }

    const counter = database.push({

        bookname,
        bookAuthor,
        bookGenre
    });

    
    return  res.status(200).send({status:"OK",msg: "Book added successfully",database});
})

//Get a list of the books info

route.get('/getAllInfo',(req,res)=>{

    if(database.length === 0){

        let msg = "Book directory is empty"
        return res.status(400).send(msg);
    }
    res.status(200).send({status:"OK",msg: "All books info gotten successfully",database});


})


// Get all book authors
route.get('/getAllAuthors',(req,res)=>{

    const authors = database.map((database) => database.bookAuthor);

    if(authors.length === 0){

        return res.send('There are no authors in the database currently');
    }
    res.status(200).send({status:"OK",msg: "All Authors gotten successfully",authors});
})

//Get all book titles

route.get('/getAllTitles',(req,res)=>{

    const bTitle = database.map((database) => database.bookName);

    if(bTitle.length === 0){

        return res.send('There are no book titles in the database currently');
    }
    res.status(200).send({status:"OK",msg: "All book titles gotten successfully",bTitle});
})

// Get the genre of all the books

route.get('/getAllGenre',(req,res)=>{

    const bGenre = database.map((database) => database.bookGenre);

    if(bGenre.length === 0){

        return res.send('There are no book titles in the database currently');
    }
    res.status(200).send({status:"OK",msg: "All book genre gotten successfully",bGenre});
})


//Get all the info of a book by specifying the book name

route.post('/infoOfBook',(req,res)=>{

    const {bookName} = req.body;

    console.log(bookName)
    if(!bookName){
        return res.send("Please specify a book time");
    }

    const info = database.filter((database) => database.bookName === bookName)

    if(info.length === 0){
        return res.send("There is no  book with this title in the database");
    }
    res.status(200).send({status:"OK",msg: "Book info gotten successfully",info});
})


// Get the names of all the books written by a particuler author

route.post('/getAuthorBook',(req,res)=>{

    const {author}= req.body;

    if(!author){

        return res.send("Please provide an author's name");
    }


    const dName = database.filter((database) => {
            return database.bookAuthor==author});

    const bName = dName.map((dName) => dName.bookName);

    if(bName.length === 0){

        return res.send('There are no book titles in the database currently');
    }
    res.status(200).send({status:"OK",msg: "All book titles written by author gotten successfully",bName});
})


// Gets the names of all the books in with the same genre

route.post('/getGenreBooks',(req,res)=>{

    const {genre} = req.body;

    if(!genre){

        return res.send("No genre was specified");
    }

    const gname = database.filter((database)=> database.bookGenre === genre)

    if(gname.length ===0){

        return res.status(400).send('The genre specified does note exist in this database')
    }

    const genrebooks = gname.map((gname)=> gname.bookName);

    res.status(200).send({status:"OK",msg: "All book titles with this genre gotten successfully",genrebooks});

})


//Updating any info about a specific book

route.post('/update',(req,res)=>{

    const {bookName,newName,bookAuthor, bookGenre} = req.body;

    if(!bookName|| !newName){
        return res.send("Please specify the book titles");
    }


    const bInfo = database.filter((database) => database.bookName === bookName)

    const info = bInfo[0];

    if(info === undefined){

        return res.send("There is no  book with this title in the database");

    }
    info.bookName = newName? newName: info.bookName
    info.bookAuthor = bookAuthor? bookAuthor: info.bookAuthor
    info.bookGenre = bookGenre? bookGenre: info.bookGenre

    res.status(200).send({status:"OK",msg: "Book info gotten successfully",info});
})

//Deleting a book and all its details
route.post('/deleteBook',(req,res)=>{

    const {bookName} = req.body
    let index = -1;
    const found = database.some((database)=> {
        index++;
        return database.bookName === bookName;
    });

    const bookInfo = database.splice(index,1)

    res.status(200).send({status:"OK",msg: "Book info gotten successfully",database});

})



module.exports = route;