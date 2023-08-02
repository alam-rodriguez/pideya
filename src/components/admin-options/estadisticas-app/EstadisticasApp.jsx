import React, { useState, useEffect } from 'react';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Components
import Header from './estadisticas-app-components/Header';
import ItemTableEstadisticas from './estadisticas-app-components/ItemTableEstadisticas';

// Firebase
import { getEveryStatistics } from '../../../firebase/firebaseFirestore';

// Swal-alerts
import Swal from 'sweetalert2';

const EstadisticasApp = () => {

  const navigate = useNavigate();

  const alert = (text) => Swal.fire({
    icon: 'info',
    title: 'Nota',
    text: text,
  });

  // to render
  const [dias, setDias] = useState([]);
  const [months, setmonths] = useState([]);
  const [anios, setAnios] = useState([]);

  // Estadisticas to view
  const [estadisticasApp, setEstadisticasApp] = useState({});

  // Todas las estadisticas
  const [everyStatistics, setEveryStatistics] = useState([]);

  useEffect( () => {

    const f = async () => {
      const everyStatistics = await getEveryStatistics();
      setEveryStatistics(everyStatistics);

      let dineroGastado = 0;
      let puntosGenerados = 0;
      let puntosGastados = 0;
      let cantidadclientes = 0;
      everyStatistics.forEach( (statistics) => {
        dineroGastado += statistics.gastado;
        puntosGenerados += statistics.puntosGenerados;
        puntosGastados += statistics.puntosGastados;
        cantidadclientes = cantidadclientes + 1;
      });
      setEstadisticasApp({
        dineroGastado: dineroGastado,
        puntosGenerados: puntosGenerados,
        puntosGastados: puntosGastados,
        cantidadclientes: cantidadclientes,
      })
      console.log(everyStatistics);
    }
    f();

    let dias = [];
    for(let i = 1 ; i <= 31; i++){
      dias.push(<option value={i}>{i}</option>);
    }
    setDias(dias);

    const eachMonth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Obtubre', 'Noviembre', 'Dicciembre'];
    let monthss = [];
    for(let i = 0; i < eachMonth.length; i++){
      monthss.push(<option value={i}>{eachMonth[i]}</option>);
    }
    setmonths(monthss);

    let anios = [];
    for(let i = 2020 ; i <= 2100; i++){
      anios.push(<option value={i}>{i}</option>);
    }
    setAnios(anios);
  }, [] );

  // Dia, Mes y Año
  const [daySelect, setDaySelect] = useState('todos');
  const [monthSelect, setMonthSelect] = useState('todos');
  const [yearSelect, setYearSelect] = useState('todos');

  // handle par cambiar dia, mes y año seleccionado
  const handleClickDaySelect = () => {
    if(monthSelect == 'todos'){
      alert('No puedes seleccionar el dia sin seleccionar mes');
      return;
    }
  }
  const handleChangeDaySelect = (e) => setDaySelect(e.target.value);
  
  const handleClickMonthSelect = () => {
    if(yearSelect == 'todos'){
      alert('No puedes seleccionar el mes sin seleccionar año');
      return;
    }
  }
  const handleChangeMonthSelect = (e) => setMonthSelect(e.target.value);
  
  const handleChangeYearSelect = (e) => setYearSelect(e.target.value);

  // handleClick para buscar estadisticas
  const handleClickBuscar = async () => {

    let res = [];

    everyStatistics.forEach( (statistics) => {
      
      // Si no hay ninguna fecha seleccionada
      if(daySelect == 'todos' && monthSelect == 'todos' && yearSelect == 'todos') {
        res.push(statistics);
      }

      // Si hay año seleccionado
      if(daySelect == 'todos' && monthSelect == 'todos' && yearSelect != 'todos'){
        const fechaStatistcs = statistics.fecha.split('/');
        const anioStatistics = fechaStatistcs[2];
        if(anioStatistics == yearSelect){
          res.push(statistics);
        }
      }

      // Si hay mes seleccionado y año seleccionado 
      if(daySelect == 'todos' && monthSelect != 'todos' && yearSelect != 'todos'){
        const fechaStatistcs = statistics.fecha.split('/');
        const monthStatistics = fechaStatistcs[1];
        const anioStatistics = fechaStatistcs[2];
        if(anioStatistics == yearSelect && monthStatistics == monthSelect){
          res.push(statistics);
        }
      }

      // Si hay dia seleccionado, mes seleccionado y año seleccionado 
      if(daySelect != 'todos' && monthSelect != 'todos' && yearSelect != 'todos'){
        const fechaStatistcs = statistics.fecha.split('/');
        const diaStatistics = fechaStatistcs[0];
        const monthStatistics = fechaStatistcs[1];
        const anioStatistics = fechaStatistcs[2];
        if(diaStatistics == daySelect && anioStatistics == yearSelect && monthStatistics == monthSelect){
          res.push(statistics);
        }
      }
      
    });

    let dineroGastado = 0;
    let puntosGenerados = 0;
    let puntosGastados = 0;
    let cantidadclientes = 0;

    res.forEach( (statistics) => {
      dineroGastado += statistics.gastado;
      puntosGenerados += statistics.puntosGenerados;
      puntosGastados += statistics.puntosGastados;
      cantidadclientes = cantidadclientes + 1;
    });
    setEstadisticasApp({
      dineroGastado: dineroGastado,
      puntosGenerados: puntosGenerados,
      puntosGastados: puntosGastados,
      cantidadclientes: cantidadclientes,
    })
    console.log(everyStatistics);

  }

  const handleClickAtras = () => navigate('/admin-options');

  return (
    <main>
      <Header handleClickAtras={handleClickAtras}/>
      <section className='mx-3'>

        <div className='row'>

          <div className='col-3 my-4 px-1'>
            <p className='m-0 fs-5 fw-medium text-center'>Dia</p>
            <select className="form-select" aria-label="Default select example" onChange={handleChangeDaySelect} onClick={handleClickDaySelect}>
              <option value='todos' defaultValue>Todos</option>
              {dias}
            </select>
          </div>

          <div className='col-3 my-4 px-1'>
            <p className='m-0 fs-5 fw-medium text-center'>Mes</p>
            <select className="form-select" aria-label="Default select example" onChange={handleChangeMonthSelect} onClick={handleClickMonthSelect}>
              <option value='todos' defaultValue>Todos</option>
              {months}
            </select>
          </div>

          <div className='col-3 my-4 px-1'>
            <p className='m-0 fs-5 fw-medium text-center'>Año:</p>
            <select className="form-select" aria-label="Default select example" onChange={handleChangeYearSelect}>
              <option value='todos' defaultValue>Todos</option>
              {anios}
            </select>
          </div>

          <div className='col-3 d-flex justify-content-center align-items-center px-1'>
            <button className='btn btn-success' onClick={handleClickBuscar}>Buscar</button>
          </div>

        </div>

        <div>
          <p className='text-center fs-3 fw-medium'>Resutado</p>

          <ItemTableEstadisticas
            llave='Dinero gastado por usuarios:' 
            valor={estadisticasApp.dineroGastado + ' $'}
          />

          <ItemTableEstadisticas
            llave='Puntos generados por usuarios:' 
            valor={estadisticasApp.puntosGenerados}
          />

          <ItemTableEstadisticas
            llave='Puntos gastados por usuarios:' 
            valor={estadisticasApp.puntosGastados}
          />

          <ItemTableEstadisticas
            llave='Cantidad de usuarios:' 
            valor={estadisticasApp.cantidadclientes}
          />

        </div>

      </section>
    </main>
  )
}

export default EstadisticasApp;
