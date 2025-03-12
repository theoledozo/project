import { Link } from 'react-router-dom';
import { ListChecks, ChefHat, Package, Home, CheckSquare, Calendar, BookOpen } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="sticky sm:fixed bottom-0 left-0 right-0 bg-white shadow-lg mt-6">
      <div className="flex justify-around p-4">
        <Link to="/" className="flex flex-col items-center">
          <Home size={24} />
          
        </Link>
        <Link to="/shopping-list" className="flex flex-col items-center">
          <ListChecks size={24} />        
        </Link>
        <Link to="/inventory" className="flex flex-col items-center">
          <Package size={24} />       
        </Link>
        <Link to="/recipes" className="flex flex-col items-center">
          <ChefHat size={24} />        
        </Link>
        <Link to="/todo" className="flex flex-col items-center">
          <CheckSquare size={24} />       
        </Link>
        <Link to="/english-notebook" className="flex flex-col items-center">
          <BookOpen size={24} />
        
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 