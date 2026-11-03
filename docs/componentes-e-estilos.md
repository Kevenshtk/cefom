# Guia de Componentes e Estilos — CEFOM

Este documento serve como referência técnica detalhada e catálogo de componentes para o desenvolvimento de novas páginas e módulos na aplicação **CEFOM**.

---

## 1. Visão Geral da Stack Tecnológica

- **Framework Web**: [React 19](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS v3.4](https://tailwindcss.com/) configurado com variáveis CSS nativas (Design Tokens)
- **Roteamento**: [React Router v7](https://reactrouter.com/) (`react-router-dom`)
- **Formulários e Validação**: [React Hook Form](https://react-hook-form.com/) e [Yup](https://github.com/jquense/yup)
- **Feedback & Alertas**: [SweetAlert2](https://sweetalert2.github.io/) encapsulado em utilitário próprio
- **Ícones**: [Font Awesome 6 (Free Solid)](https://fontawesome.com/) via CDN e [React Icons](https://react-icons.github.io/react-icons/)
- **Cliente HTTP**: [Axios](https://axios-http.com/)

### Estrutura de Pastas

```text
src/
├── components/          # Componentes reutilizáveis de interface
│   ├── Button/          # Botões com variantes de estilo
│   ├── DataTable/       # Tabela genérica paginada/com ações
│   ├── Dropdown/        # Menu suspenso de navegação
│   ├── Forms/           # Seções modulares de formulários complexos
│   ├── Header/          # Barra de navegação superior da aplicação
│   ├── Input/           # Controles de formulário (Input, Select, FileInput)
│   ├── ListPageLayout/  # Layout padrão para páginas de listagem
│   └── Pagination/      # Componente de controle de paginação
├── context/             # Contextos globais e por domínio (Territórios, Escolas, etc.)
├── hooks/               # Custom hooks de domínio, utilitários e CRUD genérico
├── pages/               # Páginas da aplicação organizadas por módulo
│   ├── escolas/         # home, cadastrar, detalhes, atualizar
│   ├── territorios/     # home, cadastrar, detalhes, atualizar
│   └── inscricao/       # Formulário de inscrição de adolescentes
├── services/            # Camada de comunicação com APIs externas/backend
├── types/               # Tipagens TypeScript (api, context, services)
├── utils/               # Funções utilitárias (alertas, máscaras, helpers)
├── routes.tsx           # Configuração de rotas da aplicação
└── index.css            # Definição de tokens de design e diretivas do Tailwind
```

---

## 2. Design Tokens e Sistema de Estilos

A aplicação utiliza classes utilitárias do Tailwind CSS mapeadas para variáveis CSS declaradas no `:root` em `src/index.css` e estendidas no `tailwind.config.js`.

### 2.1 Paleta de Cores Semântica

| Nome no Tailwind | Variável CSS | Cor Hexadecimal | Aplicação Principal |
| :--- | :--- | :--- | :--- |
| `background` / `bg-background` | `--color-background` | `#f5f7fb` | Fundo principal da página (body/layout) |
| `surface` / `bg-surface` | `--color-surface` | `#ffffff` | Fundo de cards, cabeçalho, tabelas e inputs |
| `surface-2` / `bg-surface-2` | `--color-surface-2` | `#eef2f8` | Fundos secundários, cabeçalho de tabelas, botões secundários, hover |
| `border` / `border-border` | `--color-border` | `#d7dee7` | Bordas de cards, divisórias, tabelas e inputs |
| `text-primary` | `--color-text-primary` | `#1f2937` | Texto principal, títulos e rótulos |
| `text-secondary` | `--color-text-secondary` | `#6b7280` | Subtítulos, textos de apoio e placeholders |
| `primary` / `bg-primary` / `text-primary` | `--color-primary` | `#3b82f6` | Ações principais, botões de destaque e links |

#### Cores de Feedback / Auxiliares:
- **Erro / Perigo / Exclusão**: `text-red-500`, `border-red-500`, `hover:text-red-700`
- **Hover Primário**: `hover:opacity-90` ou `hover:text-blue-700`

---

### 2.2 Sombras (`boxShadow`)

| Classe Tailwind | Variável CSS | Descrição |
| :--- | :--- | :--- |
| `shadow-sm` | `--shadow-sm: 0 1px 4px rgba(15, 23, 42, 0.08)` | Usada em cards, cabeçalho e botões |
| `shadow-md` | `--shadow-md: 0 8px 24px rgba(15, 23, 42, 0.10)` | Usada em menus suspensos (dropdowns) e popups |

---

### 2.3 Raios de Borda (`borderRadius`)

| Classe Tailwind | Valor | Aplicação Típica |
| :--- | :--- | :--- |
| `rounded-md` | `var(--radius-md) = 12px` | Inputs, selects e botões |
| `rounded-lg` | `var(--radius-lg) = 20px` | Cards principais de formulário, detalhes e tabelas |
| `rounded-full` | Padrão Tailwind (`9999px`) | Preview de avatares/fotos |

---

### 2.4 Tipografia e Hierarquia Visual

- **Título de Página**: `text-2xl font-bold text-text-primary tracking-tight`
- **Subtítulo / Seção de Formulário**: `text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4`
- **Rótulo de Campo (Label)**: `block text-sm font-medium text-text-primary mb-1 mt-4`
- **Rótulo de Detalhes (Key)**: `text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1`
- **Valor de Detalhes (Value)**: `text-sm font-medium text-text-primary`
- **Mensagem de Erro**: `text-red-500 text-xs mt-1 block`
- **Texto de Ajuda / Rodapé**: `text-xs text-text-secondary mt-2`

---

### 2.5 Classes Padronizadas de Formulário

Para manter a consistência com os inputs do sistema ao construir campos manuais ou com `react-hook-form`:

```tsx
export const formClasses = {
  input: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:bg-surface-2 disabled:text-text-secondary",
  inputError: "border-red-500 focus:ring-red-500",
  label: "block text-sm font-medium text-text-primary mb-1 mt-4",
  error: "text-red-500 text-xs mt-1 block",
  sectionTitle: "text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4",
  card: "bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border",
  backLink: "inline-flex items-center gap-2 mb-6 text-sm font-medium text-text-secondary hover:text-primary transition-colors",
};
```

---

## 3. Catálogo de Componentes Reutilizáveis

### 3.1 `Button`

Componente base de botão com suporte a variantes, estados e tipagens de submissão.

- **Caminho**: `src/components/Button/index.tsx`
- **Tipagem**: `src/components/Button/types.ts`

#### Propriedades (`ButtonProps`)

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Define a paleta e relevância do botão |
| `children` | `ReactNode` | **Obrigatório** | Conteúdo interno (texto, ícones) |
| `className` | `string` | `''` | Classes CSS Tailwind adicionais |
| `onClick` | `() => void` | `undefined` | Callback acionado ao clicar |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo do botão HTML |
| `disabled` | `boolean` | `false` | Se desabilitado, reduz opacidade e bloqueia eventos |

#### Exemplo de Uso

```tsx
import Button from '@/components/Button';

// Botão Primário (Submit)
<Button type="submit" disabled={isSubmitting}>
  <i className="fa-solid fa-check mr-2" />
  {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
</Button>

// Botão Secundário
<Button variant="secondary" onClick={() => navigate(-1)}>
  Cancelar
</Button>
```

---

### 3.2 `Input`

Campo de texto integrado com label opcional, exibição de mensagem de erro e suporte para `forwardRef` (compatível com `react-hook-form`).

- **Caminho**: `src/components/Input/Input.tsx` (exportado em `src/components/Input/index.tsx`)

#### Propriedades (`InputProps`)

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Rótulo exibido acima do input |
| `error` | `string` | `undefined` | Mensagem de validação de erro exibida abaixo do campo |
| `id` / `name` | `string` | `props.name` | Identificador único do input |
| `className` | `string` | `''` | Classes adicionais |
| `...props` | `React.InputHTMLAttributes` | — | Suporta `placeholder`, `type`, `disabled`, `value`, etc. |

#### Exemplo de Uso

```tsx
import { Input } from '@/components/Input';
import { Controller, useForm } from 'react-hook-form';

// Com Controller do React Hook Form:
<Controller
  name="nome"
  control={control}
  rules={{ required: 'O nome é obrigatório' }}
  render={({ field }) => (
    <Input
      label="Nome Completo"
      placeholder="Digite o nome..."
      error={errors.nome?.message}
      {...field}
    />
  )}
/>
```

---

### 3.3 `Select`

Campo de seleção suspenso estilizado com suporte a `options` via prop ou elementos `<option>` passados como `children`.

- **Caminho**: `src/components/Input/Select.tsx` (exportado em `src/components/Input/index.tsx`)

#### Propriedades (`SelectProps`)

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Rótulo exibido acima do select |
| `error` | `string` | `undefined` | Mensagem de erro |
| `options` | `SelectOption[]` | `[]` | Lista `{ value: string \| number; label: string \| number }` |
| `children` | `ReactNode` | `undefined` | Opções manuais `<option>` customizadas |
| `...props` | `React.SelectHTMLAttributes` | — | Suporta atributos padrão de `select` |

#### Exemplo de Uso

```tsx
import { Select } from '@/components/Input';

// Usando lista de options:
const tipoOptions = [
  { value: 'Publica', label: 'Pública' },
  { value: 'Particular', label: 'Particular' }
];

<Select
  label="Tipo da Escola"
  options={tipoOptions}
  error={errors.tipo?.message}
  {...register('tipo')}
/>

// Ou usando children:
<Select label="Gênero" error={errors.genero?.message} {...field}>
  <option value="">Selecione...</option>
  <option value="M">Masculino</option>
  <option value="F">Feminino</option>
</Select>
```

---

### 3.4 `FileInput`

Componente de upload de imagens com área de drop, visualização de avatar (preview circular) e suporte a arquivos `File` ou URLs `string`.

- **Caminho**: `src/components/Input/FileInput.tsx` (exportado em `src/components/Input/index.tsx`)

#### Propriedades (`FileInputProps`)

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Título da seção do upload |
| `error` | `string` | `undefined` | Mensagem de erro |
| `value` | `File \| string \| null` | `null` | Arquivo selecionado ou URL da imagem |
| `onChange` | `(file: File \| null) => void` | `undefined` | Callback disparado na troca de arquivo |

#### Exemplo de Uso

```tsx
import { FileInput } from '@/components/Input';
import { Controller } from 'react-hook-form';

<Controller
  name="foto"
  control={control}
  render={({ field: { value, onChange, ...fieldProps } }) => (
    <FileInput
      label="Foto do Aluno"
      error={errors.foto?.message}
      value={value}
      onChange={onChange}
      {...fieldProps}
    />
  )}
/>
```

---

### 3.5 `DataTable<T>`

Componente genérico para renderização de tabelas com layout responsivo (`overflow-x-auto`), cabeçalho estilizado, hover em linhas e coluna de ações configurável.

- **Caminho**: `src/components/DataTable/index.tsx`

#### Propriedades (`DataTableProps<T>`)

| Prop | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `data` | `T[]` | **Obrigatório** | Array de dados a exibir |
| `columns` | `Array<{ header: string; accessor: keyof T }>` | **Obrigatório** | Configuração dos cabeçalhos e chaves do objeto |
| `renderActions` | `(item: T) => ReactNode` | **Obrigatório** | Função de renderização para a coluna "Ações" |
| `keyField` | `keyof T` | **Obrigatório** | Propriedade que serve como chave única da linha |

#### Exemplo de Uso

```tsx
import DataTable from '@/components/DataTable';
import { Link } from 'react-router-dom';

interface ItemExemplo {
  id: number;
  nome: string;
  descricao: string;
}

<DataTable<ItemExemplo>
  data={items}
  keyField="id"
  columns={[
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'nome' },
    { header: 'Descrição', accessor: 'descricao' },
  ]}
  renderActions={(item) => (
    <div className="flex items-center justify-end gap-3">
      <Link 
        to={`/modulo/detalhes/${item.id}`}
        className="text-primary hover:underline font-medium text-sm transition-colors"
      >
        Detalhes
      </Link>
      <Link 
        to={`/modulo/atualizar/${item.id}`}
        className="text-text-secondary hover:text-text-primary text-sm transition-colors"
      >
        Editar
      </Link>
      <button 
        onClick={() => handleDelete(item.id)}
        className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
      >
        Deletar
      </button>
    </div>
  )}
/>
```

---

### 3.6 `Pagination`

Barra de navegação entre páginas com botões "Anterior", indicador numérico e "Próxima".

- **Caminho**: `src/components/Pagination/index.tsx`

#### Propriedades (`PaginationProps`)

| Prop | Tipo | Descrição |
| :--- | :--- | :--- |
| `page` | `number` | Índice da página atual (**base 0**) |
| `totalPages` | `number` | Quantidade total de páginas disponíveis |
| `setPage` | `Dispatch<SetStateAction<number>>` | Função atualizadora do estado da página |

#### Exemplo de Uso

```tsx
import Pagination from '@/components/Pagination';

<Pagination 
  page={page} 
  totalPages={totalPages} 
  setPage={setPage} 
/>
```

---

### 3.7 `ListPageLayout`

Container padronizado para telas de listagem. Cria o título da página e o botão de ação principal "Cadastrar" apontando para a rota de criação.

- **Caminho**: `src/components/ListPageLayout/index.tsx`

#### Propriedades (`ListPageLayoutProps`)

| Prop | Tipo | Descrição |
| :--- | :--- | :--- |
| `title` | `string` | Título da tela exibido no topo (h1) |
| `createLink` | `string` | Rota para o formulário de cadastro (ex: `/escolas/cadastro`) |
| `children` | `ReactNode` | Conteúdo da página (normalmente `DataTable` + `Pagination`) |

#### Exemplo de Uso

```tsx
import ListPageLayout from '@/components/ListPageLayout';

<ListPageLayout title="Lista de Alunos" createLink="/alunos/cadastro">
  <DataTable ... />
  <Pagination ... />
</ListPageLayout>
```

---

### 3.8 `Header` e `Dropdown`

Barra de topo persistente fixa (`sticky top-0 z-50 bg-surface shadow-sm`). Suporta links diretos ou menus suspensos acionados por clique.

- **Caminho**: `src/components/Header/index.tsx`
- **Configuração dos Itens**: `src/components/Header/contentBtnHeader.ts`

Para adicionar uma nova página ao menu de navegação, edite o array `contentBtn` em `contentBtnHeader.ts`:

```typescript
// src/components/Header/contentBtnHeader.ts
export const contentBtn: ContentBtn[] = [
  // ...
  {
    text: 'Novo Módulo',
    dropdown: true,
    itensDropdown: [
      { text: 'Listar', url: '/novo-modulo' },
      { text: 'Cadastrar', url: '/novo-modulo/cadastro' },
    ],
  },
];
```

---

## 4. Utilitário de Notificações e Alertas (`src/utils/alert.ts`)

O módulo `src/utils/alert.ts` fornece uma API simples sobre o SweetAlert2 com suporte a toasts não invasivos no topo da tela e modais de confirmação assíncronos.

### 4.1 Métodos Disponíveis

```typescript
import alert from '@/utils/alert';

// 1. Toast de Sucesso (canto superior direito por 3.5s)
alert.success('Registro gravado com sucesso!');

// 2. Toast de Erro / Aviso
alert.error('Não foi possível carregar os dados.');

// 3. Toast Informativo
alert.info('Nenhuma alteração foi realizada.');

// 4. Modal de Confirmação de Exclusão (retorna Promise<boolean>)
const confirmado = await alert.delete();
if (confirmado) {
  // executa exclusão
}

// 5. Modal de Confirmação de Atualização (retorna SweetAlertResult)
const result = await alert.update();
if (result.isConfirmed) {
  // executa salvamento
}
```

---

## 5. Hooks Customizados do Projeto

### 5.1 `useCrud<TItems, TItem, TFormData>`

Hook genérico para gerenciamento de estado CRUD completo com paginação integrada e feedback automático via `alert`.

- **Caminho**: `src/hooks/useCrud.ts`

```typescript
const {
  items,        // TItems[]: registros da página atual
  item,         // TItem | null: registro individual buscado por ID
  page,         // number: índice da página atual (0-indexed)
  totalPages,   // number: total de páginas
  setPage,      // setter para mudar de página
  load,         // (page: number) => Promise<void>
  getById,      // (id: string) => Promise<void>
  add,          // (data: TFormData) => Promise<boolean>
  update,       // (id: string, data: TFormData) => Promise<boolean>
  remove,       // (id: number) => Promise<boolean>
} = useCrud(meuService);
```

### 5.2 `useCep`

Permite a consulta rápida de endereço via CEP com tratamento de erros integrado.

- **Caminho**: `src/hooks/useCep.ts`

```typescript
import { useCep } from '@/hooks/useCep';

const { getCep } = useCep();

const preencherEndereco = async (cep: string) => {
  const dados = await getCep(cep);
  if (dados) {
    setValue('logradouro', dados.logradouro);
    setValue('bairro', dados.bairro);
    setValue('cidade', dados.localidade);
    setValue('estado', dados.uf);
  }
};
```

---

## 6. Boilerplates / Padrões Prontos para Novas Páginas

### 6.1 Padrão: Página de Listagem (`pages/[modulo]/home/index.tsx`)

```tsx
import { Link } from 'react-router-dom';
import ListPageLayout from '@/components/ListPageLayout';
import DataTable from '@/components/DataTable';
import Pagination from '@/components/Pagination';
import alert from '@/utils/alert';
import { useMeuContexto } from '@/hooks/useMeuContexto';

interface MeuItem {
  id: number;
  nome: string;
}

const ModuloHome = () => {
  const { items, remove, page, setPage, totalPages } = useMeuContexto();

  const handleExcluir = async (id: number) => {
    const confirmou = await alert.delete();
    if (confirmou) {
      await remove(id);
    }
  };

  return (
    <ListPageLayout title="Lista de Itens" createLink="/meu-modulo/cadastro">
      <DataTable<MeuItem>
        data={items}
        keyField="id"
        columns={[
          { header: 'ID', accessor: 'id' },
          { header: 'Nome', accessor: 'nome' },
        ]}
        renderActions={(item) => (
          <div className="flex items-center justify-end gap-3">
            <Link
              to={`/meu-modulo/detalhes/${item.id}`}
              className="text-primary hover:underline font-medium text-sm transition-colors"
            >
              Detalhes
            </Link>

            <Link
              to={`/meu-modulo/atualizar/${item.id}`}
              className="text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              Editar
            </Link>

            <button
              type="button"
              onClick={() => handleExcluir(item.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Deletar
            </button>
          </div>
        )}
      />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </ListPageLayout>
  );
};

export default ModuloHome;
```

---

### 6.2 Padrão: Formulário de Cadastro / Edição (`pages/[modulo]/cadastrar/index.tsx`)

```tsx
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/Button';
import { Input, Select } from '@/components/Input';
import { useMeuContexto } from '@/hooks/useMeuContexto';

interface FormValues {
  nome: string;
  status: string;
}

const CadastroModulo = () => {
  const navigate = useNavigate();
  const { add } = useMeuContexto();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const sucesso = await add(data);
    if (sucesso) {
      reset();
      navigate('/meu-modulo');
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Link
        to="/meu-modulo"
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
      >
        <i className="fa-solid fa-arrow-left" /> Voltar
      </Link>

      <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Novo Cadastro</h1>
        <p className="text-sm text-text-secondary mb-6">Preencha as informações abaixo.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-4 mb-4">
            Dados Principais
          </h2>

          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: 'O nome é obrigatório' }}
            render={({ field }) => (
              <Input
                label="Nome"
                placeholder="Digite o nome..."
                error={errors.nome?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            defaultValue=""
            rules={{ required: 'Selecione uma opção' }}
            render={({ field }) => (
              <Select
                label="Status"
                error={errors.status?.message}
                options={[
                  { value: 'ATIVO', label: 'Ativo' },
                  { value: 'INATIVO', label: 'Inativo' },
                ]}
                {...field}
              />
            )}
          />

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border">
            <Button variant="secondary" onClick={() => navigate('/meu-modulo')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroModulo;
```

---

### 6.3 Padrão: Página de Detalhes (`pages/[modulo]/detalhes/index.tsx`)

```tsx
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMeuContexto } from '@/hooks/useMeuContexto';

const DetailField = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div className="flex flex-col mb-4">
    <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
      {label}
    </span>
    <span className="text-sm font-medium text-text-primary">
      {value || '-'}
    </span>
  </div>
);

const DetalhesModulo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, getById } = useMeuContexto();

  useEffect(() => {
    if (!id) {
      navigate('/meu-modulo');
      return;
    }
    getById(id);
  }, [id, navigate, getById]);

  if (!item) {
    return <p className="text-center text-text-secondary py-8">Carregando...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Link
        to="/meu-modulo"
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
      >
        <i className="fa-solid fa-arrow-left" /> Voltar
      </Link>

      <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Detalhes do Registro</h1>
          <Link
            to={`/meu-modulo/atualizar/${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-blue-700 transition-colors bg-surface-2 px-4 py-2 rounded-md"
          >
            <i className="fa-solid fa-pen" /> Atualizar
          </Link>
        </div>

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mb-4 mt-6">
          Identificação
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <DetailField label="ID" value={item.id} />
          <DetailField label="Nome" value={item.nome} />
        </div>
      </div>
    </div>
  );
};

export default DetalhesModulo;
```

---

## 7. Checklist para Implementar um Novo Módulo Completo

Ao criar uma nova entidade ou funcionalidade, siga os seguintes passos para garantir total harmonia com o projeto:

1. **Tipagem** (`src/types/`):
   - Crie o arquivo de tipos em `src/types/api/[modulo].types.ts` definindo a estrutura de listagem (`ListItem`), formulário (`FormData`) e detalhes (`Details`).
2. **Serviço de API** (`src/services/[modulo]/index.ts`):
   - Implemente os endpoints `get(page)`, `getById(id)`, `add(data)`, `put(id, data)` e `del(id)`.
3. **Contexto & Provider** (`src/context/[modulo]/`):
   - Crie o Contexto usando o hook `useCrud(meuService)` e exporte o Provider.
   - Envolva o Provider em `src/App.tsx`.
4. **Hook de Domínio** (`src/hooks/use[Modulo]Context.ts`):
   - Crie um hook customizado encapsulando o `useContext(MeuContext)`.
5. **Criação das Telas** (`src/pages/[modulo]/`):
   - `home/index.tsx`: Listagem com `ListPageLayout`, `DataTable` e `Pagination`.
   - `cadastrar/index.tsx`: Formulário com `react-hook-form`, `Input`/`Select` e `Button`.
   - `detalhes/index.tsx`: Visualização com `DetailField` e link de atualização.
   - `atualizar/index.tsx`: Formulário pré-carregado via `getById` e salvamento com `update`.
6. **Configuração de Rotas** (`src/routes.tsx`):
   - Adicione os `<Route path="..." element={...} />`.
7. **Menu Superior** (`src/components/Header/contentBtnHeader.ts`):
   - Insira os links correspondentes para navegação do usuário.

