import React, { useContext, useEffect, useState } from 'react';

// Componentes
import Header from './ajustes-puntos-componentes/Header';

// Firebase
import { addInfoPoints, obtenerInfoApp } from '../../../firebase/firebaseFirestore';

// Context
import { AppContext } from '../../../context/AppContext';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

const AjustesPuntos = () => {
  const navigate = useNavigate();

  const { email } = useContext(AppContext);

  useEffect( () => {
    
    const f = async () => {
      const res = await obtenerInfoApp();
      console.log(res.infoPoints);
      setWantPoints(res.infoPoints.wantPoints);
      setEachPointValue(res.infoPoints.eachPointValue);
      setEachMoneyGenerateOnePoint(res.infoPoints.eachMoneyGenerateOnePoint)
    }
    f();

  }, [] );

  const [wantPoints, setWantPoints] = useState(false);
  const [eachPointValue, setEachPointValue] = useState(1);
  const [eachMoneyGenerateOnePoint, setEachMoneyGenerateOnePoint] = useState(1);

  // Handles
  const handleChangeWantPoints = (e) => setWantPoints(e.target.checked);
  const handleChangeEachPointValue = (e) => (e.target.value > 0) ? setEachPointValue(Number(e.target.value)) : null;
  const handleChangeEachMoneyGenerateOnePoin = (e) => (e.target.value > 0) ? setEachMoneyGenerateOnePoint(Number(e.target.value)) : null;

  const handleClickGuardar = async () => {
    const infoPoints = {
      wantPoints,
      eachPointValue,
      eachMoneyGenerateOnePoint,
    }
    await addInfoPoints(email, infoPoints);
    console.log(infoPoints);
  }

  const handleClickCategoryPoints = () => {
    navigate('/admin-options/ajustes-puntos/view-category');
  }

  return (
    <main>

      <Header />

      <section className='mx-4'>
        <p className='m-0 fs-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolor fugiat atque explicabo, odit, assumenda dolores quos doloremque totam ut fuga reprehenderit incidunt reiciendis ratione quam culpa alias nam et?</p>

        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={wantPoints} onChange={handleChangeWantPoints} />
          <label class="form-check-label" for="flexSwitchCheckChecked">Deseas eliminar la opcion de los puntos ? si eliminas esta funcion los clientes no generaran puntos ni podran usar los que ya tienen</label>
        </div>

        <div>
          <p className='m-0 fw-bold fs-2 text-center'>Reglas de los puntos</p>
          
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label for="inputPassword6" class="col-form-label">cada {eachPointValue} pesos genera 1 punto</label>
            </div>
            <div class="col-auto">
              <input type="number" class="form-control" placeholder='pesos' value={eachPointValue} onChange={handleChangeEachPointValue} />
            </div>
          </div>

          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label for="inputPassword6" class="col-form-label">Cada punto vale {eachMoneyGenerateOnePoint} pesos</label>
            </div>
            <div class="col-auto">
              <input type="number" class="form-control" placeholder='pesos' value={eachMoneyGenerateOnePoint} onChange={handleChangeEachMoneyGenerateOnePoin} />
            </div>
          </div>

        </div>

        <button className='btn btn-success form-control fs-3 p-3' style={{marginTop:100}} onClick={handleClickCategoryPoints}>Categoria de puntos</button>

        <button className='btn btn-success form-control fs-3 p-3' style={{marginTop:100}} onClick={handleClickGuardar}>Guardar Informacion</button>

      </section>
      
    </main>
  );
}

export default AjustesPuntos;