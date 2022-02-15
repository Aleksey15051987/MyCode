<?php

// для расшифровки данных из json объекта
$_POST = json_decode(file_get_contents('php://input'), true);

// получить данные
$fio = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$text = $_POST['text'];

// небольшие проверки данных от пользователя
$fio = htmlspecialchars($fio);
$phone = htmlspecialchars($phone);
$email = htmlspecialchars($email);
$fio = urldecode($fio);
$phone = urldecode($phone);
$email = urldecode($email);
$fio = trim($fio);
$phone = trim($phone);
$email = trim($email);

// Для отправки данных на почту нужно воспользоваться функцией mail. 
// mail("на какой адрес отправить", "тема письма", "Сообщение (тело письма)","From: с какого email отправляется письмо");
if (mail("example@mail.ru", "Сообщение с сайта", "ФИО:".$fio. ".  Телефон:".$phone. ".  E-mail: ".$email. " Сообщение:".$text, "From: example2@mail.ru"))

// Можно добавить условие, которе проверит отправилась ли форма при помощи PHP на указанные адрес электронной почты	
 {     echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}?>

<!-- Для отправки писем на почту я использовал OpenServer и SMTP-сервер Google, так же необходимо создать аккаунт в Google.

После этого переходим в настройки OpenServer и заполняем поля:
способ отправки почты: отправлять почту через удаленный SMTP сервер
SMTP сервер: smtp.gmail.com
порт: 465
email отправителя: почта, которую вы зарегестрировли ранее
имя пользователя: та же почта
пароль: пароль от почты
шифрование: авто

Так же необходимо изменить наш код в функции mail (подставить свою почту). --> 