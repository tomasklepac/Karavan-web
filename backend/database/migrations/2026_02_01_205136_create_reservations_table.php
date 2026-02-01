<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->dateTime('from')->index();
            $table->dateTime('to')->index();
            $table->string('name', 120);
            $table->string('email', 190);
            $table->string('phone', 40);
            $table->text('note')->nullable();
            $table->enum('status', ['PENDING', 'CONFIRMED', 'REJECTED', 'CANCELED'])
                  ->default('PENDING')
                  ->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
