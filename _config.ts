import lume from "lume/mod.ts";
import blog from "blog/mod.ts";
import relativeUrls from "lume/plugins/relative_urls.ts";

const site = lume();

site.use(relativeUrls());

site.add("/files/");
site.use(blog());

export default site;
