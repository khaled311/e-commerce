import React, { FunctionComponent } from "react";

import styles from "./Header.module.scss";

interface Props {}

const Header: FunctionComponent<Props> = ({}) => {
	return <div className={styles.Header}></div>;
};

export default Header;
