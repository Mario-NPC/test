import React from 'react';
// con ../ se sale de la carpeta a una que este situada encima de esta, en este caso
// lo hicimos 2 veces para salir a la carpeta config e importar las palabras de la aplicacion.
import { AppWording } from '../../Config/Wording/App.wording';
import { generateNumberButtons, generateOperations } from './Calculator.config'


// Este es un componente que solo renderiza vistas.
// normalmente esto diria const CalculatorContent = (props) => {}
// pero ¿por que en vez de eso tiene unas llaves y dentro setNum, clear, etc?
// simple, nosotros estamos aplicando una deconstruccion, ¿que es una deconstruccion?
// digamos que nuestro objeto es props, props dentro tiene setNum, clear, setOperation, setConfirmation, calculationString
// Bueno digamos que nosotros no queremos hacer props.setNum por ejemplo, entonces hacemos
// const { setNum } = props;
// ¿Para que se hace esto? para tener un codigo mas limpio y mas prolijo, o tambien por que aveces solo queremos
// usar una sola cosa de ese objeto y no todo lo que tiene.
const CalculatorContent = ({setNum, clear, setOperation, setConfirmation, calculationString}) => {
  const { calculator } = AppWording;
  // Aca se estan generando los objetos para crear componentes autogenerables.
  // Por que se hacen componentes autoGenerables, simple, para no tener codigo hardcodeado 
  // o para armar "Renders" en base a datos que nos vinieron de por ejemplo un backend
  // en este caso le pasamos la callback unicamente para que realize esa funcion cuando se presione
  // en ese componente.
	const numberButtons = generateNumberButtons(setNum);
	const operationButtons = generateOperations(setOperation);

  //Aca es donde ensamblamos a nuestro componente en base a la lista de objetos con los datos y funcionalidades
  // que le asignamos.
  // por cada item, le asignamos al tag button, el atributo onClick, que es el que se va a encargar
  // de realizar la funcion que le hayamos pedido cuando hagamos un click,
  // el key, para que react lo diferencie como un objeto unico
  // y bueno en el medio el value para que tenga el texto que tiene que decir.
	const renderNumbers = () => {
		return numberButtons.map(
			numberButton => {
				const { value, onClick } = numberButton;
				return (
					<button onClick={onClick} key={value}>
						{value}
					</button>
				)
			}
		)
	}

	const renderOperations = () => {
		return operationButtons.map(
			operationButton => {
				const { value, onClick } = operationButton;
				return (
					<button onClick={onClick} key={value}>
						{value}
					</button>
				)
			}
		)
	}
	
	return (
		<div>
			<h1>{calculator}</h1>
			{
				renderNumbers()
			}
			{
				renderOperations()
			}
			<button onClick={() => setConfirmation(true)}>=</button>
			<button onClick={clear}>clear</button>
			<h1>{calculationString}</h1>
		</div>
	)
}

export default CalculatorContent;