class MasterConsole {
    constructor(args){
        this.argsMas = [].slice.call(arguments);
        this.id = 'id-' + event.type + '-' + this.makeId();
        this.style = {'height': 'auto', 'width': 'auto', 'min-width': '240px', 'background-color': '#444', 'display': 'block', 'margin': 0, 'padding': '10px 15px', 'color': '#77ff00', 'text-shadow': '0 0 5px #77ff00', 'font': 'normal 16px/normal monospace', 'list-style': 'none', 'position': 'absolute', 'top': 0, 'right': 0, 'z-index': 10};

        this.elementProcess();
    }

    errors = () => {
        if(this.argsMas.length <= 1 || typeof this.argsMas[0] !== 'string'){throw new Error('Первый параметр не может быть единственным или цифрой')}
    }

    makeString = () => {
        let str = '';
        this.argsMas.map((elem, index)=>{
            if(typeof elem === 'string'){
                (index % 2 != 0) ? str += elem : str += elem + ': ';
            }
            if(typeof elem === 'number'){
                str += elem + ((index < this.argsMas.length-1) ? ' / ' : ''); // не рисовать "/" у последней цифры
            }
        });
        return str;
    }

    makeId = () => {return this.argsMas[0].replace(/\s/g,'');}

    elementProcess = () => {
        this.errors();
        if( !$('#masterConsole').length ){
            $('body').prepend('<ul id="masterConsole"></ul>');
            $('#masterConsole').css(this.style);
        }        
        
        if( !$('#masterConsole .' + this.id).length ){
            $('#masterConsole').append(`<li class="${this.id}"></li>`);
        }
        
        $('#masterConsole .' + this.id).text(this.makeString());
    }
}