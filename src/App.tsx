import React from 'react';
import { Toaster } from 'react-hot-toast';
import ShoppingList from './components/ShoppingList';
import RecipeGenerator from './components/RecipeGenerator';
import Inventory from './components/Inventory';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TodoList from './components/TodoList';
import Navigation from './components/Navigation';
import EnglishNotebook from './pages/EnglishNotebook';

function App() {
  return (
    <BrowserRouter>
      <div className="app min-h-screen bg-gray-100">
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/recipes" element={<RecipeGenerator />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/english-notebook" element={<EnglishNotebook />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;