import { memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// SVG Flag components for better cross-platform rendering
const FlagUK = () => (
    <svg className="h-4 w-5 rounded-sm" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="uk"><rect width="60" height="30" rx="2" /></clipPath>
        <g clipPath="url(#uk)">
            <rect width="60" height="30" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk)" />
            <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
        </g>
    </svg>
);

const FlagDE = () => (
    <svg className="h-4 w-5 rounded-sm" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
        <rect width="5" height="3" y="0" fill="#000" />
        <rect width="5" height="2" y="1" fill="#D00" />
        <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
);

const FlagFR = () => (
    <svg className="h-4 w-5 rounded-sm" viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="2" fill="#ED2939" />
        <rect width="2" height="2" fill="#fff" />
        <rect width="1" height="2" fill="#002395" />
    </svg>
);

const FlagIT = () => (
    <svg className="h-4 w-5 rounded-sm" viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
        <rect width="3" height="2" fill="#CE2B37" />
        <rect width="2" height="2" fill="#fff" />
        <rect width="1" height="2" fill="#009246" />
    </svg>
);

const FlagES = () => (
    <svg className="h-4 w-5 rounded-sm" viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="750" height="500" fill="#c60b1e" />
        <rect width="750" height="250" y="125" fill="#ffc400" />
    </svg>
);

const flagComponents: Record<string, React.FC> = {
    en: FlagUK,
    de: FlagDE,
    fr: FlagFR,
    it: FlagIT,
    es: FlagES,
};

const languages = [
    { code: "en" as const, name: "English" },
    { code: "de" as const, name: "Deutsch" },
    { code: "fr" as const, name: "Français" },
    { code: "it" as const, name: "Italiano" },
    { code: "es" as const, name: "Español" },
];

const LanguageToggle = memo(() => {
    const { language, setLanguage } = useLanguage();
    const currentLang = languages.find((l) => l.code === language);
    const CurrentFlag = flagComponents[language] || FlagUK;

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-border bg-background/80 backdrop-blur-sm"
                >
                    <CurrentFlag />
                    <span className="hidden sm:inline">{currentLang?.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 z-[10000]">
                {languages.map((lang) => {
                    const FlagComponent = flagComponents[lang.code];
                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={`cursor-pointer gap-3 ${language === lang.code ? "bg-accent" : ""
                                }`}
                        >
                            <FlagComponent />
                            {lang.name}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

LanguageToggle.displayName = "LanguageToggle";

export default LanguageToggle;
