/*
	Опции:
	speed: 1200, - скорость
    easeName: 'easeOutCubic' - тип анимации
	
	Типы анимаций:
	easeInQuad
    easeOutQuad
    easeInOutQuad
    easeInCubic
    easeOutCubic
*/

;(function(){
    $.fn.animatoriq = function(options){
        var defaults = {
            speed: 1200,
            easeName: 'easeOutCubic'
        };
        
        $.extend(defaults, options);

        var object = {
            me: this,
            height: this.height(),
            width: this.width(),
            offTop: this.offset().top,
            offLeft: this.offset().left,
        };

        var params = {
            fromX: object.me.offset().left,
            fromY: object.me.offset().top,
            toX: undefined,
            toY: undefined,
            time: new Date().getTime(),
            progress: undefined,
        }

        var easings = {
            // no easing, no acceleration
            linear: function(t){return t},
            // accelerating from zero velocity
            easeInQuad: function(t){return t*t},
            // decelerating to zero velocity
            easeOutQuad: function(t){return t*(2-t)},
            // acceleration until halfway, then deceleration
            easeInOutQuad: function(t){return t<.5 ? 2*t*t : -1+(4-2*t)*t},
            // accelerating from zero velocity 
            easeInCubic: function(t){return t*t*t},
            // decelerating to zero velocity 
            easeOutCubic: function(t){return (--t)*t*t+1 },
        };

        function updatePositions(evt){
            params.time = new Date().getTime();
            params.toX = evt.pageX - object.width/2;
            params.toY = evt.pageY - object.height/2;
            params.fromX = object.me.offset().left;
            params.fromY = object.me.offset().top;
        }

        function draw(func, e){
            updatePositions(e);

            var timerID = setInterval(function(){
                var time = new Date().getTime() - params.time;
                params.progress = +(time / defaults.speed).toFixed(4);
                var posX = (params.toX - params.fromX) * easings[func](params.progress) + params.fromX;
                var posY = (params.toY - params.fromY) * easings[func](params.progress) + params.fromY;

                object.me.css({
                    top: ( posY <= 0 ) 
                        ? 0 
                        : ( posY + object.height >= $(document).height() ) 
                        ? $(document).height() - object.height
                        : posY,
                    left: ( posX <= 0)
                        ? 0
                        : ( posX + object.width >= $(document).width() )
                        ? $(document).width() - object.width
                        : posX
                });

                if(time >= defaults.speed){clearInterval(timerID);}
            }, 12);
        }

        $(window).on('mousemove', draw.bind(null, defaults.easeName));

        return this;
    }//animatoriq
}());