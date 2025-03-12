import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ShoppingList from './components/ShoppingList';
import RecipeGenerator from './components/RecipeGenerator';
import Inventory from './components/Inventory';
import { ListChecks, ChefHat, Package } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TodoList from './components/TodoList';
import Navigation from './components/Navigation';
import EightyEightDays from './pages/EightyEightDays';
import DaysCalculator from './components/DaysCalculator';

function App() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'shopping' | 'recipes'>('shopping');

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
          <Route path="/88-days" element={<EightyEightDays />} />
          <Route path="/88-days/:person" element={<DaysCalculator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;