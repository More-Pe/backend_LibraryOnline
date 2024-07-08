import { AppDataSource } from "../db";
import { Book } from "../models/Book";

export const bookSeeders = async () => {
  try {
    await AppDataSource.initialize();

    const books = [
      {
        title: "Don Quijote de la Mancha",
        description:
          "Novela de caballerías que sigue las aventuras del noble español Alonso Quixano, que se hace llamar don Quijote.",
      },

      {
        title: "Orgullo y prejuicio",
        description:
          "Novela romántica que sigue la vida de las hermanas Bennet y sus experiencias con el amor y la sociedad en el siglo XIX.",
      },

      {
        title: "Cien años de soledad",
        description:
          "Novela mágica que sigue la historia de la familia Buendía en el pueblo ficticio de Macondo.",
      },

      {
        title: "Guerra y paz",
        description:
          "Novela épica que sigue la vida de varios personajes durante la invasión napoleónica de Rusia.",
      },

      {
        title: "Mrs. Dalloway",
        description:
          "Novela que sigue la vida de Clarissa Dalloway mientras se prepara para una fiesta en Londres después de la Primera Guerra Mundial.",
      },

      {
        title: "Ficciones",
        description:
          "Colección de cuentos que exploran la filosofía, la metafísica y la literatura.",
      },

      {
        title: "Norwegian Wood",
        description:
          "Novela que sigue la vida de un joven japonés en la década de 1960 mientras lucha con la pérdida y el amor.",
      },

      {
        title: "Poemas",
        description:
          "Colección de poemas que exploran la naturaleza, la muerte y la vida interior.",
      },

      {
        title: "Veinte poemas de amor y una canción desesperada",
        description: "Colección de poemas que exploran el amor y la pasión.",
      },

      {
        title: "Asesinato en el Orient Express",
        description:
          "Novela de misterio que sigue al detective Hercule Poirot mientras resuelve un asesinato en un tren.",
      },

      {
        title: "Crimen y castigo",
        description:
          "Novela que sigue la historia de un joven que comete un asesinato y lucha con la culpa y la redención.",
      },

      {
        title: "I Know Why the Caged Bird Sings",
        description:
          "Autobiografía que sigue la vida de la autora desde su infancia hasta su adultez.",
      },

      {
        title: "La peste",
        description:
          "Novela que sigue la historia de un médico que lucha contra una epidemia en una ciudad argelina.",
      },

      {
        title: "Things Fall Apart",
        description:
          "Novela que sigue la historia de un hombre igbo en Nigeria durante la colonización británica.",
      },

      {
        title: "La casa de los espíritus",
        description:
          "Novela que sigue la historia de varias generaciones de una familia chilena.",
      },

      {
        title: "El viejo y el mar",
        description:
          "Novela que sigue la historia de un anciano pescador que lucha con un gran tiburón.",
      },

      {
        title: "El templo del oro",
        description:
          "Novela que sigue la historia de un joven japonés que se obsesiona con un templo budista.",
      },

      {
        title: "Beloved",
        description:
          "Novela que sigue la historia de una esclava que huye hacia la libertad en el siglo XIX.",
      },

      {
        title: "La ciudad y los perros",
        description:
          "Novela que sigue la historia de un grupo de jóvenes en un colegio militar en Perú.",
      },

      {
        title: "The Handmaid's Tale",
        description:
          "Novela de ciencia ficción que sigue la historia de una mujer en una sociedad totalitaria.",
      },

      {
        title: "El laberinto de la soledad",
        description: "Ensayo que explora la identidad mexicana y la cultura.",
      },

      {
        title: "Harry Potter y la piedra filosofal",
        description:
          "Novela de fantasía que sigue la historia de un joven mago en una escuela de magia.",
      },

      {
        title: "La dama del perrito",
        description:
          "Cuento que sigue la historia de un hombre que se enamora de una mujer casada en un balneario ruso.",
      },

      {
        title: "The Bell Jar",
        description:
          "Novela semi-autobiográfica que sigue la historia de una joven que lucha con la depresión y la identidad.",
      },

      {
        title: "Madame Bovary",
        description:
          "Novela que sigue la historia de una mujer que se siente atrapada en su matrimonio y busca la emoción en la provincia francesa.",
      },
    ];
    const newBooks = await createBooks(books);

    await Book.save(newBooks);

    console.log("===========================");
    console.log("Books seeder successfully");
    console.log("===========================");
  } catch (error: any) {
    console.log("===========================");
    console.log("ERROR BOOK SEEDER", error.message);
    console.log("===========================");
  } finally {
    await AppDataSource.destroy();
  }
};

const createBooks = async (books: any) => {
  const newBooks: Book[] = [];
  books.forEach((element: any, index: any) => {
    const book = new Book();
    book.id = index + 1;
    book.title = element.title;
    book.description = element.description;
    book.authorId = index + 1;
    newBooks.push(book);
  });

  return newBooks;
};
