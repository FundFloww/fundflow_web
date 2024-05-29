export enum UserType {
    INVERSOR = 'INVERSOR',
    EMPRENDEDOR = 'EMPRENDEDOR',
    LOGEADO = 'LOGEADO',
    ANONIMO = 'ANONIMO',
    ALL = 'ALL',
}

export interface ElementSideBar {
    id: number;
    nombre: string;
    icono: string;
    userType: UserType;
    destino: string;
    ruta: string;
}

const rutaIconos = '../../assets/icons';

export const elementsSideBar: ElementSideBar[] = [
    {
        id: 1,
        nombre: 'Inicio',
        icono: 'inicio',
        userType: UserType.ALL,
        destino: '/',
        ruta: `${rutaIconos}/home.svg`
    },
    {
        id: 2,
        nombre: 'Noticias',
        icono: 'noticias',
        userType: UserType.ALL,
        destino: '/noticias',
        ruta: `${rutaIconos}/noticias.svg`
    },
    {
        id: 3,
        nombre: 'Mis Ideas',
        icono: 'ideas',
        userType: UserType.EMPRENDEDOR,
        destino: '/perfil/0',
        ruta: `${rutaIconos}/emprendedor.svg`
    },
    {
        id: 4,
        nombre: 'Mis Inversiones',
        icono: 'inversiones',
        userType: UserType.INVERSOR,
        destino: '/perfil/0',
        ruta: `${rutaIconos}/inversor.svg`
    },
    {
        id: 5,
        nombre: 'Crear Idea',
        icono: 'añadir',
        userType: UserType.EMPRENDEDOR,
        destino: '/idea/añadir',
        ruta: `${rutaIconos}/añadir.svg`
    },
    {
        id: 6,
        nombre: 'Guardados',
        icono: 'guardados',
        userType: UserType.INVERSOR,
        destino: '/perfil/0',
        ruta: `${rutaIconos}/guardados.svg`
    },
    {
        id: 7,
        nombre: 'Cerrar Sesión',
        icono: 'logout',
        userType: UserType.LOGEADO,
        destino: '/logout',
        ruta: `${rutaIconos}/logout.svg`
    },
    {
        id: 8,
        nombre: 'Iniciar sesión',
        icono: 'login',
        userType: UserType.ANONIMO,
        destino: '/login',
        ruta: `${rutaIconos}/login.svg`
    },
    {
        id: 9,
        nombre: 'Registrarse',
        icono: 'registro',
        userType: UserType.ANONIMO,
        destino: '/registro',
        ruta: `${rutaIconos}/register.svg`
    },
    {
        id: 10,
        nombre: 'Chat',
        icono: 'chat',
        userType: UserType.LOGEADO,
        destino: '/chat',
        ruta: `${rutaIconos}/chat.svg`
    }
];