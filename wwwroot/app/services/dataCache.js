import {singleton} from 'aurelia-framework';

@singleton()
export class DataCache
{
    constructor()
    {
        this.data = [];
        console.log('DataCache constructor');
    }
}