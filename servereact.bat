if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit
@echo off
title react
call serve C:\Repo\churchBeta\React\ts-cam-app\build
