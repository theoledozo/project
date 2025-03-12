import { Link } from 'react-router-dom';

const EightyEightDays = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">88 Jours</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/88-days/theo" className="card">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">Théo</h2>
            <p className="text-gray-600">Calculer les jours de Théo</p>
          </div>
        </Link>

        <Link to="/88-days/carla" className="card">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">Carla</h2>
            <p className="text-gray-600">Calculer les jours de Carla</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EightyEightDays; 