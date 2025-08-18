import React, { ReactElement, createRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/shared/components/Button";
import { useDispatch, useSelector } from "@/shared/store/store";
import { getDeals, addDeal } from "@/shared/store/slices/deals/thunks";
import { logoutUser } from "@/shared/store/slices/auth";
import DealsList from "./components/DealsList";
import InputText from "@/shared/components/InputText";
import styles from "./index.module.scss";

const Deals = (): ReactElement | null => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [value, setValue] = useState("");
    const inputRef = createRef<HTMLInputElement>();

    // Перенаправление на страницу авторизации, если пользователь не авторизован
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, router]);

    const click = () => {
        if (value) dispatch(addDeal({ name: value }));
        if (inputRef.current) inputRef.current.value = "";
    };

    const change = (e: any) => {
        setValue(e.target.value);
    };

    const handleLogout = async () => {
        await dispatch(logoutUser());
        router.push("/auth");
    };

    useEffect(() => {
        dispatch(getDeals());
    }, []);

    // Не показываем контент, если пользователь не авторизован
    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div>
            <div className={styles["header"]}>
                <div className={styles["userInfo"]}>
                    <span>Добро пожаловать, {user.name}!</span>
                    <span className={styles["email"]}>({user.email})</span>
                </div>
                <Button onClick={handleLogout} className={styles["logoutButton"]}>
                    Выйти
                </Button>
            </div>
            <div className={styles["wrap"]}>
                <InputText className={styles["input"]} ref={inputRef} onChange={change} />
                <Button onClick={click}>add deal</Button>
            </div>
            <DealsList />
        </div>
    );
};

export default Deals;
