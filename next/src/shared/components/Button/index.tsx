import React, { ReactElement } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { ButtonProps } from "../../types/components";

const Button = (props: ButtonProps): ReactElement => {
    const { children, types = "primary", onClick = () => null } = props;
    return (
        <button
            className={clsx(styles["button"], styles[`button-${types}`])}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
