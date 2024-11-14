
class Item {
    constructor(id, gameID, title, description, responsive, thumbnailUrl, category, categoryID, category2, categoryID2, stars, playNum, url) {
        this.id = id;
        this.gameID = gameID;
        this.title = title;
        this.description = description;
        this.responsive = responsive;
        this.thumbnailUrl = thumbnailUrl;
        this.category = category;
        this.categoryID = categoryID;
        this.category2 = category2;
        this.categoryID2 = categoryID2;
        this.stars = stars;
        this.playNum = playNum;
        this.url = url;
    }
}
const items = [];
const categoryList = document.querySelector('.category-list');
fetch('data/games.json')
    .then(response => response.json())
    .then(data => {
        parseGameData(data);
    })
    .catch(error => console.error('Error loading JSON:', error));

function parseGameData(data) {
    data.forEach(game => {
        const item = new Item(
            game.id,
            game.gameID,
            game.title,
            game.description,
            game.responsive,
            game.thumbnailUrl,
            game.category,
            game.categoryID,
            game.category2,
            game.categoryID2,
            game.stars,
            game.playNum,
            game.url
        );
        items.push(item);
    });
    //group by category and render
    const groupedItems = groupByCategory(items);
    renderCategory(groupedItems);

}

function groupByCategory(items) {
    const groupedItems = {};
    items.forEach(item => {
        if (!groupedItems[item.category]) {
            groupedItems[item.category] = [];
        }
        groupedItems[item.category].push(item);
    });
    return groupedItems;
}

function renderCategory(groupedItems) {
    for (const category in groupedItems) {
        renderItems(groupedItems[category], category);
    }
}

function renderItems(f, category) {
    const filteredItems = Array.from(f);
    const gameGrid = document.createElement('div');
    gameGrid.classList.add('game-grid');
    gameGrid.innerHTML = ``;
    const title = document.createElement('div');
    title.classList.add('category-title');
    title.innerHTML = `
        <p>${category}</p>
    `;
    categoryList.appendChild(title);
    categoryList.appendChild(gameGrid);
    filteredItems.forEach(item => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        gameCard.innerHTML = `
            <div class="image-container">
                <img src="${item.thumbnailUrl}" alt=${item.thumbnailUrl})}>
            </div>
            <p>${item.title}</p>
        `;
        gameCard.addEventListener('click', () => {
            window.open(`play/play.html?game=${item.url}`, '_self');
        });
        gameGrid.appendChild(gameCard);
    });
}



