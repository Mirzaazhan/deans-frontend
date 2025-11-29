import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as ROUTES from "src/routes";
import * as styles from "./style.scss";

const Menu = props => (
  <div className={styles.container}>
    <Link to={ROUTES.ROUTE_DASHBOARD}>
      <div className={styles.item}>Dashboard</div>
    </Link>
    {props.isAdmin && (
      <React.Fragment>
        <Link to={ROUTES.ROUTE_USER_CENTER}>
          <div className={styles.item}>User Center</div>
        </Link>
        <Link to={ROUTES.ROUTE_SETTING}>
          <div className={styles.item}>Setting</div>
        </Link>
      </React.Fragment>
    )}
  </div>
);

Menu.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

export default Menu;
