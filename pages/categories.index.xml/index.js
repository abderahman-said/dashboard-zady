import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";
export const getServerSideProps = async (ctx) => {
  const result = await axios
    .post(`http://192.168.0.201:8080/zayady/rest/test.categories/getAllCategories`,{
        page : 0
    })
    .then((res) => res.data.cats);
    
  // const { data } = await res.data.products;
  const fields = await result.map((ele) => ({
    loc: `https://zayady.deltawy.com/shop/${ele.id}/${ele.parentId}/${ele.name.replace(/\s/g, "-")}`,
    lastmod: new Date().toISOString(),
    priority: 0.7,
    changefreq: "daily",
  }));

  // console.log({ fields });
  return getServerSideSitemap(ctx, fields);
};

export default function SitemapIndex() {}


 
// http://192.168.0.201:8080/zayady/rest/test.product/updateProduct/