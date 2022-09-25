type themeProviderType = {
    colorProp:{
        bodybg:string;
        cardBg:string;
        cardText:string;
        cardLightText:string; 
    }
}

type themSwitcherProps = {
    children: React.ReactNode;
}

export type {themeProviderType, themSwitcherProps};