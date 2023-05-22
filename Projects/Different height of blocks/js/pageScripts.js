/*
	Опции:
	columns: цифра (4)
	$('.randomBlox').randomBlox({columns:5});
*/

;(function($){
	/* 18.07.2021 */
	var pluginName = 'randomBlox';

	$.fn[pluginName] = function(options){
		var defaults = {
			columns: 4,
			gap: 24
		}//defaults

		$.extend(defaults, options);

		var parentBlock = this;
		var getBlox = parentBlock.children();

		var methods = {
			buildStructure: function(){
				var gaping = defaults.gap;
				var parentW = parentBlock.width() + gaping;
				var blocksW = (parentW / defaults.columns) - gaping;

				getBlox.css('width', blocksW);

				for(var i = 0; i < getBlox.length ; i++){
					var current = getBlox.eq(i);
					var currentOfsLeft = (current.width()+gaping) * (i % defaults.columns);
					var currentOfsTop = getBlox.eq(i - defaults.columns).height() + getBlox.eq(i - defaults.columns).offset().top + gaping;

					if( i % defaults.columns ){
						current.css({
							left: currentOfsLeft
						});
					}

					if( i >= defaults.columns ){
						current.css({
							top: currentOfsTop
						});
					}
				}//for
				
				methods.update.call(this);
			},//buildStructure
			update: function(){
				$(window).on('resize', this.buildStructure);
			}
		}//public methods

		methods.buildStructure();
		methods.buildStructure();

		return publicMethods = {

		}
	};//plugin end
}(jQuery));