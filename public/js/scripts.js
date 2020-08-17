'use strict'
window.onload = function () {
    const photos = [
        {src: "url('img/header/slider/banner1.png')"},
        {src: "url('img/header/slider/banner2.png')"},
        {src: "url('img/header/slider/banner3.png')"},
        {src: "url('img/header/slider/banner4.png')"},
        {src: "url('img/header/slider/banner5.png')"}
    ];
    const slider = document.querySelector(".slider");
    let counter = 0;
    document.querySelector("#sliderArrowLeft").addEventListener('click', function () {
        counter -= 1;
        counter = (counter + photos.length) % photos.length;
        slider.style.backgroundImage = photos[counter].src;
    })
    document.querySelector("#sliderArrowRight").addEventListener('click', function () {
        counter += 1;
        counter = (counter + photos.length) % photos.length;
        slider.style.backgroundImage = photos[counter].src;
    })
        
    let movies = [];
    function getMovies () {
        movies = [];
        fetch("http://www.omdbapi.com/?apikey=8b47da7b&s="+search.value+"&page=1")
        .then(function(resp) {
            return resp.json()
        })
        .then(function(data){
            let num = data.Search.length;
            for (let i = 0; i < num; i++) {
                movies.push(data.Search[i]);
            }
            // console.log(data)
            console.log(movies);
            return movies;
        })
        console.log(movies);
        return movies;
    }

    function searchResult () {
        let content = document.querySelector('.content');
        content.innerHTML=''
        for (let i = 0; i < movies.length; i++) {
            console.log('i')
        }
    }
    
    let search = document.querySelector("#search");
    let searchButton = document.querySelector("#searchButton");
    

    searchButton.addEventListener('click', function () {
        console.log(search.value)
        getMovies();
        searchResult();
        console.log(movies);
    }, true)
};