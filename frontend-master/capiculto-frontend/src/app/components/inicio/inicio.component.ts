import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public publicidad = [
    {
      imagen: 'https://cdn.bolivia.com/sdi/2017/08/28/la-chakana-da-vida-a-un-nuevo-programa-cultural-para-la-paz-566625.jpg',
      link: 'https://www.bolivia.com/entretenimiento/noticias/sdi/161490/la-chakana-da-vida-a-un-nuevo-programa-cultural-para-la-paz-capital-de-la-cultura'
    },
    {
      imagen: 'https://xn--diseocarteles-lkb.com/graficos/2014/02/bienal-del-cartel-bolivia-bicebe.jpg',
      link: 'https://xn--diseocarteles-lkb.com/bienal-del-cartel-de-bolivia-bicebe/'
    },
    {
      imagen: 'https://boliviaemprende.com/wp-content/uploads/2021/06/Bolivia-innova.jpg',
      link: 'https://boliviaemprende.com/eventos/bolivia-innova-3-congreso-internacional-de-biotecnologia'
    },
    {
      imagen: 'https://www.cedib.org/wp-content/uploads/2021/06/BannerGral03-1200px-min.jpg',
      link: 'https://www.cedib.org/recursos-naturales/conferencia-internacional-derecho-a-proteger-el-medio-ambiente/'
    },
    {
      imagen: 'https://sisanjuan2-imagenysistemas.netdna-ssl.com/media/k2/items/cache/ca9303012509a4a7e2d201c377fc0aa0_S.jpg',
      link: 'http://orbitadeportiva.net/el-calendario-deportivo-con-los-eventos-mas-importantes-del-2022/'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }
  

}
