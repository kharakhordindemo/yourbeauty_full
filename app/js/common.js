//Preloader
$(window).on("load", function() {
    $(".preloader").delay(1000).fadeOut(1000);
});

$(function() {
    
    //SVG Fallback для картинок
    if(!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function() {
            return $(this).attr("src").replace(".svg", ".png");
        });
    };
    
    //Меню
    $("#my-menu").mmenu({
        
        extensions: ["theme-black", "effect-menu-slide", "pagedim-black"],
        navbar: {
            title: '<img src="img/logo.svg" alt="Your Beauty">'
        },
        offCanvas: {
            position: "right"
        }
        
    });
    
    var api = $("#my-menu").data( "mmenu" );
    
    api.bind("open:finish", function() {
        $(".hamburger").addClass("is-active");
    });
    api.bind("close:finish", function() {
        $(".hamburger").removeClass("is-active");
    });
    
    //Догружаем необходимую высоту в секции "services"
    $(".services-carousel").on("initialized.owl.carousel", function () {
        setTimeout(function () {
            servicesImg ();
        },100);
    });
    
    //Слайдер в секции "services"
    $(".services-carousel").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        smartSpeed: 700,
        navText: ['<i class="fa fa-chevron-circle-left"></i>', '<i class="fa fa-chevron-circle-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
    
    //Размер изображений для секции "services"
    function servicesImg () {
        $(".services-item").each(function () {
            var ths = $(this),
                thsHeight = ths.find(".services-item-content").outerHeight();
                ths.find(".services-item-img").css("min-height", thsHeight);
        });
    }
    
    servicesImg ();
    
    //Действия при изменении размера экрана
    function onResize () {
        $(".services-item-content").equalHeights();//добавляем одинаковую высоту контент секции "services"
    }onResize ();
    window.onresize = function () {
        onResize ();
    };
    
    //Стилизация всех select
    $('select').selectize();
    
    
    //Для отправки форм
    $("form.callback").submit(function(e) {
        var ths = $(this);
        e.preventDefault;
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: ths.serialize()
        }).done(function() {
            $(ths).find(".success").addClass("active").css("display", "flex").hide().fadeIn();
            setTimeout(function() {
                $(ths).find(".success").removeClass("active").fadeOut();
                ths.trigger("reset");
            }, 3000);
        });
        return false;
    });
    
    //Слайдер в секции "reviews"
    $(".reviews-carousel").owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        navText: ['<i class="fa fa-chevron-circle-left"></i>', '<i class="fa fa-chevron-circle-right"></i>'],
        smartSpeed: 700,
        items: 1
    });
    
    //Слайдер в секции "partners"
    $(".partners-carousel").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-chevron-circle-left"></i>', '<i class="fa fa-chevron-circle-right"></i>'],
        smartSpeed: 700,
        responsiveClass: true,
        responsive: {
            0:{
                items:1,
            },
            520:{
                items:1,
            },
            560:{
                items:2,
            },
            768:{
                items:2,
            },
            992:{
                items:3,
            },
            1200:{
                items:4,
            }
        }
    });
    
    //Кнопка "Наверх"
    $(window).scroll(function() {
        if($(this).scrollTop() > $(this).height()) {
            $(".top").addClass('active');
        } else {
            $(".top").removeClass('active');
        }
    });
    
    $(".top").click(function() {
        $("html, body").stop().animate({scrollTop: 0 }, 700, "swing");
    });
    
});//redy end
