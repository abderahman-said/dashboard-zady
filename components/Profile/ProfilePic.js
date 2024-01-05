import Image from "next/image";
import React from "react";
// import { AiFillCamera } from "react-icons/ai";
import styles from "styles/CP.module.css";
import logo from "public/logo.png";
import { Logout } from "store/AuthSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ClearCart } from "store/ShopSlice";
const ProfilePic = ({ name }) => {
  const router = useRouter();
  const dispatch = useDispatch();
 
  return (
    <div className={styles.ProfilePic}>
      <div className={styles.image_select_container}>
        <div className={styles.Card_image}>
          <Image src={logo} alt={"name"} width={100} height={100} />
        </div>
         
      </div>
      <h1 className={styles.mainHeading}> {name}</h1>
      <button
        name="logout"
        type="button"
        onClick={() => {
          dispatch(Logout());
          dispatch(ClearCart());
          router.push("/");
        }}
        className={styles.logoutBtn}
      >
        تسجيل الخروج
      </button>
    </div>
  );
};

export default ProfilePic;
