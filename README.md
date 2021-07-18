# ES5customElements.js
Librery that allows creating custom elements (web components) using ES5 syntax

## Compatibility

For internet explorer 11 or higher.

## How to use?

Import ES5customElements.js JavaScript library wherever you want into the document before using it.

``` html
<script src="ES5customElements.min.js"></script>
<script src="mybeautyfulbutton.js"></script>
```

or

``` html
<script defer src="ES5customElements.min.js"></script>
<script defer src="mybeautyfulbutton.js"></script>
```

or

``` html
<script type="module">
    import "ES5customElements.min.js";
    import "mybeautyfulbutton.js";
    
    let beauty_button = document.createElement("beauty-button");
    document.body.appendChild(beauty_button);
  
</script>
```

For use with Internet Explorer and EDGE Legacy (Only HTMLElement can be used)

``` html
<!-- Polyfill for customElements -->
<script src="https://unpkg.com/@webcomponents/custom-elements"></script>
<script src="ES5customElements.min.js"></script>
<script src="mybeautyfulbutton.js"></script>
```
## Demo

See folder of examples (TODO)

## Authors

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](https://github.com/erovas/ES5customElements.js/blob/main/LICENSE) file for details.



# Español - Spanish

# ES5customElements.js
Libreria que permite crear custom elements (web components) utilizando sintaxis ES5.

## Compatibilidad

Para Internet Explorer 11 o superior.

## ¿Cómo utilizarlo?

Importar ES5customElements.js en cualquier parte dentro del documento antes de usarlo.

``` html
<script src="ES5customElements.min.js"></script>
<script src="mybeautyfulbutton.js"></script>
```

o

``` html
<script defer src="ES5customElements.min.js"></script>
<script defer src="mybeautyfulbutton.js"></script>
```

o

``` html
<script type="module">
    import "ES5customElements.min.js";
    import "mybeautyfulbutton.js";
    
    let beauty_button = document.createElement("beauty-button");
    document.body.appendChild(beauty_button);
  
</script>
```

Para utilizarlo con Internet Explorer y EDGE Legacy (Solo es posible utilizar HTMLElement)

``` html
<!-- Polyfill for customElements -->
<script src="https://unpkg.com/@webcomponents/custom-elements"></script>
<script src="ES5customElements.min.js"></script>
<script src="mybeautyfulbutton.js"></script>
```


## Demo

Ver la carpeta de ejemplos (TODO)

## Autores

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## Licencia

Este proyecto está licenciado bajo Licencia BSD 3-Clause - ver el archivo [LICENCIA](https://github.com/erovas/ES5customElements.js/blob/main/LICENSE) para mas detalles.
