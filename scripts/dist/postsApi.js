const API_URL = 'https://uselessfacts.jsph.pl/random.json';
let generatedFactNumber = 1;
export async function getPosts(amount) {
    const promises = [];
    for (let i = 0; i < amount; i++) {
        promises.push(getNewPost());
    }
    return Promise.all(promises);
}
async function getNewPost() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`);
        }
        const data = await response.json();
        const post = {
            id: data.id,
            title: `Funny fact #${generatedFactNumber++}`,
            body: data.text,
            createdAt: new Date()
        };
        return post;
    }
    catch (error) {
        console.error('Error fetching new post:', error);
        throw error;
    }
}
//# sourceMappingURL=postsApi.js.map