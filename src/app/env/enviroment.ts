
import { EnvironmentService } from '../servicios/enviroment.service';

interface Environment {
    production: boolean;
    accountName: string ;
    containerName: string;
    key: string;
}

class BaseEnvironment implements Environment {
    environmentService: EnvironmentService = new EnvironmentService();
    production: boolean = false;
    accountName: string = "fundflow";
    containerName: string;
    key: string = "";

    constructor(containerName: string) {
        this.containerName = containerName;
        this.key = this.environmentService.key;
    }
}

export const environmentPerfil = new BaseEnvironment("perfil");
export const environmentIdea = new BaseEnvironment("ideas");