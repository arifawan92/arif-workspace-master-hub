# PEOS Folder Auto Creator v2.0
$basePath = "D:\Arif Workspace\Projects\peos\Projects\KP-Police"

$divisions = @("HQ", "BNU", "PWR", "MRD", "HZD", "KHT", "DKI", "MLD")
$team = @{
    "HQ" = @("AK-Arif Khan")
    "BNU" = @("AR-Ali Raza")
    "PWR" = @("US-Usman Shah")
    "MRD" = @("SN-Sana Noor")
    "HZD" = @("ZK-Zafar Khan")
    "KHT" = @("FM-Farah Malik")
    "DKI" = @("IJ-Imran Jan")
    "MLD" = @("TN-Tahir Noor")
}

Write-Host "PEOS Folder Structure ban rahi hai..." -ForegroundColor Green

foreach ($div in $divisions) {
    $divPath = Join-Path $basePath "$div Division"
    New-Item -ItemType Directory -Force -Path "$divPath\01-Inbox" | Out-Null
    New-Item -ItemType Directory -Force -Path "$divPath\03-Archive" | Out-Null
    New-Item -ItemType Directory -Force -Path "$divPath\04-Reports" | Out-Null
    
    $workPath = Join-Path $divPath "02-Work"
    New-Item -ItemType Directory -Force -Path $workPath | Out-Null
    
    foreach ($member in $team[$div]) {
        New-Item -ItemType Directory -Force -Path "$workPath\$member" | Out-Null
    }
    Write-Host "$div Division Done" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "===== SAB FOLDER BAN GAYE =====" -ForegroundColor Green
Write-Host "Location: $basePath"