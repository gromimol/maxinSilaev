document.addEventListener('DOMContentLoaded', function() {
    function syncHeights() {
        const workContent = document.querySelector('.work__content');
        const workImage = document.querySelector('.work__image');
        
        if (workContent && workImage && window.innerWidth > 767) {
            workImage.style.height = 'auto';
            
            setTimeout(() => {
                const contentRect = workContent.getBoundingClientRect();
                const contentHeight = contentRect.height;
                workImage.style.height = contentHeight + 'px';
            }, 10);
        }
    }
    
    syncHeights();
    window.addEventListener('resize', syncHeights);
    window.addEventListener('load', syncHeights);
});

$(document).ready(function() {
    $('.burger').on('click', function() {
        $('body').addClass('open-menu');
    });

    $('.close').on('click', function() {
        $('body').removeClass('open-menu');
    });

    // Плавная прокрутка по якорям
    $('.menu a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        const $targetSection = $(target);
        
        if ($targetSection.length) {
            const headerHeight = $('.header').outerHeight() || 0;
            
            $('html, body').animate({
                scrollTop: $targetSection.offset().top - headerHeight - 20
            }, 800, 'swing');
            
            if ($('body').hasClass('open-menu')) {
                $('body').removeClass('open-menu');
            }
        }
    });

    // === АНИМАЦИЯ ТЕКСТА ===
    
    // Функция для инициализации анимации
    function initWordAnimation() {
        const animatedTexts = document.querySelectorAll('.animated-text');
        
        animatedTexts.forEach(textElement => {
            const innerHTML = textElement.innerHTML;
            const parts = innerHTML.split(/(<[^>]*>.*?<\/[^>]*>)/);
            
            let newHTML = '';
            parts.forEach(part => {
                if (part.includes('<')) {
                    newHTML += part;
                } else {
                    const words = part.trim().split(/\s+/).filter(word => word.length > 0);
                    words.forEach(word => {
                        newHTML += `<span class="animated-word">${word}</span> `;
                    });
                }
            });
            
            textElement.innerHTML = newHTML;
        });
    }

    // Функция для добавления случайных направлений
    function addRandomDirections() {
        const directions = ['from-left', 'from-right', 'from-top', 'from-bottom'];
        const words = document.querySelectorAll('.animated-word');
        
        words.forEach(word => {
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            word.classList.add(randomDirection);
        });
    }

    // Функция для анимации слов
    function animateWords() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const words = section.querySelectorAll('.animated-word');
                    
                    // Создаем массив слов и перемешиваем его
                    const shuffledWords = Array.from(words).sort(() => Math.random() - 0.5);
                    
                    shuffledWords.forEach((word, index) => {
                        setTimeout(() => {
                            word.classList.add('animate');
                        }, index * 150);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Наблюдаем за секциями с анимированным текстом
        const sectionsToObserve = [
            '.first-screen', 
            '.develop', 
            '.questions', 
            '.work', 
            '.help', 
            '.control', 
            '.cta'
        ];
        
        sectionsToObserve.forEach(selector => {
            const section = document.querySelector(selector);
            if (section && section.querySelectorAll('.animated-word').length > 0) {
                observer.observe(section);
            }
        });
    }

    // Инициализация анимации текста
    initWordAnimation();
    addRandomDirections();
    animateWords();
    
    // Анимируем первую секцию сразу после загрузки
    setTimeout(() => {
        const firstSection = document.querySelector('.first-screen');
        if (firstSection) {
            const firstWords = firstSection.querySelectorAll('.animated-word');
            
            const shuffledFirstWords = Array.from(firstWords).sort(() => Math.random() - 0.5);
            
            shuffledFirstWords.forEach((word, index) => {
                setTimeout(() => {
                    word.classList.add('animate');
                }, index * 200 + 800);
            });
        }
    }, 100);
    
    // Функция для перезапуска анимации (для тестирования)
    window.restartAnimation = function() {
        const words = document.querySelectorAll('.animated-word');
        words.forEach(word => {
            word.classList.remove('animate');
            // Удаляем старые классы направлений
            word.classList.remove('from-left', 'from-right', 'from-top', 'from-bottom');
        });
        
        addRandomDirections();
        
        setTimeout(() => {
            animateWords();
        }, 100);
    };
});