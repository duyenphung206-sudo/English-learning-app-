@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo  TAO GIONG DOC TIENG VIET BAN XU (Hoai My)
echo  Can co mang. Chay khoang 5-10 phut.
echo ============================================
where py >nul 2>nul && set PY=py || set PY=python
%PY% --version >nul 2>nul || (
  echo.
  echo [LOI] May chua cai Python.
  echo Hay tai Python tai https://www.python.org/downloads/
  echo Khi cai NHO TICH VAO O "Add python.exe to PATH" roi chay lai file nay.
  pause & exit /b 1
)
echo Dang cai thu vien...
%PY% -m pip install --quiet --disable-pip-version-check edge-tts mutagen
echo Dang tao giong doc...
%PY% generate_audio.py
echo.
pause
