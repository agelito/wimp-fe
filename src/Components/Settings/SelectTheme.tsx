import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import { selectThemeId, setThemeId } from "../../State/Settings/settingsSlice";
import { themes } from "../../Themes/themes";

export const SelectTheme: React.FC = () => {
    const { t } = useTranslation();

    const themeId = useAppSelector(selectThemeId);
    const dispatch = useAppDispatch();

    const choisesOptions = useMemo<IChoiceGroupOption[]>(() => {
        return themes.flatMap(theme => {
            return {
                key: theme.id,
                imageSrc: theme.imgGray,
                imageAlt: t(`theme_${theme.id}_name`),
                selectedImageSrc: theme.img,
                imageSize: { width: 64, height: 64 },
                text: t(`theme_${theme.id}_name`),
                iconProps: theme.icon ? {
                    iconName: theme.icon,
                } : undefined,
                onChange: () => dispatch(setThemeId(theme.id)),
            };
        });
    }, [dispatch, t]);

    return (
        <ChoiceGroup label={t("select_theme_label")} defaultSelectedKey={themeId} options={choisesOptions} onChange={(_, option) => dispatch(setThemeId(option?.key ?? ''))} />
    );
};