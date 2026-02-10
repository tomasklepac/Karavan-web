<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        .highlight { background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Rezervace potvrzena!</h1>
        </div>
        <div class="content">
            <p>Dobrý den <strong>{{ $reservation->name }}</strong>,</p>
            
            <div class="highlight">
                <p style="margin: 0; font-size: 18px;"><strong>Vaše rezervace byla potvrzena!</strong></p>
            </div>

            <p>Bezplatné zrušení rezervace je možné do <strong>{{ $freeCancelDate->format('d.m.Y') }}</strong>.</p>
            <p style="font-size: 13px; color: #666;">
                * Při zrušení méně než 30 dní předem vracíme 50 % zálohy.<br>
                * Při zrušení méně než 7 dní předem se záloha nevrací.
            </p>
            
            <h3>Detail rezervace:</h3>
            <ul>
                <li><strong>Od:</strong> {{ \Carbon\Carbon::parse($reservation->from)->format('d.m.Y') }}</li>
                <li><strong>Do:</strong> {{ \Carbon\Carbon::parse($reservation->to)->format('d.m.Y') }}</li>
                <li><strong>Počet nocí:</strong> {{ \Carbon\Carbon::parse($reservation->from)->startOfDay()->diffInDays(\Carbon\Carbon::parse($reservation->to)->startOfDay()) }}</li>
            </ul>
            
            @if($reservation->note)
            <h3>Poznámka k rezervaci:</h3>
            <div style="background: white; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px; white-space: pre-line;">{{ $reservation->note }}</div>
            @endif
            
            <p>Brzy Vás budeme kontaktovat s dalšími instrukcemi ohledně předání karavanu a platebních podmínek.</p>
            
            <p>V případě dotazů nás neváhejte kontaktovat.</p>
            
            <p>Těšíme se na Vás!<br><strong>Petr Panýrek</strong></p>
        </div>
        <div class="footer">
            <p>Kontakt: info@karavan-panyrek.cz | +420 123 456 789</p>
        </div>
    </div>
</body>
</html>
