import type { Control, FieldErrors, UseFormGetValues } from 'react-hook-form';

export interface InscricaoFormData {
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string | null;
  cpf: string;
  curso: string;
  dataInscricao: string;
  dataNascimento: string;
  escola: string;
  estado: string;
  foto: File | null;
  genero: string;
  idEscola: string;
  logradouro: string;
  nome: string;
  numero: string;
  observacoes: string;
  periodo: string;
  ra: string;
  serie: string;
  telAdolescente: string;
  telExtra: string;
  telResponsavel: string;
}

export interface ControlErrorsProps {
  control: Control<InscricaoFormData>;
  errors: FieldErrors<InscricaoFormData>;
};

export interface EnderecoSectionProps extends ControlErrorsProps {
  getValues: UseFormGetValues<InscricaoFormData>;
  handleCep: (cep: string) => Promise<void>;
}
