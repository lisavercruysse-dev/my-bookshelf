import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';
import * as argon2 from 'argon2';
import { Role } from '../auth/roles';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    hashLength: 32,
    timeCost: 2,
    memoryCost: 2 ** 16,
  });
}

async function resetDatabase() {
  console.log('Resetting database...');

  console.log('Deleting existing data...');

  await db.delete(schema.shelfBooks);
  await db.delete(schema.reviews);
  await db.delete(schema.shelves);
  await db.delete(schema.books);
  await db.delete(schema.users);

  console.log('Existing data deleted.');

  console.log('Resetting AUTO_INCREMENT counters...');

  await db.execute(`ALTER TABLE reviews AUTO_INCREMENT = 1`);
  await db.execute(`ALTER TABLE users AUTO_INCREMENT = 1`);
  await db.execute(`ALTER TABLE shelves AUTO_INCREMENT = 1`);

  console.log('AUTO_INCREMENT counters reset.');

  console.log('Database reset complete.');
}

async function seedBooks() {
  console.log('Seeding books...');

  await db.insert(schema.books).values([
    {
      isbn: '9781781103326',
      title: 'Harry Potter en de Steen der Wijzen',
      genre: 'Juvenile Fiction',
      description:
        'Met een speciale trein die vertrekt van perron 93⁄4 belandt Harry Potter op Zweinsteins Hogeschool voor Hekserij en Hocus Pocus, waar hij alles leert over bezemstelen, toverdranken en monsters. En uiteindelijk moet hij het opnemen tegen zijn aartsvijand Voldemort, een levensgevaarlijke tovenaar.',
      pageCount: 318,
      author: 'J.K. Rowling',
      imageLink:
        'http://books.google.com/books/content?id=gDUQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    {
      isbn: '9781781103487',
      title: 'Harry Potter en de Gevangene van Azkaban',
      genre: 'Juvenile Fiction',
      description:
        'Voordat Harry Potter aan zijn derde jaar op Zweinstein kan beginnen, moet hij de zomervakantie bij zijn gemene oom en tante doorbrengen. Door een magisch ongeluk komt hij ‘s avonds laat op straat te staan. Dan blijkt dat Sirius Zwarts, een beruchte volgeling van Jeweetwel, uit de gevangenis van Azkaban is ontsnapt. Hij is op de vlucht en heeft het wellicht op Harry gemunt. Er volgt een enerverend schooljaar met nieuwe vakken als Dreuzelkunde en Zorg voor Fabeldieren, spannende Zwerkbalwedstrijden en griezelige voorspellingen. De school wordt bewaakt door Dementors, de gevreesde bewakers van Azkaban, en Harry zal zijn lessen Verweer tegen de Zwarte Kunsten hard nodig hebben.',
      pageCount: 450,
      author: 'J.K. Rowling',
      imageLink:
        'http://books.google.com/books/content?id=7zUQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    {
      isbn: '9789020554076',
      title: 'Fourth Wing: In steen gebrand',
      genre: 'Fiction',
      description:
        "'In steen gebrand' van Rebecca Yarros is het eerste deel van de populaire Fourth Wing-fantasyserie over Violet. Haar droom om scribent te worden aan het befaamde Basgiath Oorlogscollege valt in duigen wanneer de generaal – oftewel haar moeder – haar opdraagt deel te nemen aan het selectieproces van de Drakenrijders. De helft van de cadetten zal het eerste jaar niet overleven en de meesten willen Violet vanwege haar afkomst uit de weg ruimen – vooral Xaden, de meedogenloze (en aantrekkelijke) leider van het squadron. Violet moet alles op alles zetten om te overleven, want op Basgiath zijn er maar twee opties: afstuderen of sterven.",
      pageCount: 745,
      author: 'Rebecca Yarros',
      imageLink:
        'http://books.google.com/books/content?id=_NrbEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    {
      isbn: '9781476738031',
      title: 'A Man Called Ove',
      genre: 'Fiction',
      description:
        'Meet Ove. He’s a curmudgeon—the kind of man who points at people he dislikes as if they were burglars caught outside his bedroom window. He has staunch principles, strict routines, and a short fuse. People call him “the bitter neighbor from hell.” But must Ove be bitter just because he doesn’t walk around with a smile plastered to his face all the time? Behind the cranky exterior there is a story and a sadness. So when one November morning a chatty young couple with two chatty young daughters move in next door and accidentally flatten Ove’s mailbox, it is the lead-in to a comical and heartwarming tale of unkempt cats, unexpected friendship, and the ancient art of backing up a U-Haul.',
      pageCount: 368,
      author: 'Fredrik Backman',
      imageLink:
        'http://books.google.com/books/content?id=7mtNAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    {
      isbn: '9781429914567',
      title: 'Mistborn: The Final Empire',
      genre: 'Fiction',
      description:
        'Once, a hero arose to save the world. He failed. Ever since, the world has been a wasteland of ash and mist controlled by the immortal emperor known as the Lord Ruler. But hope survives. A new uprising is forming, one built around the ultimate caper, the cunning of a brilliant criminal mastermind, and the determination of an unlikely heroine: a street urchin who must learn to master the power of a Mistborn.',
      pageCount: 686,
      author: 'Brandon Sanderson',
      imageLink:
        'http://books.google.com/books/content?id=t_ZYYXZq4RgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    {
      isbn: '9781982114350',
      title: 'Beartown',
      genre: 'Fiction',
      description:
        'People say Beartown is finished. A tiny community nestled deep in the forest, it is slowly losing ground to the ever encroaching trees. But down by the lake stands an old ice rink, built generations ago by the working men who founded this town. And in that ice rink is the reason people in Beartown believe tomorrow will be better than today. Their junior ice hockey team is about to compete in the national semi-finals, and they actually have a shot at winning. All the hopes and dreams of this place now rest on the shoulders of a handful of teenage boys.',
      pageCount: 448,
      author: 'Fredrik Backman',
      imageLink:
        'http://books.google.com/books/content?id=t-OKDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    {
      isbn: '9780008239824',
      title: 'The Poppy War',
      genre: 'Fiction',
      description:
        'Winner of the Reddit Fantasy Award for Best Debut 2018. When Rin aced the Keju - the test to find the most talented students in the Empire - it was a shock to everyone: to the test officials, who couldn’t believe a war orphan from Rooster Province could pass without cheating; to Rin’s guardians, who believed they’d finally be able to marry her off and further their criminal enterprise; and to Rin herself, who realized she was finally free of the servitude her family had been trapping her into.',
      pageCount: 511,
      author: 'R.F. Kuang',
      imageLink:
        'http://books.google.com/books/content?id=Vg89DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
  ]);

  console.log('Book seed data inserted successfully.');
}

async function seedUsers() {
  console.log('Seeding users...');

  await db.insert(schema.users).values([
    {
      userName: 'Sofie Vermeulen',
      email: 'sofie.vermeulen82@example.com',
      passwordHash: await hashPassword('Zonnebloem!47'),
      roles: [Role.USER],
    },
    {
      userName: 'Bob Callahan',
      email: 'bob.callahan@example.com',
      passwordHash: await hashPassword('example1'),
      roles: [Role.USER],
    },
    {
      userName: 'Charlotte Dubois',
      email: 'c.dubois91@example.com',
      passwordHash: await hashPassword('Marmotte#2019'),
      roles: [Role.USER],
    },
  ]);

  console.log('User seed data inserted successfully.');
}

async function seedReviews() {
  console.log('Seeding reviews...');

  await db.insert(schema.reviews).values([
    {
      isbn: '9781781103326', // Harry Potter en de Steen der Wijzen
      userId: 2, // Bob
      body: '<p>The one that started it all. <strong>Still holds up</strong> after all these years.</p><p></p><blockquote><p>Nobody believes it\u2019s real magic until they read it for the first time.</p></blockquote><p>Perfect introduction for younger readers, and <em>plenty of charm</em> for adults too.</p>',
      stars: 5,
      date: new Date('2023-01-15'),
      title: 'Where the magic begins',
      recommended: true,
    },
    {
      isbn: '9781781103487', // Harry Potter en de Gevangene van Azkaban
      userId: 2, // Bob
      body: '<p>Out of the first three, this one is easily <strong>my favorite so far.</strong></p><p></p><p>Sirius Zwarts hangs over the whole book like a shadow, and the Dementors are genuinely one of the creepiest things Rowling has come up with.</p><p></p><blockquote><p>The Marauder\u2019s Map and the time-turner twist at the end had me flipping back through earlier chapters to catch everything I missed.</p></blockquote><p></p><p>Lupin is <em>such</em> a good addition to the cast, and the ending hits <strong><em>way</em></strong> harder than I expected going in.</p>',
      stars: 4,
      date: new Date('2026-08-13'),
      title: 'The series really finds its footing here',
      recommended: true,
    },
    {
      isbn: '9789020554076', // Fourth Wing
      userId: 3, // Charlotte
      body: '<p>I picked this up because of TikTok and honestly, <strong>I get the hype now.</strong></p><p></p><blockquote><p>Basgiath is brutal, and so is the pacing \u2013 in a good way.</p></blockquote><p>Violet is easy to root for and Xaden is, well, <em>exactly what you\u2019d expect.</em></p>',
      stars: 5,
      date: new Date('2024-03-02'),
      title: 'Devoured this in two days',
      recommended: true,
    },
    {
      isbn: '9781476738031', // A Man Called Ove
      userId: 1, // Sofie
      body: '<p>Started slow but ended up <strong>completely wrecking me.</strong></p><p></p><p>Ove is grumpy in the way a lot of us have someone grumpy in our lives, and the book slowly peels back <em>why</em> he is the way he is.</p><p></p><blockquote><p>Bring tissues for the last third.</p></blockquote>',
      stars: 5,
      date: new Date('2023-11-20'),
      title: 'Made me cry on the train',
      recommended: true,
    },
    {
      isbn: '9781429914567', // Mistborn
      userId: 3, // Charlotte
      body: '<p>Sanderson\u2019s magic system in this one is <strong>genuinely one of the best</strong> I\u2019ve read.</p><p></p><p>Vin\u2019s arc from street urchin to something much more is handled really well, though <em>the middle third does drag a little.</em></p>',
      stars: 4,
      date: new Date('2023-07-09'),
      title: 'Allomancy is criminally underrated',
      recommended: true,
    },
    {
      isbn: '9781982114350', // Beartown
      userId: 1, // Sofie
      body: '<p>Heavy subject matter, handled with a lot of care.</p><p></p><blockquote><p>This book is about a town more than it is about hockey.</p></blockquote><p>Backman writes an <strong>entire community</strong> so well you\u2019ll recognize people you know in it.</p>',
      stars: 5,
      date: new Date('2024-01-18'),
      title: 'Not really about hockey',
      recommended: true,
    },
    {
      isbn: '9780008239824', // The Poppy War
      userId: 3, // Charlotte
      body: '<p>Starts like a fairly standard \u201cchosen one at magic school\u201d story and then <strong>absolutely does not stay that way.</strong></p><p></p><p>Fair warning: <em>the back half gets very dark, very fast.</em> Not for the faint of heart, but incredibly well written.</p>',
      stars: 4,
      date: new Date('2024-05-27'),
      title: 'Do not judge this by the first 100 pages',
      recommended: false,
    },
    {
      isbn: '9780008239824', // The Poppy War
      userId: 2, // Bob
      body: '<p>Rin is a fascinating, flawed protagonist and the worldbuilding pulls heavily from real history, which <strong>adds a lot of weight</strong> to the story.</p><p></p><blockquote><p>One of the best fantasy debuts I\u2019ve read in years.</p></blockquote>',
      stars: 5,
      date: new Date('2024-06-14'),
      title: 'Unflinching and unforgettable',
      recommended: true,
    },
  ]);

  console.log('Review seed data inserted successfully.');
}

async function seedShelves() {
  console.log('Seeding shelves...');

  await db.insert(schema.shelves).values([
    // Sofie (userId 1) - shelfIds 1-4
    {
      title: 'Favorites',
      userId: 1,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Want to Read',
      userId: 1,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Finished',
      userId: 1,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Current Reads',
      userId: 1,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    // Bob (userId 2) - shelfIds 5-8
    {
      title: 'Favorites',
      userId: 2,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Want to Read',
      userId: 2,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Finished',
      userId: 2,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Current Reads',
      userId: 2,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    // Charlotte (userId 3) - shelfIds 9-12
    {
      title: 'Favorites',
      userId: 3,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Want to Read',
      userId: 3,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Finished',
      userId: 3,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Current Reads',
      userId: 3,
      canDelete: false,
      dateAdded: new Date('2026-08-09'),
    },
  ]);

  console.log('Shelves seed data inserted successfully.');
}

async function seedShelfBooks() {
  console.log('Seeding shelfBooks...');

  await db.insert(schema.shelfBooks).values([
    // Sofie (shelves 1-4): Favorites / Want to Read / Finished / Current Reads
    { shelfId: 1, isbn: '9781781103326' }, // Favorites - HP Steen der Wijzen
    { shelfId: 2, isbn: '9780008239824' }, // Want to Read - The Poppy War
    { shelfId: 3, isbn: '9781476738031' }, // Finished - A Man Called Ove (reviewed)
    { shelfId: 3, isbn: '9781982114350' }, // Finished - Beartown (reviewed)

    // Bob (shelves 5-8): Favorites / Want to Read / Finished / Current Reads
    { shelfId: 5, isbn: '9781781103487' }, // Favorites - HP Gevangene van Azkaban
    { shelfId: 7, isbn: '9781781103326' }, // Finished - HP Steen der Wijzen (reviewed)
    { shelfId: 7, isbn: '9781781103487' }, // Finished - HP Gevangene van Azkaban (reviewed)
    { shelfId: 7, isbn: '9780008239824' }, // Finished - The Poppy War (reviewed)
    { shelfId: 8, isbn: '9781429914567' }, // Current Reads - Mistborn

    // Charlotte (shelves 9-12): Favorites / Want to Read / Finished / Current Reads
    { shelfId: 9, isbn: '9789020554076' }, // Favorites - Fourth Wing
    { shelfId: 10, isbn: '9781982114350' }, // Want to Read - Beartown
    { shelfId: 11, isbn: '9789020554076' }, // Finished - Fourth Wing (reviewed)
    { shelfId: 11, isbn: '9781429914567' }, // Finished - Mistborn (reviewed)
    { shelfId: 11, isbn: '9780008239824' }, // Finished - The Poppy War (reviewed)
  ]);

  console.log('shelfBooks seed data inserted successfully.');
}

async function main() {
  console.log('Starting database seed...\n');

  await resetDatabase();
  await seedBooks();
  await seedUsers();
  await seedReviews();
  await seedShelves();
  await seedShelfBooks();

  console.log('Database seeding completed successfully.');
}

main()
  .then(async () => {
    await connection.end();
  })
  .catch(async (e) => {
    console.error(e);
    await connection.end();
    process.exit(1);
  });
