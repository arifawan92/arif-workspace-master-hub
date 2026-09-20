# system-report.ps1
# PEOS Full Health Verification Report

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "        PEOS SYSTEM REPORT" -ForegroundColor Yellow  
Write-Host "        Date: $(Get-Date)" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$root = "D:\Arif Workspace\Projects\peos"

# 1. FOLDER STRUCTURE CHECK
Write-Host "1. FOLDER STRUCTURE:" -ForegroundColor Cyan
$folders = @("scripts","data","ARCHIVE","Backup","divisions")
foreach($f in $folders){
    $path = "$root\$f"
    if(Test-Path $path){ Write-Host "  [OK] $f exists" -ForegroundColor Green }
    else{ Write-Host "  [MISSING] $f" -ForegroundColor Red }
}

# 2. ARCHIVE COUNT
Write-Host "`n2. ARCHIVE STATUS:" -ForegroundColor Cyan
$archiveCount = (Get-ChildItem "$root\ARCHIVE" -Directory).Count
Write-Host "  Total Archived Folders: $archiveCount"

# 3. BACKUP CLEANUP CHECK
Write-Host "`n3. BACKUP FOLDER:" -ForegroundColor Cyan
$backupDirs = Get-ChildItem "$root\Backup" -Directory | Select-Object Name
Write-Host "  Active Backup Folders: $($backupDirs.Name -join ', ')"

# 4. HEALTH LOG CHECK
Write-Host "`n4. HEALTH TRACE LOG:" -ForegroundColor Cyan
$logPath = "$root\data\health-trace.log"
if(Test-Path $logPath){
    $last5 = Get-Content $logPath -Tail 5
    Write-Host "  Last 5 Entries:" -ForegroundColor Green
    $last5 | ForEach-Object{ Write-Host "  $_" }
} else { Write-Host "  [MISSING] health-trace.log" -ForegroundColor Red }

# 5. SCRIPT INTEGRITY
Write-Host "`n5. SCRIPTS CHECK:" -ForegroundColor Cyan
if(Test-Path "$root\scripts\archive-delete.ps1"){ Write-Host "  [OK] archive-delete.ps1" -ForegroundColor Green }
if(Test-Path "$root\scripts\health-trace.ps1"){ Write-Host "  [OK] health-trace.ps1" -ForegroundColor Green }

Write-Host "`n========================================" -ForegroundColor Yellow
Write-Host "        REPORT END" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
