import React from "react";
import { useDispatch } from "react-redux";
import { signOutUserStart } from "./../redux/User/user.actions";

import Header from "./../components/Header";
import Subheader from "./../components/Subheader";
import VerticalNav from "./../components/VerticalNav";
import Footer from "./../components/Footer";

const DashBoardLayout = (props) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="dashboardLayout">
      <Header {...props} />
      <Subheader title={"MITT KONTO"} />

      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Logga ut
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;
