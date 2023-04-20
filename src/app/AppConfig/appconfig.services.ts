import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { AppConfig } from "./appconfig.interface";

export const appServiceConfig=new InjectionToken<AppConfig>('app.config');

export const app_config={
    apiEndpoint:environment.apiEndpoint
};