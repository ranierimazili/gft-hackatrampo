# Define o diretório local chamado "temp"
$tempDir = Join-Path -Path (Get-Location) -ChildPath "temp"

# Cria a pasta "temp" caso não exista
if (-not (Test-Path -Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir | Out-Null
}

# Obtém a data e hora atual no formato yyyy-MM-dd-hh-mm-ss
$dateTime = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"

# Define o nome do arquivo
$fileName = Join-Path -Path $tempDir -ChildPath "$dateTime.txt"

# Cria o arquivo na pasta "temp" com o conteúdo
"Arquivo criado em $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" | Out-File -FilePath $fileName -Encoding utf8

# Aguarda 15 segundos
Start-Sleep -Seconds 15
