// @ts-nocheck
const projectsContainer = document.getElementById("project-container")

fetch("https://api.github.com/users/thefakequake/repos")
  .then((res) => res.json())
  .then((data) => {
    data.sort((a, b) => a.stargazers_count - b.stargazers_count).reverse()

    let html = ""
    for (const repo of data.slice(0, 8)) {
      html += /*html*/ `
        <a href="${repo.owner.html_url}" class="author-link">
          <img src="${repo.owner.avatar_url}" />
          ${repo.owner.login}
        </a>
        <a href="${repo.svn_url}">${repo.name}</a>
        <p>${repo.stargazers_count} stars</p>
      `
    }

    projectsContainer.innerHTML = DOMPurify.sanitize(html)
  }).catch(() => {
    projectsContainer.innerHTML = /*html*/`<p>Error loading repositories :(</p>`
  })
