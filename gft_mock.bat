@echo off
:: Obtém a data e hora atual no formato yyyy-MM-dd-hh-mm-ss
for /f "tokens=2 delims==" %%F in ('wmic os get localdatetime /value ^| find "="') do set datetime=%%F
set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%
set hour=%datetime:~8,2%
set minute=%datetime:~10,2%
set second=%datetime:~12,2%
set filename=%year%-%month%-%day%-%hour%-%minute%-%second%.txt

:: Cria o arquivo com o nome gerado
echo Arquivo criado em %date% %time% > %filename%

:: Aguarda 30 segundos
timeout /t 30 /nobreak >nul
