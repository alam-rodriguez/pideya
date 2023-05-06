import React, { useEffect, useState } from 'react';

// Componentes
// import LoNuevoItem from '../section-lo-nuevo/LoNuevoItem';
import ArticleCard from './ArticleCard';

// Firebase
import { getArticlesByCategory } from '../../../firebase/firebaseFirestore';

const CategoryMenu = ({category, color1}) => {

  const [articlesOfThisMenu, setArticlesOfThisMenu] = useState(null);

  useEffect( () => {
    // console.log(category);
    const f = async () => {
      const res = await getArticlesByCategory(category.id);
      setArticlesOfThisMenu(res);
      console.log(res);
    }
    f();
  }, [] );

  return (
    <section className='w-100 my-5 '>

      <div className='d-flex justify-content-between w-100'>
        <h3 className='fw-bold'>{category.nombre}</h3>
          <p className={`p-0 fw-bold ${color1.textColor}`}>TODO</p>
        </div>
        <div className='d-flex flex-nowrap overflow-x-scroll'>

        { articlesOfThisMenu != null 
          ? articlesOfThisMenu.map((article)=>(
            <ArticleCard
              key={article.id}
              img={article.imgpath}
              title={article.titulo} 
              subTitle={article.subtitulo} 
              // id='345678' 
            />
          ))
          : <></>
        }

      </div>
    </section>
  )
}

export default CategoryMenu
