import React, { useState, useEffect, useCallback, useMemo } from 'react';
// con ./ se importa un archivo que este dentro de la misma carpeta que este archivo.
import CalculatorContent from './Calculator.content';
import { calculate, formatCalculateString } from './Calculator.utils';


const Calculator = () => {
  // El useState se usa de la siguiente manera, se define el atributo
  // Y la funcion/metodo que va a modificarle el valor a ese atributo
  // Al instanciar el useState se lo inicializa con un valor, puede ser null, '', o un 0, dependiendo de lo que vallamos a usar.
  // En general el useState es para darle un estado a nuestra aplicacion, osea que el contenido que se muestre en pantalla
  // varie entre diferentes estados, en este caso, el primer numero tiene un estado inicializado de null
  // eso significa que no se va a mostrar en pantalla
  // pero cuando se le asigne un numero, ese estado va a pasar de null y su estado va a ser por ejemplo 1
  // y se va a mostrar en pantalla como 1, en pocas palabras los estados son las variables de las aplicaciones.
  const [ num1, setNum1 ] = useState(null);
  // este es un ejemplo practico de useState, se instancia la funcion inicializandola con null, y se define los nombres
  // del atributo en este caso num1, y la funcion que lo va a modificar, osea setNum1.
  const [ num2, setNum2 ] = useState(null);
  const [ operation, setOperation ] = useState(null);
  const [ result, setResult ] = useState(null);
  const [ confirmation, setConfirmation ] = useState(false)
  
  // El useMemo es una funcion para calcular propiedades.
  // Una buena particularidad del useMemo, es que calcula la propiedad siempre que esta se muestre en pantalla.
  // Una pregunta interesante ¿Como funciona el useMemo?
  // Simple, le pasamos la lista de dependencias como primer paso. ¿que son la lista de dependencias?
  // En este ejemplo de calculationString, se pasa una funcion, y una lista, esa es la lista de dependencias
  // Osea [num1, num2, operation, result], seguro te estas preguntando ¿Para que sirve esa lista?.
  // Simple esa lista espera los valores que les hayas asignado, por ejemplo, si num1 pasa de null a 1, useMemo
  // va a calcular el valor, pero ¿Como es eso de calcular el valor?
  // Bueno la cosa es mas o menos sencilla, nosotros le tenemos que decir como lo tiene que calcular.
  // En este caso concreto si pasara a 1 en pantalla al usuario le saldria 1, si el usuario asigna una operacion por ejemplo +
  // El va a ver 1 + y si selecciona otro numero como por ejemplo 2, el va a ver 1 + 2, y si el usuario apreta en =
  // va a ver 1 + 2 = 3, y esto ¿Porqué?, en ese array de dependencias como lo explique previamente espera los valores
  // y en base a eso calcula, como nosotros primero le damos el num1, genera 1, cuando le damos el + que es la operacion,
  // lo vuelve a calcular, y asi sucesivamente. 
  const calculationString = useMemo(()=>{
    return formatCalculateString(num1, operation, num2, result)
  }, [num1, num2, operation, result])

  // El useCallback es una funcion, que bueno como su nombre lo dice se usa como callback o llamada
  // para el que no este familiarizado con el concepto.
  // ¿Que es una llamada? Una llamada o callback es la continuacion de una funcion, a que me refiero
  // digamos la funcion calculate, le pasamos operation, num1, num2, y setResult
  // calculate busca la operacion, luego hace la operacion y luego con setResult modifica el resultado
  // y se muestra en pantalla, ¿Por que paso eso?, simple setResult es una callback
  // despues de buscar la operacion y realizarla, la continuacion de la funcion calculate es setear el resultado.
  // Despues de toda esa introduccion a callbacks, el useCallback es similar al useMemo,
  // pero la diferencia radica que el useMemo calcula en funcion a lo que le definimos, y el useCallback hace
  // una funcion en base a lo que le hallamos declarado, en este caso calcular el resultado.
  // Quizas esto se veia mas como un ejercicio para useMemo, pero justamente como estamos manejando estados
  // tanto de numeros como operaciones y la confirmacion de que queremos el resultado, era mas optimo
  // usar una funcion calcular, que un useMemo para hacer toda la cuenta, ademas que el calculationString
  // esta todo el tiempo funcionando, y el useCallback solo funciona en el momento de la confirmacion en este ejemplo.
  const calculateOperation = useCallback(()=> {
    if(num1 && num2 && operation && confirmation){
      calculate(operation, num1, num2, setResult);
    }
  }, [num1, num2, confirmation, operation])
  // Como el useMemo recibe la lista de dependencias, y en este caso, le definimos que espere
  // el num1, num2, confirmation, operation, aun que le decimos que solo calcule cuando los tenga todos.
  // ¿Por que decirle cuando lo tenga todos? Por que sino validamos que tenga todos, va a estar constantemente calculando
  // como en el ejemplo de useMemo de arriba, y nosotros queremos que el calculo se produzca en un momento puntual.
  
  // El useEffect es una funcion que se encarga de montar lo que vemos en pantalla
  // osea que tengamos una vista inicial, actualizarla, y desmontarla en base al criterio que le asignamos.
  // El useEffect es el hook mas importante de react, sin el no podriamos cambiar estados en tiempo real, ya que
  // en el useEffect se definen las listas de dependencias, para que asi pueda "escucharlas", osea saber cuando cambian
  // y cada vez que cambien realiza las acciones que nosotros hayamos definido, ¿Muy parecido al useCallback, no?
  // bueno si y no, el useCallback no itera esperando todo el tiempo y se ejecuta solo, el useCallback se puede ejecutar de manera aislada
  // como una funcion normal, pero no va a hacer nada si no cumple la condicion, pero en el useEffect la cosa cambia
  // aca es cuando el useCallback cobra sentido, por que nosotros le pasamos al useEffect la useCallback
  // ¿Para que hacemos esto? simple, como dijimos el useCallback solo se ejecuta cuando cumple la condicion, al pasarselo
  // al useEffect, el useEffect va a esperar a que el useCallback tenga todas sus dependencias cumpla la condicion y se ejecute
  // indefinidamente, osea si limpiamos todos los valores que estan en la lista de dependencias, y luego volvemos a agregarlos
  // se va a volver a ejecutar.
  // Digamos el useEffect se va a encargar de esperar lo que le definamos y ejecutarlo en el momento que hayamos declarado.
  // ¿Se puede hacer sin usar useCallback? Sip, se puede, pero si se requiere de hacer una gran cantidad de cosas dentro del useEffect
  // se podria complicar el hecho de mantener el codigo, el useCallback se utiliza para "Partir" el useEffect en pedazos y sea mas facil de mantener.
  useEffect(()=> {
    calculateOperation();
  }, [calculateOperation])

  // ¿El and no era para saber si 2 condiciones era verdaderas?
  // Sip, pero javascript le encontro una funcion mejor que solo esa
  // si vos pones una condicion primero, osea que num1 sea mayor a 0 o que no sea null
  // y luego pones una funcion, si esa condicion se cumple javascript ejecuta la funcion que le sigue a la condicion
  // Genial, ¿No?
  const setNum = (num) => {
    !num1 && setNum1(num);
    !num2 && operation && setNum2(num);
  }

  //Clear limpia el estado del componente, con las respectivas funciones set.
  const clear = () => {
    setConfirmation(false);
    setOperation(null);
    setResult(null);
    setNum1(null);
    setNum2(null);
  }

  // Aca le estamos pasando setNum, setOperation, clear, setConfirmation y calculationString
  // como props o propiedades ¿Esto que significa?
  // significa que nosotros le estamos pasando al componente funciones o atributos que queremos que este componente use.
  return (
    <CalculatorContent
      setNum={setNum}
      setOperation={setOperation}
      clear={clear}
      setConfirmation={setConfirmation}
      calculationString={calculationString}
    />
  );
}

export default Calculator; 