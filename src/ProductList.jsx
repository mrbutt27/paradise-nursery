import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './redux/CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15", description: "Oxygen provider" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/08/11/chlorophytum-3530413_1280.jpg", cost: "$12", description: "Easy to grow" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2018/02/07/16/22/flower-3137517_1280.jpg", cost: "$18", description: "Cleans air" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/02/28/19/28/fern-4888358_1280.jpg", cost: "$14", description: "Lush green" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/06/09/04/44/plant-5276551_1280.jpg", cost: "$20", description: "Shiny leaves" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/09/15/30/aloe-vera-3304513_1280.jpg", cost: "$10", description: "Medicinal" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/04/19/18/31/lavender-1339170_1280.jpg", cost: "$20", description: "Calming scent" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/05/30/01/25/jasmine-2355523_1280.jpg", cost: "$18", description: "Fragrant" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2016/09/08/17/21/rosemary-1655640_1280.jpg", cost: "$15", description: "Herbal" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/08/29/14/09/mint-1628178_1280.jpg", cost: "$8", description: "Fresh" },
        { name: "Geranium", image: "https://cdn.pixabay.com/photo/2017/06/15/19/37/geranium-2406857_1280.jpg", cost: "$12", description: "Blooms" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/09/01/00/15/lemon-balm-2702758_1280.jpg", cost: "$10", description: "Citrus" }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        { name: "Marigold", image: "https://cdn.pixabay.com/photo/2017/09/27/15/06/marigold-2792070_1280.jpg", cost: "$9", description: "Keeps pests away" },
        { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/08/05/17/38/basil-1572914_1280.jpg", cost: "$11", description: "Repels flies" },
        { name: "Citronella", image: "https://cdn.pixabay.com/photo/2019/06/21/15/51/citronella-4289459_1280.jpg", cost: "$16", description: "Bug repellent" },
        { name: "Catnip", image: "https://cdn.pixabay.com/photo/2017/07/11/15/51/catnip-2493922_1280.jpg", cost: "$10", description: "Repels insects" },
        { name: "Chrysanthemums", image: "https://cdn.pixabay.com/photo/2018/09/24/19/08/mum-3699639_1280.jpg", cost: "$14", description: "Deters bugs" },
        { name: "Petunias", image: "https://cdn.pixabay.com/photo/2017/04/11/15/55/petunia-2222591_1280.jpg", cost: "$13", description: "Garden pest deterrent" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#333', color: '#fff' }}>
        <h2>Paradise Nursery</h2>
        <div>
          <span onClick={() => setShowCart(false)} style={{ cursor: 'pointer', marginRight: '20px' }}>Plants</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>Cart ({totalCount})</span>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((cat, i) => (
            <div key={i}>
              <h3>{cat.category}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {cat.plants.map((plant, p) => (
                  <div key={p} style={{ border: '1px solid #ddd', padding: '15px', width: '200px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h4>{plant.name}</h4>
                    <p>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)} 
                      disabled={addedToCart[plant.name]}
                      style={{ background: addedToCart[plant.name] ? 'gray' : '#4CAF50', color: 'white', padding: '8px', border: 'none', cursor: 'pointer' }}
                    >
                      {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
