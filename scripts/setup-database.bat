@echo off
echo ========================================
echo DomusVertical Database Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if Supabase CLI is installed
where supabase >nul 2>nul
if %errorlevel% neq 0 (
    echo Supabase CLI not found. Installing...
    call npm install -g supabase
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Supabase CLI
        pause
        exit /b 1
    )
    echo Supabase CLI installed successfully
    echo.
)

echo Checking Supabase login status...
supabase projects list >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo You need to login to Supabase first.
    echo Opening browser for authentication...
    supabase login
    if %errorlevel% neq 0 (
        echo ERROR: Login failed
        pause
        exit /b 1
    )
)

echo.
echo Linking to DomusVertical project...
supabase link --project-ref zzbsgvceauztzcfxksgv
if %errorlevel% neq 0 (
    echo Note: Project may already be linked
)

echo.
echo Creating database tables...
supabase db push < SUPABASE_SQL_SETUP.sql
if %errorlevel% neq 0 (
    echo Warning: Some tables may already exist
)

echo.
echo Seeding database with sample data...
call npx tsx scripts/seed-data.ts
if %errorlevel% neq 0 (
    echo Warning: Seeding may have encountered issues
)

echo.
echo ========================================
echo Setup completed!
echo.
echo Next steps:
echo 1. Start the development server: npm run dev
echo 2. Visit: http://localhost:3001/en/dashboards/domus
echo ========================================
pause