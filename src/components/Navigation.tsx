import { Link } from 'react-router-dom';
import { ListChecks, ChefHat, Package, Home, CheckSquare } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around p-2">
        <Link to="/" className="flex flex-col items-center">
          <Home size={24} />
          <span>Accueil</span>
        </Link>
        <Link to="/shopping-list" className="flex flex-col items-center">
          <ListChecks size={24} />
          <span>Courses</span>
        </Link>
        <Link to="/inventory" className="flex flex-col items-center">
          <Package size={24} />
          <span>Inventaire</span>
        </Link>
        <Link to="/recipes" className="flex flex-col items-center">
          <ChefHat size={24} />
          <span>Recettes</span>
        </Link>
        <Link to="/todo" className="flex flex-col items-center">
          <CheckSquare size={24} />
          <span>Todo</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 