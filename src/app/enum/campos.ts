import { Injectable } from "@angular/core";

export enum Campos {
    Tecnologia = 'TECNOLOGIA',
    Educacion = 'EDUCACION',
    Sostenibilidad = 'SOSTENIBILIDAD',
    Salud = 'SALUD',
    Finanzas = 'FINANZAS',
    Otros = 'OTROS'
}


export const camposValues: string[] = Object.values(Campos).filter(value => typeof value === 'string');
export const camposKeys: string[] = Object.keys(Campos);

// export const mapaCampos: Map<string,string> = new Map();
// for(let i = 0; i < camposValues.length; i++) {
//     mapaCampos.set(camposKeys[i], camposValues[i]);
