const addFavorite = async (movieId: string, user: { email: string; sessionToken: string }) => {
    const apiBaseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:4040'
        : 'https://api.valentin-garnier.fr:4040';

    fetch(`${apiBaseUrl}/addFavorite`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            sessionToken: user.sessionToken,
            movieId,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

}

const removeFavorite = async (movieId: string, user: { email: string; sessionToken: string }) => {
    const apiBaseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:4040'
        : 'https://api.valentin-garnier.fr:4040';

    fetch(`${apiBaseUrl}/removeFavorite`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            sessionToken: user.sessionToken,
            movieId,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

export { addFavorite, removeFavorite };

