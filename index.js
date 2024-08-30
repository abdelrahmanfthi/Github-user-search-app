const button = document.querySelector('.button');
const searchInput = document.querySelector('.input');
const useInputElement = document.querySelector("input[value='users']");
const cardElement = document.querySelector('.cards');

const USERS_API = "https://api.github.com/search/users?q=";

const setSearchResult = (data) => {
    if (data.items.length === 0) {
        cardElement.innerHTML = "<p>No results found.</p>";
        return;
    }

    let result = "";
    data.items.forEach(item => {
        result += `
        <article class='card'>
            <img class="img" loading="lazy" src="${item.avatar_url}" alt="${item.login}"/>
            <h2 class="name">${item.login}</h2>
        </article>
        `;
    });
    cardElement.innerHTML = result;
}

const performSearch = (searchTerm, isUserSelected) => {
    if (!searchTerm.trim()) {
        cardElement.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    const typeQuery = isUserSelected ? '+type:user' : '+type:org';
    fetch(`${USERS_API}${encodeURIComponent(searchTerm)}${typeQuery}`)
        .then(result => {
            if (!result.ok) throw new Error('Network response was not ok');
            return result.json();
        })
        .then(response => setSearchResult(response))
        .catch(error => {
            cardElement.innerHTML = `<p>Error: ${error.message}</p>`;
        });
};

button.addEventListener('click', (e) => {
    e.preventDefault();
    performSearch(searchInput.value, useInputElement.checked);
});
