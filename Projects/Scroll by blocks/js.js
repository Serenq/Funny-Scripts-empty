$(function(){
    var scroll_diap = 0;
    var blocksPos = undefined;
    var scrollQueue = false;
    var scrollFlag = true;
    var arr_ofs = [];
    
    function getWin(){
        return {
            wh: $(window).innerHeight(),
            ww: $(window).innerWidth(),
        }
    }
    
    //mazilla fix
    flInit('.floorWrap').fixPos();
	//rand num
	function randNum(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
    
    function hashGen(){
        var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','f'];
        var gen = '#';
        for(var i=0;i<6;i++){
            gen += arr[randNum(5,arr.length-1)];
        }
        return gen;
    }
	
    //Окрашиваю блоки
    function colBlok(inp){
        var inp = (inp != Object)?inp=$(inp):inp=inp;
        var len = inp.length;
        
        inp.each(function(){
            $(this).css({
                backgroundColor: hashGen()
            });
        });
        
    }//Окрашиваю блоки
    
    //Подготовка блоков
    function flInit(inp){
        console.log('flInit');
        var inp = (inp != Object)?inp=$(inp):inp=inp;
        var count = inp.children().length;
        arr_ofs.length=0;
        
        for(var i=0;i<count;i++){
            var elem = inp.children().eq(i);
            arr_ofs.push( elem.position().top + inp.scrollTop() );
        }//for
        
        //Что, куда скролить...
        function scroll_UD(arg){
            var arg = arg;
            
            function move(scTo){
                inp.animate({scrollTop: arr_ofs[scTo]},200, function(){
                    scrollQueue = false;
                    markPos();
                });
            }
            
            if(arg=='+' && scrollQueue==false){
                scrollQueue = true;
                scroll_diap = scroll_diap<count-1?++scroll_diap:scroll_diap=count-1;
                move(scroll_diap);
            }
            if(arg=='-' && scrollQueue==false){
                scrollQueue = true;
                scroll_diap = scroll_diap>0?--scroll_diap:0;
                move(scroll_diap);
            }
        }//scroll_UD
        
        function scrollToState(arg){
            var arg = arg;
            scrollQueue = true;
            inp.animate({scrollTop: arr_ofs[arg]},200, function(){
                scrollQueue = false;
                markPos();
            });
        };
        
        //Scrolling
        function windowScroll(arg){
            if(scrollFlag){
                if(arg.deltaY>0){scroll_UD('+');}
                else{scroll_UD('-');}
            }
        };//Scrolling
        
        window.addEventListener('wheel', windowScroll);
        
        var outPut = {
            getLenght: count,
            getArrOfs: arr_ofs,
            fixPos: function(){
                inp.animate({scrollTop: arr_ofs[scroll_diap]},0);
            },
            scrollStep: function(e){scroll_UD(e)},
            scrollTo: function(e){scrollToState(e)},
            scrollOn: function(e){ scrollFlag=true },
            scrollOff: function(e){ scrollFlag=false }
        }//outPut
        return outPut;
    }//Подготовка блоков
    
    //Подсветка позиций
    function markPos(){
        var count = flInit('.floorWrap').getLenght;
        if(!$('#fs_count > *').length){
            for(var i=0;i<count;i++){
                $('#fs_count').prepend('<li>');
            }//for
            //Скрол по клику на навигации
            $('#fs_count li').on('click',function(e){
                var index = scroll_diap = $(this).index();
                
                //flInit('.floorWrap').scrollOn();
                flInit('.floorWrap').scrollTo(index);
            });//Скрол по клику на навигации
        }//check
        //Процедурки для классов
        $('#fs_count li').attr('class','');
        $('#fs_count li').eq(scroll_diap).addClass('active');
    }
    //Подсветка позиций
    
    colBlok('.clr');//Покрашено
    flInit('.floorWrap');//Создано
    markPos();//Покрашен пункт навигации
    
    $('#changeColor').on('click', function(){
        colBlok('.clr');
        //flInit('.floorWrap').scrollOff();
    });
    
    $(window).on('resize keyup',function(e){
        if(e.type=='resize'){
            arr_ofs = flInit('.floorWrap').getArrOfs;
            flInit('.floorWrap').fixPos();
        }
        if(e.type=='keyup'){
            //console.log(e.which);
            if(e.which=='38'){
                flInit('.floorWrap').scrollStep('-');
            }
            if(e.which=='40'){
                flInit('.floorWrap').scrollStep('+');
            }
        }
    });
});//end FN