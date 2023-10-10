const {
  inBookHandler,
  outAllBookHandler,
  outBookHandler,
  editBookHandler,
  deleteBookHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: inBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: outAllBookHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: outBookHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookHandler,
  },
  {
    method: "DELETE",
    path: "/books/{booksId}",
    handler: deleteBookHandler,
  },
];

module.exports = routes;
