// src/drizzle/drizzle-query-error.filter.ts
import type { ExceptionFilter } from '@nestjs/common';
import { Catch, ConflictException, NotFoundException } from '@nestjs/common';
import { DrizzleQueryError } from 'drizzle-orm';

@Catch(DrizzleQueryError)
export class DrizzleQueryErrorFilter implements ExceptionFilter {
  catch(error: DrizzleQueryError) {
    if (!error.cause || !('code' in error.cause)) {
      throw new Error(error.message || 'Unknown database error');
    }

    const {
      cause: { code, message },
    } = error;

    console.log(error.cause.message);

    switch (code) {
      case 'ER_DUP_ENTRY':
        if (message.includes('PRIMARY')) {
          throw new ConflictException('A book with this isbn already exists');
        } else {
          throw new ConflictException('This item already exists');
        }
      case 'ER_NO_REFERENCED_ROW_2':
        if (message.includes('user_books_isbn_books_isbn_fk')) {
          throw new NotFoundException('No book with this isbn exists');
        } else if (message.includes('user_books_userId_users_id_fk')) {
          throw new NotFoundException('No user with this id exists');
        }
    }

    throw error;
  }
}
