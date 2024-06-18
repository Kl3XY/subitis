import { IHttpClient, json } from '@aurelia/fetch-client';
import { newInstanceOf } from '@aurelia/kernel';
import { inject, resolve } from 'aurelia';
import { IRouter, IRouteableComponent } from '@aurelia/router';

class Player {
    name: string
    id: number = 0
    isAlive: boolean
    ProfilePicture: string;
    skinType: number;
    hairType: number;
}

@inject(newInstanceOf(IHttpClient))
export class Players implements IRouteableComponent {
    public name = 'Player';
    public player: Player[] = [];
    private router: IRouter = resolve(IRouter);

    constructor(private http: IHttpClient) {

    }

    async createNewPlayer() {
        console.log("yoooo");
    }

    search() {
        this.player = [];
        console.log("API Init")
        let search: string;
        if (this.name != '') {
            search = "https://localhost:7122/Players/Search/" + this.name;
        } else {
            search = "https://localhost:7122/Players";
        }
        console.log(search);
        this.http.fetch(search)
            .then(rsp => rsp.json())
            .then(json => { this.player = (json as Player[]); console.log(this.player) })



        console.log("API Done!")
    }

    load() {
        console.log("API Init")
        this.http.fetch("https://localhost:7122/Players")
            .then(rsp => rsp.json())
            .then(json => { this.player = (json as Player[]) })

        
        console.log("API Done!")
    }
}