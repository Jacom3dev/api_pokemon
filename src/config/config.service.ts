export class ConfigService {
    private readonly envConfig: { [Key: string]: any } = null;

    constructor() {
        this.envConfig = {};
        this.envConfig.PORT = 3000;
        this.envConfig.DNS_MONGO = "mongodb://localhost:27017/nest-pokemon";
       
    }
    get(Key: string) {
        return this.envConfig[Key]
    }

}