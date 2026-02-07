type DropdownItem = {
  text: string;
  url: string;
};

type ContentBtn = {
  text: string;
  dropdown: boolean;
  itensDropdown?: DropdownItem[];
};

const contentBtn: ContentBtn[] = [
  { text: 'Início', dropdown: false },
  {
    text: 'Adolescentes',
    dropdown: true,
    itensDropdown: [
      { text: 'Inscrição', url: '/inscricao' },
      { text: 'Matrícula', url: '/' },
      { text: 'Listar', url: '/' },
    ],
  },
  {
    text: 'Empresas',
    dropdown: true,
    itensDropdown: [
      { text: 'Listar', url: '/' },
      { text: 'Entrevistas', url: '/' },
      { text: 'Cargos', url: '/' },
      { text: 'Cursos', url: '/' },
    ],
  },
  {
    text: 'Aulas',
    dropdown: true,
    itensDropdown: [
      { text: 'Turmas', url: '/' },
      { text: 'Chamadas', url: '/' },
      { text: 'Disciplinas', url: '/' },
      { text: 'Professores', url: '/' },
    ],
  },
  {
    text: 'Auxiliares',
    dropdown: true,
    itensDropdown: [
      { text: 'Escolas', url: '/' },
      { text: 'Territórios', url: '/territorios' },
      { text: 'Salas de Aula', url: '/' },
    ],
  },
];

export { contentBtn };
export type { DropdownItem };
