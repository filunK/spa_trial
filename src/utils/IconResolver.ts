export class IconResolver {

    /**
     * アイコン名を
     * @static
     * @param {string} iconName アイコン名
     * @returns {string} プレフィクスにmdi-を付与したアイコン名
     *
     * @memberOf IconResolver
     */
    public static MaterialDesignIconResolver(iconName: string): string {
        if (iconName.match('^mdi-')) {
            return iconName;
        }
        return 'mdi-' + iconName;
    }
}
