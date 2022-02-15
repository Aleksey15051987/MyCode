
//отправляем данные от пользователя на сервер

window.addEventListener('DOMContentLoaded', () => { //для того чтобы скрипт не дописал или изменил DOM

	'use strict'; //строгий режим

	// создаём объект, свойства которого будем использовать при определении стадии в которой находитя запрос
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро я с вами свяжусь!',
        failure: 'Что-то пошло не так...'
    };

    // получаем элементы формы и создаём div в который будем помещать свойства объекта message
    let form = document.querySelector('.contacts-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        Tinput = form.getElementsByTagName('textarea');

    // добавляем созданному div класс для возможности его стилизовать
    statusMessage.classList.add('status');

    // отменяем стандартное поведение браузера (переход на новую страницу)
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    // вставляем statusMessage в конец формы
        form.appendChild(statusMessage);

    // создаём из данных в form json объект и методом post отправляем их на сервер 'send.php'
        let request = new XMLHttpRequest();
        request.open('POST', 'send.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });

    	let json = JSON.stringify(obj);

    	// отправляем запрос на сервер
    	request.send(json);

    	// в зависимости от стадии в которой находитя запрос будем получать в statusMessage свойства message
    	request.addEventListener('readystatechange', function() {
        	if (request.readyState < 4) {
            	statusMessage.innerHTML = message.loading;
        	} else if(request.readyState === 4 && request.status == 200) {
            	statusMessage.innerHTML = message.success;
        	} else {
            	statusMessage.innerHTML = message.failure;
        	}
     	});

    	// очищаем input и textarea
    	for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        };
        document.getElementById("ta").value  = '';
    });
})