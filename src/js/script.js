

window.addEventListener('load', function () {
   this.setTimeout(() => {
      $('.preloader').removeClass('show')
   }, 2000)
})


/**
 * Переклчение индикатора языка
 */
$('.languages .lang').on('click', function () {
   $('.languages .lang').addClass('active').not(this).removeClass('active')
})
 


/**
 * Валидация формы
 */
let form = document.getElementById('form')
let user_name = document.querySelector('[name=user_name]')
let user_phone = document.querySelector('[name=user_phone]')
let user_email = document.querySelector('[name=user_email]')
let user_message = document.querySelector('[name=user_message]')

var allInputs = form.querySelector('field')

let regName = /^[A-zА-я\s^_][^0-9\_]+$/  // ркгулярное выражение для имени
let regPhone = /^[+\0-9\s\-\+\(/)\]^_][^A-zА-я\_\.\,]+$/


form.addEventListener('submit', function (e) {
   let error = false
   /* имя */
   if (user_name.value.trim() == '' || (user_name.value.trim().length < 2 || user_name.value.trim().length > 32)) {
      e.preventDefault()
      setError(user_name, 'Это поле должно быть от 2 до 32 символов')
   } else if (!regName.test(user_name.value)) {
      e.preventDefault()
      setError(user_name, 'Введите корректное имя')
   } else {
      error = false
      setSuccess(user_name)
   }

   /* телефон */
   if (user_phone.value.trim() == '') {
      e.preventDefault()
      setError(user_phone, 'Это поле не должно быть пустым')
   } else if (!regPhone.test(user_phone.value)) {
      // error= true
      e.preventDefault()
      setError(user_phone, 'Введите корректный номер телефона')
   } else if (user_phone.value.trim().length < 11 || user_phone.value.trim().length > 20) {
      setError(user_phone, 'Это поле должно быть не меньше 11 символов')
   } else {
      error = false
      setSuccess(user_phone)
   }

   /* email */
   if (user_email.value.trim() == '' || user_email.value.trim().length < 7) {
      e.preventDefault()
      setError(user_email, 'Это поле должно быть от 0 до 7 символов')
   } else if (!isEmail(user_email.value)) {
      e.preventDefault()
      setError(user_email, 'Введите корректный E-mail')
   } else {
      error = false
      setSuccess(user_email)
   }

   /* message */
   if (user_message.value.trim() == '' || (user_message.value.trim().length < 10 || user_message.value.trim().length > 3000)) {
      e.preventDefault()
      setError(user_message, 'Это поле должно быть от 10 до 3000 символов')
   } else {
      error = false
      setSuccess(user_message)
   }
})

function setError(input, message) {
   let parent = input.parentNode
   let mess = parent.querySelector('.message')

   parent.classList.add('error')
   mess.innerHTML = message
}

function setSuccess(input) {
   let parent = input.parentNode
   let mess = parent.querySelector('.message')

   parent.classList.remove('error')
   mess.innerHTML = ''
}

function isEmail(email) {
   return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}








/**
 * инициализация slick в блоке category-block при ширине окна <= 575px 
 */
window.addEventListener('resize', mobileSlick)
window.addEventListener('load', mobileSlick)


function mobileSlick() {
   let windowWidth = window.innerWidth
   if (windowWidth <= 575) {
      $('.category-cards').addClass('cards-slider')
      initSlick($('.cards-slider'))
   } else {
      // $('.cards-slider').slick('unslick')
      $('.cards-slider').slick('unslick')
      $('.category-cards').removeClass('cards-slider')
   }
   // initSlick($('.cards-slider'))
   
}

/**
 * настройка slick в блоке category-block
 */
function initSlick(slider) {
   slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      dots: true,
      arrows: false,
      infinite: true,
      variableWidth: true
   })
   $('.cards-slider .slick-slide').css({ minWidth: '282px', width: '282px' })
} 



/**
 * slick - рекомендации/похожие товары
 */

   $('.other-cards-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false,
      dots: true,
      arrows: false,
      infinite: true,
      variableWidth: true,
      responsive: [
         {
            breakpoint: 1182,
            settings: {
               slidesToShow: 4,
               centerMode: true,
               variableWidth: true
            }
        },
      ]
   })
   $('.other-cards-slider .slick-slide').css({ width: '100%' })










/**
 * Мобильное меню
 */
$('.mobile-menu-icon').on('click', openMenu)
$('.close-btn').on('click', closeMenu)
$('.overlay').on('click', closeMenu)
$('body').on('keydown', closeMenuEsc)

function closeMenu() {
   $('.accordion-mobile-list').hide()
   $('.accordion-mobile-list__1').hide()
   $('.mobile-menu').removeClass('show')
   $('.overlay').removeClass('show')
   $('body').removeClass('hidden')
}

