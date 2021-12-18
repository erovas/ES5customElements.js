/**
 * ES5customElements.js v1.0.0
 * Libreria que ayuda a definir custom elements utilizando sintaxis ES5
 * [Back-compatibility: IE11+]
 * Copyright (c) 2021, Emanuel Rojas Vásquez
 * BSD 3-Clause License
 * https://github.com/erovas/ES5customElements.js
 */

 (function(window, document){

    //#region CHECKING inicial

    let ES5_CUSTOM_ELEMENTS = 'ES5customElements';

    if(window[ES5_CUSTOM_ELEMENTS])
        return console.error('"' + ES5_CUSTOM_ELEMENTS +'.js" has already been defined');

    //#endregion

    //#region CONSTANTES

    let CUSTOM_ELEMENTS = 'customElements';
    let PROTOTYPE = 'prototype';
    let STATIC = 'Static';
    let INTERFACE_NAME = '-IN';

    let CONSTRUCTOR = 'constructor';
    let ES5_CONSTRUCTOR = 'Constructor';
    let EXTENDS = 'Extends';
    let NATIVE_CREATE_ELEMENT = document.createElement;
    let NATIVE_GET_DESCRIPTOR = Object.getOwnPropertyDescriptor;

    let RESERVED_NAMES = new Set(
        [
            'annotation-xml', 'color-profile', 'font-face', 'font-face-src',
            'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph',
        ]
    );

    //#endregion

    //#region Utilidades

    /**
     * Define un prototipo
     * @param {Object} target 
     * @param {String} name 
     * @param {Object} value 
     */
    function _aux_defineProperty(target, name, value){
        Object.defineProperty(target, name, { value: value });
    }

    /**
     * Comprueba si obj es un objeto palno
     * @param {object} obj 
     * @returns 
     */
    function _aux_is_plain_object(obj){
        if(
            //Separate from primitives
            typeof obj === 'object' &&
            //Separate build-in like Math
            Object.prototype.toString.call(obj) === '[object Object]'
            ){
            let props = Object.getPrototypeOf(obj);
            //obj == Object.create(null) || Separate instances (Array, DOM, ...)
            return props === null || props[CONSTRUCTOR] === Object;
        }
    
        return false;
    }

    /**
     * Simliar a Object.assing() pero mas poderoso
     * @param {object} target 
     * @param {object} source 
     * @returns 
     */
     function _aux_object_assing(target, source){
        Object.getOwnPropertyNames(source).forEach(function(name){
            Object.defineProperty(target, name, NATIVE_GET_DESCRIPTOR(source, name));
        });
        return target;
    }
    
    /**
     * Comprueba que el custom tagName tiene una sintaxis correcta
     * @param {string} tagName 
     * @returns 
     */
    function _aux_check_syntax_tagName(tagName){
        return /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(tagName);
    }

    //#endregion

    //#region ES5 adapter

    /**
    Copyright (c) 2018 The Polymer Project Authors.
    Copyright (c) 2021 Emanuel Rojas Vasquez.
    All rights reserved.
    license http://polymer.github.io/LICENSE.txt
    contributors http://polymer.github.io/CONTRIBUTORS.txt
    patents http://polymer.github.io/PATENTS.txt
    */

    let HTMLStrings_array = Object.getOwnPropertyNames(window);
    let i;
    let name;

    //Comprobar que es un Browser que soporta "customElements" o que posee un polyfill
    if(window.Reflect || (window[CUSTOM_ELEMENTS] && !window[CUSTOM_ELEMENTS].polyfillWrapFlushCallback)){
        //let original_HTMLInterface;

        for (i = 0; i < HTMLStrings_array.length; i++) {
            
            name = HTMLStrings_array[i];
    
            if(name.indexOf('HTML') !== 0)
                continue;
    
            //Recuperar la Interface original HTML"NameElement"
            let original_HTMLInterface = window[name];
    
            let mod_HTMLInterface = function(){
                return Reflect.construct(original_HTMLInterface, [], this.constructor);
            }
    
            //Redefinicion de la interface HTML"NameElement" para que acepte "classes" con sintaxis ES5 (functions)
            window[name] = mod_HTMLInterface;
            //Seteo de los prototipos originales de HTML"NameElement", en su redefinicion
            mod_HTMLInterface[PROTOTYPE] = original_HTMLInterface[PROTOTYPE];
            //Seteo del constructor
            mod_HTMLInterface[PROTOTYPE][CONSTRUCTOR] = mod_HTMLInterface;
            //Seteo de los prototipos
            //Object.setPrototypeOf(mod_HTMLInterface, original_HTMLInterface);

            //Seteo nombre de la interface como "privado"
            _aux_defineProperty(mod_HTMLInterface, INTERFACE_NAME, name);

            //Seteo nombre del constructor de "mod_HTMLInterface" a "HTMLNameElement"
            _aux_defineProperty(mod_HTMLInterface, 'name', name);
        }
    }
    else {  //Para navegadores que NO son compatibles o NO tienen un polyfill
        for (i = 0; i < HTMLStrings_array.length; i++) {
            name = HTMLStrings_array[i];
            
            if(name.indexOf('HTML') !== 0)
                continue;

            _aux_defineProperty(window[name], INTERFACE_NAME, name);
        }
    }

    //#endregion

    //#region Metodos auxiliares para construccion

    /**
     * Construye un "constructor" compatible para ES6
     * @param {object} obj 
     * @returns function como "class"
     */
    function _aux_build_constructor(obj, name){
        // builder = HTMLElement
        let builder = obj[EXTENDS];
        // fn = function(){}
        let fn = obj[ES5_CONSTRUCTOR];
        let out = function(){
            let self = builder.call(this);
            if(fn) fn.apply(self, arguments);
            return self;
        }

        //Herencia de prototipos
        out[PROTOTYPE] = Object.create(builder[PROTOTYPE]);

        //Definición de constructor
        _aux_defineProperty(out[PROTOTYPE], CONSTRUCTOR, out);

        //Nombre de la custom Interface
        _aux_defineProperty(out, INTERFACE_NAME, name);
        
        //Borrado del "Extends" del objeto dummy
        delete obj[EXTENDS];
        //Borrado del "Constructor" del objeto dummy
        delete obj[ES5_CONSTRUCTOR];
        
        return out;
    }

    /**
     * setea metodos, propiedas de la classe (NO de prototype)
     * @param {function} target 
     * @param {object} source 
     * @returns 
     */
    function _aux_set_static(target, source){
        let static = source[STATIC];
        if(static) _aux_object_assing(target, static);
        delete source[STATIC];
        return target;
    }

    //#endregion

    //#region Metodos DEFINICION

    function define(name, constructor, options){

        name = (name + '').toLowerCase();

        //objeto dummy para NO modificar el original
        let obj = _aux_object_assing(Object.create(null), constructor);

        //Crear funcion constructora
        let classe = _aux_build_constructor(obj, name);

        //Seteo de los Statics ("observedAttributes" tambien)
        _aux_set_static(classe, obj);

        //Seteo de los prototypes ("callbacks reservados" tambien)
        _aux_object_assing(classe[PROTOTYPE], obj);

        //Definición del custom element
        window[CUSTOM_ELEMENTS].define(name, classe, options);

        //Reservando "name"
        RESERVED_NAMES.add(name);

        return classe;
    }

    document.createElement = function(tagName, options){

        tagName = (tagName + '').toLowerCase();

        //Es un custom Element
        if(_aux_check_syntax_tagName(tagName)){
            
            let cElement = window[CUSTOM_ELEMENTS].get(tagName);

            if(!cElement)
                return new cElement();
        }

        //Es un Element nativo (extendido o no)
        return NATIVE_CREATE_ELEMENT.apply(document, arguments);
    }

    //#endregion

    window[ES5_CUSTOM_ELEMENTS] = {
        define: define,
        get: function(name){
            return window[CUSTOM_ELEMENTS].get(name);
        },
        upgrade: function(root){
            window[CUSTOM_ELEMENTS].upgrade(root);
        },
        whenDefined: function(name){
            return window[CUSTOM_ELEMENTS].whenDefined(name);
        },
        get Names(){
            let out = [];
            RESERVED_NAMES.forEach(function(e){out.push(e)});
            return out;
        },
        '-ln': RESERVED_NAMES
    }

})(window, document);