export interface Book {
  isbn: string;
  title: string;
  genre: string;
  amountPages: number;
  author: string;
  description: string;
}

export const BOOKS: Book[] = [
  {
    isbn: '9780435123437',
    title: 'Flowers for Algernon',
    genre: 'People with mental disabilities',
    amountPages: 218,
    author: 'Daniel Keyes',
    description: `Traditional Chinese edition of *Flowers for Algernon*, 
    the Daniel Keyes classic. Charlie, a simple young man who was born with a 
    very low IQ, became a perfect subject for an experimental surgery to improve 
    his intelligence—an experiment that was successful for Algernon, a mouse. 
    A novella that won the Hugo Award in 1960 and the Nebula in 1966 and inspired 
    the film *Charly*, for which Cliff Robertson received an Oscar for Best Actor 
    in 1969. In Chinese. Distributed by Tsai Fong Books, Inc.`,
  },
  {
    isbn: '9781781103142',
    title: 'Harry Potter og De Vises Sten',
    genre: 'Juvenile Fiction',
    amountPages: 336,
    author: 'J.K. Rowling',
    description: `Da Harry er 11 år, får han at vide, at hans far var en berømt 
    og respekteret troldmand, og hans mor en overordentlig dygtig heks. Harry er 
    også selv troldmand og skal starte på Hogwarts skole for heksekunster og troldmandsskab. 
    Han skal bl.a. medbringe tryllestav, troldmandshat og enten en kat, en ugle eller en tudse - 
    og så starter et eventyrligt liv for Harry, der skal lære et hav af magiske tricks og desuden 
    må tage kampen op mod den onde troldmand, der dræbte hans forældre.`,
  },
];
