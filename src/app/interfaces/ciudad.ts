import { DateInfo } from "./dateInfo";

export interface Ciudad {
    nombre: string;
    timeZone: string;
    descripcion: string;
    timeDate: Date;
    time?: string;
    noche?: boolean;
}
