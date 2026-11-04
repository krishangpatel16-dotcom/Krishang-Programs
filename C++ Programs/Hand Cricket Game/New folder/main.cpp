#include <QApplication>
#include "CricketGameGUI.h"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);
    
    app.setApplicationName("Cricket Game");
    app.setApplicationDisplayName("Cricket Game - Ultimate Edition");
    
    CricketGameGUI game;
    game.show();
    
    return app.exec();
}