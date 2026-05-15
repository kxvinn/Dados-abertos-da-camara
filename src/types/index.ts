export interface Deputy {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
}

export interface Expense {
  ano: number;
  mes: number;
  tipoDespesa: string;
  idDocumento: number;
  tipoDocumento: string;
  idTipoDocumento: number;
  dataDocumento: string;
  numDocumento: string;
  valorDocumento: number;
  urlDocumento: string;
  nomeFornecedor: string;
  cnpjCpfFornecedor: string;
  valorLiquido: number;
  valorGlosa: number;
  numRessarcimento: string;
  idLote: number;
  parcela: number;
}

export interface Vote {
  descricao: string;
  tipoVoto: string;
  dataHora: string;
}

export interface APIResponse<T> {
  dados: T[];
  links: {
    rel: string;
    href: string;
  }[];
}
