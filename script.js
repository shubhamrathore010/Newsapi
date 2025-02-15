// const API_KEY = "0cd854caf5754bcf9e5303709218e70f";

const API_KEY = "088f61f4748ca25569e364770dff48ca";
let url = `https://gnews.io/api/v4/search?`;
 

// api handeling
 let container = document.querySelector('.container');
 

async function fetchNews(searchTerm  = 'india') {
    showLoadingIndicator();
    try {
    let res = await fetch(`${url}q=${searchTerm}&lang=en&apikey=${API_KEY}`);
    if(!res.ok) {
        throw new Error (`HTTP error! status: ${res.status}`)
    }
    let data = await res.json();
    container.innerHTML = "";

    if (data.articles){
    bindData(data.articles);
    } else {
        container.innerHTML = '<p>No articles found. please try a diiferent search term.</p>';
    } 
} catch (error) {
    console.error('Error fetching news:', error);
    container.innerHTML = "<p>Error fetching news. Please try again later.</p>";
}
    hideLoadingIndicator();
}

 
// binding data

function bindData(articles) {
    articles.forEach((article) => {
        let articleBox = articleElement(article);
        container.appendChild(articleBox);
    });
}

function articleElement(article) {
    let imgEle = document.createElement('img');
    let titleEle = document.createElement('h1');
    let sourceEle = document.createElement('h5')
    let summaryEle = document.createElement('p')
    let contentContainer = document.createElement('div')
    let articleEle= document.createElement('div')

    articleEle.classList.add('article');
    contentContainer.classList.add('content');
    titleEle.classList.add('title');
    sourceEle.classList.add('source');
    summaryEle.classList.add('summary');

    imgEle.src = article['image'];
    titleEle.innerHTML = article['title'];
    sourceEle.innerHTML = `${article['source']['name']} 
    -${getIndianTime(article['publishedAt'])}`;
 
summaryEle.innerHTML = article['description'];
 
contentContainer.append(titleEle, sourceEle,summaryEle);
articleEle.append(imgEle, contentContainer);

titleEle.addEventListener('click', () =>{
    window.open(article.url, '_blank');
});

return articleEle;
}

function getIndianTime(time) {
    let date = new Date(time);

    const options = {
    month: "short",
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    };

    return date.toLocaleString('en-US', options);
}

let inputEle = document.getElementById('inputEle');

inputEle.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
      fetchNews(inputEle.value);
    }
});

let loader = document.getElementById('loader');

function showLoadingIndicator() {
    loader.style.display = 'block';
}

function hideLoadingIndicator() {
    loader.style.display= 'none';
}

hideLoadingIndicator()
fetchNews();
 
// let btn = document.getElementById('btn');

//  function changeColor() {
    // let articleEle= document.createElement('div')
    // articleEle.classList.add('article');
    // let articles = document.querySelectorAll('.article');
    // if(document.body.style.backgroundColor === 'black'){
    //     document.body.style.backgroundColor = 'white'
    //     document.body.style.color = 'black'
        // articles.forEach(article => {
        //     article.style.backgroundColor = 'white';
        //     article.style.color = 'black';
        // })
    // } else {
    //     document.body.style.backgroundColor = 'black'
    //     document.body.style.color = 'white'
    //     articles.forEach(article =>{
    //     article.style.backgroundColor = 'black';
    //     article.style.color = 'white'
    // })
    // }
 // }

//  btn.addEventListener('click', changeColor)
 

 
