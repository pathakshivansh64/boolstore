import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { getBooks } from '../api/books';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    const priceMatch = query.match(/price:(\d+-\d+|\d+)/);
    const keyword = query.replace(/price:\d+-?\d*/g, '').trim();

    const filtered = books.filter((book) => {
      const matchesTitleAuthor =
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword);

      const matchesPrice = priceMatch
        ? (() => {
            const [min, max] = priceMatch[1].split('-').map(Number);
            return max
              ? book.price >= min && book.price <= max
              : book.price <= min;
          })()
        : true;

      return matchesTitleAuthor && matchesPrice;
    });

    setFilteredBooks(filtered);
  }, [searchParams, books]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {searchParams.get('q')
          ? `Search Results for "${searchParams.get('q')}"`
          : 'Featured Books'}
      </h1>
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No books found.</p>
      )}
    </div>
  );
};

export default Home;
