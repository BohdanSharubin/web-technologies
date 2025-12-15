import articles from './posts.js'  

const postsContainer = document.querySelector("#blog-posts");
const counterEl = document.querySelector("#counter");
const toolbar = document.querySelector("#toolbar");
const btnAll = document.querySelector("#btnAll");
const searchInput = document.querySelector("#searchTitle");
const searchBtn = document.querySelector("#searchBtn");

const renderArticle = ({ title, author, date, category, tags = [], content }) => `
  <article class="post" data-category="${category}">
    <h2>${title}</h2>
    <p class="meta">
      Автор: <b>${author}</b> | Категорія: <i>${category}</i> |
      ${new Date(date).toLocaleDateString("uk-UA")}
    </p>
    <p>${content}</p>
    <div class="tags">
      ${tags.map(t => `<span class="tag">#${t}</span>`).join("")}
    </div>
  </article>
`;

const renderAll = (list = articles) => {
  postsContainer.innerHTML = list.map(renderArticle).join("");
  counterEl.textContent = `Кількість статей: ${list.length}`;
};

const getCategories = () =>
  Array.from(new Set(articles.map(a => a.category))).sort();

const renderCategoryButtons = () => {

  toolbar.querySelectorAll("[data-filter]").forEach(b => b.remove());
  const cats = getCategories();
  const afterAllBtn = btnAll.nextElementSibling ? btnAll : btnAll;
  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = cat;
    btn.dataset.filter = cat;
    btn.setAttribute("aria-pressed", "false");
    btnAll.insertAdjacentElement("afterend", btn);
  });

};

const filterByCategory = (category) =>
  articles.filter(a => a.category.toLowerCase() === category.toLowerCase());

const findByTitle = (query) =>
  articles.find(a => a.title.toLowerCase().includes(query.toLowerCase()));

toolbar.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (!btn) return;
  toolbar.querySelectorAll(".btn[aria-pressed]").forEach(b => b.setAttribute("aria-pressed", "false"));

  if (btn.id === "btnAll") {
    btn.setAttribute("aria-pressed", "true");
    renderAll(articles);
    return;
  }

  if (btn.dataset.filter) {
    btn.setAttribute("aria-pressed", "true");
    const list = filterByCategory(btn.dataset.filter);
    renderAll(list);
  }

});

const doFind = () => {
  const q = (searchInput.value || "").trim();
  if (!q) return;
  const found = findByTitle(q);
  if (found) {
    renderAll(articles);
    const node = [...postsContainer.children].find(
      el => el.querySelector("h2").textContent === found.title
    );
    if (node) {
      node.style.outline = "0.25rem solid #bfe616ff";
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => (node.style.outline = ""), 1600);
    }
  }
};

searchBtn.addEventListener("click", doFind);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doFind();
});

renderCategoryButtons();
renderAll(articles);