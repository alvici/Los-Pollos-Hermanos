async function run() {
    try {
        const response = await fetch('https://steamfam.bindanaku.xyz/fam/13497648');
        const text = await response.text();
        console.log(text);
    } catch (e) {
        console.error(e);
    }
}

run();
