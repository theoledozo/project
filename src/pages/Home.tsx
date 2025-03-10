import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Menu Principal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/shopping-list" className="card">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">Liste de courses</h2>
            <p className="text-gray-600">Gérez vos achats quotidiens</p>
          </div>
        </Link>

        <Link to="/inventory" className="card">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">Inventaire</h2>
            <p className="text-gray-600">Suivez vos possessions</p>
          </div>
        </Link>

        <Link to="/recipes" className="card">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">Recettes</h2>
            <p className="text-gray-600">Découvrez de nouvelles idées culinaires</p>
          </div>
        </Link>

        <Link to="/todo" className="card">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">Todo List</h2>
            <p className="text-gray-600">Gérez vos tâches quotidiennes</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home; 