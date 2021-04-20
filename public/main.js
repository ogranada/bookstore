// Una IIFE es una inmediatly invoqued function expression

(function () {
    fetch('/api/1.0.0/books')
        .then(response => response.json())
        .then(data => {
            document.querySelector('.contenido').innerText = JSON.stringify(data);
        })
})();

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/api/1.0.0/books', {
        method: 'post',
        headers: {
            Authorization: 'Bearer mimamamemimamemimamimama',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.querySelector('[name="bookname"]').value

        })
    }).then(() => {
        location.reload()
    })
})