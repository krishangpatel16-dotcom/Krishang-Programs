QT += core gui widgets

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = CricketGame
TEMPLATE = app

DEFINES += QT_DEPRECATED_WARNINGS

SOURCES += \
    main.cpp \
    CricketGameGUI.cpp

HEADERS += \
    CricketGameGUI.h

CONFIG += c++11