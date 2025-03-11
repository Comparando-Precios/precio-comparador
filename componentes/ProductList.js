export default function ProductList({ products }) {
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
            <p className="text-green-500 font-bold">${product.price}</p>
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="block text-blue-500">
              Ver en tienda
            </a>
          </div>
        ))}
      </div>
    );
  }
  