export interface Book {
  isbn: string;
  title: string;
  genre: string;
  amountPages: number;
  author: string;
  description: string;
  avgRating: number;
  ratingCount: number;
}
export const BOOKS: Book[] = [
  {
    isbn: '0123438455178',
    title: 'Amother Test Test',
    genre: 'Test',
    amountPages: 4,
    author: 'Test Person',
    description: 'This is a test book',
    avgRating: 5,
    ratingCount: 300,
  },
  {
    isbn: '9780435123437',
    title: 'Flowers for Algernon',
    genre: 'People with mental disabilities',
    amountPages: 218,
    author: 'Daniel Keyes',
    description: 'Traditional Chinese edition of Flowers for Algernon...',
    avgRating: 4.1,
    ratingCount: 2300,
  },
  {
    isbn: '9781781103142',
    title: 'Harry Potter og De Vises Sten',
    genre: 'Juvenile Fiction',
    amountPages: 336,
    author: 'J.K. Rowling',
    description: 'Da Harry er 11 år, får han at vide...',
    avgRating: 4.8,
    ratingCount: 5400,
  },
  {
    isbn: '0721438935188',
    title: 'Beautiful Test',
    genre: 'Test',
    amountPages: 20,
    author: 'Suzanne Collins',
    description: 'This is a test book',
    avgRating: 3,
    ratingCount: 6000,
  },
  {
    isbn: '9780143127550',
    title: 'The Test Book',
    genre: 'Fiction',
    amountPages: 150,
    author: 'John Doe',
    description: 'A sample description for testing purposes',
    avgRating: 4.5,
    ratingCount: 1200,
  },
  {
    isbn: '9780553293357',
    title: 'Science Test',
    genre: 'Science',
    amountPages: 320,
    author: 'Jane Smith',
    description: 'Another sample book',
    avgRating: 4.2,
    ratingCount: 800,
  },
  {
    isbn: '9780262033848',
    title: 'Algorithms for Everyone',
    genre: 'Education',
    amountPages: 500,
    author: 'Alice Johnson',
    description: 'Learning algorithms made easy',
    avgRating: 4.9,
    ratingCount: 450,
  },
  {
    isbn: '9781491950296',
    title: 'Frontend Testing',
    genre: 'Programming',
    amountPages: 230,
    author: 'Bob Brown',
    description: 'Testing your frontend applications',
    avgRating: 3.8,
    ratingCount: 900,
  },
  {
    isbn: '9780131103627',
    title: 'C Programming Language',
    genre: 'Programming',
    amountPages: 280,
    author: 'Dennis Ritchie',
    description: 'Classic C programming guide',
    avgRating: 4.7,
    ratingCount: 3800,
  },
  {
    isbn: '9780134685991',
    title: 'Effective Java',
    genre: 'Programming',
    amountPages: 416,
    author: 'Joshua Bloch',
    description: 'Best practices for Java programming',
    avgRating: 4.6,
    ratingCount: 2500,
  },
  {
    isbn: '9780000000001',
    title: 'Lonely High Score',
    genre: 'Test',
    amountPages: 100,
    author: 'Solo Reviewer',
    description:
      'A book that only one person reviewed, but gave it a perfect rating.',
    avgRating: 5,
    ratingCount: 1,
  },
];
