# Про "Границы видимости" - Предесловие.
В течении многих и многих лет меня не отпускала мысль - "Как сделать - вот блок такой заезжает и выезжает?!! И пиу-пиу, пыщ-пыщ, оло-ло!". Как?
Засел, покумекал. Вообще было сложновато. По тому как впервые пишу на нативном JS, и долго не мог понять - почему работает не так как хотелось бы?! А именно - классы по многу раз перезаписывали друг друга, то там то тут. Тут перезаписывает много раз, там только один раз. А мне надо что бы везде было только один раз. Решение нашлось ВООБЩЕ СЛУЧАЙНО и НЕОЖИДАННО! Оно само нашлось. Чик! И всё. И по итогу кода стало меньше чем писал до этого! Красота, по идее. Оказывается загвоздка была в логическом ИЛИ.

# Про "Границы видимости" - Конкрэтно.
Данный скрипт делает:
Блок при скролле заезжает в настраиваемую область видимости, как снизу, так и сверху. И что-то произходит. Всё как бы. Есть две функции, функция входа и выхода. Одна функция выполняется когда блок заезжает в область, вторая когда блок покидает области. По идее данная наработка всего лишь прелюдия к чему-то большему. Есть мыслишки... Ограничимся пока этим.

# Теперь плагин
13 Августа 2022. Решил попробовать сделать плагин на нативном JS. Версия ранняя, вроде всё отрабатывает, если в опции не писать чепуху с левым типом данных :)

# Опции
 * bounds_visible      - bool, show red planks
 * bounds_plank_top    - value, 0 - 100, default = 30
 * bounds_plank_bottom - value, 0 - 100, default = 70
 * customClass_in      - string, the ability to set a unique class when an element is visible
 * customClass_out     - string, the ability to set a unique class when an element leaves the visibility zone
 * element_inSight     - foo, Do something when element is IN
 * element_outSight    - foo, Do something when element is OUT 

Example:
```
document.querySelectorAll('.elements').inTheSpotlight({
  bounds_visible: true,
  bounds_plank_top: 10,
  element_inSight: function(){ console.log('Now you are see me!')
});
```
 # Внешние функции управления
 В версии 1.2.0 - Были добавлены внешние функции управления, котоыре позволяют включать или отключать плагин когда потребуется. Не думал, что удалять хтмл-элементы на нативном JS так сложно... Что бы была возможность использовать внешние функции, придётся записывать инициализацию в переменную.
 
 ```
 let store = document.querySelectorAll('.story-block p').inTheSpotlight();
 
 document.querySelector('#custom-element-off').addEventListener('click', function(){store.destroy()});
 document.querySelector('#custom-element-on').addEventListener('click', function(){store.init()});
 ```
