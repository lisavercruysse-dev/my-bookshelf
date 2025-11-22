export interface Book {
  isbn: string;
  title: string;
  genre: string;
  amountPages: number;
  author: string;
  description: string;
}

export interface Review {
  id: number;
  isbn: string;
  userId: number;
  body: string;
  stars: number;
  date: Date;
  title: string;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    isbn: '9780435123437',
    userId: 2,
    body: 'An emotional and thought-provoking story. I loved every chapter.',
    stars: 5,
    date: new Date('2024-04-12'),
    title: 'Beautiful and heartbreaking',
  },
  {
    id: 2,
    isbn: '9780435123437',
    userId: 4,
    body: 'Great concept but a bit slow in the middle.',
    stars: 4,
    date: new Date('2024-03-28'),
    title: 'Slow but powerful',
  },
  {
    id: 3,
    isbn: '9781781103142',
    userId: 1,
    body: 'A magical classic. Reread it every year.',
    stars: 5,
    date: new Date('2024-05-01'),
    title: 'Timeless',
  },
  {
    id: 4,
    isbn: '9781781103142',
    userId: 7,
    body: 'Still fun, but the pacing feels uneven now.',
    stars: 4,
    date: new Date('2024-04-02'),
    title: 'Good but not perfect',
  },
  {
    id: 5,
    isbn: '0123438455178',
    userId: 3,
    body: 'Simple but surprisingly engaging. A short and fun read.',
    stars: 4,
    date: new Date('2024-01-18'),
    title: 'Unexpectedly nice',
  },
  {
    id: 6,
    isbn: '0123438455178',
    userId: 6,
    body: "Didn't connect with it at all.",
    stars: 2,
    date: new Date('2024-02-25'),
    title: 'Not for me',
  },
  {
    id: 7,
    isbn: '0721438935188',
    userId: 8,
    body: 'Honestly not great, felt rushed.',
    stars: 2,
    date: new Date('2024-03-05'),
    title: 'Disappointing',
  },
  {
    id: 8,
    isbn: '0721438935188',
    userId: 5,
    body: 'A well-written story with strong themes.',
    stars: 4,
    date: new Date('2024-03-22'),
    title: 'Solid book',
  },
  {
    id: 9,
    isbn: '0721438935188',
    userId: 9,
    body: 'Amazing worldbuilding and characters.',
    stars: 5,
    date: new Date('2024-02-14'),
    title: 'Loved it!',
  },
  {
    id: 10,
    isbn: '9780435123437',
    userId: 10,
    body: 'Interesting ideas but found the writing uneven.',
    stars: 3,
    date: new Date('2024-01-30'),
    title: 'Mixed feelings',
  },
];

export const BOOKS: Book[] = [
  {
    isbn: '0123438455178',
    title: 'Amother Test Test',
    genre: 'Test',
    amountPages: 4,
    author: 'Test Person',
    description: 'This is a test book',
  },
  {
    isbn: '9780435123437',
    title: 'Flowers for Algernon',
    genre: 'People with mental disabilities',
    amountPages: 218,
    author: 'Daniel Keyes',
    description: 'Traditional Chinese edition of Flowers for Algernon...',
  },
  {
    isbn: '9781781103142',
    title: 'Harry Potter og De Vises Sten',
    genre: 'Juvenile Fiction',
    amountPages: 336,
    author: 'J.K. Rowling',
    description: 'Da Harry er 11 år, får han at vide...',
  },
  {
    isbn: '0721438935188',
    title: 'Beautiful Test',
    genre: 'Test',
    amountPages: 20,
    author: 'Suzanne Collins',
    description: 'This is a test book',
  },
  {
    isbn: '9780143127550',
    title: 'The Test Book',
    genre: 'Fiction',
    amountPages: 150,
    author: 'John Doe',
    description: 'A sample description for testing purposes',
  },
  {
    isbn: '9780553293357',
    title: 'Science Test',
    genre: 'Science',
    amountPages: 320,
    author: 'Jane Smith',
    description: 'Another sample book',
  },
  {
    isbn: '9780262033848',
    title: 'Algorithms for Everyone',
    genre: 'Education',
    amountPages: 500,
    author: 'Alice Johnson',
    description: 'Learning algorithms made easy',
  },
  {
    isbn: '9781491950296',
    title: 'Frontend Testing',
    genre: 'Programming',
    amountPages: 230,
    author: 'Bob Brown',
    description: 'Testing your frontend applications',
  },
  {
    isbn: '9780131103627',
    title: 'C Programming Language',
    genre: 'Programming',
    amountPages: 280,
    author: 'Dennis Ritchie',
    description: 'Classic C programming guide',
  },
  {
    isbn: '9780134685991',
    title: 'Effective Java',
    genre: 'Programming',
    amountPages: 416,
    author: 'Joshua Bloch',
    description: 'Best practices for Java programming',
  },
  {
    isbn: '9780000000001',
    title: 'Lonely High Score',
    genre: 'Test',
    amountPages: 100,
    author: 'Solo Reviewer',
    description:
      'A book that only one person reviewed, but gave it a perfect rating.',
  },
];
