$(function(){
   var pixelsSet = 6;
   
   function randNum(min,max){
      return Math.round(Math.random() * (max - min) + min);
   }
   
   //Расчёт пикселей относительно высоты и ширины
   function pixelMulty(pixels){
      $('<div class="pixCont"></div>').prependTo('body');
      var pixelsLN = $('.pixel').length;
      var parH = $('.pixCont').height();
      var parW = $('.pixCont').width();
      var pixHW = Math.floor( (parW / parH) * parH / pixels);
      var pixRows = Math.round(parH / pixHW)+1;
      var pixColls = Math.round(parW / pixHW);
      var pixMultiply = pixels * pixRows;
      //$('#inf_1').text("Ширина-высота: "+pixColls);
      //$('#inf_2').text("Пикселей задано: "+pixels);
      //$('#inf_3').text("Линий: "+pixRows);
      //$('#inf_4').text("Пикселей преобразовано: "+pixMultiply);
      $('.pixel').remove();
      
      for(i=0; i < pixMultiply; i++){
         $('<div class="pixel"></div>').appendTo('.pixCont');
      }
      $('.pixel').css({height: pixHW,width: pixHW});
      
      for(i=1;i < pixMultiply; i++){
         if(i % pixColls == 0){
            var offTop = $('.pixel').eq(i-pixColls).offset().top + $('.pixel').eq(i).height();
            $('.pixel').eq(i).css("top",offTop);
         }else{
            if($('.pixel')[i-pixColls]){
               var offTop = $('.pixel').eq(i-pixColls).offset().top + $('.pixel').eq(i).height();
               $('.pixel').eq(i).css("top",offTop);
            }
            var offLeft = $('.pixel').eq(i-1).offset().left + $('.pixel').eq(i).width();
            $('.pixel').eq(i).css("left",offLeft);
         }
      }
   }//Расчёт пикселей относительно высоты и ширины
   
   function removePixels(){
      var timer = setInterval(function(){
         var pixelsLN = $('.pixel').length;
         var num = randNum(0,pixelsLN);
         $('#inf_1').text("Число: "+num);
         $('.pixel').eq(num).remove();
         if(pixelsLN <= 0){
            clearInterval(timer);
            $('.pixCont').remove();
         }
      },10);
   }
   
   function showPixels(){
      $('.pixel').hide(0);
      var timer = setInterval(function(){
         var hidenPix = $('.pixel:hidden').length;
         var num = randNum(0,hidenPix);
         $('.pixel:hidden').eq(num).show(0);
         if(hidenPix <= 0){
            clearInterval(timer);
         }
      },6);
   }
   
   pixelMulty(pixelsSet);//Расчёт пикселей относительно высоты и ширины
   removePixels();
   
   $('a').on('click',function(){
      var link = $(this).attr('href');
      pixelMulty(pixelsSet);
      showPixels();
      setTimeout(function(){
         location.href = link;
      },400);
      return false;
   });
});//exec