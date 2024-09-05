import { DateInfo } from "./dateInfo";

export interface Ciudad {
    nombre: string;
    timeZone: string;
    descripcion: string;
    time?: string;
    noche?: boolean;
}
