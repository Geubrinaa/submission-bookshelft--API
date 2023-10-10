const {
  inBookHandler,
  outAllBookHandler,
  outBookHandler,
  editBookHandler,
  deleteBookHandler,
} = require("./handler");

const routes = [
  // API untuk menyimpan data buku
  {
    method: "POST",
    path: "/books",
    handler: inBookHandler,
  },
  // API untuk menampilkan seluruh buku
  {
    method: "GET",
    path: "/books",
    handler: outAllBookHandler,
  },
  // API untuk menampilkan detail buku
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: outBookHandler,
  },
  // API untuk mengubah data buku
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookHandler,
  },
  // API untuk menghapus data buku
  {
    method: "DELETE",
    path: "/books/{booksId}",
    handler: deleteBookHandler,
  },
];

module.exports = routes;
