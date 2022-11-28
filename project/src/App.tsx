import React from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root')!;

const root = createRoot(rootElement);
root.render();

export const App = () => {
    return (
    <div>123</div>
    );
    };