import React, { useEffect } from 'react'

const CartInfoDeal = ({setMetodoPago, setHoraQuierePedido}) => {

  useEffect( () => {
    // const fecha = new Date();
    // const hora = fecha.getHours() + ':' + fecha.getMinutes();
    // setHoraActual( hora );
  }, [] );

  const handleChangeHoraPedido = (e) => setHoraQuierePedido(e.target.value);

  const handleChangeMetodoPago = (e) => setMetodoPago(e.target.value);

  return (
    <div className='my-0'>

      <div className='mt-5'>
        <p className='mb-1 fs-3 fw-bold'>Direccion</p>
        <div className='border-0 border-bottom'>
          <p className='mb-2 fs-3 fw-normal'>Guerra, frente al parque, al lado de la 33</p>
        </div>
      </div>

      <div className='mt-5'>
        <p className='mb-1 fs-3 fw-bold'>Hora de pedido</p>
        <div className='border-0 border-bottom'>
          <select className='w-100 border-0 fs-3' onChange={handleChangeHoraPedido}>
            <option value='ahora mismo'>Ahora mismo</option>
            <option value="4:30">4:30</option>
            <option value="4:30">4:45</option>
            <option value="5:00">5:00</option>
            <option value="5:15">5:15</option>
            <option value="5:30">5:30</option>
            <option value="5:45">5:45</option>
            <option value="6:00">6:00</option>
            <option value="6:15">6:15</option>
            <option value="6:30">6:30</option>
            <option value="6:45">6:45</option>
            <option value="7:00">7:00</option>
            <option value="7:15">7:15</option>
            <option value="7:30">7:30</option>
            <option value="7:45">7:45</option>
            <option value="8:00">8:00</option>
            <option value="8:15">8:15</option>
            <option value="8:30">8:30</option>
            <option value="8:45">8:45</option>
            <option value="9:00">9:00</option>
            <option value="9:15">9:15</option>
            <option value="9:30">9:30</option>
            <option value="9:45">9:45</option>
            <option value="10:00">10:00</option>
            <option value="10:15">10:15</option>
            <option value="10:30">10:30</option>
          </select>
        </div>
      </div>

      <div className='mt-5'>
        <p className='mb-1 fs-3 fw-bold'>Metodos de pago</p>
        <div className='border-0 border-bottom'>
          <select className='w-100 border-0 fs-3' onChange={handleChangeMetodoPago}>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>
      </div>

    </div>
  );
}

export default CartInfoDeal
