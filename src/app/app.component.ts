import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SimpleGame } from 'src/game/simple-game';

import { MainScene } from "../game/scenes/main";
import { Scale } from 'phaser';
import { GameStatsService } from './game-stats.service';
import { Score } from 'src/game/domain/score';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    constructor(private stats : GameStatsService)
    {

    }

    @ViewChild("canvas") el : ElementRef;

    game : SimpleGame;
    score : Score = new Score();

    paused : boolean = false;

    ngAfterViewInit(): void {
        this.config.canvas = this.el.nativeElement;
        this.game = new SimpleGame(this.config);
    }
    title = 'ng7-phaser3-boilerplate';

    config : Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
        scale: {
            width: 800,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            height: 600,
            mode: Phaser.Scale.RESIZE
        },
        parent: "game",
        scene: MainScene,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 300 }
          }
        }
      };
    ngOnInit(): void {
        this.stats.keyPressed.subscribe((key) => {
            this.keyPressed = key;
        })
        this.stats.scoreChanged.subscribe((score) => {
            this.score = score;
        })
    }

    inverseGravity()
    {
        this.stats.emitKey('gravity_inverse');
    }

    keyPressed : string = "";
}
