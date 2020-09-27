import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (type = "SUCCESS", text = "-") => {
    if (type === "SUCCESS") {
        return toast.success(text);
    } else if (type === "ERROR") {
        return toast.error(text);
    } else if (type === "WARNING") {
        return toast.warn(text);
    } else {
        return toast(text);
    }
};
