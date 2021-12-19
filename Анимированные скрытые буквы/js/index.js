;(function(){
    //Рандомайзер
    function randNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function letterRunner(){
        var element = $(this);//Данный элемент
        var getString = $(this).text();//Текущая строка
        var intervalID = undefined;
        var regExp = /[a-zа-яё]/gi;//Сколько букв?
        var hiddenStringMass = undefined;//Скрытый массив строки
        var visibleStringMass = Array.from( $(this).text() );//Открытый массив строки
        var update_ms = 60;//Обновление. Повтор интервала.
        var speed = 2;//СЕКУНД
        var speedformula = Math.floor( (getString.length * update_ms) / (speed * 1000) );//Скорость завершения исполнения замены символов (1000мс = в секунду)

        //Формула для цикла. Если скорость меньше еденицы то еденица. Цикл не понимает ноль.
        speedformula = (speedformula < 1) ? 1 : speedformula;
        
        //console.log(speedformula);

        //Замена букв на символы
        element.text( getString.replace(regExp, '#') );
        //Получаю скрытую строку в виде массива.
        hiddenStringMass = Array.from( $(this).text() );        

        //Анимация букв. Случайный порядок.
        function letterOpener(){            
            var string_ln = visibleStringMass.length;
            var indexesMass = [];//Номерной массив равный количеству символов в исходной строке

            //Внесение номеров в номерной массив, по порядку возрастания
            for(var i = 0;i < string_ln; i++){
                indexesMass.push(i);
            }

            return function(){
                //Цикл - скорость. Скорость замены символов.
                for(var i = 0; i < speedformula; i++){
                    //Случайное число от 0 до количества номеров в номерном массиве
                    var random = randNum(0, indexesMass.length-1);
                
                    //До тех пор пока в номерном массиве что то есть
                    if( indexesMass.length > 0 ){
                        hiddenStringMass[ indexesMass[random] ] = visibleStringMass[ indexesMass[random] ];
    
                        element.text( hiddenStringMass.join('') );

                        indexesMass.splice( random, 1);
                    }
                    //Номерной массив - пуст. Стоп, выход.
                    else {
                        element.text( getString );
                        clearInterval(intervalID);
                        return;
                    }
                }
                
            }
        }

        //Индивидуальная задержка.
        setTimeout(function(){
            intervalID = setInterval(letterOpener(), update_ms);
        }, randNum(1, 6)*200);
    }//letterRunner

    $('.hidden_letter').each( letterRunner );
}());