import { AppDataSource } from "../db";
import { Author } from "../models/Author";
export const authorSeeder = async () => {
  try {
    await AppDataSource.initialize()
    const authors = [
      { name: 'Miguel de Cervantes', nationality: 'España' },
      { name: 'Jane Austen', nationality: 'Reino Unido' },
      { name: 'Gabriel García Márquez', nationality: 'Colombia' },
      { name: 'Leo Tolstoy', nationality: 'Rusia' },
      { name: 'Virginia Woolf', nationality: 'Reino Unido' },
      { name: 'Jorge Luis Borges', nationality: 'Argentina' },
      { name: 'Haruki Murakami', nationality: 'Japón' },
      { name: 'Emily Dickinson', nationality: 'Estados Unidos' },
      { name: 'Pablo Neruda', nationality: 'Chile' },
      { name: 'Agatha Christie', nationality: 'Reino Unido' },
      { name: 'Fyodor Dostoevsky', nationality: 'Rusia' },
      { name: 'Maya Angelou', nationality: 'Estados Unidos' },
      { name: 'Albert Camus', nationality: 'Francia' },
      { name: 'Chinua Achebe', nationality: 'Nigeria' },
      { name: 'Isabel Allende', nationality: 'Chile' },
      { name: 'Ernest Hemingway', nationality: 'Estados Unidos' },
      { name: 'Yukio Mishima', nationality: 'Japón' },
      { name: 'Toni Morrison', nationality: 'Estados Unidos' },
      { name: 'Mario Vargas Llosa', nationality: 'Perú' },
      { name: 'Margaret Atwood', nationality: 'Canadá' },
      { name: 'Octavio Paz', nationality: 'México' },
      { name: 'J.K. Rowling', nationality: 'Reino Unido' },
      { name: 'Anton Chekhov', nationality: 'Rusia' },
      { name: 'Sylvia Plath', nationality: 'Estados Unidos' },
      { name: 'Gustave Flaubert', nationality: 'Francia' }
    ];
    const newAuthors = await createAuthors(authors);
    await Author.save(newAuthors);
    console.log('===========================');
    console.log('Authors seeder successfully');
    console.log('===========================');
  } catch (error: any) {
    console.log('===========================');
    console.log('ERROR AUTHOR SEEDER', error.message);
    console.log('===========================');
  } finally {
    await AppDataSource.destroy();
  }
}
const createAuthors = async (authors: any) => {
  const newAUthors: Author[] = []
  authors.forEach((element: any, index: any) => {
    const author = new Author();
    author.id = index + 1;
    author.name = element.name;
    author.nationality = element.nationality;
    newAUthors.push(author)
  });
  return newAUthors;
}