/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "qwant"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
  qwant: "https://www.qwant.com/?s={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"u1fKH91MTqfZAfUh","label":"reddit","bookmarks":[{"id":"ui6GudTA8r1YOzX0","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"IZqdJySSLKJCcOvt","label":"r/wallpaper","url":"https://www.reddit.com/r/wallpaper/"},{"id":"m2aGmpTeq61rvLHI","label":"r/home","url":"https://www.reddit.com/?feed=home"}]},{"id":"Yd4kBZXWoJFbZpAJ","label":"design tools","bookmarks":[{"id":"5VRv2GCYvvHp9QXm","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"ZJXzfogeA2hhvZsA","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"XIYILFu0AZHrxCDZ","label":"haikei","url":"https://app.haikei.app/"},{"id":"21RLmPkkIZuKpPYe","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"Fh2SJ2S9z66gKBoD","label":"worth reading","bookmarks":[{"id":"Mhw3bSFcPI8KYDkY","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"kZ7odahtOUyuFydC","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"zqy2EEnR6XAP6od6","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"S7fgJD11OvkAEVvd","label":"sources","bookmarks":[{"id":"imvUmRbd8aSPMtFD","label":"icons","url":"https://feathericons.com/"},{"id":"dsEEeFQzrZwT0Eaa","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"HjgQtke90siQe0So","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"tS0F6hvi3ah5ewn8","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
