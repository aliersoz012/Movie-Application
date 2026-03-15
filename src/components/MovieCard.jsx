import { Star, X, Calendar, Clock, Film, Globe, Award, DollarSign, Clapperboard } from 'lucide-react';

const MovieCard = ({ movie, onSelect }) => {
  const getRatingColor = (rating) => {
    if (!rating || rating === 'N/A') return 'text-gray-400';
    const numRating = parseFloat(rating);
    if (numRating >= 7.5) return 'text-green-400';
    if (numRating >= 5.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div 
      className="group relative bg-dark-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 cursor-pointer"
      onClick={() => onSelect(movie)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-dark-700 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Afiş Yok</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2 mb-2" title={movie.Title}>
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-xs">
            {movie.Year || 'N/A'}
          </p>
          <div className="flex items-center gap-1">
            <Star className={`w-3 h-3 ${getRatingColor(movie.imdbRating)}`} fill="currentColor" />
            <span className={`text-xs font-bold ${getRatingColor(movie.imdbRating)}`}>
              {movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const getRatingColor = (rating) => {
    if (!rating || rating === 'N/A') return 'text-gray-400';
    const numRating = parseFloat(rating);
    if (numRating >= 7.5) return 'text-green-400';
    if (numRating >= 5.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const genres = movie.Genre ? movie.Genre.split(', ') : [];
  const writers = movie.Writer ? movie.Writer.split(', ').slice(0, 3) : [];
  const actors = movie.Actors ? movie.Actors.split(', ').slice(0, 5) : [];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-dark-900/80 rounded-full text-white hover:bg-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <div className="md:w-1/3">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              />
            </div>
          ) : null}

          <div className="p-6 md:w-2/3">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-dark-900 px-3 py-1.5 rounded-lg">
                  <Star className={`w-5 h-5 ${getRatingColor(movie.imdbRating)}`} fill="currentColor" />
                  <span className={`text-lg font-bold ${getRatingColor(movie.imdbRating)}`}>
                    {movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : '-'}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">{movie.Year || 'N/A'}</span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{movie.Title}</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {genres.map((genre, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{movie.Released || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{movie.Runtime || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{movie.Country || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Film className="w-4 h-4" />
                <span className="text-sm">{movie.Language || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Award className="w-4 h-4" />
                <span className="text-sm">{movie.Rated || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">{movie.BoxOffice || 'N/A'}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Konu</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'Açıklama bulunmuyor.'}
              </p>
            </div>

            {actors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Oyuncular</h3>
                <div className="flex flex-wrap gap-2">
                  {actors.map((actor, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-dark-700 text-gray-300 text-xs rounded-full"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {writers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Yönetmen / Senarist</h3>
                <div className="flex flex-wrap gap-2">
                  {writers.map((writer, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-dark-700 text-gray-300 text-xs rounded-full"
                    >
                      {writer}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Clapperboard className="w-4 h-4" />
              <span>IMDb ID: {movie.imdbID}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MovieCard, MovieModal };
