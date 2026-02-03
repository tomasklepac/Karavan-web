<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .info-box { background: white; padding: 15px; border: 1px solid #e5e7eb; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 Nová rezervace</h1>
        </div>
        <div class="content">
            <p><strong>Přijata nová rezervace od zákazníka:</strong></p>
            
            <div class="info-box">
                <h3>Kontaktní údaje:</h3>
                <p><strong>Jméno:</strong> {{ $reservation->name }}</p>
                <p><strong>Email:</strong> {{ $reservation->email }}</p>
                <p><strong>Telefon:</strong> {{ $reservation->phone }}</p>
            </div>
            
            <div class="info-box">
                <h3>Termín:</h3>
                <p><strong>Od:</strong> {{ \Carbon\Carbon::parse($reservation->from)->format('d.m.Y') }}</p>
                <p><strong>Do:</strong> {{ \Carbon\Carbon::parse($reservation->to)->format('d.m.Y') }}</p>
                <p><strong>Počet nocí:</strong> {{ \Carbon\Carbon::parse($reservation->from)->startOfDay()->diffInDays(\Carbon\Carbon::parse($reservation->to)->startOfDay()) }}</p>
            </div>
            
            @if($reservation->note)
            <div class="info-box">
                <h3>Poznámka zákazníka:</h3>
                <div style="white-space: pre-line;">{{ $reservation->note }}</div>
            </div>
            @endif
            
            <p style="margin-top: 20px;">
                <a href="http://localhost/karavan-web/backend/public/admin" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px;">
                    Přejít do admin panelu
                </a>
            </p>
        </div>
    </div>
</body>
</html>
