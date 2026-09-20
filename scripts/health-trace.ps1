# health-trace.ps1
# Global Error Trapper for PEOS

$ErrorActionPreference = "Stop"

function Write-HealthLog {
    param([string]$Action,[string]$Status,[string]$Details)
    $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $user = $env:USERNAME
    $dataRoot = "D:\Arif Workspace\Projects\peos\data"
    if (-Not (Test-Path $dataRoot)) { New-Item -ItemType Directory -Path $dataRoot | Out-Null }
    $logPath = "$dataRoot\health-trace.log"
    $log = "[$date] | $Action | User:$user | Status:$Status | $Details"
    Add-Content $logPath $log
    Write-Host $log -ForegroundColor Yellow
}

# Auto trap for any error
trap {
    $file = $_.InvocationInfo.ScriptName
    $line = $_.InvocationInfo.ScriptLineNumber
    $msg = $_.Exception.Message
    Write-HealthLog "ERROR" "FAILED" "BUG LOCATION: $file : Line $line | Error: $msg"
    exit 1
}

Write-HealthLog "SYSTEM" "STARTED" "Health Tracer Active"
