import Dexie from 'dexie';
import { Env } from '@/utils/Env';
import { ITokenStorage } from '@/dataAccess/tableModel/ITokenStorage';
import { TokenStorage } from '@/dataAccess/tableModel/TokenStorage';
import { DatabaseDefinition } from '@/dataAccess/tableModel/DatabaseDefinition';

export class DexieContext extends Dexie {

    public TokenCollection: Dexie.Table<ITokenStorage, string>;

    public constructor() {
        super(Env.Instance.DataSourceName);

        this.ConfigureTables();

        this.TokenCollection = this.table(DatabaseDefinition.TokenCollection.CollectionName);
        this.TokenCollection.mapToClass(TokenStorage);

    }

    public async SaveTokens(tokens: ITokenStorage[]): Promise<void> {
        await this.transaction('rw', this.TokenCollection, async () => {

            this.TokenCollection.bulkPut(tokens);
        });
    }

    public async GetTokens(tokenId: string): Promise<string | undefined> {
        const token = await this.TokenCollection.get(tokenId);
        if (token) {
            return token.Value;
        } else {
            return undefined;
        }

    }

    private ConfigureTables(): void {
        this.version(1).stores({
            TokenCollection: DatabaseDefinition.TokenCollection.TableDefinition,
        });

    }
}

export const dexieContext = new DexieContext();
