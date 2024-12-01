@echo off
:: Define o diretório local chamado "temp"
setlocal
set temp_dir=%~dp0temp

:: Cria a pasta "temp" caso não exista
if not exist "%temp_dir%" mkdir "%temp_dir%"

:: Obtém a data e hora atual no formato yyyy-MM-dd-hh-mm-ss
for /f "tokens=2 delims==" %%F in ('wmic os get localdatetime /value ^| find "="') do set datetime=%%F
set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%
set hour=%datetime:~8,2%
set minute=%datetime:~10,2%
set second=%datetime:~12,2%
set filename=%temp_dir%\%year%-%month%-%day%-%hour%-%minute%-%second%.txt

:: Cria o cabeçalho no arquivo
echo Parâmetros recebidos pelo script: > "%filename%"

:: Lê entrada do STDIN e grava diretamente no arquivo
for /f "delims=" %%A in ('more') do echo %%A >> "%filename%"

:: Finaliza o script
exit /b