import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Component} from '@angular/core';

class Joke{
  setup:string;
  punchline:String;
  hide:boolean;

  constructor(setup:string,punchline:string){
    this.setup= setup;
    this.punchline=punchline;
    this.hide=true;
  }
  toggle(){
    this.hide=!this.hide;
  }
}
let joke= new Joke("What did the cheese say when it looked in the mirror?","Hello-Me (Halloumi)")

@Component({
  selector: 'joke-list',
  template: `
<div class="card card-block"
     *ngFor="let joke of jokes">
  <h4 class="card-title">{{joke.setup}}</h4>
  <p class="card-text" [hidden]="joke.hide">{{joke.punchline}}</p>
  <button class="btn btn-primary"
  (click)="joke.toggle()">Tell me</button>
</div>
  `
})


class JokeListComponent {
  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror?","Hello-Me (Halloumi)"),
      new Joke("What kind of cheese do you use to disguise a small horse?","Mask-a-pony (Mascarpone)"),
      new Joke("A kid threw a lump of cheddar at me","I thought ‘That’s not very mature’")
    ];
  }
  toggle(joke){
  joke.hide=!joke.hide();
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [JokeListComponent],
  bootstrap: [JokeListComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);