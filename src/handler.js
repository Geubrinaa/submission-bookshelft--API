const main = require("./main");
const { nanoid } = require("nanoid");

const inBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Jika tidak melampirkan properti namepada request body
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  //Jika melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBookS = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  main.push(newBookS);

  //Bila buku berhasil dimasukkan
  const isSuccess = main.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // Bila Buku tidak berhasil dimasukkan
  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};
const outAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  // QUERY NAME
  if (name !== undefined) {
    const filterBookSName = main.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
    const response = h.response({
      status: "success",
      data: {
        books: filterBookSName.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  // QUERY READING
  if (reading !== undefined) {
    const filterBookSRead = main.filter(
      (book) => Number(book.reading) === Number(reading)
    );

    const response = h.response({
      status: "success",
      data: {
        books: filterBookSRead.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  // QUERY FINISHED
  if (finished !== undefined) {
    const filterBookSFinis = main.filter(
      (book) => Number(book.finished) === Number(finished)
    );

    const response = h
      .response({
        status: "success",
        data: {
          books: filterBookSFinis.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);

    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      books: main.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);

  return response;
};
const outBookHandler = (request, h) => {
  const { bookId } = request.params;
  const book = main.filter((book) => book.id === bookId)[0];
  //Bila buku dengan id yang dilampirkan ditemukan,
  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  //Bila buku dengan id yang dilampirkan oleh client tidak ditemukan
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toDateString();
  const index = main.findIndex((book) => book.id === bookId);

  // tidak melampirkan properti name pada request body
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  /*Jika melampirkan nilai properti readPage 
  yang lebih besar dari nilai properti pageCount. */
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    main[index] = {
      ...main[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    //Bila buku berhasil diperbarui
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  //Jika Id yang dilampirkan oleh client tidak ditemukkan oleh server
  const response = h.response({
    status: "fail",
    message: "Gagal memeperbaharui buku. Id tidak di temukan",
  });
  response.code(404);
  return response;
};
const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  if (index !== -1) {
    main.splice(index, 1);
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
  const response = h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });
  response.code(200);
  return response;
};
module.exports = {
  inBookHandler,
  outAllBookHandler,
  outBookHandler,
  editBookHandler,
  deleteBookHandler,
};
