;(function(){
    $.fn.aliveFloater = function(options){
        var thisObject = this;
        var winOfTop = $(document).scrollTop();

        var defaults = {}

        $.fn.extend(options, defaults);

        function floaterReady(){
            var parentOfTop = $(this).parent().offset().top;
            var parentHeight = $(this).parent().height();
            var objHeight = $(this).outerHeight();
            var marginVal = parseInt( $(this).parent().css("margin-top") );
            var touchTop = winOfTop - parentOfTop;
            var touchBottom = (winOfTop + objHeight - marginVal ) - parentHeight;

            if( touchTop >= 0 ){
                $(this).addClass('active');
                if( touchBottom >= 0 ){
                    $(this).addClass('stop');
                }
                else{
                    $(this).removeClass('stop');
                }
            }
            else {
                $(this).removeClass('active');
            }
        }

        thisObject.each(floaterReady);

        $(window).on('scroll',function(){
            winOfTop = $(document).scrollTop();

            thisObject.each(floaterReady);
        });

        return this;
    }//aliveFloater
}());