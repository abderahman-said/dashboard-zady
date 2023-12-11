/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://zayady.deltawy.com",
  generateRobotsTxt: true,
  exclude: ["/products.index.xml" , "/categories.index.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://zayady.deltawy.com/products.index.xml", // <==== Add here
      "https://zayady.deltawy.com/categories.index.xml"
    ],
  },
};
