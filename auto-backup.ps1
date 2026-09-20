# auto-backup.ps1
# Daily Auto Backup for PEOS KP-Police

$root = "D:\Arif Workspace\Projects\peos"
$source = "$root\divisions\KP-Police"
$backupRoot = "$root\Backup"
$archiveRoot = "$root\ARCHIVE"
$date = Get-Date -Format "yyyyMMdd-HHmmss"
$zipName = "PEOS-KPP-2026-001-Backup-$date.zip"
$zipPath = "$backupRoot\$zipName"

Write-Host "========================================" -ForegroundColor Green
Write-Host " PEOS AUTO BACKUP STARTED" -ForegroundColor Green

# 1. Find latest folder in divisions\KP-Police
$latestFolder = Get-ChildItem $source -Directory | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if(-not $latestFolder){ Write-Host "ERROR: No data in divisions" -ForegroundColor Red; exit 1 }

# 2. Zip the latest folder
Write-Host "Zipping: $($latestFolder.Name)..."
Compress-Archive -Path $latestFolder.FullName -DestinationPath $zipPath -Force
Write-Host "SUCCESS: Zip Created - $zipName" -ForegroundColor Green

# 3. Archive old Backup folders > 1 day old
Get-ChildItem $backupRoot -Directory | Where-Object { $_.Name -ne $latestFolder.Name -and $_.LastWriteTime -lt (Get-Date).AddDays(-1) } | ForEach-Object {
    $archivePath = "$archiveRoot\$($_.Name)_$date"
    Move-Item $_.FullName $archivePath -Force
    Write-Host "Archived Old Backup: $($_.Name)" -ForegroundColor Yellow
}

# 4. Write Health Log
function Write-HealthLog {
    param([string]$Action,[string]$Status,[string]$Details)
    $logDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $user = $env:USERNAME
    $logPath = "$root\data\health-trace.log"
    $log = "[$logDate] | $Action | User:$user | Status:$Status | $Details"
    Add-Content $logPath $log
}
Write-HealthLog "AUTO_BACKUP" "SUCCESS" "Zip:$zipName | Source:$($latestFolder.FullName)"

Write-Host "========================================" -ForegroundColor Green
