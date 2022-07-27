<?php 
require('class.phpmailer.php');
require('class.smtp.php');

$php_name = $_POST['ajax_name'];
$php_email = $_POST['ajax_email'];
$php_message = $_POST['ajax_message'];

$mail = new PHPMailer();
$mail->IsSMTP();                                      // Establecer envío SMTP
$mail->Host = 'mail.felixrivas.io';  // Especificar el servidor principal y de respaldo
$mail->SMTPAuth = false;     // Activar la autenticación SMTP
$mail->Username = 'info@felixrivas.io';  // SMTP nombre de usuario
$mail->Password = '&#mZSB@;rw!e'; // SMTP contraseña

$mail->From = 'info@felixrivas.io';
$mail->FromName = 'Info';
$mail->AddAddress("info@felixrivas.io", "Felix Rivas"); 
$mail->AddReplyTo('info@felixrivas.io', 'Informacion');

$mail->WordWrap = 50;
$mail->IsHTML(true);
// Formato de correo electrónico listo para HTML
$mail_template = '<div style="padding:50px;">' . $php_name . ',<br/>'
		. '<strong style="color:#f00a77;">Nombre:</strong>  ' . $php_name . '<br/>'
		. '<strong style="color:#f00a77;">Email:</strong>  ' . $php_email . '<br/>'
		. '<strong style="color:#f00a77;">Mensaje:</strong>  ' . $php_message . '<br/>';

$mail->Subject = 'Formulario de Contacto Web';
$mail->Body    = $mail_template;


if(!$mail->Send())
{
echo 'El mensaje no se ha podido enviar';
echo 'Error:' . $mail->ErrorInfo;
exit;
}

echo 'Mensaje envíado correctamente';
?>