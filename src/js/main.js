$(document).ready(function () {
  var modal = $(".modal"),
        modalAnswer = $('.modal-answer'),
        modalBtn = $("[data-togle=modal]"),
        modalClose = $(".modal__close"),
        closeBtnAnswer = $('.modal-answer__close');
    modalBtn.on("click", function () {
        modal.toggleClass("modal--visible");
    });
    modalClose.on("click", function () {
        modal.toggleClass("modal--visible");
    });
    closeBtnAnswer.on('click', function () {
        modalAnswer.toggleClass('modal-answer--visible');
    });
  // Бургер меню
  var menu = $(".menu__link");
  var menu_active = $(".menu__link--active");
  var filter = $("[data-filter]");
  var menu_list = $(".menu__wrap");
  var nav_link = $(".menu__wrap a");

  menu.click(function () {
    menu.toggleClass("menu__link--active");
    menu_list.toggleClass("menu__wrap--active");
  });
  nav_link.click(function () {
    menu.toggleClass("menu__link--active");
    menu_list.toggleClass("menu__wrap--active");
  });

 // закрытие модального окна нажатием на кнопку Esc
  $(document).keydown(function (e) {
      if (e.code == 'Escape') {
          modal.removeClass('modal--visible');
          modalAnswer.removeClass('modal-answer--visible');
      };
  });
  // закрытие модального окна при нажатие на любое место вне его
  $(document).on('click', function (e) {
      if (modal.is(e.target)) {
          modal.removeClass('modal--visible');
      };
  });

  // плавная прокрутка 
  $(function () {
      $('a[href^="#"]').on('click', function (event) {
          // отменяем стандартное действие
          event.preventDefault();

          var sc = $(this).attr("href"),
              dn = $(sc).offset().top;
          /*
           * sc - в переменную заносим информацию о том, к какому блоку надо перейти
           * dn - определяем положение блока на странице
           */
          $('html, body').animate({
              scrollTop: dn
          }, 1000);
          /*
           * 1000 скорость перехода в миллисекундах
           */
      });
  });
  
  //ПРИМЕНЕНИЕ КЛАССА "IBG"
  function ibg(){

    $.each($('.ibg'), function(index, val) {
      if($(this).find('img').length>0){
        $(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
      }
    });
  }

  ibg();

  //слайдер
  $('.slider').slick({
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          centerMode: true,
          variableWidth: true,
          infinite: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1800,
        settings: {
          centerMode: true,
          variableWidth: false,
          infinite: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          centerMode: true,
          variableWidth: false,
          infinite: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          infinite: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 1
        }
      }
    ]
  });

  //слайдер 2
  $('.news__slider').slick({
    slidesToShow: 4,
    infinite: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          centerMode: false,
          variableWidth: false,
          infinite: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          infinite: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 1
        }
      }
    ]
  });

   // загрузка карты при скроле
  var map = $(".price");
  var mapTop = map.offset().top;
  $(window).bind("scroll", function () {
    var windowTop = $(this).scrollTop();
    if (windowTop > mapTop) {
      $("#map").html(
        '<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ab245e42e0be839d9f2aeab1fe427ef33f365bce1b5ddb8711fb172809e11cf35&amp;width=100%25&amp;height=600&amp;lang=ru_RU&amp;scroll=false"></script>'
        );
      $(window).unbind("scroll");
    }
  });

  // Валидация формы
  function validateForm(form) {
    $(form).validate({
      errorClass: "invalid",
      errorElement: "div",
      rules: {
        // simple rule, converted to {required:true}
        userName: {
          required: true,
          minlength: 2,
          maxlength: 15,
        },
        userPhone: {
          required: true,
          minlength: 17,
        },
        // compound rule
        userDate: {
          required: true,
        },
        userTime: {
          required: true,
        },
        userCheckbox: "required",
      },
      messages: {
        userName: {
          required: "Введите Имя",
          minlength: "Слишком короткое имя",
          maxlength: "Имя не должно превышать 15 символов",
        },
        userPhone: {
          required: "Введите Телефон",
          minlength: "Некорректно введен номер",
        },
        userDate: {
          required: "Выберите Дату",
        },
        userTime: {
          required: "Выберите Время",
        },
        userCheckbox: {
          required: "Подтвердить обработку",
        },
      },
      submitHandler: function (form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            console.log("Ajax сработал. Oтвет сервера: " + response);
            alert("Форма отправлена, мы свяжимся с вами в течение 15 минут");
            $(form)[0].reset();
            $(form).find("input").val("");
          },
          error: function (response) {
            console.error("Ошибка запроса" + response);
          },
        });
      },
    });
  }

  validateForm(".modal__form");

  // Маска для телефона
  $("[type=tel]").mask("+380 (00) 000-00-00", {
    placeholder: "Телефон",
  });

  // Cкрол вниз
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();

    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top,
    },
    500,
    "linear"
    );
  });

  // slick slider
  $(".slider").on("init reInit", function (event, slick) {
    var amount = slick.slideCount;
    $(".slider__range").attr("max", amount);
  });

  $(".slider").on("afterChange", function (e, slick, currentSlide) {
    $(".slider__range").val(currentSlide + 0);
  });

  $(".slider__range").on("input change", function () {
    $(".slider").slick("slickGoTo", this.value - 0);
  });

  $(".slider").slick({
    slidesToShow: 5,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    infinite: true,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
      },
    },
    ],
  });

  // Zoom image
  lightbox.option({
    resizeDuration: 300,
    positionFromTop: 150,
    wrapAround: true,
    fitImagesInViewport: true,
    showImageNumberLabel: false,
  });

  //Анимация
  new WOW({
    mobile: false,
  }).init();
  //
});