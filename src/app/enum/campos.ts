import { Injectable } from "@angular/core";

export enum Campos {
    Tecnologia = 'Tecnologia',
    Educacion = 'Educacion',
    Sostenibilidad = 'Sostenibilidad',
    Salud = 'Salud',
    Finanzas = 'Finanzas',
    Otros = 'Otros'
}


// const camposValues: string[] = Object.values(Campos).filter(value => typeof value === 'string');
export const camposKeys: string[] = Object.keys(Campos);

// export const mapaCampos: Map<string,string> = new Map();
// for(let i = 0; i < camposValues.length; i++) {
//     mapaCampos.set(camposKeys[i], camposValues[i]);
