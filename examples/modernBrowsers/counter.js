(function(window, document){

    let COMPONENT_NAME = "count-button";

    let countButton = {

        Extends: HTMLDivElement,

        Constructor: function(){  //Optional
            console.log("building " + COMPONENT_NAME + " - FATHER");
            this.counter = 0;
        },

        connectedCallback: function(){

            let that = this;

            let html = '<button name="plus"> + </button>';
            html += '<span>' + that.counter + '</span>';
            html += '<button name="less"> - </button>';

            that.innerHTML = html;

            let plus = that.querySelector('button[name="plus"]');
            let less = that.querySelector('button[name="less"]');
            let display = that.querySelector('span');

            plus.onclick = function(){
                that.counter++;
                display.textContent = that.counter;
            }

            less.onclick = function(){
                that.counter--;
                display.textContent = that.counter;
            }
        },

        disconnectedCallback: function(){
            this.innerHTML = '';
        },

        attributeChangedCallback: function(name, oldValue, newValue){
            console.log(name, oldValue, newValue);
        },

        Static: {
            //observedAttributes: ['id', 'class', 'data-id'], //Tambien funciona asi

            get observedAttributes(){
                return ['id', 'class', 'data-id'];  
            },
        }

    }


    let FN_CLASS = ES5customElements.define(COMPONENT_NAME, countButton, { extends: 'div' });

    //#region countButton's child

    let COMPONENT_NAME2 = "count-button2";

    let countButton2 = {

        Extends: FN_CLASS || ES5customElements.get(COMPONENT_NAME) || customElements.get(COMPONENT_NAME),

        Constructor: function(){  //Optional
            console.log("building " + COMPONENT_NAME2 + " - CHILD");
        },
    }

    let FN_CLASS2 = ES5customElements.define(COMPONENT_NAME2, countButton2, { extends: 'div' });

    //#endregion

})(window, document);