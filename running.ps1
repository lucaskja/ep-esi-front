# rodar `.\running.ps1` pra rodar o aplicativo no PowerShell Windows
# fnm é um gerenciador de versões do node

fnm env --use-on-cd | Out-String | Invoke-Expression
Write-Output "Node Version: $(node -v)"
Write-Output "Npm Version: $(npm -v)"
npm run dev