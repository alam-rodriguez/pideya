import React, { useContext, useEffect } from 'react';

// Context
import { AppContext } from '../../../../context/AppContext';

// Componente
import CartArticleView from './CartArticleView';

const CartArticlesView = ({handleClickAddMoreArticles}) => {

  const { cart, cartOfCategoryPoints, setCartOfCategoryPoints, } = useContext(AppContext);

  useEffect( () => {
    console.log(cart);
    if(cart.length == 0 && cartOfCategoryPoints.length == 0) handleClickAddMoreArticles();
    // console.log(cart);
  }, [cart, cartOfCategoryPoints] );

  return (
    <section className='overflow-hidden'>

      { cart.map( (article, i) => (
          <CartArticleView key={i} index={i} article={article} />
        ))
      }
      { cartOfCategoryPoints.map( (article, i) => (
          <CartArticleView key={i} index={i} article={article} />
        ))
      }

    </section>
  );
}

export default CartArticlesView
