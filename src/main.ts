import { Post } from "./types.js";

const posts: Post[] = [];

const postsContainer = document.getElementById(
    "posts"
) as HTMLDivElement | null;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement | null;
const clearBtn = document.getElementById(
    "clearBtn"
) as HTMLButtonElement | null;
const postsCount = document.getElementById(
    "postsCount"
) as HTMLSpanElement | null;

function updateCounter(): void {
    if (postsCount) {
        postsCount.textContent = posts.length.toString();
    }
}

function clearPosts(): void {
    if (postsContainer) {
        postsContainer.innerHTML = ''; 
    }
    posts.length = 0; 
    updateCounter();
}

function renderPost(post: Post): HTMLElement {
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

if(clearBtn) {
    clearBtn.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        clearPosts();
    });
}

if(addBtn) {

    addBtn.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        const titleInput = document.getElementById("postTitle") as HTMLInputElement;
        const bodyInput = document.getElementById("postBody") as HTMLTextAreaElement;
        const newPost: Post = {
            id: Date.now(),
            title: titleInput.value,
            body: bodyInput.value,
            createdAt: new Date(),
        };

        const postElem = renderPost(newPost);
        if(postsContainer) {
            postsContainer.appendChild(postElem);
            posts.push(newPost);
            updateCounter();
        }
});
}
