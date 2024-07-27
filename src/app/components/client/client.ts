export interface BaseClient {
    id: number;
    type: 'juridico' | 'fisico';
    ufCidade: string;
    number: string;
}

export interface ClientJuridico extends BaseClient {
    type: 'juridico';
    razaoSocial: string;
    cnpj: string;
}

export interface ClientFisico extends BaseClient {
    type: 'fisico';
    nome: string;
    cpf: string;
}

export type Cliente = ClientJuridico | ClientFisico;