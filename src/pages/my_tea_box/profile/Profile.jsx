/** @format */

import React, { useEffect, useState, Fragment } from "react";
import Fav from "../../../components/Favourties/Fav";
import UserNav from "../../../components/User_Navbar/UserNav.component";
import { useSelector ,useDispatch} from "react-redux";
import { motion } from "framer-motion";
import LottieAnimation from "../../../components/lottie/LottieAnimation";
import { Link } from "react-router-dom";
import { addItemtoCart } from "../../../redux/cart/cart.action";
import "./porfile.styles.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const [favItem, setFavItem] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const userData = useSelector((initialState) => initialState);

  useEffect(() => {
    userData && setUserDetails(userData?.user?.user);
    userData && setFavItem(userData.fav?.fav);
  }, [userData]);

 
  const handleClick = (favItem) => {
    favItem.map((data) => dispatch(addItemtoCart(data)));
  };
 
 
  // const handleClick = (favItem) => {
  //   favItem.map((data) => dispatch(addItemtoCart(data)));
  // };
 

  return (
    <Fragment>
      <UserNav />
      <div className="profile-container">
        <div className="profile-contents">
          <div className="profile-left">
            <img src={userDetails?.avatar} className="avatar-img" alt="error" />
            <span>{userDetails?.username}</span>
            <span>{userDetails?.email}</span>
          </div>
          <div className="profile-right">
            <h5>{favItem?.length ? "Favourites" : ""}</h5>
            <motion.div layout className="fav-contents">
              {favItem?.length ? (
                favItem.map((data, index) => <Fav details={data} key={index} />)
              ) : (
                <div className="no-items">
                  <LottieAnimation w={300} h={120} />
                  <p>No Favourite Items Found</p>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Add Now</span>
                  </Link>
                </div>
              )}
            </motion.div>
            {/* <div className="cart-btn">
              <button onClick={() => handleClick(favItem)}>
                Add all to Cart
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
