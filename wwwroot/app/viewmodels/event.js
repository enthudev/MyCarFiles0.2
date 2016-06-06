
import {inject} from 'aurelia-framework';
import {DataCache} from 'services/dataCache';

@inject(DataCache)
export class event {
    constructor(cache) {
        cache.data.push('b');
    }
    activate(bindingContext) {
        this.item = bindingContext;
    }
}