import { pool } from '../config/db.js';

export const ReportModel = {
  async getTopBooks() {
    const query = `
      SELECT 
        b.title,
        a.name AS author_name,
        COUNT(l.id) AS total_loans
      FROM loans l
      JOIN books b ON l.book_id = b.id
      LEFT JOIN authors a ON b.author_id = a.id
      GROUP BY b.id, a.name
      ORDER BY total_loans DESC
      LIMIT 2
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async getStats() {
    const books = await pool.query('SELECT COUNT(*) FROM books');
    const authors = await pool.query('SELECT COUNT(*) FROM authors');
    const categories = await pool.query('SELECT COUNT(*) FROM categories');
    const loans = await pool.query(
      "SELECT COUNT(*) FROM loans WHERE status = 'BORROWED'"
    );

    return {
      total_books: books.rows[0].count,
      total_authors: authors.rows[0].count,
      total_categories: categories.rows[0].count,
      borrowed_books: loans.rows[0].count
    };
  }
};