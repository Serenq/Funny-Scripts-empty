$(function(){
    var win = {};
    
    //Получить ширину высоту.
    function getwin(){
        win.ww = $(window).width();
        win.win = $(window).height();
        win.dw = $(document).width();
        win.dh = $(document).height();
    }//Получить ширину высоту.
    
    //Реагировать на элемент
    function reactWith(element){
        $(element).each(function(e){
            var sideFrom = false;
            var elem = $(this);
            var bloq = {}
            var porog = 10;
            var wait_f = false;

            //Получить значения
            function getBloq(evt){
                //outers
                bloq.l = evt.pageX - elem.offset().left + porog < 0
                         ? evt.pageX - elem.offset().left + porog
                         : 0;
                //
                bloq.r = -(evt.pageX - (elem.offset().left + elem.width()) - porog) < 0
                         ? -(evt.pageX - (elem.offset().left + elem.width()) - porog)
                         : 0;
                //
                bloq.t = evt.pageY - elem.offset().top + porog < 0
                         ? evt.pageY - elem.offset().top + porog
                         : 0;
                //
                bloq.b = -(evt.pageY - (elem.offset().top + elem.height()) - porog) < 0
                         ? -(evt.pageY - (elem.offset().top + elem.height()) - porog)
                         : 0;
                //
                //borders
                bloq.x = evt.pageX - elem.offset().left;
                bloq.y = evt.pageY - elem.offset().top;

                if(bloq.t && !bloq.r && !bloq.b && !bloq.l){sideFrom='top'}
                if(bloq.r && !bloq.b && !bloq.l && !bloq.t){sideFrom='right'}
                if(bloq.b && !bloq.l && !bloq.t && !bloq.r){sideFrom='bottom'}
                if(bloq.l && !bloq.t && !bloq.r && !bloq.b){sideFrom='left'}
            }
            getBloq(e);

            $(window).on('mousemove',function(e){
                getBloq(e);
            });

            $(this).on('mouseenter',function(e){
                if(!wait_f){
                    wait_f=true;
                    $(this).addClass(sideFrom);
                    setTimeout(function(){
                        elem.removeClass('top right bottom left');
                        setTimeout(function(){wait_f=false;},200);
                    },100);
                }
            });
        });
    }//Реагировать на элемент
    
    reactWith('.react');
    getwin();//Получить ширину высоту.
    $(window).on('resize', function(e){
        getwin();//Получить ширину высоту.
    });
});