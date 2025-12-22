<#
.SYNOPSIS
  Move numbered CNPJ feature files to archive/ and prepend provenance header.

.DESCRIPTION
  Finds feature files matching patterns for alfanumerico and numerico numbered
  variants in `features/`, moves them to `archive/` using `git mv`, prepends an
  HTML comment header indicating the canonical feature that replaced it and
  stages the updated file.

.USAGE
  Run from any location; the script resolves the repository root relative to
  its own location. Example:

    powershell -ExecutionPolicy Bypass -File .\scripts\move_features_to_archive.ps1

  The script performs `git mv` and `git add` so it requires a git working tree
  and that `git` is available in PATH.
#>

Set-StrictMode -Version Latest

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $scriptRoot "..")
$repoRoot = $repoRoot.Path

Write-Host "Repo root: $repoRoot"

$archiveDir = Join-Path $repoRoot 'archive'
if (-not (Test-Path $archiveDir)) {
    New-Item -ItemType Directory -Path $archiveDir | Out-Null
    Write-Host "Criado: $archiveDir"
}

$patterns = @(
    'features\cnpj_alfanumerico_*.feature',
    'features\cnpj_numerico_*.feature'
)

# Change to repo root to use relative git mv paths
Push-Location $repoRoot
try {
    foreach ($pattern in $patterns) {
        $files = Get-ChildItem -Path $pattern -File -ErrorAction SilentlyContinue
        foreach ($f in $files) {
            $srcRel = Join-Path '.' $f.FullName.Substring($repoRoot.Length + 1)
            $destRel = Join-Path './archive' $f.Name

            if (Test-Path (Join-Path $archiveDir $f.Name)) {
                Write-Host "Pular (já existe): $($f.Name)" -ForegroundColor Yellow
                continue
            }

            # Decide canonical target based on filename
            if ($f.Name -match 'alfanumerico') { $canonical = 'features/cnpj_alfanumerico.feature' }
            elseif ($f.Name -match 'numerico') { $canonical = 'features/cnpj_numerico.feature' }
            else { $canonical = 'features/cnpj_validacao.feature' }

            Write-Host "Movendo: $srcRel -> $destRel"
            git mv -- "$srcRel" "$destRel"

            $destPath = Join-Path $archiveDir $f.Name
            $date = Get-Date -Format yyyy-MM-dd
            $header = "<!-- ARCHIVE: substituído por $canonical em $date -->`r`n"

            # Prepend header
            $content = Get-Content -Raw -LiteralPath $destPath
            Set-Content -LiteralPath $destPath -Value ($header + $content)

            # Stage the updated file
            git add -- "$destRel"

            Write-Host "Arquivo movido e prefixado: $destRel"
        }
    }
}
finally {
    Pop-Location
}

Write-Host "Concluído. Revise alterações com 'git status' e faça commit/PR." -ForegroundColor Green
