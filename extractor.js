import { JSDOM } from 'jsdom';

async function run() {
    try {
        const response = await fetch('https://steamfam.bindanaku.xyz/fam/13497648');
        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        
        const gameCards = doc.querySelectorAll('#library-wrapper .game-card');
        const games = [];
        
        gameCards.forEach(card => {
            const id = card.id;
            const title = card.getAttribute('data-title');
            const priceRaw = card.getAttribute('data-price');
            const img = card.querySelector('img').src;
            
            let priceFormatted = "N/A";
            if (priceRaw && priceRaw !== "0") {
                const p = parseInt(priceRaw);
                priceFormatted = "Rp" + p.toLocaleString('id-ID');
            } else if (priceRaw === "0") {
                priceFormatted = "Gratis";
            }
            
            games.push({
                id,
                name: title,
                price: priceFormatted,
                img: img.startsWith('http') ? img : 'https://steamfam.bindanaku.xyz' + img
            });
        });
        
        console.log(JSON.stringify(games, null, 2));
    } catch (e) {
        console.error(e);
    }
}

run();
