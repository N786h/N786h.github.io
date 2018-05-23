// All rights reserved with www.mysirg.com
// Copyright (c) 2017 Mysirg.com
$(function () {
    $(window).on("load resize", function () {
        $(".fill-screen").css("height", window.innerHeight);
    });
    
    // scrollspy
    $('body').scrollspy({
        target: '.navbar',
        offset: 150
    });

    $('nav a').bind('click', function(){
        $($(this).attr('href')).animatescroll({scrollSpeed: 3000, padding:50});
        event.preventDefault();
    });


    $('.progress-bar').each(function() {
        var bar_value = $(this).attr('aria-valuenow') + '%';                
        $(this).animate({ width: bar_value }, { duration: 2000, easing: 'easeOutCirc' });
    });

})