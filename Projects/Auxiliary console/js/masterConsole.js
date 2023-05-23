class MasterConsole {
    constructor(args){
        this.argsMas = [].slice.call(arguments);
        this.id = 'id-' + event.type;
        this.style = {'height': 'auto', 'width': 'auto', 'min-width': '240px', 'background-color': '#444', 'display': 'block', 'margin': 0, 'padding': '10px 15px', 'color': '#77ff00', 'text-shadow': '0 0 5px #77ff00', 'font': 'normal 16px/normal monospace', 'list-style': 'none', 'position': 'absolute', 'top': 0, 'right': 0, 'z-index': 10};

        this.elementProcess();
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

    makeId = () => {return 'id-' + Math.random().toString(36).substring(2).replace(/\d/g,'');}

    elementProcess = () => {
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