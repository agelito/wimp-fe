import { amarrTheme } from "./amarrTheme"
import { caldariTheme } from "./caldariTheme"
import { gallenteTheme } from "./gallenteTheme"
import { minmatarTheme } from "./minmatarTheme"
import amarrLogo from "../Assets/Factions/Logo_faction_amarr_empire_clean.png";
import amarrLogoGray from "../Assets/Factions/Gray/Logo_faction_amarr_empire_clean.png";
import caldariLogo from "../Assets/Factions/Logo_faction_caldari_state_clean.png";
import caldariLogoGray from "../Assets/Factions/Gray/Logo_faction_caldari_state_clean.png";
import gallenteLogo from "../Assets/Factions/Logo_faction_gallente_federation_clean.png";
import gallenteLogoGray from "../Assets/Factions/Gray/Logo_faction_gallente_federation_clean.png";
import minmatarLogo from "../Assets/Factions/Logo_faction_minmatar_republic_clean.png";
import minmatarLogoGray from "../Assets/Factions/Gray/Logo_faction_minmatar_republic_clean.png";

export const themes = [
    { id: "amarr", theme: amarrTheme, img: amarrLogo, imgGray: amarrLogoGray },
    { id: "caldari", theme: caldariTheme, img: caldariLogo, imgGray: caldariLogoGray },
    { id: "gallente", theme: gallenteTheme, img: gallenteLogo, imgGray: gallenteLogoGray },
    { id: "minmatar", theme: minmatarTheme, img: minmatarLogo, imgGray: minmatarLogoGray },
];
