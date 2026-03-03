import lume from "lume/mod.ts";
import blog from "blog/mod.ts";
import relativeUrls from "lume/plugins/relative_urls.ts";

const site = lume();

site.use(relativeUrls());

site.add("/files/");
site.use(blog());

const giscusScript = (document: Document) => {
  const script = document.createElement("script");
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

  const aside = document.createElement("aside");
  aside.classList.add("giscus");

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "script";
  link.href = "https://giscus.app/client.js";

  return [aside, link, script] as const;
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
