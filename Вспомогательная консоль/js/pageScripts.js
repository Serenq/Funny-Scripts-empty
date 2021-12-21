;(function(){
    var menuStyle = {
        'height': 'auto',
        'width': 'auto',
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

    function masterConsole(){
        var argLN = arguments.length;//Сколько аргументов
        var stringIndex = [];//Позиция строки в массиве аргументов
        var argsMas = [].slice.call(arguments);//Полноценный массив из аргументов
        var splitter = " | ";
        var renderedString = undefined;
        var ID = 'id-';//Уникальный идентификатор функции

        function error(){
            alert('Ошибка!\n Необходимо ввести: masterConsole("СТРОКА", цифра-событие, "строка", цифра, ...). \n Было введено это - \n masterConsole('+argsMas+')');
        }

        //ОШИБКИ, условия
        //Нет выполнения консоли, не поступили аргументы.
        if( !arguments.length ){return};
        //Если первый аргумент цифра, а не строка.
        if( typeof argsMas[0] !== 'string'){error(); return};

        //Проход №1 - Сборка массива с разделителями
        stringIndex.length = 0;
        for(var i = 0;i < argLN;i++){
            //Дописываю двоеточия :
            if( typeof argsMas[i] == 'string' && i % 2 == 0 ){
                ID += argsMas[i].replace(/ /g, '');//Идентификатор. Удалить пробелы

                argsMas[i] = argsMas[i]+': ';//Двоеточия
                stringIndex.push(i);//Массив с индексами строк

                //Если строк среди аргументов больше, то после первой ставится разделитель.
                if( i > 1 ){
                    argsMas[i] = splitter + argsMas[i];
                }
            }

            if( typeof argsMas[i] == 'number' && i % i+1 >= 1 ){
                argsMas[i] = argsMas[i] + ' ';//Двоеточия
                stringIndex.push(i);//Массив с индексами строк
            }
        }//Проход №1

        //Преобразование собранного массива в читаему юстроку.
        renderedString = argsMas.join('');

        //Проход №2 - Организация HTML
        //Если консоль не существует.
        if( !$('#masterConsole').length ){
            $('body')
                .prepend('<ul id="masterConsole"></ul>');
            $('#masterConsole').css(menuStyle);
        }

        //Если оригинальный пункт <li> с ID не существует.
        if( !$('#masterConsole .'+ID).length ){
            $('#masterConsole').append('<li class="'+ID+'"></li>');
        }

        $('#masterConsole .'+ID).text(renderedString);
    }//masterConsole

    masterConsole();
    
    window.masterConsole = masterConsole;
}());