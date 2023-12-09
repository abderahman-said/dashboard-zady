import axios from "axios";
// import ProdcutCard from "components/ProdcutCard/ProdcutCard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineFilePdf } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getParentCategories } from "store/ShopSlice";
import styles from "styles/Shop.module.css";
import dynamic from "next/dynamic";
const ProdcutCard = dynamic(
  () => import("components/ProdcutCard/ProdcutCard"),
  {
    loading: () => <p>Loading ...</p>,
  }
);
const Company = ({ products, compName }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [toggel, setToggel] = useState(false);
  const { MainCatsArr } = useSelector((state) => state.ShopSlice);
  useEffect(() => {
    if (!MainCatsArr) {
      dispatch(getParentCategories());
    }
  }, [MainCatsArr, dispatch]);
  const CompanyProducts = products.map((ele, idx) => {
    return (
      <Col key={idx} xs={6}
        sm={6}
        md={4}
        lg={2}
        xl={2}
        xxl={2}>
        <ProdcutCard name={ele.name} img={ele.imgs.imgs[0]} catName={ele.catName} id={ele.id} type={"pro"} />
      </Col>
    );
  });
  const getMainCats =
    MainCatsArr &&
    MainCatsArr.map((ele, idx) => {
      return (
        <li
          key={idx}
          onClick={() => {
            const PathName = ele.name.replace(/\s/g, "-");
            router.push({
              pathname: `/shop/${ele.id}/${ele.id}/${PathName}`,
              // query: { id: ele.id, catName: ele.name },
            });
          }}
        >
          {ele.name}
        </li>
      );
    });
  return (
    <div className={styles.shop}>
      <Head>
        <title>{compName}</title>
        </Head>
      <Container fluid>
        <Row>
          <Col md={3}>
            <h1 className={styles.Cats_Header}>اقسام المنتجات</h1>
          </Col>
          <Col md={9}>
            <div className={styles.Search}>
              <input
                type="search"
                name="search"
                placeholder="البحث عن المنتجات "
                id="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  dispatch(searchChar(e.target.value));
                  SearchData(e.target.value);
                }}
              />
              <button>
                نسخه pdf
                <AiOutlineFilePdf />
              </button>
            </div>
            <div className={styles.cats_Select}>
              <h1
                className={styles.Cats_Header}
                onClick={() => setToggel((prev) => !prev)}
              >
                التصنيفات
                <IoIosArrowDown />
              </h1>
              {toggel && (
                <div className={styles.main_cats2}>
                  <ul className={styles.ul_cats}>{getMainCats}</ul>
                </div>
              )}
            </div>
          </Col>
          <Col md={3}>
            <div className={styles.main_cats}>
              <ul className={styles.ul_cats}>{getMainCats}</ul>
            </div>
          </Col>
          <Col md={9}>
            <Row>{CompanyProducts}</Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Company;

export async function getServerSideProps({ params, res }) {
  // const Url = "http://192.168.0.201:8080/mohamedibrahim";
  //   res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  // const Url = "https://zayady.deltawy.com";
  const Url = "http://192.168.0.201:8080/zayady";
  const response = await axios
    .post(`${Url}/rest/test.product/getCompanyProducts/`, {
      id: params.id,
    })
    .then((res) => res.data);
  return {
    props: {
      products: response.products,
      compName: params.compName,
    },
  };
}
