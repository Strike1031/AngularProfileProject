import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const baseStyle = style({
  //display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%' /*Serve para evitar o problema do overflow*/
})

const basePositionOverflow = style({
  position: 'relative',
  overflow: 'hidden'
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      /** => * esta dizendo cada parte da animação, ou mudança de fase*/
      transition(':increment', [

        basePositionOverflow,

        query(':enter, :leave', [
          baseStyle
        ], { optional: true }),

        /*query(':enter', [
          style({
            opacity: 0,
          })
        ], { optional: true }),*/

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-80px)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(80px)'
            }),
            animate('250ms 125ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0px)'
            }))
          ], { optional: true })
        ])

      ]),

      transition(':decrement', [

        basePositionOverflow,

        query(':enter, :leave', [
          baseStyle
        ], { optional: true }),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateX(80px)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(-80px)'
            }),
            animate('250ms 125ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0px)'
            }))
          ], { optional: true })
        ])

      ]),

      /* Animação para a mudança das rotas fora dos Tabs */

      transition('* => secondary', [

        style({
          position: 'relative',
          //overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyle
        ], { optional: true }),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'scale(1.2)'
            }),
            animate('250ms 125ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [

        style({
          position: 'relative',
          //overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyle
        ], { optional: true }),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.2)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'scale(0.8)'
            }),
            animate('250ms 125ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])

    ]),

    trigger('bgAnim', [
      transition(':leave', animate(1000, style({
        opacity: 0
      }))
      ) /*Nota: o animate pode estar tanto dentro de um array como os outros ou fora, como é esse o caso aqui.*/
    ]),

    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({
          opacity: 1
        }))
      ]),

      transition(':leave', style({ opacity: 0 }))
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'personal-dashboard';

  backgrounds: string[] = [
    'https://images.unsplash.com/photo-1635233787807-2a4a212ddca3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNTM1NDEyMA&ixlib=rb-1.2.1&q=80&w=1920'
  ];

  loadingBgImg: boolean | any;

  dateTime: Observable<Date> | any;

  ngOnInit() {
    /*Nota: esta subscrevendo sempre que tenha uma mudança no pipe, nesse caso Hora e Minuto*/
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date()
      })
    )
  }

  /*Metodo para animação da troca de rotas*/
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tabNumber = outlet.activatedRouteData['tabNumber']
      if (!tabNumber) return 'secondary'
      return tabNumber
    }
  }

  async changeBGImg() {
    this.loadingBgImg = true;
    /*Pegando a url da imagem, nota o method: HEAD é para so pegar a url sem fazer o download da imagem*/
    const result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD'
    })

    const alreadyGot = this.backgrounds.includes(result.url)
    if (alreadyGot) {
      /*Tem a mesma imagem, entao esta re usando a função*/
      /*Nota: o return é implicito*/
      this.changeBGImg()
    }

    this.backgrounds.push(result.url)
  }

  onBgImgLoad(imgEvent: Event) {
    // O Background esta carregando entao remova o antigo do array backgrounds
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)

    this.loadingBgImg = false;
  }
}
