import React, { useState, useEffect } from "react";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import "./index.scss";
import axios from "axios";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

// поменял порт запуска на 3006

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://637895780992902a251de4f4.mockapi.io/cart"
      );
      const favoriteResponse = await axios.get(
        "https://637895780992902a251de4f4.mockapi.io/favorite"
      );
      const itemsResponse = await axios.get(
        "https://637895780992902a251de4f4.mockapi.io/items"
      );

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddtoCard = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://637895780992902a251de4f4.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) === Number(obj.id))
        );
      } else {
        axios.post("https://637895780992902a251de4f4.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("не удалось добавить");
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://637895780992902a251de4f4.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((items) => items.id !== id));
    } catch (error) {
      alert("не удалось удалить из корзины");
    }
  };

  const onAddtoFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://637895780992902a251de4f4.mockapi.io/favorite/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://637895780992902a251de4f4.mockapi.io/favorite",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("не удалось добавить в избранное");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(items.id));
  };

  return (
    <AppContext.Provider value={{ items, cartIterms, favorites, isItemAdded }}>
      <div className="wrapper">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}

        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddtoFavorite={onAddtoFavorite}
            onAddtoCard={onAddtoCard}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites onAddtoFavorite={onAddtoFavorite} />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
