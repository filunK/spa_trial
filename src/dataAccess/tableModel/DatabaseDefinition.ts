
/**
 * IndexedDB向けの固定情報
 * @export
 * @class DatabaseDefinition
 */
export class DatabaseDefinition {

    /**
     * TokenCollection
     * @readonly
     * @static
     *
     * @memberOf DatabaseDefinition
     */
    public static get TokenCollection() {
        return{
            CollectionName: 'TokenCollection',
            TableDefinition: 'Id, Value',
        };
    }

    /**
     * UserInfoCollection
     * @readonly
     * @static
     *
     * @memberOf DatabaseDefinition
     */
    public static get UserInfoCollection() {
        return {
            CollectionName: 'UserInfoCollection',
            TableDefinition: 'UserId, IsLoggedIn',
        };
    }
}
