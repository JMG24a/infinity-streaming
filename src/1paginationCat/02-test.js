const button = document.getElementById('reload');



button.addEventListener('click', function(){
    getImage()
})

function getImage() {
    fetch('https://api.thecatapi.com/v1/images/search?limit=4&page=1',{
        method: 'GET',
    })
        .then((res) => res.json())
        .then((res) => {
           const img = document.getElementById('im');
           const img2 = document.getElementById('im2');
           const img3 = document.getElementById('im3');
           const img4 = document.getElementById('im4');
           console.log(res)
           img.src = res[0].url;
           img2.src = res[1].url;
           img3.src = res[2].url;
           img4.src = res[3].url;
        })
        .catch((e) => console.error(e.message))
}

getImage()