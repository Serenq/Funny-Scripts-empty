/*
 * Плагин скрытого меню по правой кнопке мыши.
 * Вызов на элементе - $('.siteMenu').rkmHiddenMenu();
 * Опция одна - Зажатая ПКМ, или клик ПКМ открывает меню ЛКМ и ПКМ закрывает.
 * По умолчанию onHold: true - меню открывается и закрывается по УДЕРЖАНИЮ ПКМ.
*/

$(function($){
    $.fn.rkmHiddenMenu = function(options){
        var win = {};
        var body = $('body');
        var siteBg = ($(".siteBg").length > 0) ? $(".siteBg") : (body.prepend('<div class="siteBg"></div>'), siteBg = $(".siteBg") );//Проверка, существует ли тёмная подложка. Если - нет, создаётся.
        var siteMenu = this;
        var curPos = {};
        var getCurCoords_event;
        var reposition = {};
        var flags = {
            menuOpenerFlag: false
        }
        
        var settings = $.extend({
            onHold: true
        },options);
        
        document.oncontextmenu = new Function("return false;");
        
        var method = {
            //Окно, значения
            getWin: function(){
                win.wh = $(window).innerHeight();
                win.ww = $(window).innerWidth();
            },
            //Окно, значения
            //Открывалка меню
            menuOpener: {
                open: function(){
                    siteBg.addClass("active");
                    siteMenu.addClass("active");
                    body.addClass("active");
                    method.getCurCoords(getCurCoords_event);//Координаты мыши
                },
                close: function(){
                    siteBg.removeClass("active");
                    siteMenu.removeClass("active");
                    body.removeClass("active");
                }
            },//Открывалка меню
            //Координаты мыши
            getCurCoords: function(e){
                var siteMenuLoc = {};
                curPos.x = e.pageX;
                curPos.y = e.pageY;
                siteMenuLoc.h = siteMenu.outerHeight();
                siteMenuLoc.w = siteMenu.outerWidth();
                var halfLeft = e.pageX-(siteMenuLoc.w/2);
                var halfRight = e.pageX+(siteMenuLoc.w/2);
                var menuHeight = e.pageY+(siteMenuLoc.h);
                var toRight = e.pageX-(e.pageX+siteMenuLoc.w-win.ww);
                var toBottom = e.pageY-(e.pageY+siteMenuLoc.h-win.wh);
                //Borders
                if(halfLeft>0 && halfRight<win.ww){            
                    reposition = {top: curPos.y,left: halfLeft};
                }//OK        
                //LEFT
                if(halfLeft<0){            
                    reposition = {top: curPos.y,left: 0};
                }      
                //RIGHT
                if(halfRight>win.ww){            
                    reposition = {top: curPos.y,left: toRight};
                }        
                //BOTTOM
                if(menuHeight>win.wh){            
                    reposition = {top: toBottom,left: halfLeft};
                }        
                //LB & RB
                if(halfLeft<0 && menuHeight > win.wh || halfRight>win.ww && menuHeight > win.wh){
                    //LEFT_BOTTOM
                    if(halfLeft<0 && menuHeight > win.wh){                
                        reposition = {top: toBottom,left: 0};
                    }
                    //RIGHT_BOTTOM
                    if(halfRight>win.ww && menuHeight > win.wh){                
                        reposition = {top: toBottom,left: toRight};
                    }
                }//LB & RB

                siteMenu.css(reposition);
                return;
            }//Координаты мыши
        };//method
        
        method.getWin();
        //ОТКРЫТЬ МЕНЮ
        $(window).on('mousedown mouseup', function(e){
            getCurCoords_event = e;
            method.getWin();
            
            //Если по клику
            if(!settings.onHold){
                //Открыть
                if(e.button==2 && e.type=='mousedown' && !flags.menuOpenerFlag){
                    flags.menuOpenerFlag = true;
                    method.menuOpener.open(getCurCoords_event);
                    return;
                }//Открыть
                //Закрыть
                if(e.button==2 && e.type=='mousedown' && flags.menuOpenerFlag || 
                  e.button==0 && e.type=='mousedown' && flags.menuOpenerFlag && e.target.nodeName !== 'A'){
                    flags.menuOpenerFlag = false;
                    method.menuOpener.close();
                }//Закрыть
            }//Если по клику
            
            //Если по удержанию
            if(settings.onHold){
                if(e.button==2 && e.type=='mousedown'){
                    method.menuOpener.open(getCurCoords_event);
                }
                if(e.button==2 && e.type=='mouseup'){
                    method.menuOpener.close();
                }
            }//Если по удержанию
        });
        //ОТКРЫТЬ МЕНЮ
    };//rkmHiddenMenu
}(jQuery));

$('.siteMenu').rkmHiddenMenu({onHold: false});