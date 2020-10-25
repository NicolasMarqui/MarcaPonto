import { useContext } from "react";
import MainContext from "../Contexts/MainContext";
import { createIntl, createIntlCache } from "react-intl";

export default function useLanguage() {
    const { browserLanguage } = useContext(MainContext);

    const messagesInEnglish = {
        helloDashboard: "Hello {name}",
    };

    const lang = browserLanguage ? browserLanguage : "pt-BR";

    const cache = createIntlCache();

    const intl = createIntl(
        {
            // Locale of the application
            locale: lang,
            // Locale of the fallback defaultMessage
            defaultLocale: "PT-BR",
            messages: messagesInEnglish,
        },
        cache
    );

    return intl;
}
