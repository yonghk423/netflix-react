import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Products from './Products';
import Options from './Oprions'

interface Iitems {
        id:string;
        name:string;
        imagePath:string
    }

const Type = () => {
    const [items, setItems] = useState<Iitems[]>([]);
    const [error, setError] = useState(false);

  useEffect(() => {
  
  }, []);

  const loadItems = async (orderType:any) => {
    try {
      let response = await axios.get(`http://localhost:8080/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }      
    const optionItems = items.map((item) => {
        <ItemComponents
        key={item?.id}
        name={item?.name}
        imagePath={item?.imagePath}
        />
    })

    const ItemComponents = ( orderType ) === "products" ? Products : Options;

  };


    return (
      <div></div>
    )
}

export default Type