import { useState, useEffect, useCallback } from 'react';
import { Search, Film, Loader2, AlertCircle, X } from 'lucide-react';
import { MovieCard, MovieModal } from './components/MovieCard';

const POPULAR_SEARCHES = [
  'avatar', 'barbie', 'oppenheimer', 'dune', 'marvel',
  'batman', 'spider-man', 'harry potter', 'star wars', 'lord of the rings',
  'john wick', 'mission impossible', 'fast', 'transformers', 'pirates'
];

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const baseUrl = import.meta.env.VITE_OMDB_BASE_URL || 'http://www.omdbapi.com/';

  const fetchMovies = useCallback(async () => {
    if (!apiKey) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const fetchPromises = POPULAR_SEARCHES.map(async (term) => {
        try {
          const response = await fetch(
            `${baseUrl}?apikey=${apiKey}&s=${encodeURIComponent(term)}&type=movie`
          );
          const data = await response.json();
          return data.Response === 'True' ? (data.Search || []) : [];
        } catch {
          return [];
        }
      });

      const results = await Promise.all(fetchPromises);
      const allMovies = results.flat();

      const uniqueMovies = Array.from(
        new Map(allMovies.map(movie => [movie.imdbID, movie])).values()
      );

      setMovies(uniqueMovies.slice(0, 50));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiKey, baseUrl]);

  const searchMovies = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (!apiKey) {
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(
        `${baseUrl}?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`
      );

      if (!response.ok) {
        throw new Error('Arama yapılırken hata oluştu');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setSearchResults([]);
      } else {
        setSearchResults(data.Search || []);
      }
    } catch (err) {
      console.error('Arama hatası:', err);
    }
  }, [apiKey, baseUrl]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        searchMovies(searchQuery);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchMovies]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleSelectMovie = async (movie) => {
    try {
      const response = await fetch(
        `${baseUrl}?apikey=${apiKey}&i=${movie.imdbID}&plot=full`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setSelectedMovie(movie);
      }
    } catch {
      setSelectedMovie(movie);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const displayMovies = searchQuery && searchResults.length > 0 ? searchResults : movies;

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-2 rounded-lg">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Film Keşfet
              </h1>
            </div>

            <div className="relative w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Film ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-700 rounded-xl py-2.5 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            {searchQuery && searchResults.length > 0
              ? `"${searchQuery}" için ${searchResults.length} sonuç`
              : searchQuery && searchResults.length === 0 && !isSearching
                ? `"${searchQuery}" için sonuç bulunamadı`
                : 'Tüm Filmler'}
          </h2>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
            <span className="ml-3 text-gray-400">Filmler yükleniyor...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 bg-dark-800 rounded-xl p-8">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-red-400 text-lg text-center">{error}</p>
            <p className="text-gray-500 text-sm mt-2 text-center">
              OMDb API'den ücretsiz anahtar almak için: <a href="http://www.omdbapi.com/apikey.aspx" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">omdbapi.com</a>
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            {displayMovies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Film className="w-16 h-16 text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Film bulunamadı</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {displayMovies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onSelect={handleSelectMovie}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-dark-700 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Film verileri <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">OMDb API</a> tarafından sağlanmaktadır
          </p>
        </div>
      </footer>

      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
