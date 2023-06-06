import React, { useContext, useEffect, useState } from 'react';

// React Icons
import { FiMenu } from 'react-icons/fi';
import { FaPizzaSlice } from 'react-icons/fa';

// Context
import { AppContext } from '../../context/AppContext';

// Firebase
import { savePuntosGeneradosForOrder } from '../../firebase/firebaseFirestore';
import { getPointsUser } from '../../firebase/firebaseFirestore';

const Header = () => {

	const {  infoPoints, setInfoPoints, clientOrders, setClientOrders, email } = useContext(AppContext);

	const [points, setPoints] = useState(0);

	useEffect( () => {
		// Obtener puntos del usuario
		if(email != null){
			const f = async () => {
				const infoUser = await getPointsUser(email);
				if(infoUser != 'usuario no encontrado' && infoUser != 'hubo un error') setPoints( infoUser.puntos );
			}
			f();
		}
	}, [] );

	useEffect( () => {
		// Guardar puntos de usuario en compra
		if(infoPoints != null && clientOrders != null){
			if(infoPoints.wantPoints == true){
				clientOrders.forEach( (order) => {
					let total = 0
					if(order.recibioPuntos == false){
						order.pedido.forEach( (pedido) => {
							total += pedido.precioVariosArticles;
						});
					}
					const puntos = total / Number(infoPoints.eachMoneyGenerateOnePoint);
					const f = async () => {
						const res = await savePuntosGeneradosForOrder(order.email, order.id, puntos);
						if(res){
							console.log(`${puntos} puntos generados`);
						}
					}
					f();
					console.log( puntos );
				});
				// console.log(infoPoints);
			}
			console.log(infoPoints)
		}
	}, [infoPoints, clientOrders] );

	const { color1, viewMenu, setViewMenu, appInfo } = useContext(AppContext);

	const [appName, setAppName] = useState();
	useEffect(()=>{
		if(appInfo != null)setAppName(appInfo.nombre);
	});

	const handleClickMenu = () => setViewMenu(!viewMenu);

  return (
    <header className='d-flex justify-content-between align-items-center py-3 bg-white position-sticky top-0 start-0 w-100 z-1' onClick={handleClickMenu}>
			<FiMenu className={`ms-4 fs-3 ${color1.textColor}`} />
			<h2>{appName}</h2>
			<div className='d-flex me-4 align-items-center gap-2'>
				<p className={`m-0 fs-4 ${color1.textColor}`}>{points}</p>
				<FaPizzaSlice className={`fs-5 ${color1.textColor}`} />
			</div>
    </header>
  );
}

export default Header
