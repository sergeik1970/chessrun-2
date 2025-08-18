import React, { ReactElement, forwardRef } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

interface IInputText extends React.HTMLAttributes<HTMLInputElement> {
    a?: boolean;
    type?: string;
}

export type Ref = HTMLInputElement;

const InputText = React.forwardRef<Ref, IInputText>((props: IInputText, realRef): ReactElement => {
    const { className = "", type = "text", ...rest } = props;
    return (
        <input {...rest} ref={realRef} className={clsx(styles["input"], className)} type={type} />
    );
});

export default InputText;
