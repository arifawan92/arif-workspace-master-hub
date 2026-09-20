Write-Host "Building PEOS Root..."
npm run build

if ($LASTEXITCODE -eq 0) {
  Write-Host "PEOS ROOT = PASS ✅"
} else {
  Write-Host "PEOS ROOT = FAIL ❌ - AutoHeal shuru"
}
