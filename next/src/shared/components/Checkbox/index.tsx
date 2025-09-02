import React, { ReactElement, useState } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { CheckboxProps } from "../../types/components";

const Checkbox = (props: CheckboxProps): ReactElement => {
    const { onChange = () => null, checked: controlledChecked, disabled = false, label } = props;
    const [internalChecked, setInternalChecked] = useState(controlledChecked || false);

    // Используем контролируемое значение, если оно передано, иначе внутреннее состояние
    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;

        const newChecked = e.target.checked;
        if (controlledChecked === undefined) {
            setInternalChecked(newChecked);
        }
        onChange?.(e);
    };

    return (
        <div className={styles["checkbox"]}>
            <label className={clsx({ [styles["checked"]]: isChecked }, styles["test"])}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={disabled}
                />
                {label && <span className={styles["label"]}>{label}</span>}
            </label>
        </div>
    );
};

export default Checkbox;
