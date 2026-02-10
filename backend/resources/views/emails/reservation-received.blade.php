<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Rezervace přijata</h1>
        </div>
        <div class="content">
            <p>Dobrý den <strong>{{ $reservation->name }}</strong>,</p>
            
            <p>Děkujeme za Vaši rezervaci obytného vozu. Vaše rezervace byla úspěšně přijata a čeká na potvrzení.</p>
            
            <h3>Detail rezervace:</h3>
            <ul>
                <li><strong>Od:</strong> {{ \Carbon\Carbon::parse($reservation->from)->format('d.m.Y') }}</li>
                <li><strong>Do:</strong> {{ \Carbon\Carbon::parse($reservation->to)->format('d.m.Y') }}</li>
                <li><strong>Počet nocí:</strong> {{ \Carbon\Carbon::parse($reservation->from)->startOfDay()->diffInDays(\Carbon\Carbon::parse($reservation->to)->startOfDay()) }}</li>
            </ul>
            
            @if($reservation->note)
            <h3>Vaše poznámka:</h3>
            <div style="background: white; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px; white-space: pre-line;">{{ $reservation->note }}</div>
            @endif

            <div style="margin: 30px 0; text-align: center;">
                <p>Pokud jste si rezervaci rozmysleli, můžete ji zrušit kliknutím na tlačítko níže:</p>
                <a href="{{ route('reservations.cancel', ['token' => $reservation->cancel_token]) }}" style="display: inline-block; padding: 10px 20px; background: #ef4444; color: white; text-decoration: none; border-radius: 5px;">Zrušit rezervaci</a>
                <p style="font-size: 12px; color: #666; margin-top: 5px;">* Tlačítko je funkční pouze dokud není rezervace potvrzena.</p>
            </div>
            
            <p>Brzy Vás budeme kontaktovat s potvrzením a dalšími informacemi.</p>
            
            <p>S pozdravem,<br><strong>Petr Panýrek</strong></p>
        </div>
        <div class="footer">
            <p>Tento email byl odeslán automaticky. Neodpovídejte na něj.</p>
        </div>
    </div>
</body>
</html>
