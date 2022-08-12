;(function(){
    const $ = document.querySelectorAll.bind(document);
    const bounds_visible = true; //Важная опция!

    let boundTop = 30;
    let boundBot = 70;
    let blocks = $('.story-block p');
    let scrnHeight = 0;
    let scrnBottom = window.innerHeight;

    //Показать границы
    if(bounds_visible){
        let bound_1 = document.createElement('div');
        let bound_2 = document.createElement('div');

        bound_1.className = 'bound --top';
        bound_2.className = 'bound --bottom';

        document.body.prepend(bound_1, bound_2);

        bound_1.style.top = boundTop+"%";
        bound_2.style.top = boundBot+"%";
    }//Показать границы

    function element_inSight(){
        console.log('[Вижу] - любая, что-то делающая функция');
    }

    function element_outSight(){
        console.log('[Скрылся] - любая, что-то делающая функция');
    }

    function docOnScroll(callback_in, callback_out){
        blocks.forEach(function(element){
            const boundTopPercent = ((scrnBottom * boundTop) / 100);
            const boundBotPercent = ((scrnBottom * boundBot) / 100);

            let elemBottom = (element.offsetTop - scrollY) - boundBotPercent;
            let elem_topHeight = (element.offsetTop + element.offsetHeight - scrollY) - boundTopPercent;
            let checkActive = element.classList.contains('active');
            
            // Елементы за пределами планок
            if(
                elem_topHeight < 0
                || elemBottom > 0
            ){
                element.classList.add('out');
                element.classList.remove('active');
                
                //Колбэк функция - выполнить при ВЫХОДЕ
                if(checkActive){ callback_out() }
            }
            // В зоне видимости
            else {
                element.classList.remove('out');
                element.classList.add('active');

                //Колбэк функция - выполнить при ВХОДЕ
                if(!checkActive){ callback_in() }
            }
        });
    }

    docOnScroll(element_inSight, element_outSight);

    document.addEventListener('scroll', docOnScroll.bind(null, element_inSight, element_outSight));
}());