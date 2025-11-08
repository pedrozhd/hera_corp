// src/interfaces/index.ts

// ==================== TIPOS COMUNS ====================

export interface Telefone {
  ddd: string;
  numero: string;
  tipoDeTelefone: 'CELULAR' | 'FIXO' | 'celular' | 'fixo';
}

export interface Endereco {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  estado: string;
}

// ==================== PACIENTE ====================

export interface Acompanhante {
  nome: string;
  email: string;
  parentesco: string;
  telefone: Telefone;
  dataCadastro: string;
}

export interface Paciente {
  id?: number;
  nome: string;
  email: string;
  sexo: 'M' | 'F' | 'O';
  dataNascimento: string;
  status: 'ATIVO' | 'INATIVO' | 'ativo' | 'inativo';
  consultasRestantes: number;
  faltas: number;
  possuiDeficiencia: boolean;
  tipoDeficiencia?: string | null;
  videoEnviado: boolean;
  preferenciaContato: 'WhatsApp' | 'Ligacao' | 'Email' | 'SMS';
  dataCadastro: string;
  ultimaAtualizacao: string;
  telefone: Telefone;
  endereco: Endereco;
  acompanhante?: Acompanhante;
}

export interface PacienteFormData {
  nome: string;
  email: string;
  sexo: string;
  dataNascimento: string;
  status: string;
  consultasRestantes: number;
  faltas: number;
  possuiDeficiencia: boolean;
  tipoDeficiencia: string;
  videoEnviado: boolean;
  preferenciaContato: string;
  dataCadastro: string;
  ultimaAtualizacao: string;
  telefone: {
    ddd: string;
    numero: string;
    tipoDeTelefone: string;
  };
  endereco: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    estado: string;
  };
  acompanhante: {
    nome: string;
    email: string;
    parentesco: string;
    dataCadastro: string;
    telefone: {
      ddd: string;
      numero: string;
      tipoDeTelefone: string;
    };
  };
}

// ==================== MÉDICO ====================

export interface Medico {
  id?: number;
  nome: string;
  crm: string;
  especialidade: string;
  status: 'ativo' | 'inativo' | 'ferias' | 'afastado';
  email: string;
  telefone?: Telefone;
  contatoPreferencial?: 'whatsapp' | 'ligacao' | 'email' | 'sms';
  horarioAtendimento?: string;
  dataCadastro?: string;
  ultimaAtualizacao?: string;
}

export interface MedicoFormData {
  nome: string;
  crm: string;
  especialidade: string;
  status: string;
  dataCadastro: string;
  ultimaAtualizacao: string;
  telefoneDDD: string;
  telefoneNumero: string;
  tipoTelefone: string;
  email: string;
  contatoPreferencial: string;
  horarioAtendimento: string;
}

// ==================== CONSULTA ====================

export interface Consulta {
  id?: number;
  paciente: string | { id: number; nome: string };
  medico: string | { id: number; nome: string; especialidade?: string };
  data: string;
  horario: string;
  dataConsulta: string;
  horarioConsulta: string;
  tipoConsulta: string;
  tipo: 'presencial' | 'teleconsulta';
  status: 'agendada' | 'confirmada' | 'realizada' | 'cancelada';
  linkTeleconsulta?: string;
  observacoes?: string;
}

export interface ConsultaFormData {
  paciente: string;
  medico: string;
  dataConsulta: string;
  horarioConsulta: string;
  tipoConsulta: string;
  status: string;
  statusConsulta?: string;
  linkTeleconsulta: string;
  observacoes: string;
}

// ==================== AUTENTICAÇÃO ====================

export interface AuthUser {
  id?: number;
  nome?: string;
  email: string;
  senha: string;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}
