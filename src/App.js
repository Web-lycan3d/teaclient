/** @format */
import React, { Fragment, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import store from "./redux/Store";
import { loadUser } from "./redux/user/user.actions";
import setAuthToken from "./utils/setAuthToken";

import Navbar from "./components/navbar/navbar.component";
import Footer from "./components/footer/footer.component";

// import LooseLeaf from "./pages/loose-leaf/loose-leaf.component";
// import Productslooseleaf from "./pages/productslooseleaf/Productslooseleaf";
import Cart from "./pages/my_tea_box/cart/Cart";
import { productsTeaWare } from "./redux/fav/fav.action";
import { Suspense } from "react";
import PrivacyPolicy from "./pages/terms_and_privacy/Privacy_Policies.component";
import Dashborad from "./pages/dashboard/Dashborad";

const HomePage = React.lazy(() =>
  import("./pages/homepage/homepage.component")
);
const PrivateRoute = React.lazy(() =>
  import("./components/privateRoute/PrivateRoute")
);
const Contact = React.lazy(() => import("./pages/contact/contact.component"));
const About = React.lazy(() => import("./pages/About/about.component"));
const Login = React.lazy(() => import("./pages/auth/login.component"));
const Register = React.lazy(() => import("./pages/auth/register.component"));
const TermsAndConditions = React.lazy(() =>
  import("./pages/terms_and_privacy/Terms_And_Conditions.component")
);

const Tea = React.lazy(() => import("./pages/tea/Tea"));
const Orders = React.lazy(() => import("./pages/my_tea_box/orders/Orders"));
const SingleProduct = React.lazy(() =>
  import("./pages/singleproduct/SingleProduct")
);
const Profile = React.lazy(() => import("./pages/my_tea_box/profile/Profile"));
const Checkout = React.lazy(() =>
  import("./pages/checkout/checkout.component")
);
const MainComponent = React.lazy(() =>
  import("./components/react-carousel/main.component")
);
const AdminDashboard = React.lazy(() =>
  import("./pages/Admin/AdminDashboard.component")
);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const location = useLocation();
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(productsTeaWare());
  }, []);
  const Loader = () => {
    return (
      <div className="loader">
        <span className="cssload-loader">
          <span className="cssload-loader-inner"></span>
        </span>
      </div>
    );
  };
  return (
    <Fragment>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path="/looseleaf" component={LooseLeaf} /> */}
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* <Route exact path="/looseleaf/products" component={Productslooseleaf} /> */}
            <Route exact path="/tea" component={Tea}></Route>
            <Route
              exact
              path="/single/product/:id"
              component={SingleProduct}></Route>
            <Route
              exact
              path="/terms_conditions"
              component={TermsAndConditions}></Route>
            <Route
              exact
              path="/privacy_policies"
              component={PrivacyPolicy}></Route>
            <Route exact path="/main" component={MainComponent}></Route>
            <Route exact path="/dashboard" component={Dashborad}></Route>
            <PrivateRoute
              exact
              path="/myorders"
              component={Orders}></PrivateRoute>

            <PrivateRoute exact path="/cart" component={Cart}></PrivateRoute>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
            <Route exact path="/admin_dashboard" component={AdminDashboard} />
          </Switch>
        </AnimatePresence>
        <Footer />
      </Suspense>
    </Fragment>
  );
};

export default App;
