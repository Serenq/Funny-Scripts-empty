;(function(){
    $.fn.aliveFloater = function(options){
        var thisObject = this;
        var winScrollTop = $(document).scrollTop();

        var defaults = {}

        $.fn.extend(options, defaults);

        function floaterReady(){
            var parentOfTop = $(this).parent().offset().top;
            var parentHeight = $(this).parent().height();
            var objHeight = $(this).outerHeight();
            var touchTop = winScrollTop - parentOfTop;
            var touchBottom = (winScrollTop - parentOfTop) - parentHeight + objHeight;

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

        $(window).on('scroll resize',function(){
            winScrollTop = $(document).scrollTop();

            thisObject.each(floaterReady);
        });

        return this;
    }//aliveFloater
}());