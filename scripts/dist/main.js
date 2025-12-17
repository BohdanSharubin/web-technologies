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
export {};
//# sourceMappingURL=main.js.map