import React from 'react'

const CartInfoClient = ({nombre, setNombre, direccion, setDireccion, telefono, setTelefono, entrega, setEntrega, setLugarDelivery, setComentario}) => {

  const handleChangeNombre = (e) => setNombre(e.target.value);
  const handleChangeDireccion = (e) => setDireccion(e.target.value);
  const handleChangeDirrecion = (e) => setTelefono(e.target.value);
  const handleChangeEntrega = (e) => setEntrega(e.target.value);
  const handleChangeLugarDelivey = (e) => {
    const value = e.target.value;
    const obj = {
      lugar: '',
      costo: 0,
    }
    switch(value){
      case 'guerra':
        obj.lugar = 'Guerra';
        obj.costo = 50;
        break;
      case 'reforma':
        obj.lugar = 'La Reforma';
        obj.costo = 200;
        break;
      case 'fao':
        obj.lugar = 'El fao';
        obj.costo = 100;
        break;
      case 'cruce':
        obj.lugar = 'El Cruce';
        obj.costo = 200;
        break;
      case 'berroa':
        obj.lugar = 'La Berroa';
        obj.costo = 200;
        break;
      case 'joya':
        obj.lugar = 'La Joya';
        obj.costo = 200;
        break;
      default: 
        break;
    }
    setLugarDelivery(obj);
  }
  const handleChangeComentario = (e) => setComentario(e.target.value);

  return (
    <div className='border-0 border-bottom- border-black '>

      <p className='fw-bold fs-3 my-5'>Por favor conplete la informacion y no cierre la app en el proceso!</p>
      <p className='fw-bold fs-3 my-5'>Precios con impuestos incluidos</p>

      <div className='mb-5'>
        <p className='m-0 fs-4 fw-semibold'>Nombre:</p>
        <input className='ps-0 form-control border-0 border-bottom fs-4' type="text" placeholder='Tu nombre' value={nombre} onChange={handleChangeNombre} />
      </div>

      <div className='mb-5'>
        <p className='m-0 fs-4 fw-semibold'>Dirrecion:</p>
        <input className='ps-0 form-control border-0 border-bottom fs-4' type="text" placeholder='Tu Direccion' value={direccion} onChange={handleChangeDireccion} />
      </div>

      <div className='mb-5'>
        <p className='m-0 fs-4 fw-semibold'>Numero de telefono:</p>
        <input className='ps-0 form-control border-0 border-bottom fs-4' type="number" placeholder='Tu numero' value={telefono} onChange={handleChangeDirrecion} />
      </div>

      <div className='mt-5'>
        <p className='mb-0 fs-4 fw-semibold'>Entrega:</p>
        <div className='border-0 border-bottom'>
          <select className='w-100 border-0 fs-4 rounded-0' onChange={handleChangeEntrega}>
            <option value=""></option>
            <option value="ire a recogerla">Ire a recogerla</option>
            <option value="quiero delivery">Quiero Delivery</option>
          </select>
        </div>
      </div>
      
      {
        (entrega == 'quiero delivery')
        ? <div className='mt-5'>
            <p className='mb-0 fs-3 fw-semibold'>Lugar:</p>
            <div className='border-0 border-bottom'>
              <select className='w-100 border-0 fs-3 rounded-0' onChange={handleChangeLugarDelivey}>
                <option value='guerra'>Guerra $50</option>
                <option value='reforma'>La Reforma $200</option>
                <option value="fao">El Fao $100</option>
                <option value="cruce">El Cruce $200</option>
                <option value="berroa">La berroa $200</option>
                <option value="joya">La Joya $200</option>
              </select>
            </div>
          </div>
        : <></>
      }

      <p className='fw-bold fs-3 mt-4'>Completar el numero de telefono es obligatorio para que pueda hacer la orden.</p>        

      <div className='my-5'>
        <p className='m-0 fs-4 fw-semibold'>Comentario</p>
        <input className='ps-0 form-control border-0 border-bottom fs-4' type="text" placeholder='Tu comentario' onChange={handleChangeComentario} />
      </div>

    </div>
  )
}

export default CartInfoClient
