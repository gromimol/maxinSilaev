document.addEventListener('DOMContentLoaded', function() {
    function syncHeights() {
        const workContent = document.querySelector('.work__content');
        const workImage = document.querySelector('.work__image');
        
        if (workContent && workImage && window.innerWidth > 767) {
            // Сбрасываем высоту
            workImage.style.height = 'auto';
            
            // Небольшая задержка для корректного расчета после сброса
            setTimeout(() => {
                // Получаем полную высоту контента включая все отступы
                const contentRect = workContent.getBoundingClientRect();
                const contentHeight = contentRect.height;
                
                // Устанавливаем высоту картинки с небольшой корректировкой
                workImage.style.height = contentHeight + 'px';
            }, 10);
        }
    }
    
    // Синхронизируем при загрузке и изменении размера
    syncHeights();
    window.addEventListener('resize', syncHeights);
    
    // Добавляем синхронизацию после загрузки всех ресурсов
    window.addEventListener('load', syncHeights);
});