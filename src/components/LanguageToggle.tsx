import { memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
    { code: "en" as const, name: "English", flag: "🇬🇧" },
    { code: "de" as const, name: "Deutsch", flag: "🇩🇪" },
    { code: "fr" as const, name: "Français", flag: "🇫🇷" },
    { code: "it" as const, name: "Italiano", flag: "🇮🇹" },
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
];

const LanguageToggle = memo(() => {
    const { language, setLanguage } = useLanguage();
    const currentLang = languages.find((l) => l.code === language);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-border bg-background/80 backdrop-blur-sm"
                >
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{currentLang?.flag} {currentLang?.name}</span>
                    <span className="sm:hidden">{currentLang?.flag}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`cursor-pointer ${language === lang.code ? "bg-accent" : ""
                            }`}
                    >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

LanguageToggle.displayName = "LanguageToggle";

export default LanguageToggle;
