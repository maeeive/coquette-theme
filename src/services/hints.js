import { THEME_VERSION } from '../config/theme-info.js';
import { getSettings as getExtensionSettings } from './settings-service.js';

/**
 * Ensure the Moonlit theme buttons hint is visible when the theme is enabled.
 */
export function addThemeButtonsHint() {
    const themesContainer = document.getElementById('UI-presets-block');
    if (!themesContainer) return;

    const context = SillyTavern.getContext();
    const settings = getExtensionSettings(context);

    if (!settings?.enabled) {
        const existingHint = document.getElementById('moonlit-theme-buttons-hint');
        if (existingHint) existingHint.remove();
        return;
    }

    if (document.getElementById('moonlit-theme-buttons-hint')) return;

    const hintElement = document.createElement('small');
    hintElement.id = 'moonlit-theme-buttons-hint';
    hintElement.style.margin = '8px 0';
    hintElement.style.padding = '8px 12px';
    hintElement.style.display = 'block';
    hintElement.style.lineHeight = '1.5';
    hintElement.style.borderRadius = '15px'; /* Nuvenzinha! */
    hintElement.style.background = 'rgba(255, 240, 245, 0.6)'; /* Fundo rosa pastel */
    hintElement.style.border = '1px dashed #ffb6c1'; /* Bordinha Coquette */
    hintElement.style.color = '#ff99a8'; /* Texto rosinha */

    const themeSelector = document.getElementById('themes');
    let currentTheme = themeSelector ? themeSelector.value : '';

    if (currentTheme.includes('- by Rivelle')) {
        hintElement.innerHTML = `✿ <b><span data-i18n="You are currently using the third-party extension theme">You are currently using the third-party extension theme</span> Moonlit Echoes Theme <a href="https://github.com/RivelleDays/SillyTavern-MoonlitEchoesTheme" target="_blank" style="color: #ff99a8;">${THEME_VERSION} 𖹭</a></b><br>
        <small style="color: #ffb6c1;"><span data-i18n="Thank you for choosing my theme! This extension is unofficial. For issues, please contact">Thank you for choosing my theme! This extension is unofficial. For issues, please contact</span> <a href="https://github.com/RivelleDays" target="_blank" style="color: #ff99a8; font-weight: bold;">Rivelle ♡</a></small>`;
        hintElement.style.borderLeft = '4px solid #ff99a8'; /* Borda lateral mais grossinha e rosa */
    } else {
        hintElement.innerHTML = `✿ <b><span data-i18n="You are currently using the third-party extension theme">You are currently using the third-party extension theme</span> Moonlit Echoes Theme <a href="https://github.com/RivelleDays/SillyTavern-MoonlitEchoesTheme" target="_blank" style="color: #ff99a8;">${THEME_VERSION} 𖹭</a></b><br>
        <small style="color: #ffb6c1;"><span data-i18n="customThemeIssue">This unofficial extension may not work with all custom themes. Please troubleshoot first; if confirmed, contact</span> <a href="https://github.com/RivelleDays" target="_blank" style="color: #ff99a8; font-weight: bold;">Rivelle ♡</a></small>`;
        hintElement.style.borderLeft = '4px solid #ffb6c1';
    }

    themesContainer.appendChild(hintElement);

    if (themeSelector) {
        themeSelector.addEventListener('change', () => {
            if (!settings?.enabled) {
                return;
            }

            const themeValue = themeSelector.value;
            if (themeValue.includes('- by Rivelle')) {
                hintElement.innerHTML = `✿ <b><span data-i18n="You are currently using the third-party extension theme">You are currently using the third-party extension theme</span> Moonlit Echoes Theme <a href="https://github.com/RivelleDays/SillyTavern-MoonlitEchoesTheme" target="_blank" style="color: #ff99a8;">${THEME_VERSION} 𖹭</a></b><br>
                <small style="color: #ffb6c1;"><span data-i18n="Thank you for choosing my theme! This extension is unofficial. For issues, please contact">Thank you for choosing my theme! This extension is unofficial. For issues, please contact</span> <a href="https://github.com/RivelleDays" target="_blank" style="color: #ff99a8; font-weight: bold;">Rivelle ♡</a></small>`;
                hintElement.style.borderLeft = '4px solid #ff99a8';
            } else {
                hintElement.innerHTML = `✿ <b><span data-i18n="You are currently using the third-party extension theme">You are currently using the third-party extension theme</span> Moonlit Echoes Theme <a href="https://github.com/RivelleDays/SillyTavern-MoonlitEchoesTheme" target="_blank" style="color: #ff99a8;">${THEME_VERSION} 𖹭</a></b><br>
                <small style="color: #ffb6c1;"><span data-i18n="customThemeIssue">This unofficial extension may not work with all custom themes. Please troubleshoot first; if confirmed, contact</span> <a href="https://github.com/RivelleDays" target="_blank" style="color: #ff99a8; font-weight: bold;">Rivelle ♡</a></small>`;
                hintElement.style.borderLeft = '4px solid #ffb6c1';
            }
        });
    }
}
