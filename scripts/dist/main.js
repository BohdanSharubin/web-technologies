import { getPosts } from "./postsApi.js";
const posts = [];
const postsContainer = document.getElementById("posts");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const postsCount = document.getElementById("postsCount");
function updateCounter() {
    if (postsCount) {
        postsCount.textContent = posts.length.toString();
    }
}
function clearPosts() {
    if (postsContainer) {
        postsContainer.innerHTML = '';
    }
    posts.length = 0;
    updateCounter();
}
function renderPost(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    const titleElem = document.createElement("h3");
    titleElem.textContent = post.title;
    postDiv.appendChild(titleElem);
    const bodyElem = document.createElement("p");
    bodyElem.textContent = post.body;
    postDiv.appendChild(bodyElem);
    const dateElem = document.createElement("small");
    dateElem.textContent = post.createdAt.toLocaleString();
    postDiv.appendChild(dateElem);
    return postDiv;
}
if (clearBtn) {
    clearBtn.addEventListener("click", (event) => {
        event.preventDefault();
        clearPosts();
    });
}
if (addBtn) {
    addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const titleInput = document.getElementById("postTitle");
        const bodyInput = document.getElementById("postBody");
        const newPost = {
            id: Date.now(),
            title: titleInput.value,
            body: bodyInput.value,
            createdAt: new Date(),
        };
        const postElem = renderPost(newPost);
        if (postsContainer) {
            postsContainer.appendChild(postElem);
            posts.push(newPost);
            updateCounter();
        }
    });
}
const recentPostsContainer = document.querySelector('#recentPosts');
const reloadPostsBtn = document.querySelector('#reloadPosts');
const postsStatus = document.querySelector('#postsStatus');
const searchPostByTitleInput = document.querySelector('#searchPostByTitle');
const searchPostBtn = document.querySelector('#searchPostBtn');
const restoreSearchBtn = document.querySelector('#restoreSearch');
let recentPostsState = { status: "idle" };
let cacheRecentPosts = [];
const loadingMap = new Map();
function initLoadingMap() {
    loadingMap.set('idle', () => setLoadingMessage('Press "Reload Posts" to load recent posts.'));
    loadingMap.set('loading', () => setLoadingMessage('Loading posts...'));
    loadingMap.set('error', () => setLoadingMessage('Error loading posts.'));
    loadingMap.set('success', async () => {
        if (recentPostsState.status === "success") {
            setLoadingMessage(`Loaded ${recentPostsState.posts.length} posts.`);
            const renderedPosts = await renderAllPosts(recentPostsState.posts);
            recentPostsContainer.append(...renderedPosts);
        }
    });
    loadingMap.set('noResults', () => {
        if (recentPostsState.status === "noResults") {
            setLoadingMessage(recentPostsState.message);
        }
    });
    loadingMap.set('filtered', async () => {
        if (recentPostsState.status === "filtered") {
            setLoadingMessage(`Found ${recentPostsState.posts.length} posts matching your search.`);
            const renderedPosts = await renderAllPosts(recentPostsState.posts);
            recentPostsContainer.append(...renderedPosts);
        }
    });
}
async function renderAllPosts(posts) {
    return posts.map(post => renderPost(post));
}
function renderRecentPostsState() {
    if (!recentPostsContainer || !postsStatus)
        return;
    postsStatus.textContent = '';
    recentPostsContainer.textContent = '';
    loadingMap.get(recentPostsState.status)?.();
}
function setLoadingMessage(status) {
    postsStatus.textContent = status;
}
reloadPostsBtn?.addEventListener("click", (event) => {
    load();
});
async function load() {
    recentPostsState = { status: "loading" };
    renderRecentPostsState();
    await delay(2000);
    try {
        const fetchedPosts = await getPosts(5);
        recentPostsState = { status: "success", posts: fetchedPosts };
        cacheRecentPosts.length = 0;
        cacheRecentPosts = structuredClone(fetchedPosts);
    }
    catch (error) {
        recentPostsState = { status: "error",
            message: ['Failed to load posts']
        };
    }
    renderRecentPostsState();
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function filterRecentPostsByTitle(title) {
    return cacheRecentPosts.filter(post => post.title.toLowerCase().includes(title.toLowerCase()));
}
searchPostBtn?.addEventListener("click", async (event) => {
    const titleToSearch = searchPostByTitleInput?.value || '';
    const filteredPosts = await filterRecentPostsByTitle(titleToSearch);
    console.log(`search : ${filteredPosts}`);
    if (filteredPosts.length === 0) {
        recentPostsState = { status: "noResults", message: `No posts found with title containing "${titleToSearch}"` };
    }
    else {
        recentPostsState = { status: "filtered", posts: filteredPosts };
    }
    restoreSearchBtn.disabled = false;
    renderRecentPostsState();
});
restoreSearchBtn?.addEventListener("click", (event) => {
    if (recentPostsState.status === "filtered" || recentPostsState.status === "noResults") {
        recentPostsState = { status: "success", posts: cacheRecentPosts };
        renderRecentPostsState();
    }
    restoreSearchBtn.disabled = true;
});
initLoadingMap();
renderRecentPostsState();
//# sourceMappingURL=main.js.map