import { useState, useEffect, useContext } from "react";
import MainContext from "../Contexts/MainContext";

export const usePosition = (watch?: boolean) => {
    const { hasAskedForGeo } = useContext(MainContext);
    const [position, setPosition] = useState({});
    const [error, setError] = useState("null");

    const onChange = ({ coords }: { coords: any }) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    };

    const onError = (error: any) => {
        setError(error.message);
    };

    useEffect(() => {
        const geo = navigator.geolocation;

        if (!geo) {
            setError("Geolocation is not supported");
            return;
        }

        let watcher = geo.watchPosition(onChange, onError);

        return () => geo.clearWatch(watcher);
    }, [hasAskedForGeo]);

    return { position, error };
};
