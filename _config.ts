import lume from "lume/mod.ts";
import blog from "blog/mod.ts";
import relativeUrls from "lume/plugins/relative_urls.ts";

const site = lume({
  location: new URL("https://hestela.dev"),
});

site.use(relativeUrls());

site.add("/files/");
site.use(blog());

const giscusScript = (document: Document) => {
  const script = document.createElement("script");
  script.id = "giscus-script";
  new Map<string, string | boolean>([
    ["type", "text/javascript"],
    ["src", "https://giscus.app/client.js"],
    ["crossOrigin", "anonymous"],
    ["async", true],

    ["data-repo", "hestela/hestela-dev"],
    ["data-repo-id", "R_kgDOPXQhfw"],
    ["data-category", "Announcements"],
    ["data-category-id", "DIC_kwDOPXQhf84C3oDE"],
    ["data-mapping", "pathname"],
    ["data-strict", "0"],
    ["data-reactions-enabled", "1"],
    ["data-emit-metadata", "0"],
    ["data-input-position", "bottom"],
    ["data-theme", "light"],
    ["data-lang", "en"],
  ]).forEach((v, k) => {
    switch (v) {
      case true:
        script.setAttribute(k, "");
        break;
      case false:
        script.removeAttribute(k);
        break;
      default:
        script.setAttribute(k, v as string);
    }
  });

  // Keep the Giscus widget in sync with the site's own light/dark toggle.
  // This runs synchronously right after the (async) client.js script tag is
  // inserted, so it always wins the race and sets the correct theme before
  // Giscus reads its own attributes.
  const themeSync = document.createElement("script");
  themeSync.textContent = `(function () {
    function giscusTheme() {
      var t = localStorage.getItem("theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      return t === "dark" ? "dark_dimmed" : "light";
    }
    var el = document.getElementById("giscus-script");
    if (el) el.setAttribute("data-theme", giscusTheme());

    var nativeChangeTheme = window.changeTheme;
    window.changeTheme = function () {
      if (nativeChangeTheme) nativeChangeTheme();
      var frame = document.querySelector("iframe.giscus-frame");
      if (frame) {
        frame.contentWindow.postMessage(
          { giscus: { setConfig: { theme: giscusTheme() } } },
          "https://giscus.app",
        );
      }
    };
  })();`;

  const aside = document.createElement("aside");
  aside.classList.add("giscus");

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "script";
  link.href = "https://giscus.app/client.js";

  return [aside, link, script, themeSync] as const;
};

site.process([".md"], (pages) => {
  for (const page of pages) {
    if (page.src.path.includes("posts")) {
      const post = page.document!.querySelector(".body-post")!;
      giscusScript(page.document!).forEach((el) => {
        post.appendChild(el);
      });
    }
  }
});

export default site;
