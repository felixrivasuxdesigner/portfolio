<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400');
    .resultMessage{
        font-family: Roboto;
        font-weight: 100;
        font-size: 14px;
        color: #00ffff;
        margin-top: 30px;
        text-align: center;
    }
</style>
<?php
$formName = $_POST['formName'];
$formEmail = $_POST['formEmail'];
$formMessage = $_POST['formMessage'];

$formcontent=" De: $formName \n Mensaje: $formMessage";
$recipient = "info@shapecreativestudio.com";
$subject = "Contacto felixrivas.io";
$mailheader = "De: $formEmail \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "<p class='resultMessage'>Gracias por contactarme</p>";
?>