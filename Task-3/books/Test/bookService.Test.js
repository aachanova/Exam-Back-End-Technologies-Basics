import { expect } from "chai";
import { bookService } from "../bookService.js";

describe("Book Service Tests", function () {

    describe("getBooks()", function () {
        it('Should return a status 200 and an array of books', function () {
            const response = bookService.getBooks();
            expect(response.status).to.equal(200);
            expect(response.data.at(0)).to.have.all.keys('id', 'title', 'author', 'year', 'genre');
        })
        // Test: Should return a status 200 and an array of books
        // 1. Verify that the response status is 200.
        // 2. Check that the first book includes the required keys: 'id', 'title', 'author', 'year', 'genre'.

    });

    describe("addBook()", function () {
        it('Should add a new book successfully', function () {
            const bookToAdd = { id: "4", title: "The Great Gatsby4", author: "F. Scott Fitzgerald4", year: 1925, genre: "Classic4" };

            const response = bookService.addBook(bookToAdd);
            expect(response.status).to.equal(201);
            expect(response.message).to.equal('Book added successfully.');
            expect(bookService.getBooks().data).to.deep.include(bookToAdd);
        })


        // Test: Should add a new book successfully
        // 1. Create a new valid book object.
        // 2. Verify the response status is 201 and the success message is correct.
        // 3. Verify that the newly added book is present in the book list.

        it('Should return status 400 when adding a book with missing fields', function () {
            const invalidBook = { year: 1925, genre: "Classic4" };

            const response = bookService.addBook(invalidBook);
            expect(response.status).to.equal(400);
            expect(response.error).to.equal('Invalid Book Data!');
        })
        // Test: Should return status 400 when adding a book with missing fields
        // 1. Create an invalid book object with missing fields.
        // 2. Check if the response status is 400 and the error message is "Invalid Book Data!".
    });

    describe("deleteBook()", function () {
        it('Should delete a book by id successfully', function () {

            const bookForDeletion = { id: "7", title: "To Kill a Mockingbird7", author: "Harper Lee", year: 1960, genre: "Fiction7" }

            bookService.addBook(bookForDeletion);
            const initalLength = bookService.getBooks().data.length;

            const response = bookService.deleteBook('7');
            expect(response.status).to.equal(200);
            expect(response.message).to.equal('Book deleted successfully.');

            const lengthAfterDeletion = bookService.getBooks().data.length;
            expect(initalLength).to.equal(lengthAfterDeletion + 1);
        })
        // Test: Should delete a book by id successfully
        // 1. Add a book and then delete it by its ID.
        // 2. Verify the response status is 200 and the success message is correct.
        // 3. Ensure the book count returns the sum of the initial count of the books and the count of the added books from the tests

        it('Should return status 404 when deleting a book with a non-existent id', function () {
            const response = bookService.deleteBook('465');
            expect(response.status).to.equal(404);
            expect(response.error).to.equal('Book Not Found!');
        })
        // Test: Should return status 404 when deleting a book with a non-existent id
        // 1. Attempt to delete a book with a non-existent ID.
        // 2. Check that the response status is 404 and the error message is "Book Not Found!".
    });

    describe("updateBook()", function () {
        const currentBook = { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Classic" };

        const updatedBook = { id: "3", title: "The Great Gatsby9", author: "F. Scott Fitzgerald9", year: 1925, genre: "Classic" };
        
        it('Should update a book successfully', function () {

            const response = bookService.updateBook('3', updatedBook);
            expect(response.status).to.equal(200);
            expect(response.message).to.equal('Book updated successfully.');
            expect(bookService.getBooks().data).to.deep.include(updatedBook);
            expect(bookService.getBooks().data).to.not.deep.include(currentBook);
        })
        // Test: Should update a book successfully
        // 1. Create updated data for an existing book.
        // 2. Verify the response status is 200 and the success message is correct.
        // 3. Ensure that the updated book fields reflect the new data.
        it('Should return status 404 when updating a non-existent book', function () {
            const response = bookService.updateBook('26566', updatedBook);
            expect(response.status).to.equal(404);
            expect(response.error).to.equal('Book Not Found!');
        })
        // Test: Should return status 404 when updating a non-existent book
        // 1. Attempt to update a book that doesn't exist.
        // 2. Check that the response status is 404 and the error message is "Book Not Found!".

        it('Should return status 400 when updating with incomplete book data', function() {
            const invalidUpdatedBook = {title: "The Great Gatsby", author: "F. Scott Fitzgerald"};

            const response = bookService.updateBook('1', invalidUpdatedBook);
            expect(response.status).to.equal(400);
            expect(response.error).to.equal('Invalid Book Data!');

        })
        // Test: Should return status 400 when updating with incomplete book data
        // 1. Provide an incomplete book object with missing fields.
        // 2. Verify that the response status is 400 and the error message is "Invalid Book Data!".

    });
});
