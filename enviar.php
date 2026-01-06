<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

// ✅ Permitir apenas POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido']);
    exit;
}

// ✅ Sanitização e validação
$nome     = trim($_POST['name'] ?? '');
$telefone = trim($_POST['phone'] ?? '');
$email    = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$assunto  = trim($_POST['assunto'] ?? '');

if (!$nome || !$telefone || !$email || !$assunto) {
    http_response_code(400);
    echo json_encode(['erro' => 'Preencha todos os campos corretamente']);
    exit;
}

// 🔐 PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // 📡 SMTP
    $mail->isSMTP();
    $mail->Host       = $config['host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['username'];
    $mail->Password   = $config['password'];
    $mail->Port       = $config['port'];
    $mail->CharSet    = 'UTF-8';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAutoTLS = false;


    // ✉️ E-mail
    $mail->setFrom('contato@jpcorp.com.br', 'Site JP Corp');
    $mail->addAddress('contato@jpcorp.com.br');

$mail->isHTML(true);
$mail->Subject = '📩 Novo contato pelo site - JP Corp';

$mail->Body = "
    <!DOCTYPE html>
    <html lang='pt-BR'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body style='margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;'>

    <table width='100%' cellpadding='0' cellspacing='0' style='padding:20px;'>
        <tr>
            <td align='center'>

                <table width='600' cellpadding='0' cellspacing='0'
                    style='background:#ffffff; border-radius:12px; overflow:hidden;
                            box-shadow:0 6px 18px rgba(0,0,0,0.08);'>

                    <!-- HEADER -->
                    <tr>
                        <td style='background:#66999A; color:#ffffff; padding:22px; text-align:center;'>
                            <h2 style='margin:0; font-size:22px;'>📩 Novo contato do site</h2>
                            <p style='margin:6px 0 0; font-size:14px; opacity:0.9;'>
                                JP Corp Sistemas
                            </p>
                        </td>
                    </tr>

                    <!-- CONTENT -->
                    <tr>
                        <td style='padding:24px; color:#333; font-size:15px;'>
                            <p style='margin-top:0;'>
                                Você recebeu um novo contato através do formulário do site.
                            </p>

                            <table width='100%' cellpadding='8' cellspacing='0'
                                style='border-collapse:collapse; margin-top:15px;'>

                                <tr>
                                    <td style='background:#f8f9fa; width:140px;'><strong>Nome</strong></td>
                                    <td>{$nome}</td>
                                </tr>

                                <tr>
                                    <td style='background:#f8f9fa;'><strong>Telefone</strong></td>
                                    <td>{$telefone}</td>
                                </tr>

                                <tr>
                                    <td style='background:#f8f9fa;'><strong>Email</strong></td>
                                    <td>{$email}</td>
                                </tr>

                                <tr>
                                    <td style='background:#f8f9fa;'><strong>Assunto</strong></td>
                                    <td>{$assunto}</td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style='background:#f1f1f1; padding:16px; text-align:center;
                                font-size:12px; color:#777;'>
                            Este email foi enviado automaticamente pelo site <strong>jpcorp.com.br</strong><br>
                            Não responda este e-mail.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

    </body>
    </html>
    ";

    $mail->send();

    echo json_encode(['sucesso' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'erro' => 'Erro ao enviar mensagem',
        'detalhe' => $mail->ErrorInfo
    ]);
    exit;

}
