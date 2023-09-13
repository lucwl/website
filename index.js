// @ts-nocheck
const projectsContainer = document.getElementById("project-container")

fetch("https://api.github.com/users/thefakequake/repos")
  .then((res) => res.json())
  .then((data) => {
    data.sort((a, b) => a.stargazers_count - b.stargazers_count).reverse()
    console.log(data)

    let html = ""
    for (const repo of data.slice(0, 5)) {
      html += /*html*/ `
        <span>
          <img src="${repo.owner.avatar_url}" />
          <a href="${repo.owner.html_url}">${repo.owner.login}</a>
        </span>
        <a href="${repo.svn_url}">${repo.name}</a>
        <p>${repo.stargazers_count} stars</p>
      `
    }

    projectsContainer.innerHTML = DOMPurify.sanitize(html)
  })
