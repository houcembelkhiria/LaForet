import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "it" | "es" | "fr" | "de";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dynamic imports for all language files
const loadLanguageData = async (lang: Language) => {
    const [common, index, about, rooms, roomDetails, gallery] = await Promise.all([
        import(`../content/${lang}/common.json`),
        import(`../content/${lang}/index.json`),
        import(`../content/${lang}/about.json`),
        import(`../content/${lang}/rooms.json`),
        import(`../content/${lang}/roomDetails.json`),
        import(`../content/${lang}/gallery.json`),
    ]);

    return {
        common: common.default,
        index: index.default,
        about: about.default,
        rooms: rooms.default,
        roomDetails: roomDetails.default,
        gallery: gallery.default,
    };
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem("language");
        return (saved as Language) || "fr";
    });

    const [translations, setTranslations] = useState<any>(null);

    useEffect(() => {
        loadLanguageData(language).then(setTranslations);
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string) => {
        if (!translations) return "";

        const keys = key.split(".");
        let value = translations;

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    if (!translations) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
