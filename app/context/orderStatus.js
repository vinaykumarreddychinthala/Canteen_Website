"use client";
import { createContext, useState } from "react";

export const orderstatuscontext = createContext();

export const OrderStatusProvider = ({ children }) => {
    const [orderstatus, setOrderStatus] = useState({});

    const updateStatus = (username, isCompleted, delay) => {
        setOrderStatus(prev => ({
            ...prev,
            [username]: [isCompleted, delay]
        }));
    };

    return (
        <orderstatuscontext.Provider value={{ orderstatus,updateStatus}}>
            {children}
        </orderstatuscontext.Provider>
    );
};
