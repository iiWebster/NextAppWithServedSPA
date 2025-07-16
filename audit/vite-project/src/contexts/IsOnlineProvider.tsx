import {createContext, type PropsWithChildren, type ReactNode, useEffect, useState} from "react";

export const IsOnlineContext = createContext<boolean>(false);

export function IsOnlineProvider({children}: PropsWithChildren): ReactNode {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        var off = (e) => {
            console.log("is Offline");
            setIsOnline(false)
        };
        window.addEventListener("offline", off);
        
        var on = (e) => {
            console.log("is Online");
            setIsOnline(true)
        };
        window.addEventListener("online", on);
        
        return () => {
            window.removeEventListener("offline", off);
            window.removeEventListener("online", on)
        };
        
    }, []);
    
    return (
        <IsOnlineContext value={isOnline}>
            {children}
        </IsOnlineContext>
    )
}