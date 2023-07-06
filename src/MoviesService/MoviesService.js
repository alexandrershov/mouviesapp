const _apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWQxMjNkNTQ1NWE0NTQyYzQ3MzlhZDg3YjYzNGUyMSIsInN1YiI6IjY0OGQ4MWJjYzNjODkxMDE0ZWJkNjVkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VAsDOX9-y_VzhP9YOZxg3_0gRLGxxR1seQjVAilLduI'
const _mainUrl = 'https://api.themoviedb.org/3/';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${_apiKey}`
    }
};

class MoviesServise {

    getResult = async ( _page = 1 ) => {
        const url = `${_mainUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=${_page}&sort_by=popularity.desc`;
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error(`not connect status: ${result.status}, url: ${url}`)
        }
        return await result.json();
    }

    getResultSerch = async ( _page = 1, serch ) => {
        const urlSerch = `${_mainUrl}search/movie?query=${serch}&include_adult=false&language=en-US&page=${_page};`
        const resultSerch = await fetch(urlSerch, options);
        if (!resultSerch.ok) {
            throw new Error(`not connect status: ${resultSerch.status}, url: ${urlSerch}`)
        }
        return await resultSerch.json();
    }

    getAllMovies = async (_page) => {
        const res = await this.getResult(_page);
        return this._transformMovies(res.results);
    }

    getSerchMovie = async (_page, serch) => {
        const res = await this.getResultSerch(_page, serch);
        return this._transformMovies(res.results);
    }

    guestSession = async () => {
        const res = await fetch(`${_mainUrl}authentication/guest_session/new`, options);
        if (!res.ok) throw new Error(`Not change guest session status:${res.status}`);
        return await res.json()
    }

    getRatingMovies = async (guestAdi) => {
        const res = await fetch(`${_mainUrl}guest_session/${guestAdi}/rated/movies`, options);
        const result = await res.json();
        console.log(result.results)
    }

    addRatingMovies = async (id, apiID, rating) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=${_apiKey}&guest_session_id=${apiID}`, {
            method: 'POST',
            headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${_apiKey}`
            },
            body: JSON.stringify({ value: rating })
        });
        return await res.json();
    }

    _transformMovies = (el) => {
        return el.map( (e, index) => {
            if (e.overview.length > 200) e.overview = e.overview.slice(0, 100);
            if (e.overview.trim() === '') e.overview = 'Sorry, info not loading...';
            if (e.title.length > 15) e.title = e.title.slice(0, 15) + '...';
            return {
                title: e.title,
                relase: e.release_date,
                category: null,
                text: e.overview,
                id: e.id,
                img: `https://image.tmdb.org/t/p/w500/${e.poster_path}`,
                grade: e.vote_average
            }
        })
    }
}

export default MoviesServise;