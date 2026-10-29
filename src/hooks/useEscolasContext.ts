import { useContext } from 'react';
import { EscolasContext } from '../context/escolas/escolasContext';

export function useEscolasContext() {
    const context = useContext(EscolasContext);

    if(!context) {
        throw new Error("useEscolasContext deve ser usado dentro de EscolasContextProvider");
    }

    return context;
}