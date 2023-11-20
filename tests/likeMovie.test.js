import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import * as TestFactories from './helper/testFactories';

describe('Liking A Movie', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
    });

    it('Should show the like button when the movie has not been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        expect(document.querySelector('[aria-label="like this movie"]')).toBeTruthy();
    });

    it('Should not show the unlike button when the movie has not been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        expect(document.querySelector('[aria-label="unlike this movie"]')).toBeFalsy();
    });

    it('Should be able to like the movie', async () => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        // Memastikan film berhasil disukai
        const movie = await FavoriteMovieIdb.getMovie(1);
        expect(movie).toEqual({ id: 1 });

        await FavoriteMovieIdb.deleteMovie(1);
    });

    it('Should not add a movie again when its already liked', async () => {
        await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

        // Tambahkan film dengan ID 1 ke daftar film yang disukai
        await FavoriteMovieIdb.putMovie({ id: 1 });

        // Simulasikan pengguna menekan tombol suka film
        document.querySelector('#likeButton').dispatchEvent(new Event('Click'));

        // Tidak ada film yang ganda
        expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1 }]);

        await FavoriteMovieIdb.deleteMovie(1);
    });

    // Menggunakan metode xit, bukan it, untuk menonaktifkan sebuah test case
    it('Should not add a movie when it has no ID', async () => {
        await TestFactories.createLikeButtonPresenterWithMovie({});

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
    });
});
