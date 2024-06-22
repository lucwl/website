// @ts-nocheck
async function getGithubData() {
  const lastAccessed = localStorage.getItem("lastAccessed")
  if (lastAccessed) {
    const date = Date.parse(lastAccessed)
    if (isNaN(date)) {
      return await reloadData()
    }
    if ((new Date() - date) / 1000 > 120) {
      return await reloadData()
    }

    const profileData = localStorage.getItem("profileData")
    const repoData = localStorage.getItem("repoData")
    if (!profileData || !repoData) {
      return await reloadData()
    }
    try {
      const profile = JSON.parse(profileData)
      const repos = JSON.parse(repoData)
      console.log("LOADED FROM CACHE")
      return [profile, repos]
    } catch {
      return await reloadData()
    }
  }
  return await reloadData()
}

async function reloadData() {
  const loading = document.getElementById("loading")
  loading.style = "display: block;"
  console.log("RELOADED DATA")
  let res = await fetch("https://api.github.com/users/luc-wallace")
  const profile = await res.json()
  res = await fetch("https://api.github.com/users/luc-wallace/repos")
  const repos = await res.json()
  const timestamp = new Date()
  localStorage.setItem("lastAccessed", timestamp.toISOString())
  localStorage.setItem("profileData", JSON.stringify(profile))
  localStorage.setItem("repoData", JSON.stringify(repos))
  loading.style = "animation: 1s fade"
  setTimeout(() => [(loading.style = "display: none;")], 1000)
  return [profile, repos]
}

getGithubData().then(([profile, repos]) => {
  document.getElementById("bio").innerHTML = profile.bio
  document.getElementById("followers").innerHTML = profile.followers
  document.getElementById("following").innerHTML = profile.following
  document.getElementById("location").innerHTML = profile.location
  document.getElementById("repos").innerHTML = profile.public_repos
  document.getElementById("stars").innerHTML = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  )
})

const scrollContainer = document.getElementById("content")
const textFill = document.getElementById("fill")
document.getElementById("fill")
scrollContainer.addEventListener("scroll", () => {
  const scrollHeight =
    scrollContainer.scrollHeight - scrollContainer.clientHeight
  const scrollTop = scrollContainer.scrollTop
  const scrollPercentage = scrollTop / scrollHeight
  const fillWidth = scrollPercentage * textFill.offsetWidth

  textFill.style.setProperty("--fill-width", `${fillWidth}px`)
})

const els = document.getElementsByClassName("typing")
for (const el of els) {
  let index = 0
  const text = el.dataset.text

  function type() {
    if (index < text.length) {
      el.textContent += text[index]
      index++
      setTimeout(type, 100)
    }
  }
  type()
}
