const button = document.getElementById('reload');

button.addEventListener('click', function(){
    getImage()
})

function getImage() {
    fetch('https://api.thecatapi.com/v1/images/search',{
        method: 'GET',
    })
        .then((res) => res.json())
        .then((res) => {
           const img = document.getElementById('im');
           img.src = res[0].url;
        })
        .catch((e) => console.error(e.message))
}

getImage()