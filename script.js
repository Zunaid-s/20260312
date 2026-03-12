
const apiKey = "a40f200e2e54478284a2aacc19616e0a";
const baseUrl = "https://newsapi.org/v2/top-headlines";
let currentTopic = "general";
let currentPage = 1;
let allArticles = [];
const articlesPerPage = 20;

async function loadNews(topic = "general", page = 1) {
    const url = `${baseUrl}?category=${topic}&country=us&page=${page}&pageSize=${articlesPerPage}&apiKey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data:", data);
    return data.articles || [];
}

function showNews(articles, append = false) {
    const row = document.getElementById("cards-row");
    if (!append) {
        row.innerHTML = "";
    }
    articles.forEach(article => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
            <div class="card h-100">
                <img src="${article.urlToImage || ''}" class="card-img-top" alt="${article.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text flex-grow-1">${article.description || ''}</p>
                    <a href="${article.url}" class="btn btn-primary mt-auto" target="_blank">Read more</a>
                </div>
            </div>
        `;
        row.appendChild(col);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".topic-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            currentTopic = btn.dataset.topic;
            currentPage = 1;
            allArticles = await loadNews(currentTopic, 1);
            showNews(allArticles, false);
        });
    });

    document.getElementById("load-more-btn").addEventListener("click", async () => {
        currentPage++;
        const moreArticles = await loadNews(currentTopic, currentPage);
        showNews(moreArticles, true); 
    });
    
    loadNews(currentTopic, 1).then(articles => showNews(articles, false));
});