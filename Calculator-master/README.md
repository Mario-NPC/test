# Calculator
Este proyecto es simplemente una prueba de concepto para enseñar un poco los hooks basicos de react y algunas buenas practicas.

## Setup del proyecto:

Basicamente instalar las dependencias del proyecto, y inicializarlo con los siguientes comandos.

```bash
npm install
npm start
```

### Estructura del Proyecto:
----------------------------
  * App:
    * View:
      En este lugar es donde se renderizan las vistas, en este caso solo la calculadora, ya que no hay rutas para cambiar las vistas o mas componentes para el mismo fin.
    * Styles:
      En este lugar es donde se alojan los estilos de la aplicacion.
    * Config:
      En este lugar se aloja, tanto la configuracion de la aplicacion, como los textos, con el fin de evitar hardcodear en este ultimo aspecto
    * Assets:
      En esta carpeta es donde se alojan tanto logos, como imagenes, etc, osea todo lo que sea grafico, pero no sea codigo.
    * Components:
      En esta carpeta se alojan los componentes de la aplicacion, en este caso Calculator ya que es el unico que existe.

#### Estructura de componentes:
-------------------------------
  * Component:
    * Container: 
      En este caso si tuvieramos redux en la aplicacion tendriamos un archivo extra que se llame .container, el cual seria el encargado de pasarle propiedades de redux al componente, con el fin de que este pueda usar el estado global de la aplicacion.
    * Component:
      En los archivos .component es donde se almacena la logica de negocio del componente.
    * Content: 
      En los .content, solo se renderiza los datos, y las entradas/inputs.
    * Styles:
      En el caso de que hubiese .styles, serian estilos css solo del componente, mas no un estilo global para toda la aplicacion.
    * Config: 
      En los .config, se almacena la configuracion de los componentes reutilizables, con el fin de facilitar su mantenimiento, dado que es mucho mas probable cambiar un archivo de configuracion que tocar la logica de negocio de un componente.
    * Utils:
      En los .utils, se almacenan funciones complejas, osea funciones que hagan mas dificil leer y mantener la logica de negocio de los .component.