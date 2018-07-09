import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule, EventEmitter, Input,Component}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { Output } from '@angular/core';



class Joke{
 public setup:string;
 public punchline:String;
 public hide:boolean;

  constructor(setup:string,punchline:string){
    this.setup= setup;
    this.punchline=punchline;
    this.hide=true;
  }
  toggle(){
    this.hide=!this.hide;
  }
}
@Component({
  selector: 'joke-form',
  template: `
<div class="card card-block">
  <h4 class="card-title">Create Joke</h4>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the setup"
           #setup>
  </div>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the punchline"
           #punchline>
  </div>
  <button type="button"
          class="btn btn-primary" (click)="createJoke(setup.value, punchline.value)">Create
  </button>
</div>
  `
})
class JokeFormComponent{
  @Output() jokeCreated= new EventEmitter<Joke>();
  
  createJoke(setup:string,punchline:string){
    this.jokeCreated.emit(new Joke(setup,punchline));
  }
}

@Component({
  selector:'joke',
  template:`
  <div class="card card-block">
    <h4 class="card-title">{{joke.setup}}</h4>
    <p class="card-text" [hidden]="joke.hide">{{joke.punchline}}</p>
    <button class="btn btn-primary"
    (click)="joke.toggle()">Tell me</button>
  </div>
    `
}) 

class JokeComponent{
 @Input('joke') joke: Joke;

}


@Component({
  selector: 'joke-list',
  template: `
<joke-form (jokeCreated)="addJoke($event)"></joke-form>
  <joke *ngFor="let j of jokes" [joke]="j"></joke>
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
  addJoke(joke){
    this.jokes.unshift(joke);
  }
}

@Component({
  selector: 'app',
  template: `
  <joke-list></joke-list>
  `
})
class AppComponent{
    
  }

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent,JokeComponent, JokeListComponent, JokeFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);