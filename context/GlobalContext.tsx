'use client';
import { createContext, useContext, useState } from "react";

type Theme = 'light' | 'dark';
export type Filter = 'all' | 'active' | 'completed';

type Todo = {
    id: string;
    title: string;
    completed: boolean;
    visible?: boolean;
}

type GlobalContextType = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    filter?: Filter;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

const GlobalContext = createContext<GlobalContextType|null>(null);

export const GlobalProvider = ({children}:{children: React.ReactNode}) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [input, setInput] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>('all');

    return (
        <GlobalContext.Provider value={{ theme, setTheme,input, setInput, todos, setTodos, filter, setFilter }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider')
    }
    return context
}