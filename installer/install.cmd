@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo   dsh-plugin-hub 安装器
echo   =====================
echo.

set "NODE="
for %%C in (node.exe) do if not defined NODE set "NODE=%%~$PATH:C"
if not defined NODE if exist "%ProgramFiles%\nodejs\node.exe" set "NODE=%ProgramFiles%\nodejs\node.exe"
if not defined NODE if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" set "NODE=%LOCALAPPDATA%\Programs\nodejs\node.exe"

if defined NODE (
    "%NODE%" "install.mjs" %*
    goto :done
)

echo   没有找到 Node.js，正在尝试用 DeepSeek Harness 自带的运行时...
set "APP="
for /f "delims=" %%P in ('where /r "%LOCALAPPDATA%" "DeepSeek Harness.exe" 2^>nul') do if not defined APP set "APP=%%P"
if not defined APP for /f "delims=" %%P in ('where /r "%ProgramFiles%" "DeepSeek Harness.exe" 2^>nul') do if not defined APP set "APP=%%P"
if not defined APP for /f "delims=" %%P in ('where /r "%USERPROFILE%" "DeepSeek Harness.exe" 2^>nul') do if not defined APP set "APP=%%P"

if defined APP (
    echo   找到: !APP!
    set "ELECTRON_RUN_AS_NODE=1"
    "!APP!" "install.mjs" %*
    goto :done
)

echo.
echo   安装失败：既没有 Node.js，也没有找到 DeepSeek Harness。
echo.
echo   两种解决办法（任选其一）：
echo     1. 安装 Node.js（https://nodejs.org/ ，选 LTS），然后重新双击本文件；
echo     2. 直接从源码装：
echo          npx dsh plugin --profile web add dsh-plugin-hub@latest
echo.

:done
echo.
pause
endlocal
