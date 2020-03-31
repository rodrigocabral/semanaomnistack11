import React from 'react';

/**
 * Posso usar return sem os () quando o html estiver em uma única linha:
 * return <header><h1>Be The Hero</h1></header>
 * 
 * 
 * Usando a desestruturação props.children -> {children}
 */
export default function Header({children}){
    return (
        <header>
            <h1>{children}</h1>
        </header>
    );
}

/**
 * Também posso usar dessa forma no final da linha tirando da função
 * export default Header;
 */