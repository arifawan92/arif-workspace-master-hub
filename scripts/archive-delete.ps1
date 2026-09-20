# archive-delete.ps1 v2 - with auto data folder
param([Parameter(Mandatory=$true)][string]$PathToDelete)

$date = Get-Date -Format "yyyyMMdd-HHmmss"
$folderName = Split-Path $PathToDelete -Leaf
$archiveRoot = "D:\Arif Workspace\Projects\peos\ARCHIVE"
$dataRoot = "D:\Arif Workspace\Projects\peos\data"
$archivePath = "$archiveRoot\$folderName`_$date"
$logPath = "$dataRoot\health-trace.log"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " PEOS ARCHIVE PROCESS STARTED" -ForegroundColor Cyan

if (-Not (Test-Path $PathToDelete)) { Write-Host "ERROR: Path not found!" -ForegroundColor Red; exit 1 }
if (-Not (Test-Path $archiveRoot)) { New-Item -ItemType Directory -Path $archiveRoot | Out-Null }
if (-Not (Test-Path $dataRoot)) { New-Item -ItemType Directory -Path $dataRoot | Out-Null }

try {
    Move-Item -Path $PathToDelete -Destination $archivePath -Force
    Write-Host "SUCCESS: Moved to ARCHIVE" -ForegroundColor Green
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red; exit 1
}

$logEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] | ARCHIVE | User:$env:USERNAME | Status:SUCCESS | From:$PathToDelete | To:$archivePath"
Add-Content $logPath $logEntry

Write-Host "Log Updated: $logPath"
Write-Host "========================================" -ForegroundColor Cyan