function openMenu() {
   $('.mobile-menu').addClass('show')
   $('.overlay').addClass('show')
   $('body').addClass('hidden')
}

function closeMenuEsc(e) {
   if (e.keyCode == 27) {
      closeMenu()
   }
}





/**
 * Аккордион в мобильном меню
 */
$('.accordion-list > li').has('ul').addClass('has-children')

$('.accordion-mobile-list').hide()
$('.mobile-menu-list > li > a').on('click', function() {
   $('.accordion-mobile-list').slideToggle()
   $('.mobile-menu-list > li').toggleClass('active')
   $(this).toggleClass('active')
})

$('.accordion-list__1').hide()
$('.accordion-list > li').on('click', function() {
   $('.accordion-list > li').not($(this)).removeClass('active')
   $('.accordion-list__1').not($(this).children('.accordion-list__1')).slideUp()
   $(this).toggleClass('active').children('.accordion-list__1').slideToggle();
})






/**
 * Слайдер на главной странице
 */
$(window).on('load', function() {
   $('.main-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      speed: 1000,
      infinite: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 7000
   })
})

$('.main-slider .slick-dots').css({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' })





/**
 * Слайдер на странице товара
 */
 $('.card-for').slick({
   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: false,
   // fade: true,
   infinite: true,
   dots: false,
   asNavFor: '.card-nav'
 });
 $('.card-nav').slick({
   slidesToShow: 5,
   slidesToScroll: 1,
   asNavFor: '.card-for',
   dots: false,
   arrows: true,
   nextArrow: '<button class="next"><svg><use xlink:href="img/dist/svg-sprite.svg#icon-menu-arrow"></use></svg></button>',
   centerMode: false,
   focusOnSelect: true,
   vertical: true,
   responsive: [
      {
         breakpoint: 1175,
         settings: {
            slidesToShow: 5,
            vertical: false,
            centerMode: false,
            centerPadding: '0',
            arrows: true,
            variableWidth: true,
            nextArrow: '<button class="next"><svg><use xlink:href="img/dist/svg-sprite.svg#icon-menu-arrow"></use></svg></button>',
         }
     },
   ]
 });

 $('.card-nav .slick-prev').css({ display: 'none' })
 $('.card-nav .slick-arrow.next').css({ display: 'flex' })




 /**
  * Табы на странице товара
  */
$(function() {
   $('.content-tab').not(':first').hide();
   $('.card-tab').on('click', function () {
      $('.card-tab').removeClass('active').eq($(this).index()).addClass('active');
      $('.content-tab').hide().removeClass('show').eq($(this).index()).fadeIn(500).addClass('show');
      //   $('.products-slider').slick('setPosition');  // Этот метод "встряхивает" слайдер переинициализирует его после каждого изменения страницы или переключении вкладок
   });
})





/**
 * Select на странице поиска
 */
let selectedOption = ''
$('.option-content').on('click', function () {
   selectedOption = $(this).text()
   $(this).addClass('selected')
   $('.option-content').not(this).removeClass('selected')
   $('.current-select').text(selectedOption)
})



var showOptions = false
$('.current-select').on('focus', function () {
   $('.options').addClass('show')
   $('.current-select').addClass('active')
})

$('.current-select').on('blur', function () {
   $('.options').removeClass('show')
   $('.current-select').removeClass('active')
})

$('.option span').on('click', function () {
   $('.options').removeClass('show')
   $('.current-select').removeClass('active')
})
window.onload = function () {
   

   document.addEventListener('click', clickOutside)
   

   function clickOutside (e) {
      // var showOptionsFlag = false
      // $('.options').removeClass('show')
      // if (showOptions) {
      //    e.composedPath().find((el) => {
      //       if (!!el && !!el.classList && (el.classList.contains('select') || el.classList.contains('options'))) {
      //          if (this.innerShowTranslate) {
      //             showTranslateFlag = true;
      //             $('.options').addClass('show')
      //          }
      //       } 
      //    });
      // }
      // if (!showOptionsFlag) {
      //    showOptions = false
      //    $('.options').removeClass('show')
      // }
   }
   // if (showOptions) 
   //    $('.options').addClass('show')
   // else $('.options').removeClass('show')

}



/**
 * Кнопка "Читать далее"
 */
let showContent = false
$('.hidden-description').hide()
$('.more-btn').on('click', function () {
   showContent = !showContent
   $('.hidden-description').slideToggle()
   if (!showContent) {
      $('.more-btn span').text('Все описание')
      $('.more-btn svg').css({transform: 'rotate(0)'})
   } else {
      $('.more-btn span').text('Скрыть описание')
      $('.more-btn svg').css({transform: 'rotate(-180deg)'})
   }
})



