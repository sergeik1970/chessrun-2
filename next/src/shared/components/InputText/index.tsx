import React, { ReactElement } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { InputTextProps } from "../../types/components";

export type Ref = HTMLInputElement;

const InputText = React.forwardRef<Ref, InputTextProps>(
    (props: InputTextProps, realRef): ReactElement => {
        const { className = "", type = "text", ...rest } = props;
        return (
            <input
                {...rest}
                ref={realRef}
                className={clsx(styles["input"], className)}
                type={type}
            />
        );
    },
);

export default InputText;
