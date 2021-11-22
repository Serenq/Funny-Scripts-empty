;(function(){
    var menuStyle = {
        'height': 'auto',
        'width': '16.666%',
        'min-width': '240px',
        'background-color': '#444',
        'display': 'block',
        'margin': 0,
        'padding': '10px 15px',
        'color': '#77ff00',
        'text-shadow': '0 0 5px #77ff00',
        'font': 'normal 16px/normal monospace',
        'list-style': 'none',
        'position': 'absolute',
        'top': 0,
        'right': 0,
        'z-index': 10
    };

    var masterConsole = makeMasCons();

    function makeMasCons(){
        var namesId = [];

        return function(){
            var argLN = arguments.length;
            var args = [];
            var smartArgs = [].slice.call(arguments);
            var splitter = " | ";
            var actionsCount = $('#masterConsole li').length;
            var itemsLimit = 5;

            var error = function(){
                alert('Введи данные - СТРОКА и ЧИСЛО(ЛА).\n\nТы ввёл это - masterConsole('+ smartArgs +');\nтак нельзя!\n\nНужно например так:\nmasterConsole("Pidor: ", 14, 88, 228)');
            }

            //ОШИБКИ
            if( 
                !arguments.length || //если нет значений
                arguments.length <= 1 || //Если всего один аргумент
                typeof( arguments[0] ) === 'number' //Если начинается не со строки
            ){
                error();
                return;
            }//ОШИБКИ

            //проход №1
            //Организация аргументов Имя: значения
            for( var i = 0; i < argLN ; i++){
                //Первый ключ - ИМЯ
                if( i < 1 ){
                    args[i] = arguments[i];
                }
                if( i >= 1 && i < 2 ){ args[i] = [];}
                //Вторая пара - ДАННЫЕ
                if( i >= 1 ){
                    args[1][i-1] = arguments[i];
                }
            }//for
            
            namesId.push( args );

            //проход №2
            //Перезапись дублей
            for( var i = 0; i < namesId.length ; i++ ){
                var prev = (i-1 < 0 ) ? i : (i-1);
                var currName = namesId[i][0];
                var prevName = namesId[prev][0];                

                //Если совпадает текущ. с пред. - стираем и меняем на текущ.
                if( i > 0 && currName == prevName ){                    
                    namesId[prev] = namesId[i];                    
                    namesId.splice( i, 1 );
                }
            }//проход №2

            //Очистка отработанных пунктов
            if( namesId.length > itemsLimit ){
                namesId.splice( 0, 1 );
            }//Очистка отработанных пунктов

            //Проход №3
            //Создание консоли
            if( !$('#masterConsole').length ){
                $('body').prepend('<ul id="masterConsole"></ul>');
                $('#masterConsole').css(menuStyle);
            }

            if( $('#masterConsole').length ){
                $('#masterConsole > li').remove();
                for( var i = 0; i < namesId.length ; i++ ){
                    var merged = namesId[i][1].join(splitter);
                    $('#masterConsole')
                        .append('<li>'+namesId[i][0]+' : '+merged+'</li>');
                }
            }

            return namesId;
        }
    }//makeMasCons
    
    window.masterConsole = masterConsole;
}());